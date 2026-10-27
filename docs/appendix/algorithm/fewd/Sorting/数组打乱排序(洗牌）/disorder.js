//工具类
function orderArr(len) {
    let arr = [];
    for (let i = 1; i <= len; i++) {
        arr.push(i)
    }
    return arr
}

//方法一
function sort(arr) {
    let newArr = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        let j = Math.floor(Math.random() * (len - i));//【*】
        newArr[i] = arr.splice(j, 1)[0];//【*】
    }
    return newArr;
}

console.log(sort(orderArr(12)));//[ 5, 8, 6, 3, 10, 4, 12, 7, 11, 2, 1, 9 ]

// 方法二
function sort2(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;//【*】
    });
}

console.log(sort2(orderArr(16)));//[ 3, 9, 12, 14, 7, 4, 2, 1, 8, 10, 13, 6, 11, 5, 16, 15 ]
