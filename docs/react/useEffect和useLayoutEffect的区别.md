---
source: "camp/src/react/useEffect和useLayoutEffect的区别.md"
title: useEffect和useLayoutEffect的区别
category: React
---
## 官方文档

### useEffect

```js
useEffect(didUpdate[,[dep]])
```

1.  赋值给 `useEffect` 的函数 didUpdate 会在<u>组件渲染到屏幕之后</u>执行。 即待浏览器完成画面渲染之后才会延迟调用 `useEffect` 。

2. 清除函数（didUpdate的返回值）。 为防止内存泄漏，清除函数会<u>在组件卸载前执行</u>。  如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。 

   ```
   useEffect(() => {
     const subscription = props.source.subscribe();
     return () => {
       // 清除订阅
       subscription.unsubscribe();
     };
   });
   ```

3.  与 `componentDidMount`、`componentDidUpdate` 不同的是，在浏览器完成布局与绘制**之后**，传给 `useEffect` 的函数<u>会延迟调用</u>。 

4. 虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。

详见[useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#useeffect)

### useLayoutEffect 

```
useLayoutEffect(didUpdate[,[dep]]);
```

​		其函数签名与 `useEffect` 相同，但它<u>会在所有的 DOM 变更之后同步调用 effect</u>。可以使用它来<u>**读取 DOM 布局并同步触发重渲染**</u>。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

​		尽可能使用标准的 useEffect 以避免阻塞视觉更新。

> **提示**
>
> 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则<u>需要注意 `useLayoutEffect` 与 `componentDidMount`、`componentDidUpdate` 的调用阶段是一样的</u>。但是，我们推荐你**一开始先用 `useEffect`**，只有当它出问题的时候再尝试使用 `useLayoutEffect`。
>
> ......服务端渲染相关内容，详见[useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)

## 最大的不同

**调用时机的不同**

1.  `useLayoutEffect` 与 `componentDidMount`、`componentDidUpdate` 的调用阶段是一样的。
2.  在浏览器完成布局与绘制**之后**，传给 `useEffect` 的函数会延迟调用。 

🌰举例说明useEffect和useLayoutEffect的调用时机不同：

```jsx
// Parent.jsx
import React, { Component } from "react";
import Child from "./Child";
export default class Parent extends Component {
  componentDidMount() {
    console.log("[Parent] componentDidMount");
  }
  render() {
    return <Child />;
  }
}

// Child.jsx
import React, { useEffect, useLayoutEffect } from "react";
export default function Test() {
  useEffect(() => {
    console.log("[Child] useEffect mount");
  }, []);
  useLayoutEffect(() => {
    console.log("[Child] useLayoutEffect mount");
  }, []);
  return <div>Child</div>;
}
```

🙋 ***Answer：*** 上述案例的日志结果如下。

```
[Child] useLayoutEffect mount   // 子组件挂载完成
[Parent] componentDidMount		// 父组件挂载完成
[Child] useEffect mount			// useEffect延迟调用了
```

## 什么情况下使用useLayoutEffect？

 在浏览器执行下一次绘制前，用户可见的 DOM 变更必须同步执行，这样用户才不会感觉到视觉上的不一致 。