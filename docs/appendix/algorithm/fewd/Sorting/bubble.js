/*冒泡排序*/

//交换函数
var swap = function (array, index1, index2) {
    //ES5
    // var aux = array[index1];
    // array[index1] = array[index2];
    // array[index2] = aux;
    //ES6
    [array[index1], array[index2]] = [array[index2], array[index1]]
}

//冒泡排序
function bubbleSort(array) {
    var len = array.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) { //len-1-i ,减去已经遍历了的(当前内循环找到的最大的数)，减少重复
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1)
            }
        }
    }
    return array 
}

var tempArr = [2, 3, 5, 1, 6, 7, 4];
console.log(bubbleSort(tempArr))

