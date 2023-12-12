// @ts-check
import { writeFile } from "node:fs/promises";

const DRAFTS_DIR = "./drafts";

const [, , draftPrefix] = process.argv;

const draftPath = `${DRAFTS_DIR}/${draftPrefix ?? "_"}-${Date.now()}.md`;

await writeFile(
  draftPath,
  `
---
title: ...
---

...
`.trim(),
);

console.log("📝", "New draft generated!");
console.log(draftPath);
