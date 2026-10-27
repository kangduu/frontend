/--- 1. 块级作用域缘起 ---/
//CASE 1
var temp = new Date();

function fn1() {
    console.log(temp) // undefined
    if (false) {
        var temp = 'new value'
    }
}
fn1()
/**
 * @description
 * 1. CASE 1 中，代码原本目的是得到当前的时间，但是由于fn1中也声明了 temp ，导致结果为 undefined。
 * 2. 由于内层代码声明了外层同名的变量，所以覆盖了外层的变量。
 */

//CASE 2
let arr = [0, 1, 2]

for (var index = 0; index < arr.length; index++) {
    console.log(arr[index])
}
console.log(index); // 3
/**
 * @description
 * 1. 上边的for循环，用于打印数组每一个元素，结束后 index 应该被 “垃圾回收”。 但是事实并非如此(var声明的)。
 */
/-----------end---------------/;


/--- 2.ES6是怎么阐述块级作用域的啦 ---/
//我们来看看CASE 1
let temp1 = new Date()

function fn2() {
    if (true) {
        let temp1 = 'new'
    }
    console.log(temp1) // 2019-06-19T14:18:16.394Z
}
fn2()
/**
 * @description
 * 1. let 命令即产生了块级作用域，这时temp1 只属于当前作用域。
 */

//? 变量读取
function f3() {
    let val = 3;
    if (1) { //   * 注意：  这里是块级作用域，区分函数作用域和全局作用域。
        let value = 4;
        var va = 'variable'
    }
    try {
        console.log(va) // variable
        console.log(value) //错误捕捉到了，跳转 catch
    } catch (err) {
        console.log(err.name, ':', err.message)//value is not defined
    }
}
f3();
/**
 * @description
 * 1. 在同一作用域中，外层无法获取内层中的变量，（不存在变量声明提升了）
 */

//? 定义变量
{
    {
        { /**可嵌套 */
            let outer = 'i am out'
            {
                let outer = 'i am in'
            }
            console.log('outer say:', outer) //outer say: i am out
        }
    }
};
/------------end--------------/;



/--- 3.函数声明在块级作用域中定义的哪些事 ---/
//CASE 1
if (1) {
    function test1() {

    }
}
//CASE 2 
try {
    function test2() { }
}catch(err){};
/**
 * @description
 * 1. 在 ES5 中，CASE 1 ，CASE 2 是非法的写法。ES5明确规定，函数只能在顶层作用域和函数作用域中声明，不可在块级作用域中声明。
 * 
 * Q: 上面两种情况为什么不报错啦？
 * A: 浏览器没有遵守这一规定。这样做主要是为了兼容以前的旧的代码，所以浏览器支持在块级作用域中声明函数。
 */

//CASE 0
function fnn() {
    console.log('outside');
}
(function () {
    if (false) {
        function fnn() {
            console.log('inside')
        }
    }
    try {
        fnn() // 注意： 这里是ES6环境，如果是ES5环境，则打印 inside。
    } catch (err) {
        console.log(err.message)//fnn is not a function
    }
})()

/**
 * @description
 * 1. ES6便引入了块级作用域，明确说明允许在块级作用域中声明函数。（在块级作用域中，函数声明语句类似于let声明变量，在块级作用域外不可引用。
 *
 * 2. Q: 为什么ES6中外层调用块级作用域中声明的函数会报错啦？
 *    A: ES6规定： （特别的，该规定只对ES6的浏览器实现有效，其它的仍将块级作用域中函数声明当中let处理）
 *      ·允许在块级作用域内声明函数
 *      ·函数声明类似于 var，即会提升到全局作用域或函数作用域的头部
 *      ·同时，函数声明还会提升到所在的块级作用域的头部
 *
 * 3. 注意：ES6的块级作用域允许声明函数的规则 只在 使用大括号情况下成立，否则报错哦。
 *
 * 4. 'use strict'
 * if(1){
 *     function ss(){}
 * }
 * if(1)
 * function dd(){
 * }
 * * Uncaught SyntaxError: In strict mode code, functions can only be declared at top level or inside a block.
 *
 * 5. 上面的 CASE 0 实际允许代码如下:
 * function ffn(){
 *   console.log('outside');
 * }
 * (function () {
 *    var fnn = undefined; 【*】
 *    if (false) {
 *      function fnn() {
 *        console.log('inside')
 *      }
 *    }
 *    fnn()
 * })()
 */
