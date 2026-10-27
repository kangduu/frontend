/**
  * 1. 顶层对象 window 只存在于浏览器中；
  * 2. 顶层对象 global 只存在于Node中；
  * 3. 顶层对象 self 在浏览器和Web Worker中，但是Node中没有self。
  */

/**
 * 为了获取顶层对象，常用this获取，但也存在以下问题：
 * 1. 全局环境中，this返回顶层对象；但Node模块和ES6模块中this返回当前模块；
 * 2. 针对函数中的this：若为函数，则是指向顶层对象（严格模式为undefined）；若为对象方法，则是调用者。
 */

/--- 如何有效取到全局对象？ ---/
var gl = (typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object')
        ? global
        : this)

var getGL = function () {
    if (typeof self !== 'undefined') return self
    if (typeof window !== 'undefined') return window
    if (typeof global !== 'undefined') return global
    throw new Error('unable to locate global object')
}
