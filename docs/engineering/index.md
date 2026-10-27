# 构建与工程化

Vite 用来把项目跑起来。Webpack 把同一次构建里的入口、loader 和产物摊开。

## 输入与输出

输入是源码目录和配置。输出是浏览器能加载的静态文件。开发服务器是这套输出的另一种查看方式。

## 笔记

- [Webpack 概览](./webpack/README)
- [资源管理](./webpack/asset.management)
- [输出](./webpack/output.management)
- [代码分割](./webpack/code.splitting)
- [缓存](./webpack/caching)
- [热更新](./webpack/hmr)
- [Tree shaking](./webpack/tree.shaking)
- [Vite](./vite)
- [ESLint](./eslint)
- [Webpack 性能与 Gzip](/appendix/performance/webpack性能调优与Gzip原理)

## 案例与测试

| 笔记 | 案例 |
| --- | --- |
| 资源、输出、开发、分割、缓存、热更新、tree shaking | `examples/engineering/webpack-*` |
| Vite | `examples/engineering/vite` |
| ESLint | `examples/engineering/eslint` |
| 测试 | `examples/engineering/jest`，在该目录执行测试脚本 |

## 实战

`practice/legacy` 里的前台和管理端都经过构建工具。先跑通 `examples/engineering/vite`，再对照 Webpack 案例看配置。
