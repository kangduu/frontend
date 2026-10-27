const path = require("path");

module.exports = {
  mode: "development", // 开发模式
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    user: "./src/user.js",
  },
  output: {
    filename: "js/[name].bundle.js", // 输出文件命名：index.bundle.js, about.bundle.js 等
    path: path.resolve(__dirname, "public"), // 输出目录为 public
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // 处理 CSS 文件
        use: ["style-loader", "css-loader"], // 先 css-loader，再 style-loader 注入到页面
      },
    ],
  },
};
