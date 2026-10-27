---
source: "ts-practice/README.md"
---

# ts-practice · TypeScript 自学路线图

由浅入深的自学顺序、权威资料、框架集成要点与实战练习清单。

---

## 学习顺序

### 阶段 1：JavaScript 基础（已有经验可快进）

TypeScript 是 JS 的超集，需稳固：**变量与类型、`async/await`、模块、`this`、解构、可选链**等。

- [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

### 阶段 2：TypeScript 语言本身（核心）

1. **官方 Handbook（首选）**  
   [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

   建议阅读顺序：**Basic Types → Everyday Types → Narrowing → Functions → Object Types → More on Functions → Classes → Modules**。

2. **中文手册（对照用）**  
   [TypeScript 中文网](https://www.typescriptlang.cn/)

3. **动手环境**

   - 浏览器：[TypeScript Playground](https://www.typescriptlang.org/play)
   - 本地：配置 `tsconfig.json`，使用 `tsc`、`tsx` 或编辑器内置编译；本项目可作为练习仓库。

### 阶段 3：类型进阶

Utility Types、`infer`、条件类型、`keyof` / 映射类型等。

- Handbook：**Type Manipulation** 章节
- 进阶实战技巧：[Total TypeScript](https://www.totaltypescript.com/)

### 阶段 4：工程配套

- **`tsconfig`**：`strict`、`moduleResolution`、`paths`、是否生成 `.d.ts`
- **ESLint**：`@typescript-eslint`，与 Prettier 分工清晰即可

---

## 第三方学习资源（精选）

| 类型           | 链接 |
|----------------|------|
| 官方文档       | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| 交互练习       | [TypeScript Playground](https://www.typescriptlang.org/play) |
| 类型体操（可选） | [type-challenges](https://github.com/type-challenges/type-challenges) — 建议在阶段 3 之后再刷 |
| React 官方 TS  | [react.dev/learn/typescript](https://react.dev/learn/typescript) |
| 视频课程       | Frontend Masters、Udemy 等搜「TypeScript」，选近年更新且含 **strict** 与实战项目的 |

建议：**Handbook + Playground + 一个小项目**，胜过囤积多个未完成教程。

---

## 在不同框架中的使用要点

### React + TypeScript

1. 脚手架推荐 **Vite**：`npm create vite@latest`，选择 React + TypeScript。
2. **组件**：函数组件 + props 接口；社区常见做法是直接标注 props 类型，而非强制使用 `React.FC`。
3. **Hooks**：`useState` 推断、`useReducer`、`useRef`（DOM 引用与普通可变引用区分）。
4. **事件**：如 `React.ChangeEvent<HTMLInputElement>`，依赖 `@types/react`。
5. **进阶**：Context 类型、`children`、第三方库的 `@types/*`。

文档：[Using TypeScript – React](https://react.dev/learn/typescript)。

### Vue 3

- [TypeScript with Composition API](https://vuejs.org/guide/typescript/overview.html)

### Node / 后端

- 注意 Node 下的 **`module` 与目标**配置；全栈可考虑 **NestJS**（TS 优先）。
- 与 Express/Fastify 结合时，可对请求体、响应体使用类型，并可选 **[zod](https://zod.dev/)** 做运行时校验。

### Next.js

- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)：App Router、`page.tsx`、`layout.tsx` 等。

---

## 实战练习清单

| 周期       | 内容 |
|------------|------|
| 第 1–2 周  | 在 Playground 跟随 Handbook 动手改代码；开启 **`strict: true`** |
| 第 3–4 周  | Vite + React + TS：**待办清单**或小型数据展示应用；练习 props、列表、`useState` 联合类型 |
| 第 5 周起  | 持续项目：博客前端、仪表盘等；拆分 `types/` 或 `*.types.ts`；API 用 interface + 可选字段或 **zod** |
| 长期坚持   | 阶段 3 之后：每周少量 [type-challenges](https://github.com/type-challenges/type-challenges) 题目 |
| 阅读能力   | 阅读中小型开源 TS 项目（UI 库、Vite 插件等）中的类型声明与导出方式 |

---

## 自测标准

- 在 **`strict`** 下完成中等复杂度组件与工具函数，尽量少用或不滥用 `any`。
- 能读懂第三方库的 **`.d.ts`**，并通过收窄类型解决报错，而非盲目关闭检查。
- 能为 API / WebSocket 消息定义类型，并在需要时用运行时校验补强。

---

## 备忘：与本仓库的关系

可将本书仓库作为 **命令行脚本、练习片段或小 demo** 的落地目录；新建前端练习项目时优先考虑 **Vite + React + TS**，与上文路线一致。
