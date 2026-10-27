---
source: "css/README.md"
---

# CSS Lab

一个用于学习 CSS、复现真实问题并整理解决思路的静态案例库。

在线地址：<https://kangduu.github.io/css/>

## 内容特点

- 每个主题都是可独立访问的原生 HTML/CSS 页面。
- 通过错误与正确实现的对照解释浏览器行为。
- JavaScript 只用于切换演示状态、重置案例等辅助操作。
- 首版不依赖 CSS 库，后续可按案例独立引入，避免影响其他页面。

## 本地开发

项目需要 Node.js 22.12 或更高版本。

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建静态文件到 dist
npm run preview  # 本地预览构建结果
```

由于 GitHub Pages 使用仓库子路径，预览构建结果时请访问：

```text
http://localhost:4173/css/
```

## 目录结构

```text
.
├─ cases/
│  └─ <category>/<slug>/
│     ├─ index.html
│     ├─ style.css
│     └─ demo.js          # 仅在需要演示控制时添加
├─ src/styles/
│  ├─ global.css
│  └─ home.css
├─ index.html
└─ vite.config.js
```

Vite 会自动发现 `cases/**/index.html` 并加入多页面构建，不需要手动维护入口列表。

## 新增案例

1. 在 `cases/<category>/<slug>/` 下创建独立页面。
2. 页面至少包含：现象说明、对照演示、原理、关键代码和检查结论。
3. 核心效果由 HTML/CSS 实现；脚本只负责演示控制，并保证关闭脚本后内容仍可阅读。
4. 在首页案例目录中增加卡片和正确的相对链接。
5. 执行 `npm run build`，检查首页与案例深层链接。

当前案例：

- [Flex 布局中 `min-width: 0` 的作用](./cases/layout/flex-min-width-0/)

## GitHub Pages 部署

`.github/workflows/deploy.yml` 会在推送到 `main` 后：

1. 安装依赖并执行 Vite 构建；
2. 上传 `dist` 静态产物；
3. 部署到 GitHub Pages。

首次部署前，需要在仓库的 **Settings → Pages → Build and deployment** 中将 **Source** 设置为 **GitHub Actions**。之后也可以在 Actions 页面手动触发部署。

## License

[MIT](./LICENSE)
