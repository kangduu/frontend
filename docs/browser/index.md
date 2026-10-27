# 浏览器

请求、渲染、存储和安全。性能系列原文仍集中在附录，避免拆开其中的相对链接；和浏览器直接相关的篇从这里进入。

## 输入与输出

请求的输入是方法和地址，输出是状态码和正文。渲染的输入是文档树和样式规则，输出是布局和像素。

## 笔记

- [概览](./README)
- [AJAX](./ajax)
- [HTTP](./http/HTTP)
- [状态码](./http/HTTP状态码)
- [同源策略](./same-origin-policy)
- [跨域响应头](./access-control-allow-origin)
- [URL](./web-apis/URL)
- [文件上传](./file-upload)
- [回流与重绘](/appendix/performance/回流（Reflow）与重绘（Repaint）)
- [缓存](/appendix/performance/览器缓存机制介绍与缓存策略剖析)
- [Cookie 与 WebStorage](/appendix/performance/从Cookie到WebStorage、IndexDB)
- [浏览器如何工作](/appendix/performance/解锁浏览器背后的运行机制)

## 案例与测试

上传的客户端和 Node 服务在 `examples/nodejs/file-upload`，启动命令是该目录的 `npm run start`。

## 实战

`examples/nodejs/ssr` 和 `examples/nodejs/multi-view` 是浏览器拿到服务端 HTML 的例子。
