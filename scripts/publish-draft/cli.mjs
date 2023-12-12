// @ts-check
import { mkdir, copyFile, unlink } from "node:fs/promises";

const CONTENT_DIR = "./src/content/posts-v2";

const [, , draftPath] = process.argv;

if (!draftPath) {
  console.log("🚨", "Draft path is required!");
  process.exit(1);
}

const now = new Date();
const yyyymmdd = now
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split("/");
const yyyymm = yyyymmdd.slice(0, 2).join("");
const dd = yyyymmdd.slice(2, 3).join("");
const hhmmss = now
  .toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  .replaceAll(":", "");

const postPath = `${CONTENT_DIR}/${yyyymm}/${dd}/${hhmmss}.md`;

await mkdir(`${CONTENT_DIR}/${yyyymm}/${dd}`, { recursive: true });
await copyFile(draftPath, postPath);
await unlink(draftPath);

console.log("🧊", "New post generated!");
console.log(postPath);
