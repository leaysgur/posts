// @ts-check
import { mkdir, writeFile, copyFile, unlink } from "node:fs/promises";

const DRAFTS_DIR = "./drafts";
const CONTENT_DIR = "./content/posts-v2";

// MAIN
(() => {
  const [, , cmd, args1] = process.argv;

  switch (cmd) {
    case "new":
      return newCommand(args1);
    case "pub":
      return publishCommand(args1);
    default:
      console.error("🚨", `Invalid command: ${cmd}, available: new, pub`);
      process.exit(1);
  }
})();

// ---

/** @param {string} [draftName] */
async function newCommand(draftName) {
  const draftPath = `${DRAFTS_DIR}/${draftName ?? "draft"}-${Date.now()}.md`;

  await writeFile(
    draftPath,
    `
---
title: ...
---

...
`.trim(),
  );
  console.log("🧊", `New draft: ${draftPath}`);
}

/** @param {string} [draftPath] */
async function publishCommand(draftPath) {
  if (!draftPath) {
    console.error("🚨", `Draft not found: ${draftPath}`);
    return process.exit(1);
  }

  const [yyyymm, dd, hhmmss] = postDate();

  await mkdir(`${CONTENT_DIR}/${yyyymm}/${dd}`, { recursive: true });
  const postPath = `${CONTENT_DIR}/${yyyymm}/${dd}/${hhmmss}.md`;

  await copyFile(draftPath, postPath);
  await unlink(draftPath);
  console.log("🧊", `New post: ${postPath}`);

  function postDate() {
    const now = new Date()
      .toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Tokyo",
      })
      .replaceAll(/[/: ]/g, "");

    const yyyymm = now.slice(0, 6);
    const dd = now.slice(6, 8);
    const hhmmss = now.slice(8, 14);

    return [yyyymm, dd, hhmmss];
  }
}
