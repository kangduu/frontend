// type R = { name: string };
// type MyType<T> = T extends infer R ? R : never;
// type Account = MyType<{ phone: string }>;

// 实现 ReturnType
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
function greeting(name: string) {
  return `Hello, ${name}`;
}
type GreetingReturn = MyReturnType<typeof greeting>;
const statement: GreetingReturn = greeting("kangduu");
console.log(statement); // Hello, kangduu

// test
type T1 = MyReturnType<() => number>;
type T2 = MyReturnType<(a: number) => void>;
type T3 = MyReturnType<<T>() => T>;
type T4 = MyReturnType<<T extends U, U extends number[]>() => T>;
declare function fn(): { a: number; b: string };
type T5 = MyReturnType<typeof fn>;
type T6 = MyReturnType<any>;
type T7 = MyReturnType<never>;
type T8 = MyReturnType<string>;
type T9 = MyReturnType<Function>;

// 实现 Await

type PromiseType<T> = T extends Promise<infer K> ? PromiseType<K> : T;

type P1 = PromiseType<Promise<string>>; // type P1 = string
type P2 = PromiseType<Promise<Promise<number>>>; // type P1 = number
type P3 = PromiseType<number | PromiseType<boolean>>; // type P1 = number | boolean

// 获取函数的第一个参数类型

type FnFirstArg<T extends (...args: any[]) => any> = T extends (
  first: infer F,
  ...args: any[]
) => any
  ? F
  : any;

type F1 = FnFirstArg<() => void>; // type F1 = unknown
type F2 = FnFirstArg<(name: string) => void>; // type F2 = string
type F3 = FnFirstArg<(phone: number, addr: string) => void>; // type F3 = number
type F4 = FnFirstArg<(p: Promise<string>) => void>; // type F4 = Promise<string>
type F5 = FnFirstArg<string>; // type F5 = any warning: 类型“string”不满足约束“(...args: any[]) => any”

// 返回数组每一个元素的类型

type ArrayElementType<T extends any[]> = T extends (infer Each)[] ? Each : any;

type A1 = ArrayElementType<[string | number]>;
type A2 = ArrayElementType<string[]>;
type A3 = ArrayElementType<string>;
type A4 = ArrayElementType<[]>;

function infer(value: string) {
  return value;
}

export default infer;
