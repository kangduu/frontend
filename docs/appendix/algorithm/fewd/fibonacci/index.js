function fibDefault(value) {
    const num = parseInt(value);

    //参数判断
    if (isNaN(num) || num < 0) {
        return -1;
    }

    // 递归实现
    function fib(n) {
        if (n === 0 || n === 1) {
            return n
        }

        return fib(n - 1) + fib(n - 2)
    }

    return fib(num)
}

// 使用单列对象缓存优化
function fibPerformance(value) {
    const num = parseInt(value);

    //参数判断
    if (isNaN(num) || num < 0) {
        return -1;
    }

    // 缓存单列
    let memo = []

    // 递归实现
    function fib(n) {
        if (memo[n] === undefined) {
            return memo[n] = (n === 0) || (n === 1) ? n : fib(n - 1) + fib(n - 2)
        }
        return memo[n]
    }

    return fib(num);
}

function fibSum(value) {
    const num = parseInt(value);

    //参数判断
    if (isNaN(num) || num < 0) {
        return -1;
    }

    // 缓存单列
    let memo = []

    // 递归实现
    function fib(n) {
        if (memo[n] === undefined) {
            return memo[n] = (n === 0) || (n === 1) ? n : fib(n - 1) + fib(n - 2)
        }
        return memo[n]
    }

    const target = fib(num);
    const sum = memo.reduce((a, b) => (a + b), 0);

    return { sum, target }
}
