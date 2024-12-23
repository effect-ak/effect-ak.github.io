import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises"
import * as Path from "path"

const files = [
  "styles.css",
  "scripts/_main.js",
  "scripts/worker/web-worker.js",
];

const indexPagePath = "./docs/telegram-bot-playground/index.html";
const metaPath = "./docs/telegram-bot-playground/metadata.json";

let html = await readFile(indexPagePath, "utf-8");

const metadata = {}

for (const relativePath of files) {

  const absolutePath = Path.join("./docs/telegram-bot-playground", relativePath);

  if (!existsSync(absolutePath)) {
    console.warn(`File '${absolutePath}' does not exist`)
    continue;
  }

  const content = await readFile(absolutePath, "utf-8");
  const hash = getShortHash(content);

  const filename = Path.basename(relativePath);
  
  const regex = new RegExp(`(${filename.replace(".", "\\.")}\\?v=)\\w*`, "g");
  html = html.replace(regex, `$1${hash}`);

  metadata[filename] = hash;

}

await writeFile(indexPagePath, html, "utf-8");
await writeFile(metaPath, JSON.stringify(metadata, undefined, 2), "utf-8");

function getShortHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
  }
  return Math.abs(hash).toString(36);
}
