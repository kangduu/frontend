/**
 *      1.双重循环
 * */
function doubleLoopUniq(arr) {
    var result = [];
    for (var i = 0, len = arr.length, isExist; i < len; i++) {
        //定义一个变量表示当前元素在result中是否存在
        isExist = false;
        for (var j = 0, rLen = result.length; j < rLen; j++) {
            if (result[j] === arr[i]) {
                //依次对result中的元素 和 原数组元素进行比对
                isExist = true;
                break
            }
        }
        //最后判断如果不存在，则将此元素插入result
        !isExist && result.push(arr[i])
    }
    return result;
}

/**
 *      2.借助js内置的indexOf
 * */
function indexOfUniq(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        //数组查询（indexOf）没有的值返回 -1 ，用indexOf简化了内层循环
        if (result.indexOf(arr[i]) === -1) result.push(arr[i]);
    }
    return result
}

/**
 *      3.排序后前后比对去重（改变了原数组，已排序）
 * */
function sortUniq(arr) {
    var result = [], last;
    //arr拓展后避免对原数组产生副作用
    [...arr].sort().forEach(item => {
        if (item != last) {
            result.push(item);
            last = item
        }
    });
    return result
}

var arr = [4,2,4,1,3,5,2]
console.log(sortUniq(arr))

/**
 *      4.ES6的 Set
 * */
function toSetUniq(arr) {
    return Array.from(new Set(arr))
}

/**
 *      5.利用对象属性名的唯一性
 * */
function toObjUniq(arr) {
    var result = [], aux = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!aux[arr[i]]) {
            //为对象添加一个属性值，Boolean结果为true
            aux[arr[i]] = 'temporary';
            result.push(arr[i])
        }
    }
    return result
}

/**
 *      6.splice 去重（直接操作了数组本身，谨慎使用）
 * */
function inPlinceUniq(arr) {
    var ind = 0;
    while (ind < arr.length) {
        var compare = ind + 1;
        while (compare < arr.length) {
            if (arr[ind] == arr[compare]) {
                arr.splice(compare, 1);
                continue;
            }
            ++compare
        }
        ++ind;
    }
    return arr
}

