import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { emitKeypressEvents } from "node:readline";

type Value = string | string[];
interface Theme {
  background: Record<string, Value | Record<string, Value>>;
  text: Record<string, Value | Record<string, Value>>;
  border: Record<string, Value | Record<string, Value>>;
  gradients: Record<string, Value | Record<string, Value>>;
}

interface ThemeFileEntry<T extends object> {
  themeName: string;
  fileName: string;
  filePath: string;
  content: T;
}

type FlatThemeValues = Record<string, string>;

interface ThemeConfig {
  primary?: string;
}

const PROGRESS_BAR_WIDTH = 28;

function getTimestamp(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function logWithTimestamp(message: string): void {
  console.log(`[${getTimestamp()}] ${message}`);
}

function logErrorWithTimestamp(message: string): void {
  console.error(`[${getTimestamp()}] ${message}`);
}

function logWarningWithTimestamp(message: string): void {
  console.warn(`[${getTimestamp()}] WARNING: ${message}`);
}

class ProgressTracker {
  private readonly totalSteps: number;
  private currentStep = 0;
  private readonly isTty = Boolean(process.stdout.isTTY);
  private readonly isEnabled = process.env.THEME_INTERNAL_PROGRESS === "1";
  private lastLoggedPercent = -1;

  constructor(totalSteps: number) {
    this.totalSteps = Math.max(1, totalSteps);
    this.render("Starting generation...");
  }

  private render(message: string): void {
    if (!this.isEnabled) {
      return;
    }

    const percent = Math.round((this.currentStep / this.totalSteps) * 100);
    const filledWidth = Math.round((percent / 100) * PROGRESS_BAR_WIDTH);
    const bar = `${"#".repeat(filledWidth)}${"-".repeat(
      PROGRESS_BAR_WIDTH - filledWidth,
    )}`;
    const line = `[${getTimestamp()}] [${bar}] ${String(percent).padStart(3, " ")}% ${message}`;

    if (this.isTty) {
      process.stdout.write(`\r${line.padEnd(160, " ")}`);
      return;
    }

    const shouldLogInNonTty =
      percent === 0 ||
      percent === 100 ||
      percent >= this.lastLoggedPercent + 5 ||
      message.startsWith("Generating") ||
      message.startsWith("Writing");

    if (!shouldLogInNonTty) {
      return;
    }

    this.lastLoggedPercent = percent;
    console.log(line);
  }

  step(message: string): void {
    this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
    this.render(message);
  }

  finish(message: string): void {
    this.currentStep = this.totalSteps;
    this.render(message);

    if (this.isTty) {
      process.stdout.write("\n");
    }
  }
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeTokenValue(value: Value): string {
  return Array.isArray(value) ? value.join(", ") : value;
}

function flattenThemeValues(theme: Theme): FlatThemeValues {
  const result: FlatThemeValues = {};

  function traverse(node: unknown, path: string[]) {
    if (typeof node === "string" || Array.isArray(node)) {
      result[path.join(".")] = normalizeTokenValue(node as Value);
      return;
    }

    if (!isObjectRecord(node)) {
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      traverse(value, [...path, key]);
    }
  }

  for (const [sectionKey, sectionValue] of Object.entries(theme)) {
    traverse(sectionValue, [sectionKey]);
  }

  return result;
}

function tokenPathToCssVariable(tokenPath: string): string {
  return `--color-${tokenPath.replaceAll(".", "-")}`;
}

function buildNestedColorTokenMap(
  tokenPaths: string[],
  onTokenMapped?: (tokenPath: string) => void,
): Record<string, unknown> {
  const root: Record<string, unknown> = {};

  for (const tokenPath of tokenPaths) {
    const parts = tokenPath.split(".");
    const lastPart = parts[parts.length - 1];
    let cursor = root;

    for (let index = 0; index < parts.length - 1; index += 1) {
      const part = parts[index];

      if (!isObjectRecord(cursor[part])) {
        cursor[part] = {};
      }

      cursor = cursor[part] as Record<string, unknown>;
    }

    cursor[lastPart] = `var(${tokenPathToCssVariable(tokenPath)})`;
    onTokenMapped?.(tokenPath);
  }

  return root;
}

function generateScssContent(
  themes: Record<string, Theme>,
  onTokenProcessed?: (themeName: string, tokenPath: string) => void,
): string {
  const lines: string[] = [
    "/* This file is auto-generated. Do not edit manually. */",
    "",
  ];

  const themeEntries = Object.entries(themes).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  for (const [themeName, theme] of themeEntries) {
    const flatThemeValues = flattenThemeValues(theme);
    const tokens = Object.entries(flatThemeValues).sort(([a], [b]) =>
      a.localeCompare(b),
    );

    lines.push(`[data-theme=\"${themeName}\"] {`);

    for (const [tokenPath, tokenValue] of tokens) {
      lines.push(`  ${tokenPathToCssVariable(tokenPath)}: ${tokenValue};`);
      onTokenProcessed?.(themeName, tokenPath);
    }

    lines.push("}", "");
  }

  return lines.join("\n").trimEnd() + "\n";
}

function generateTsContent(
  themes: Record<string, Theme>,
  onTokenMapped?: (tokenPath: string) => void,
): string {
  const [firstTheme] = Object.values(themes);
  const tokenPaths = Object.keys(flattenThemeValues(firstTheme)).sort((a, b) =>
    a.localeCompare(b),
  );
  const nestedColorTokenMap = buildNestedColorTokenMap(
    tokenPaths,
    onTokenMapped,
  );
  const colorObjectBody = JSON.stringify(nestedColorTokenMap, null, 2);

  return `/* This file is auto-generated. Do not edit manually. */\n\nexport const colors = ${colorObjectBody} as const;\n`;
}

function generateScssVariablesContent(themes: Record<string, Theme>): string {
  const [firstTheme] = Object.values(themes);
  const tokenPaths = Object.keys(flattenThemeValues(firstTheme)).sort((a, b) =>
    a.localeCompare(b),
  );
  const lines: string[] = [
    "/* This file is auto-generated. Do not edit manually. */",
    "",
  ];

  for (const tokenPath of tokenPaths) {
    lines.push(
      `$${tokenPathToCssVariable(tokenPath).replace("--", "")}: var(${tokenPathToCssVariable(tokenPath)});`,
    );
  }

  return lines.join("\n") + "\n";
}

function generateThemeTypeContent(themeNames: string[]): string {
  const union = themeNames.map((themeName) => `"${themeName}"`).join(" | ");

  return `/* This file is auto-generated. Do not edit manually. */\n\nexport type CurrentTheme = ${union};\n`;
}

function generateThemeConstContent(
  themeNames: string[],
  primaryTheme: string,
): string {
  const lines = [
    "/* This file is auto-generated. Do not edit manually. */",
    "",
    'import type { CurrentTheme } from "./themes.generated.types";',
    "",
    "export const themeDefinitions = [",
  ];

  for (const themeName of themeNames) {
    lines.push(
      `  { theme: "${themeName}" as CurrentTheme, isDefault: ${String(themeName === primaryTheme)} },`,
    );
  }

  lines.push(
    "] as const;",
    "",
    `export const primaryTheme: CurrentTheme = "${primaryTheme}";`,
    "",
  );

  return lines.join("\n");
}

async function promptThemeSelection(themeNames: string[]): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error(
      "Theme config is missing or invalid and interactive selection requires a TTY terminal.",
    );
  }

  let selectedIndex = 0;
  let renderedLines = 0;
  const resetColor = "\x1b[0m";
  const questionColor = "\x1b[38;5;213m";
  const selectedColor = "\x1b[38;5;44m";
  const optionColor = "\x1b[0;34m";

  const render = () => {
    const lines = [
      `${questionColor}[${getTimestamp()}] Select primary theme (arrow keys + Enter):${resetColor}`,
      ...themeNames.map((themeName, index) =>
        index === selectedIndex
          ? `${selectedColor}> ${themeName}${resetColor}`
          : `${optionColor}  ${themeName}${resetColor}`,
      ),
    ];

    if (renderedLines > 0) {
      process.stdout.write(`\x1b[${renderedLines}F`);
    }

    for (const line of lines) {
      process.stdout.write(`\x1b[2K${line}\n`);
    }

    renderedLines = lines.length;
  };

  return new Promise<string>((resolve, reject) => {
    const onKeyPress = (
      _str: string,
      key: { name?: string; ctrl?: boolean },
    ) => {
      if (key.ctrl && key.name === "c") {
        cleanup();
        reject(new Error("Theme selection cancelled by user."));
        return;
      }

      if (key.name === "up") {
        selectedIndex =
          (selectedIndex - 1 + themeNames.length) % themeNames.length;
        render();
        return;
      }

      if (key.name === "down") {
        selectedIndex = (selectedIndex + 1) % themeNames.length;
        render();
        return;
      }

      if (key.name === "return") {
        const selectedTheme = themeNames[selectedIndex];
        cleanup();
        resolve(selectedTheme);
      }
    };

    const cleanup = () => {
      process.stdin.off("keypress", onKeyPress);

      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }

      process.stdin.pause();
      process.stdout.write("\x1b[0m\x1b[2K");
    };

    emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.resume();
    process.stdin.on("keypress", onKeyPress);
    render();
  });
}

