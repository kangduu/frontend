---
source: "front-end-web-developer/JavaScript/JavaScript-Module.md"
---

[TOC]

# 前言

IE6之前是没有JS引擎的，JavaScript代码是在渲染引擎里执行的。

最开始我们编写JavaScript代码是在`script`标签里编写的。

```html
<body>
    <script type="text/javascript">
        //statements
    </script>
</body>
```

随着发展代码量越来越多?不可能全部写在一个`script`标签中，这个时候就产生了`.js`文件引入的概念。

```html
//脚本分离，模块化
<body>
    <script src="js/index.js"></script>
    <script src="js/index-2.js"></script>
</body>
```

但是这样操作还是存在一系列的问题，比如我们的引擎在加载`script`时是阻塞的、所有的`js文件`引入后共享一个全局作用域、由于全局作用域的原因必然存在命名冲突，变量覆盖，污染全局的等等问题

# 模块化发展过程中遇到的问题

1. 模块之间存在了相同了函数逻辑，抽离公共部分统一放到`common.js`中，共享全局作用域，所以你比如先引入`common.js`;
2. 我只需要`common.js`中某一个功能？（按需引入）
3. `script`引入的方式存在那些问题？（引擎加载script是阻塞的）
   - 命名冲突，命名空间污染
   - 必须按顺序引入，变量依赖关系

>  模块化解决了什么问题？
>
> 1. 加载顺序
> 2. 污染全局

# IIFE（[立即调用函数表达式](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)）

原理是利用闭包的原理，避免了全局污染，方便了模块之间的依赖。

```js
;(function (){
//statements
})();
```

### 解决了哪些问题？

1. 污染全局
2. 模块依赖

### 未解决的问题？

1. 加载顺序

# CommonJS

遵循nodeJS模块化规范

### 导入导出

模块暴露：`module.exports = value`  或 `exports.xxx = value` 

模块导入：`require(xxx)` 1.第三方模块，xxx表示模块名；2. 自定义模块，xxx为模块的文件路径

### 特点

1. **同步**执行（加载顺序）
2. 缓存机制
3. 所有代码都运行在模块作用域，不会污染全局作用域
4. 导入即执行（导入既实例）`require`
5. Node端，<u>如果要在浏览器使用？（Browserify）</u>



# AMD（Asynchronous Module Definition）

> 异步模块定义

基于CommonJS实现的浏览器端模块机制，并且是前置依赖模式（必须前面的所有模块引入后才执行），这样就避免了顺序加载的问题。

不需要`Node`和`浏览器环境`，实现原理是`RequireJS`。所以你如果自己想实现一个`AMD`，必须去引入`require.js`

### 定义导入

- 定义模块

  ```js
  //定义没有依赖的模块
  define(function(){
  return module
  });
  
  //定义有依赖的模块
  define(["module1","module2"],function(){
      return module3
  });
  ```

- 导入模块

  ```html
  <body>
  	<script
              data-main="main"
              ></script>
  </body>
  ```

  

### 为什么会有AMD？





# CMD（Common Module Definition）

> 通用模块定义
>
> 阿里实现维护的

### 特点

1. 浏览器不支持
2. 基于seaJS
3. **依赖就近，按需加载**


## Reference

- [前端模块化详解(完整版)](https://segmentfault.com/a/1190000017466120)
- [前端模块化一——规范详述](https://zhuanlan.zhihu.com/p/41568986)
- [前端模块化二——webpack项目中的模块化](https://zhuanlan.zhihu.com/p/42853909)

