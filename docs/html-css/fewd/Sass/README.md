---
source: "front-end-web-developer/HTML-CSS/Sass/README.md"
---

## [Sass](https://www.sass.hk/)

使用scss进行css学习，主要是结合sass强大的功能，对css深入学习。

1. 学习使用sass进行css开发
2. 通过一些案例实践


## 在Vue中的几种规范使用

1. vue中常用的 [varibles.scss](./varibles.scss)、[reset.scss](./reset.scss)、[utils.scss](./utils.scss) ，varibles需要单独在`vue.config.js`配置
2. 然后建立一个[index.scss](./index.scss) 文件，该文件引入你设置好的一些scss文件，一般都是比较通用的，然后index用于主程序引用。
3. 最后在 `main.js` 文件引入`index.scss` 即可

