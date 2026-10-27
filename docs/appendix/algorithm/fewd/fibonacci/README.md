---
source: "front-end-web-developer/algorithm/fibonacci/README.md"
---

## 斐波纳契数列

斐波那契数列（Fibonacci sequence），又称黄金分割数列，因数学家莱昂纳多·斐波那契（Leonardoda Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，指的是这样一个数列：0、1、1、2、3、5、8、13、21、34、……
  
在数学上，斐波那契数列以如下被以递推的方法定义：
  
> F(0) = 0，F(1) = 1, F(n) = F(n - 1) + F(n - 2)（n ≥ 2，n ∈ N*）

> 从第三项开始，当前项的值等于前两项之和；n >= 0,且是整数。

## JavaScript代码实现

```js
// 递归
function fibonacci(value) {
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
        return 0;
    }
    function fib(n) {
        if (n === 0 || n === 1) {
            return n
        }
        return fib(n - 1) + fib(n - 2)
    }
    return fib(num)
}
```

注意：递归实现的最大缺点就是性能差，耗内存，速度慢。

## 利用“惰性单例缓存对象”进行优化

这个方法的主要点就是使用缓存，将重复的计算缓存下来。

```js
function fibonacci(value) {
    const num = parseInt(value);

    //参数判断
    if (isNaN(num) || num < 0) {
        return -1;
    }

    // 缓存单列
    let memo = {}

    // 递归实现
    function fib(n) {
        if (memo[n] === undefined) {
            return memo[n] = (n === 0) || (n === 1) ? n : fib(n - 1) + fib(n - 2)
        }
        return memo[n]
    }

    return fib(num)
}
```

## 计算 Fibonacci Sequence 前n项和

```js
function fibonacci(value) {
    const num = parseInt(value);

    //参数判断
    if (isNaN(num) || num < 0) {
        return -1;
    }

    // 缓存单列
    let memo = []

    // 递归实现
    function fib(n) {
        if (memo[n] === undefined) {
            return memo[n] = (n === 0) || (n === 1) ? n : fib(n - 1) + fib(n - 2)
        }
        return memo[n]
    }

    const target = fib(num);
    const sum = memo.reduce((a, b) => (a + b), 0);
    
    return { sum, target }
}
```
