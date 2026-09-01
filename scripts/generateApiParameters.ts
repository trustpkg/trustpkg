#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiFilePath = path.join(__dirname, "../src/api/api.ts");
const outputFilePath = path.join(__dirname, "../src/api/parameters.ts");

const apiContent = fs.readFileSync(apiFilePath, "utf-8");

const schemasMap = new Map<string, Array<{ name: string; schema: string }>>();

const lines = apiContent.split("\n");

let endpointAlias = "";
let inParameters = false;
let inParameterObject = false;
let currentSchemaLines: string[] = [];
let currentParamName = "";

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("alias:")) {
    const aliasMatch = line.match(/alias:\s*"([^"]+)"/);
    if (aliasMatch) {
      endpointAlias = aliasMatch[1];
    }
  }

  if (line.includes("parameters: [")) {
    inParameters = true;
    continue;
  }

  if (inParameters && line.includes("],")) {
    inParameters = false;
    if (currentSchemaLines.length > 0 && currentParamName) {
      addParameter(schemasMap, endpointAlias, currentParamName, currentSchemaLines);
    }
    currentSchemaLines = [];
    currentParamName = "";
    continue;
  }

  if (inParameters) {
    if (line.includes("{") && !line.includes("schema")) {
      if (currentSchemaLines.length > 0 && currentParamName) {
        addParameter(schemasMap, endpointAlias, currentParamName, currentSchemaLines);
        currentSchemaLines = [];
        currentParamName = "";
      }
      inParameterObject = true;
    }

    if (inParameterObject) {
      if (line.includes('name: "')) {
        const nameMatch = line.match(/name:\s*"([^"]+)"/);
        if (nameMatch) {
          currentParamName = nameMatch[1];
        }
      }

      if (line.includes("schema:")) {
        const schemaStart = line.indexOf("schema:") + 7;
        currentSchemaLines.push(line.substring(schemaStart).trim());
      } else if (currentParamName && line.trim() && !line.includes("name:") && !line.includes("type:") && !line.includes("},")) {
        currentSchemaLines.push(line.trim());
      }
    }
  }
}

function addParameter(
  schemasMap: Map<string, Array<{ name: string; schema: string }>>,
  endpointAlias: string,
  paramName: string,
  schemaLines: string[]
) {
  let schema = schemaLines.join("\n").replace(/[,\s]*$/, "").trim();
  schema = schema
    .split("\n")
    .map((line) => (line.trim() ? line : line))
    .join("\n");

  if (!schemasMap.has(endpointAlias)) {
    schemasMap.set(endpointAlias, []);
  }

  schemasMap.get(endpointAlias)!.push({
    name: paramName,
    schema: schema,
  });
}

const schemaExports = Array.from(schemasMap.entries())
  .map(([alias, parameters]) => {
    const pascalName = alias.charAt(0).toUpperCase() + alias.slice(1);

    const fields = parameters
      .map((p) => `  ${p.name}: ${p.schema}`)
      .join(",\n");

    return `export const ${pascalName}ParametersSchema = z.object({
${fields}
});

export type ${pascalName}Parameters = z.infer<typeof ${pascalName}ParametersSchema>;`;
  })
  .join("\n\n");

const outputContent = `import { z } from "zod";

${schemaExports}
`;

fs.writeFileSync(outputFilePath, outputContent);
