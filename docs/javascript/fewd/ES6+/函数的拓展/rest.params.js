
/--- arguments 参数对象 ---/
function fn() {
    console.log(arguments) // [Arguments] { '0': 2, '1': 3, '2': 4, '3': 5 }
    console.log(Array.prototype.slice.call(arguments)) // [2, 3, 4, 5]
}
fn(2, 3, 4, 5);
/**
 *  ! arguments 参数对象不是数组，而是一个类数组第对象。要使用数组的方法，必须使用 Array.prototype.slice.call()将其转为数组。
 */
/---------End---------/