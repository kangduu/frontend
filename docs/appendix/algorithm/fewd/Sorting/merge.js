//归并排序

//分，递归
function mergeSort(array) {
    var len = array.length;
    if (len === 1) { //出口
        return array
    }
    var mid = Math.floor(len / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, len);
    return merge(mergeSort(left), mergeSort(right))
}

//治
function merge(left, right) {
    var result = [],
        il = 0, ir = 0;//迭代数组使用的变量
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++])
        } else {
            result.push(right[ir++])
        }
    }
    while (il < left.length) {
        result.push(left[il++])
    }
    while (ir < right.length) {
        result.push(right[ir++])
    }
    return result
}

var tempArr = [2, 3, 5, 1, 6, 7, 4, 8];
console.log(mergeSort(tempArr))