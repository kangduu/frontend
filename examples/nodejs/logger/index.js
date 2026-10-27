const fs = require("node:fs");

process.stdin.on("data", (chunk) => {
  const input = chunk.toString().trim();
  fs.appendFileSync("log.txt", input + "\n");
  console.log("已记录：", input);
});
