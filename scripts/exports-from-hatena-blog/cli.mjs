// @ts-check
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { HTMLRewriter } from "html-rewriter-wasm";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** @param {string} str */
const decodeHTMLEntities = (str) => {
  const htmlEntities = {
    nbsp: " ",
    cent: "¢",
    pound: "£",
    yen: "¥",
    euro: "€",
    copy: "©",
    reg: "®",
    lt: "<",
    gt: ">",
    quot: '"',
    amp: "&",
    apos: "'",
  };

  return str.replace(/\&([^;]+);/g, (entity, entityCode) => {
    if (entityCode in htmlEntities) return htmlEntities[entityCode];

    let match;
    if ((match = entityCode.match(/^#x([\da-fA-F]+)$/)))
      return String.fromCharCode(parseInt(match[1], 16));
    if ((match = entityCode.match(/^#(\d+)$/)))
      return String.fromCharCode(~~match[1]);

    return entity;
  });
};

//
// Clean up first
//
const distPath = resolve("../../content/posts-v1");
await rm(distPath, { recursive: true, force: true });

//
// Load exported text
//
const txt = await readFile("./lealog.hateblo.jp.export.txt", "utf8");

//
// Split into entries
//
const entries = txt.split("\n--------\n");
// Remove last empty block
entries.pop();
console.log(`${entries.length} entries are found`);

for (const entry of entries) {
  //
  // Parse each entry
  //
  const parts = (entry + "\n").split("\n-----\n");

  let basename = "";
  let title = "";
  let html = "";

  for (const part of parts) {
    const [kind, content] = part.split(":\n");

    switch (kind) {
      case "COMMENT":
        continue;
      case "BODY": {
        html = content + html;
        break;
      }
      case "EXTENDED BODY": {
        html = html + content;
        break;
      }
      default: {
        if (kind === "") continue;

        for (const attr of kind.split("\n")) {
          const splitIdx = attr.indexOf(": ");
          const [key, value] = [
            attr.slice(0, splitIdx),
            attr.slice(splitIdx + 2),
          ];

          if (key === "TITLE") title = decodeHTMLEntities(value);
          if (key === "BASENAME") basename = value;
        }
      }
    }
  }

  //
  // Remove hatena blog specific markups
  //
  let output = "";

  const rewriter = new HTMLRewriter((outputChunk) => {
    output += decoder.decode(outputChunk);
  });

  rewriter.on("a", {
    element(element) {
      const href = element.getAttribute("href");
      if (
        href?.startsWith("http://d.hatena.ne.jp/keyword/") ||
        href?.startsWith("https://d.hatena.ne.jp/keyword/")
      ) {
        element.removeAndKeepContent();
      }
    },
  });

  try {
    await rewriter.write(encoder.encode(html));
    await rewriter.end();
  } finally {
    rewriter.free();
  }

  //
  // Save parsed entry
  //
  const [yyyy, mm, dd, hhmmss] = basename.split("/");
  const distPath = resolve("../../content/posts-v1", yyyy + mm, dd);
  await mkdir(distPath, { recursive: true });
  // Use `.json(type=data)` instead of `.md(type=content)`.
  // We have already rendered HTML, but if use `.md` here,
  // it will be doubly rendered and it's slow!
  await writeFile(
    `${distPath}/${hhmmss}.json`,
    JSON.stringify({ title, html: output }, null, 2) + "\n",
  );
  console.log("✨", basename, title);
}

// This is already converted manually
await rm(resolve("../../content/posts-v1/202308"), {
  recursive: true,
  force: true,
});
