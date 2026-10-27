/--- 1. 基本的 ---/
const PI = 3.1415
try {
    PI = 3
} catch (err) {
    console.log(err.name, err.message)//TypeError: Assignment to constant variable.
}

try {
    //const foo  //* 只声明不赋值
    // SyntaxError: Missing initializer in const declaration
} catch (err) {
    console.log(err.name, err.message) //无法捕获该错误
}
/**
 * @description
 * 1. const声明的是只读常量。即声明过后，//! 常量的值就不可改变。  （注意： 常量、不可变 , 思考是对象/数组的话？）。
 * 2. const声明时必须同时初始化，否则报错。同时，这个语法错误无法被try...catch...语句捕获。
 * 3. 作用域与let相同：只在声明所在的块级作用域内有效。
 * 4. const声明的常量不会提升、同样存在暂时性死区、只能在声明后使用。
 * 5. 不可重复声明。
 * 6. 重点：这里所讨论的都是 //! 常量。
 */
/-----------------end------------------/;


/--- 2. 深度探究 const 的本质 ---/
//CASE 1  
const obj = {
    name: 'dk',
    val: 25
}
try {
    obj = {}
} catch (err) {
    console.log(err.message) // Assignment to constant variable. 不可改变指针所指数据。
}
console.log(obj.val) // 25
obj.val = 24;
console.log(obj.val) // 24 //! Object

//CASE 2
const arr = [1, 2, 3, 4]
console.log(arr[1]) // 2
arr[1] = 10
console.log(arr[1]); // 10 //! Array

/**
 * @description
 * 1. obj 和 arr 都是复合类型的数据，使用const命令声明的变量指向的内存地址保存的是一个指向具体数据的指针。
 * 2. const只能保证这个指针不变，不可控制指针所指向的数据。
 * 3. const 实际上保证的并不是变量的值不可改动，而是 //!变量指向的内存地址 所保存的数据 不可改动。
 * 4. 对于简单类型数据（数值、字符串、布尔）来说，它们的内存地址中即存的就是数据值；而复杂类型数据（对象、数组），变量指向的地址是数据的指针。
 */
/-------------end------------/;


/--- 3. 对象冻结 ( Object.freeze() ) ---/ //TODO https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(object = {}) {
    //获取定义的属性名
    let propNames = Object.getOwnPropertyNames(object);
    //先冻结属性
    propNames.forEach(function (name) {
        let prop = object[name]

        //若是对象，冻结
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop)
        }
    })
    //再冻结自身
    return Object.freeze(object)
}

let tt = {
    name: 'ddk',
    type: 'perrson',
    behave: {
        t1: 'run',
        t2: 'say'
    }
}
deepFreeze(tt)
tt.name = '123'
console.log(tt.name)// ddk

let arrr = [1, 2, [3, 4], 5]
deepFreeze(arrr);
console.log(Object.isFrozen(arrr)) // true
arrr[2] = 1;
console.log(arrr)[1, 2, [3, 4], 5]

console.log(deepFreeze(1));// 1 , ES6不会报错。
/-----------------end------------/;