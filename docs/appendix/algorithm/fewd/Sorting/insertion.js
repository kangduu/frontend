//插入排序（从第二项开始，第一项默认已经排序）、类比梁山好汉排序

var tempArr = [2, 32, 11, 42,23, 20, 97, 57, 45, 34, 63];

//基础
function insertionSort(array) {
    var len = array.length,
        aux, temp;
    for (var i = 1; i < len; i++) {
        aux = i;
        temp = array[i];//保存目标项的值
        //将目标项与其前面的每一项进行比较，直到比目标项小的后边停止。
        while (aux > 0 && array[aux - 1] > temp) {//比目标项大
            array[aux] = array[aux - 1];
            aux--
        }
        //将目标项插入比目标项小的后边
        array[aux] = temp
    }
    return array
}

//双for
function insertSortOther(array) {
    for (let i = 1; i < array.length; i++) {
        //内循环小于外循环
        for (let j = 0; j < i; j++) {
            if (array[j] > array[i]) {
                arr.splice(j, 0, arr.splice(i, 1)[0]);
                break
            }
        }
    }
    return array
}

//二分法插入排序
function binaryInsertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        var key = array[i], left = 0, right = i - 1;
        while (left <= right) {
            var middle = parseInt((left + right) / 2);
            if (key < array[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        for (var j = i - 1; j >= left; j--) {
            array[j + 1] = array[j];
        }
        array[left] = key;
    }
    return array;
}