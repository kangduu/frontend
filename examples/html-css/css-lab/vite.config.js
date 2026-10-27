import { readdirSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const casesRoot = resolve(projectRoot, "cases");

function collectCaseEntries(directory) {
  const entries = {};

  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const itemPath = resolve(directory, item.name);

    if (item.isDirectory()) {
      Object.assign(entries, collectCaseEntries(itemPath));
      continue;
    }

    if (item.name !== "index.html") {
      continue;
    }

    const entryName = relative(casesRoot, dirname(itemPath))
      .split(sep)
      .join("-");

    entries[`case-${entryName}`] = itemPath;
  }

  return entries;
}

export default defineConfig({
  base: "/css/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "index.html"),
        ...collectCaseEntries(casesRoot),
      },
    },
  },
});
