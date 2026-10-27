---
source: "front-end-web-developer/JavaScript/Array/Array.prototype.map().md"
---

# Array.prototype.map(callback，[thisArg])

#### 定义

> map()方法将调用的数组【arr】的每个元素传递给参数【回调函数callback】，返回一个新数组   【new_array】，新数组包含每个回调函数的返回值【回调函数有返回值】。 

1. 参数是一个回调函数，回调函数可有三个参数；
2. 类比其它方法（forEach），callback是否有返回值；
3. 若调用的数组是一个稀疏数组，则新数组同样是一个稀疏数组【相同长度，相同缺失元素】；
4. 不会修改调用数组。

#### 语法

```javascript
var new_array = arr.map(function callback(currentValue,[index],[array]]) {
 // Return element for new_array 
},[thisArg])
```

#### 参数（map)

`callback`  — 生成新数组元素的函数，使用三个参数：

> currentValue ____ callback数组中**正在处理的当前元素**
>
> index ____ `可选` callback 数组中正在处理的当前元素的**索引**
>
> array ____  `可选` map方法调用的数组

`thisArg`  — 执行 **callback** 函数时<u>值被用作</u>**this**

#### 返回值

回调函数的结果组成了新数组的每一个元素。

#### 那些场合适合使用

```javascript
// 经典例题
var new_array = [1,2,3].map(parseInt); //  new_array值为？

```

#### 参考地址

[map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

