---
source: "nodejs/README.md"
---

# 详细学习计划表格

以 **8 周** 为周期，从零开始 → 能做全栈小项目。每一周有**学习目标、内容、案例**，按进度执行。

---

# 🗂 Node.js 学习计划表（零基础 → 实战）

| 周次        | 学习目标                     | 学习内容                                                                                                     | 案例实践                                                                                                                          |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **第 1 周** | 认识 Node.js，能运行 JS 程序 | - Node.js 安装与运行<br>- npm 基础<br>- 模块化（CommonJS/ESM）<br>- 文件系统（fs）读写<br>- 路径模块（path） | ✅ Hello Node（输出 "Hello Node.js"）<br>✅ 统计文本文件的单词数量，结果写入新文件                                                |
| **第 2 周** | 掌握异步编程与事件机制       | - 异步编程：回调、Promise、async/await<br>- 事件循环原理<br>- EventEmitter                                   | ✅ 写一个“倒计时定时器”，结束时触发事件<br>✅ 输入日志记录器：从 stdin 获取输入并保存到 log.txt                                   |
| **第 3 周** | 会写简单 Web 服务            | - HTTP 模块<br>- URL 解析与 querystring<br>- 路由实现<br>- 使用 nodemon 热更新                               | ✅ 写一个简易 WebServer：<br>- `/` 返回首页<br>- `/about` 返回介绍<br>- `/time` 返回服务器时间                                    |
| **第 4 周** | 能开发 REST API              | - HTTP 请求处理（GET/POST/PUT/DELETE）<br>- JSON 数据处理<br>- API 设计思路                                  | ✅ 记事本 API：<br>- `GET /notes` 获取笔记<br>- `POST /notes` 新建<br>- `DELETE /notes/:id` 删除<br>（数据存 JSON 文件）          |
| **第 5 周** | 掌握 Express 框架            | - Express 路由<br>- 中间件机制<br>- 静态资源托管<br>- 错误处理                                               | ✅ TodoList API（增删改查）<br>✅ 日志中间件：记录请求方法、路径、耗时                                                            |
| **第 6 周** | 会接数据库（MongoDB/MySQL）  | - MongoDB + Mongoose（推荐）或 MySQL + Sequelize<br>- MVC 项目结构<br>- dotenv 环境变量                      | ✅ 用户注册/登录 API（含 JWT 鉴权）<br>- `POST /register` 注册<br>- `POST /login` 登录并返回 token<br>- 受保护的 API 需验证 token |
| **第 7 周** | 学习进阶功能                 | - 文件上传（Multer）<br>- WebSocket 实时通信<br>- 单元测试（Jest）                                           | ✅ 聊天室（WebSocket）<br>- 多人实时聊天<br>- 加入/退出提示<br>✅ 图片上传服务：用户上传头像                                      |
| **第 8 周** | 项目实战 + 部署              | - 项目优化（CORS、安全、防注入）<br>- PM2 进程管理<br>- 部署（Vercel/Docker/云服务器）                       | ✅ 留言板系统（Express + MongoDB）<br>- 用户注册/登录<br>- 发布/查看/删除留言<br>- 部署上线并访问                                 |

---

# 📌 学习建议

- **时间分配**：建议每周学习 3-4 天，每次 2 小时。
- **工具**：Postman/Insomnia 测试 API，VSCode 写代码，Git 记录进度。
- **学习方法**：

  - 理论只学 30%，剩下 70% 一定要敲代码。
  - 每周至少完成表格里的案例，不要跳过。
  - 建议把案例传到 GitHub，形成学习档案。

---
