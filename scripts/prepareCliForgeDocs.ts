import { prepareCliForgeDocs } from "./cli-forge-docs/prepare";

prepareCliForgeDocs().catch((error: unknown) => {
  console.error("Failed to prepare CLI Forge documentation:", error);
  
  process.exitCode = 1;
});
