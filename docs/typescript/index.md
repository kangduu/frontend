# TypeScript

类型是运行前加在值上的约束。学习顺序见 [原文概览](./README)，自学路线见 [路线图](./roadmap)。

## 输入与输出

输入是带类型标注的 TypeScript 文本和 `tsconfig.json`。输出是编译后的 JavaScript，以及编辑器在运行前给出的类型错误。

## 笔记

- [入门](./introduction)
- [基本类型](./type-basics)
- [函数](./functions)
- [收窄](./type-narrowing)
- [泛型](./generics)
- [tsconfig](./tsconfig)

## 案例与测试

`examples/typescript` 里有 `index.ts` 和 `infer.ts`。在该目录用 `npx tsc --noEmit` 做类型检查。

## 实战

`examples/engineering/vite` 和 `examples/react/UmiJS` 是已经用 TypeScript 写的项目。
