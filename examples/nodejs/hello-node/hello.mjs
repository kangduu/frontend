console.log("Hello Node.mjs");

// 在 ESM 模块中可用，值为 当前文件的绝对路径
console.log(import.meta.url);

// 值为 undefined，仅在 CommonJS 模块中有效
console.log(typeof require);
