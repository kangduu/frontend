/**
 *   n的阶乘
 *      公式 n! =  n * (n-1)!
 * */


//写法一
function fac(n) {

    //找出口
    if (n === 1 || n === 0) {
        return 1
    }

    //找规律
    return n * fac(n - 1)
}

console.log(fac(5));

//写法二
function f(n) {
    return ((n > 1) ? n * f(n - 1) : n)
}

console.log(f(3));