async function resolvePrimaryTheme(
  themeNames: string[],
  configPath: string,
): Promise<string> {
  try {
    const configRaw = await readFile(configPath, "utf8");
    const configJson = JSON.parse(configRaw) as ThemeConfig;

    if (
      typeof configJson.primary === "string" &&
      themeNames.includes(configJson.primary)
    ) {
      logWithTimestamp(
        `Using primary theme from config: ${configJson.primary}.`,
      );
      return configJson.primary;
    }

    logWarningWithTimestamp(
      `Invalid primary theme in config (${configJson.primary ?? "undefined"}). Falling back to interactive selection.`,
    );
  } catch {
    logWarningWithTimestamp(
      "Theme config file not found or unreadable. Falling back to interactive selection.",
    );
  }

  const selectedTheme = await promptThemeSelection(themeNames);
  const configContent = JSON.stringify({ primary: selectedTheme }, null, 2);
  const configDirectory = join(configPath, "..");
  await mkdir(configDirectory, { recursive: true });
  await writeFile(configPath, `${configContent}\n`, "utf8");
  logWithTimestamp(`Saved selected primary theme to config: ${selectedTheme}.`);

  return selectedTheme;
}

async function getJsonThemeFileEntries<T extends object>(
  directory: string,
): Promise<ThemeFileEntry<T>[]> {
  const files = await readdir(directory, {
    withFileTypes: true,
  });

  const jsonFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".json"))
    .sort((a, b) => a.name.localeCompare(b.name));

  const entries = await Promise.all(
    jsonFiles.map(async (file) => {
      const filePath = join(directory, file.name);
      const content = await readFile(filePath, "utf8");

      return {
        themeName: file.name.replace(".json", ""),
        fileName: file.name,
        filePath,
        content: JSON.parse(content) as T,
      };
    }),
  );

  return entries;
}

