// node hello.js

console.log("Hello Node.js");

// 仅 ESM 可用
console.log(import.meta.url);

// 在 CommonJS 模块中得到的是 "function"
console.log(typeof require);
