/--- 1.let声明的变量的有效范围 ---/
{
    let a = 3;
    var b = 1;
}
console.log(b) // 1
try {
    console.log(a) // ! a is not defined
} catch (err) {
    console.log(`${err.name}: ${err.message}`)
}
/**
 * @description
 * 1. let声明的变量，只在let命令所在的代码块才有效。
 */
/------------------------------/;



/--- 2.let的作用域实例应用 ---/
for (var index = 0; index < 1; index++) {
    //* 使用var声明的，变量只有一个。
    //* 该问题需使用立即执行函数(闭包)传参方式解决
}
for (let index = 0; index < 1; index++) {
    //* index属于局部块级变量(每一次都存在一个子内存，分别存储i的不同值。)
    //* let 的实际使用，for循环定义变量
}
// ! 注意： for循环 定义表达式部分 属于父级作用域
/-----------------------------/;


/--- 3.let不存在变量声明提升 ---/
//ES5
console.log(foo) // undefined
var foo = 0;

//ES6
try {
    console.log(bar)
} catch (err) {
    console.log(err.name, err.message) // ReferenceError bar is not defined
}
let bar = 1;
/**
 * @description
 * 1. ES6中，let不存在变量提升
 */
/-----------------------------/;


/--- 4.暂时性死区 ---/
var tmp = 22;

if (true) {
    //* 特殊的 , 如果一个变量根本没有声明，使用typeof反而不会报错
    console.log(typeof aux); // undefined
    try {
        console.log(tmp); //tmp is not defined
    } catch (error) {
        console.log(error.message)
    }
    let tmp = 12;
}
/**
 * @description
 * 1. 块级作用域中存在let命令，则其声明的变量便“绑定”到该块级作用域中。并且在声明变量位置之前部分，为该变量的暂时性死区（TDZ-temporal dead zone）。
 * 2. ES6明确规定了，区块中存在let和const命令，则这个区块中使用二者命令声明的变量从一开始就形成了封闭作用域。
 * 3. 对于暂时性死区，本质：一进入当前作用域，所需要使用的变量就已经存在了，但是它们是不可获取的，直到声明变量的那一行代码出行后，才可以获取和使用变量。
 */

// 隐蔽的暂时性死区
/-1-/
function fn(x = y, y = 2) { //* 正确写法:(y = 2, x = y)
    return x + y
}
try {
    fn();
} catch (err) {
    console.log(err.message) // y is not defined , fn的形参x的值等于参数y的，而此时y还没有定义。
}
/-2-/
var x = x;
try {
    let y = y; //使用let声明变量时，只要还没声明变量就使用就会报错
} catch (err) {
    console.log(err.message)
}
/-------------------------/;


/--- 5.变量不可重复声明 ---/
function fns() {
    var a = 21;
    let a = 21;
}
function fna() {
    let v = 12;
    let v = 14;
}
try {
    fna();
    fns();
    // 只能捕获到 fna() 便跳转至catch
} catch (err) {
    console.log(err.message) // Identifier 'v' has already been declared
}
/--------------------------/