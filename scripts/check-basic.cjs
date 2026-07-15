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

assert.match(app, /\(cat\.items\.length\*5\)/, "미입력 항목을 제외한 평균으로 영역 만점을 부여하면 안 됩니다");
assert.match(app, /label:"사전확인"/, "공시자료 확인 유형 표기가 필요합니다");
assert.match(app, /다툼·상처·사고를 기준에 따라 신속히 공유한다/, "사고 통보 평가 항목이 필요합니다");
assert.match(app, /방학 중 돌봄·급식 운영이 우리 생활과 맞다/, "방학 돌봄 평가 항목이 필요합니다");
assert.match(app, /피곤하거나 힘든 아이가 조용히 쉴 수 있다/, "유치원 현실에 맞는 휴식 지원 항목이 필요합니다");
assert.match(app, /value === "N"/, "관찰하지 못한 항목의 저장값 검증이 필요합니다");
assert.match(app, /unobserved\*3/, "관찰하지 못한 항목은 중립값으로 점수에 반영해야 합니다");

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
