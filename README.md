# Frontend 技术整合指南（React 主线）

本仓库用于沉淀**前端技术选型、学习路径与可运行范例**的规范与清单。目标：每个技术点在仓储内形成**学习文档 → 自动化测试 → 可落地案例**的闭环，配合 `docs` 与 GitHub 实现统一输出与持续校验。

---

## 使用方式

- 按下方**任务清单**逐项推进；完成后将复选框改为已勾选（`[x]`）。
- 详细叙事、ADR、专题正文放在 **`docs/`**；具体案例代码与测试在后续迭代中落到 `examples/`（本阶段不要求实现代码，仅保留清单约束）。

---

## 一、仓库与文档基建

### 1.1 `docs` 与信息架构

- [ ] 建立 `docs/` 作为**对外与对内的唯一文档源**（导航、专题、标准分离）。
- [ ] 编写 `docs/index.md`：仓库目标、阅读顺序、与 `examples/` 的对应关系。
- [ ] 编写 `docs/roadmap.md`：React 专题依赖顺序（与第三节一致）。
- [ ] 建立 `docs/decisions/`：每项重大选型一页 ADR（背景、备选、结论、后果）。
- [ ] 建立 `docs/standards/`：目录结构、命名、分支与评审约定。
- [ ] 建立 `docs/recipes/`：短文（如列表页范式、错误与 Toast、路由守卫占位）。

### 1.2 GitHub 构建与发布

- [ ] 选定文档站工具（推荐 **VitePress** 或 **Docusaurus**），以 `docs/` 为内容根目录。
- [ ] 配置 **GitHub Actions**：在指定分支推送时执行 `build`。
- [ ] 配置发布目标（如 **GitHub Pages**），并在 `docs/` 或 `README` 中记录站点 URL。
- [ ] （可选）为 PR 配置文档预览流程。
- [ ] 在 `docs/ci.md`（或 `docs/standards/ci.md`）中说明：触发条件、预览、失败时如何排错。

---

## 二、React 默认技术栈（唯一主线）

以下栈作为本仓库**唯一默认主线**；不在主线并行维护其它框架。

| 层级 | 选择 |
|------|------|
| 语言 / 构建 | TypeScript + Vite |
| 路由 | React Router v6 |
| 服务端状态 / 缓存 | TanStack Query（React Query） |
| 全局客户端状态 | Zustand（或与 Query 明确边界后的 Context） |
| 表单与校验 | React Hook Form + Zod |
| 样式 | 在 ADR 中选定一条：**CSS Modules**、**Tailwind** 或 **指定组件库**（三选一写死） |
| 测试 | Vitest + React Testing Library；关键路径 **Playwright** |

### 2.1 选型文档任务

- [ ] 撰写 ADR：为何默认 Vite + React + TS，为何不采用其它构建工具作为默认。
- [ ] 撰写 ADR：TanStack Query 与 Zustand 的职责边界（何时不用全局 store）。
- [ ] 撰写 ADR：样式方案最终选择及不适用场景说明。
- [ ] （可选）若需 SSR/SEO，单独增加 **Next.js** 专题 ADR，与 Vite SPA 默认栈区分章节，不混入主线默认。

---

## 三、每个技术点的「三线」标准

对**每一个** React 专题（第四节中的每一项），须同时满足：

### 3.1 学习（Learning）

- [ ] `docs/react/<专题>.md`：适用场景、不适用场景、与相邻层级的职责划分、常见坑。
- [ ] 链到官方文档的**入口与推荐章节**，避免在仓库内复制冗长手册。
- [ ] 文末附**掌握自检清单**（学完可自问自答的条目）。

### 3.2 测试（Testing）

- [ ] 与案例同仓路径下具备可运行的**自动化测试**（Vitest + RTL；必要时 Playwright）。
- [ ] 文档中写明：本地执行测试的命令；CI 中与对应 job 的对应关系。

### 3.3 可落地案例（Reference）

- [ ] `examples/react-<专题>/`：最小可运行 Vite 应用（实现阶段执行；当前清单仅作约束）。
- [ ] 案例 `README`：安装、`dev`、`build`、环境变量说明。
- [ ] 文档中「**复制到业务项目**」清单：须修改的配置点（API 基址、鉴权占位、路由前缀等）。

---

## 四、React 专题推进顺序（含文档与案例任务）

按依赖顺序完成；每项均须满足第三节「三线」标准。

### 4.1 环境与工程约定

- [ ] 文档：TS 严格策略、路径别名、ESLint / Prettier、推荐目录（如 `src/features/`、`src/shared/`）。
- [ ] 案例 + 测试：`vite-ts-baseline`（实现阶段）。

### 4.2 React 组件与 Hooks 基线

- [ ] 文档：受控/非受控、Hooks 使用边界（数据获取优先放 Query 层）。
- [ ] 案例 + 测试：在 baseline 或独立小包中覆盖典型模式（实现阶段）。

### 4.3 React Router

- [ ] 文档：布局路由、鉴权与重定向占位、与数据加载的配合方式。
- [ ] 案例 + 测试：`router-layout-auth`（实现阶段）。

### 4.4 TanStack Query

- [ ] 文档：`queryKey` 约定、失效策略、`mutation`、错误与重试。
- [ ] 案例 + 测试：`tanstack-query-list-detail`（实现阶段）。

### 4.5 表单（React Hook Form + Zod）

- [ ] 文档：同步/异步校验边界、错误展示约定。
- [ ] 案例 + 测试：`rhf-zod-form`（实现阶段）。

### 4.6 Zustand（全局客户端状态）

- [ ] 文档：与 Query 的边界；何时仅用局部 state / Context。
- [ ] 案例 + 测试：`zustand-cross-route-ui`（实现阶段）。

### 4.7 样式与可访问性

- [ ] 文档：与 ADR 选定方案一致的约定与检查项。
- [ ] 案例：在既有示例中贯彻同一套样式策略（实现阶段）。

### 4.8 测试策略（RTL + Playwright）

- [ ] 文档：何时 RTL、何时 e2e；与 CI 的矩阵策略说明。
- [ ] 案例 + 测试：`rtl-and-playwright-smoke`（实现阶段）。

---

## 五、最小示例矩阵（实现阶段启用）

以下 6 个示例为**建议的最小集合**；每个示例均须具备文档链接、构建通过与测试通过。

- [ ] `examples/vite-ts-baseline`
- [ ] `examples/router-layout-auth`
- [ ] `examples/tanstack-query-list-detail`
- [ ] `examples/rhf-zod-form`
- [ ] `examples/zustand-cross-route-ui`
- [ ] `examples/rtl-and-playwright-smoke`

---

## 六、GitHub CI 预期（实现阶段）

- [ ] Workflow：构建并部署**文档站**。
- [ ] Workflow：对 `examples/*` 执行安装、构建与测试（可用 matrix 多目录）。
- [ ] 文档站页面中链接到各示例目录路径及对应 `docs/react/` 专题。

---

## 七、版本与维护

- [ ] 每个示例在实现后锁定依赖的大版本，并在对应文档页眉标注**适用版本范围**。
- [ ] 升级主版本时：更新文档、示例、CI 与 ADR 增补记录。

---

*当前提交仅更新本 `README.md` 任务清单；未包含脚手架或业务代码。*