function sortObjectByReferenceOrder<T>(source: T, reference: T): T {
  if (typeof source === "string" || Array.isArray(source)) {
    return source;
  }

  if (!isObjectRecord(source) || !isObjectRecord(reference)) {
    return source;
  }

  const ordered: Record<string, unknown> = {};

  for (const key of Object.keys(reference)) {
    if (!(key in source)) {
      continue;
    }

    ordered[key] = sortObjectByReferenceOrder(
      source[key] as unknown,
      reference[key] as unknown,
    );
  }

  for (const key of Object.keys(source)) {
    if (key in ordered) {
      continue;
    }

    ordered[key] = source[key];
  }

  return ordered as T;
}

async function sortThemesByBaseThemeOrder(
  themeEntries: ThemeFileEntry<Theme>[],
): Promise<Record<string, Theme>> {
  if (themeEntries.length === 0) {
    return {};
  }

  const [baseThemeEntry, ...otherThemeEntries] = themeEntries;
  const sortedThemes: Record<string, Theme> = {
    [baseThemeEntry.themeName]: baseThemeEntry.content,
  };

  logWithTimestamp(
    `Sorting theme JSON key order by base theme \"${baseThemeEntry.themeName}\"...`,
  );

  for (const themeEntry of otherThemeEntries) {
    const sortedTheme = sortObjectByReferenceOrder(
      themeEntry.content,
      baseThemeEntry.content,
    );

    const originalString = JSON.stringify(themeEntry.content);
    const sortedString = JSON.stringify(sortedTheme);

    if (originalString !== sortedString) {
      await writeFile(
        themeEntry.filePath,
        `${JSON.stringify(sortedTheme, null, 2)}\n`,
        "utf8",
      );
      logWithTimestamp(`Sorted and saved ${themeEntry.fileName}.`);
    } else {
      logWithTimestamp(`No sorting changes in ${themeEntry.fileName}.`);
    }

    sortedThemes[themeEntry.themeName] = sortedTheme;
  }

  if (otherThemeEntries.length === 0) {
    logWithTimestamp("Only one theme found, sorting step skipped.");
  } else {
    logWithTimestamp("Theme JSON sorting completed.");
  }

  return sortedThemes;
}

