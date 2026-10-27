---
source: "camp/src/webpack/development.md"
title: Development
---

## Source Map

❓ 为什么需要 source map

> 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js，b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含错误，那么堆栈跟踪就会直接指向到 bundle.js，却无法准确知道错误来自于哪个源文件，所以这种提示通常无法提供太多帮助。

```js
module.exports = {
  devtool: "inline-source-map", // more config https://webpack.docschina.org/configuration/devtool/
};
```

## 开发工具

### 观察模式 --watch

虽然可以监听文件的变化，但是不能自动刷新浏览器

### [webpack-dev-server](https://webpack.docschina.org/guides/development/#using-webpack-dev-server)

本地服务，将 bundle 写进内存，会刷新整页面[模块热替换](https://webpack.docschina.org/guides/hot-module-replacement/)。

### [webpack-dev-middleware](https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware)

webpack-dev-middleware 是一个包装器，它可以把 webpack 处理过的文件发送到 server。

🤔：这是否就可以实现服务端渲染？
