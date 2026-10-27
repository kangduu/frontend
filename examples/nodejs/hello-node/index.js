// 1. tsc index.ts ===output===> index.js
console.log("Running TypeScript in Node.js.");
// 2. tsc --noEmit index.ts
console.log("NoEmit~");
var a = 1;
a = ''; // error TS2322: Type 'string' is not assignable to type 'number'.
// 3. npx tsx .\index.ts  不进行类型检查
// [link: https://tsx.is/]
// 4. npx ts-node .\index.ts 会检查类型，与 tsc --noEmit 类似
// [link: https://typestrong.org/ts-node/]
// 5. npx ts-node-dev .\index.ts
