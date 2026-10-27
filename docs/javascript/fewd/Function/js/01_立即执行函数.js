/--- 1.只有表达式才能被执行符号执行 ---/

//函数声明，直接加 () 报错。
//错误原因： JavaScript 引擎规定，如果function关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是function关键字之后，认为这一段都是函数的声明，不应该以圆括号结尾，所以就报错了。
/*
    function test() {
        console.log("a")
    }();

    //特殊的： （阿里笔试题）
    function test(a,b,c,d) {
        console.log(a+b+c+d)
    }(1,2,3,4);
*/

//函数表达式，则可以直接执行
var test = function () {
    console.log("函数表达式形式的立即执行函数")
}();

//函数表达式形式的立即执行函数被执行后，test将不再是函数
//test();

/**
 * 特殊的
* */
+ function (){
    console.log("+")
}();
- function (){
    console.log("-")
}();
! function (){
    console.log("!")
}();
~ function () {
    console.log("~")
}();
true && function(){
    console.log("&& ")
}();
0,function(){
    console.log(", ")
}();


/**
*   阿里笔试题
* */
// 不报错 ，也不会被执行 。
function test1(a,b,c,d) {
    console.log(a+b+c+d)
}(1,2,3,4);

//等同于 下面的写法
function test2(a,b,c,d) {
    console.log(a+b+c+d)
}
(1,2,3,4);//这一行代码没有任何意义

//只是个简单的函数声明了
test2(1,2,3,4);