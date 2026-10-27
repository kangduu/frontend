a = 10;
console.log(global.a) // 10

let b = 1;
console.log(global.b /* 或者 this.b */) // undefined

var c = 2;
console.log(this.c /* global.c 、 window.c */) //undefined Node中是这样； 若是在浏览器中，则打印 2
/**
 * 1. 顶层对象在浏览器中是window、Node中是global;
 * 2. ES6规定，var和function命令声明的全局变量属于顶层对象；let、const和class命令声明的全局变量不属于顶层对象。
 */

 