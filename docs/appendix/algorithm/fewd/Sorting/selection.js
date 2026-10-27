// 选择排序 

//交换函数
var swap = function (array, index1, index2) {
    //ES5
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}


//选择排序
function selectionSort(array) {
    var len = array.length,
        indexMin;//每次迭代数组中最小值的索引
    for (var i = 0; i < len - 1; i++) {
        // console.log('===================',i)
        indexMin = i;
        for (var j = i; j < len; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j;
            }
        }
        // console.log(indexMin)
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
        // console.log('--------------------------------------------------------',array)
    }
    return array
}
var temp = [9, 6, 5, 4, 2, 3, 1, 7, 8]
console.log(selectionSort(temp))