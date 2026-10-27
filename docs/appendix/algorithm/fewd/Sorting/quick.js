//快速排序

function quickSort(array) {
    quick(array, 0, array.length - 1);
    return array
}

//分子数组
function quick(array, left, right) {
    var index; //分离子数组
    if (array.length > 1) {
        index = partition(array, left, right);
        if (left < index - 1) {
            quick(array, left, index - 1)
        }
        if (index < right) {
            quick(array, index, right)
        }
    }
}

function swap(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]]
}

function partition(array, left, right) {
    //取中间值为主元
    var pivot = array[Math.floor((left + right) / 2)],
        //初始化指针，数组首位和末尾索引
        i = left, j = right;
    while (i <= j) {
        //左指针指向的元素比主元大  【1】
        while (array[i] < pivot) {
            i++
        }
        //右指针指向的元素比主元小  【2】
        while (array[j] > pivot) {
            j--
        }
        //并且左指针索引比右指针索引小  【3】
        if (i <= j) {
            //同时满足【1】【2】【3】便交换，并移动左右指针
            swap(array, i, j);
            i++;
            j--
        }
    }
    return i;
}

var tempArr = [2, 3, 5, 1, 4];
console.log(quickSort(tempArr))
