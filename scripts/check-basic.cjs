const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const app = read("app.js");
const serviceWorker = read("sw.js");
const manifest = JSON.parse(read("manifest.webmanifest"));

new Function(app);
new Function(serviceWorker);

assert.match(html, /href="\.\/styles\.css"/);
assert.match(html, /src="\.\/app\.js"/);
assert.doesNotMatch(html, /<style(?:\s|>)/i);
assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/i);

["main", "backBtn", "saveState", "importFileInput", "modalRoot", "toastRoot"].forEach(id => {
  assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
});

const shellBlock = serviceWorker.match(/const APP_SHELL = \[([\s\S]*?)\];/);
assert(shellBlock, "APP_SHELL not found");
const shellFiles = [...shellBlock[1].matchAll(/"\.\/([^"/]*)"/g)].map(match => match[1]).filter(Boolean);
shellFiles.forEach(file => assert(fs.existsSync(path.join(root, file)), `missing app shell file: ${file}`));
manifest.icons.forEach(({ src }) => {
  const file = src.replace(/^\.\//, "");
  assert(fs.existsSync(path.join(root, file)), `missing manifest icon: ${file}`);
});

console.log("basic project check: ok");
