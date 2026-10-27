/--- 箭头函数的不适用场合 ---/
//* 场合一、 定义对象的方法，且该方法内部包括this
const personal = {
    name: 'jack',
    age: 18,
    behavior: () => {
        console.log('say name: ' + this.name)
        //! 这里的this是全局对象，箭头函数是在全局环境下定义的。
    },
    say: function () {
        console.log('show age:' + this.age)
    }
}
personal.behavior();// say name: undefined 
personal.say();// show age:18 
/**
 * 1.对象不构成单独的作用域；
 * 2.箭头函数的this是在其定义是所在的环境；
 */

//* 场合二、 需要动态this的时候，也不应该使用箭头函数

let button = document.getElementById('btn');
button.addEventListener("click", () => {
    this.classList.toggle('aaa');
    // ! 这里也是this指向定义时环境（全局）
});


//* 其它
/**
 * 1. 函数体很复杂，有许多行
 * 2.函数内部有大量的读写操作，不单纯是为了计算值
 * 
 * ! 以上两种情况，也应该使用普通函数，提高代码可读性。
 */

/-----------End----------------/

