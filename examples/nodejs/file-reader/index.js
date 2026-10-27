const fs = require("node:fs");

const txt = fs.readFileSync("input.txt", "utf-8");

const words = txt.split(/\s+/).filter(Boolean);

fs.writeFileSync("result.txt", `Word count: ${words.length}`);

console.log("统计完成，结果已写入 result.txt");