function validateThemeKeysInAllThemes(themes: Record<string, Theme>): boolean {
  const themeEntries = Object.entries(themes);

  if (themeEntries.length <= 1) {
    return true;
  }

  const getThemeKeySet = (theme: Theme) =>
    new Set<string>(Object.keys(flattenThemeValues(theme)));

  const [baseThemeName, baseTheme] = themeEntries[0];
  const baseKeys = getThemeKeySet(baseTheme);
  let hasInconsistencies = false;

  for (let index = 1; index < themeEntries.length; index += 1) {
    const [themeName, currentTheme] = themeEntries[index];
    const currentKeys = getThemeKeySet(currentTheme);

    const missingKeys = [...baseKeys].filter((key) => !currentKeys.has(key));
    const extraKeys = [...currentKeys].filter((key) => !baseKeys.has(key));

    if (missingKeys.length === 0 && extraKeys.length === 0) {
      continue;
    }

    hasInconsistencies = true;
    logErrorWithTimestamp(
      `Theme "${themeName}" differs from base theme "${baseThemeName}".`,
    );

    if (missingKeys.length > 0) {
      logErrorWithTimestamp(`Missing keys: ${missingKeys.join(", ")}`);
    }

    if (extraKeys.length > 0) {
      logErrorWithTimestamp(`Extra keys: ${extraKeys.join(", ")}`);
    }
  }

  if (!hasInconsistencies) {
    logWithTimestamp(`All ${themeEntries.length} themes have consistent keys.`);
  }

  return !hasInconsistencies;
}

async function generate(
  themes: Record<string, Theme>,
  outputDirectory: string,
  primaryTheme: string,
) {
  const themeEntries = Object.entries(themes);

  if (themeEntries.length === 0) {
    throw new Error("No theme files found.");
  }

  const flatThemes = themeEntries.map(([themeName, theme]) => ({
    themeName,
    tokens: Object.entries(flattenThemeValues(theme)),
  }));
  const scssTokenSteps = flatThemes.reduce(
    (sum, theme) => sum + theme.tokens.length,
    0,
  );
  const tsTokenSteps = flatThemes[0].tokens.length;
  const totalSteps = 11 + scssTokenSteps + tsTokenSteps;
  const progress = new ProgressTracker(totalSteps);

  progress.step("Creating output directory");
  await mkdir(outputDirectory, { recursive: true });

  progress.step("Generating SCSS variables");
  const scssContent = generateScssContent(themes, (themeName, tokenPath) => {
    progress.step(`SCSS ${themeName}: ${tokenPath}`);
  });

  progress.step("Generating TypeScript color map");
  const tsContent = generateTsContent(themes, (tokenPath) => {
    progress.step(`TS token: ${tokenPath}`);
  });

  progress.step("Generating SCSS token aliases");
  const scssVariablesContent = generateScssVariablesContent(themes);

  progress.step("Generating theme type definitions");
  const themeNames = themeEntries.map(([themeName]) => themeName);
  const themeTypeContent = generateThemeTypeContent(themeNames);

  progress.step("Generating theme constants");
  const themeConstContent = generateThemeConstContent(themeNames, primaryTheme);

  progress.step("Writing themes.generated.scss");
  await writeFile(
    join(outputDirectory, "themes.generated.scss"),
    scssContent,
    "utf8",
  );

  progress.step("Writing colors.generated.ts");
  await writeFile(
    join(outputDirectory, "colors.generated.ts"),
    tsContent,
    "utf8",
  );

  progress.step("Writing colors.generated.variables.scss");
  await writeFile(
    join(outputDirectory, "colors.generated.variables.scss"),
    scssVariablesContent,
    "utf8",
  );

  progress.step("Writing themes.generated.types.ts");
  await writeFile(
    join(outputDirectory, "themes.generated.types.ts"),
    themeTypeContent,
    "utf8",
  );

  progress.step("Writing themes.generated.const.ts");
  await writeFile(
    join(outputDirectory, "themes.generated.const.ts"),
    themeConstContent,
    "utf8",
  );

  progress.finish(`Generated files in ${outputDirectory}.`);
}

async function main() {
  const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
  const themesDirectory = join(scriptDirectory, "..");
  const generatedDirectory = join(themesDirectory, "generated");
  const configPath = join(themesDirectory, "config", "config.json");
  logWithTimestamp("Loading theme JSON files...");
  const themeEntries = await getJsonThemeFileEntries<Theme>(themesDirectory);
  const themes = Object.fromEntries(
    themeEntries.map((themeEntry) => [
      themeEntry.themeName,
      themeEntry.content,
    ]),
  ) as Record<string, Theme>;
  logWithTimestamp(`Loaded ${Object.keys(themes).length} themes.`);
  logWithTimestamp("Validating theme key consistency...");
  const areThemesConsistent = validateThemeKeysInAllThemes(themes);

  if (!areThemesConsistent) {
    throw new Error("Theme key validation failed.");
  }

  const sortedThemes = await sortThemesByBaseThemeOrder(themeEntries);

  logWithTimestamp("Resolving primary theme...");
  const themeNames = Object.keys(sortedThemes);
  const primaryTheme = await resolvePrimaryTheme(themeNames, configPath);

  logWithTimestamp("Generating output files...");
  await generate(sortedThemes, generatedDirectory, primaryTheme);
  logWithTimestamp("Theme generation completed.");
}

void main();
