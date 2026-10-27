---
source: "camp/src/react/【性能优化】React.flushSync与AutomaticBatching.md"
title: Automatic Batching Update
category: React
---

# Automatic Batching Update

### React 是如何进行自动批处理更新的？

**在 React@18.0.0之前**，我们使用 setState 或者 Hook 修改状态后，并不会立即触发重新渲染。React 会执行全部事件处理函数，然后触发一个单独的 re-render，**合并所有更新**。 _—— tips：只能处理同步任务_

🌰 写一个案例，实现**多次**同步调用 setState 或 hooks

```jsx
import { useEffect, useState } from "react";

const Increment = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count value:", count);
  });

  const incermentHandler = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return <button onClick={incermentHandler}>点击</button>;
};

export default Increment;
```

当我们点击按钮后，控制台应该打印什么日志信息啦？

```verilog
count value: 1
count value: 2
count value: 3
```

是这样吗？并不是。

正确结果：

```log
count value: 3
```

🌰 同样的代码，修改一下处理函数调用 setState 或 hooks 的方式。

```jsx
...

const incermentHandler = () => {
    setTimeout(() => { // Promise Ajax ...
        setCount((c) => c + 1);
        setCount((c) => c + 1);
        setCount((c) => c + 1);
    }, 300);
};

...
```

如果你像上面这样更新状态，console 日志信息打印结果？

```verilog
count value: 1
count value: 2
count value: 3
```

是的，就是更新了三次。意不意外，惊不惊喜！

还记得一开始我们说的吗？合并所有更新，只能是同步的任务。

那我们就不能在异步任务中多次修改 state 了吗？完全可以，而且也可以只更新一次。

### 使用`ReactDOM.flushSync`解决异步多次修改状态导致多次更新的问题

```ts
// flushSync
export function flushSync<R>(fn: () => R): R;
export function flushSync<A, R>(fn: (a: A) => R, a: A): R;
```

```jsx
import ReactDOM from "react-dom";

...

const incermentHandler = () => {
    setTimeout(() => {
+        ReactDOM.flushSync(()=>{
            setCount((c) => c + 1);
            setCount((c) => c + 1);
            setCount((c) => c + 1);
+        })
    }, 300);
};

...
```

### React@18+之后便不存在以上问题了

```tsx
import { FC, useEffect, useState } from "react";

const Increment: FC<any> = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("[Incerment] Updated:", count, flag);
  });

  const incermentHandler = function () {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 300);
  };

  return (
    <>
      <p>Automatic Batching</p>
      <button onClick={incermentHandler}>点击并查看console</button>
    </>
  );
};

export default Increment;
```

点击按钮后，你看到的是

```log
[Incerment] Updated: 1 true
```

#### React 18 过后`flushSync`又能做什么

现在使用 react18 可以开箱即用的实现`自动批更新`。但是我们确有需求在异步中提取更新啦？

```tsx
import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Increment: FC<any> = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("[Increment] Updated:", count, flag);
  });

  const incermentHandler = function () {
    setTimeout(() => {
      setCount((c) => c + 1);
+      ReactDOM.flushSync(() => {
+        setFlag((f) => !f);
+      });
      setCount((c) => c + 1);
    }, 300);
  };

  return (
    <>
      <p>Automatic Batching</p>
      <button onClick={incermentHandler}>点击并查看console</button>
    </>
  );
};

export default Increment;

// log
// [Increment] Updated: 0 true
// [Increment] Updated: 2 true
```

这样，我们就可以同步更新`setFlag`了，即改变了更新级别。
