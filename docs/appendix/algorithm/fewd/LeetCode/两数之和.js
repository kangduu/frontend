/**
 * 《两数之和》
 * 
 * ! 描述
 *      给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 *      ?你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 
 * ! 示例
 *      给定 nums = [2, 7, 11, 15], target = 9
 *      因为 nums[0] + nums[1] = 2 + 7 = 9 
 *      所以返回 [0, 1]
 */

/**
 * @param {number[]} nums 
 * @param {number} target 
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // ! 暴力解法 1
    // for(let i=0;i<nums.length-1;i++){
    //     for(let j = i+1;j<nums.length;j++){
    //         if(nums[i]+nums[j]===target) return [i,j]
    //     }
    // }
    // ! 暴力解法 2
    // for(let i=0;i<nums.length-1;i++){
    //     let sub = target - nums[i]
    //     for(let j = i+1;j<nums.length;j++){
    //         if(nums[j]===sub) return [i,j]
    //     }
    // }
    // ! Map配合for循环
    // let map = new Map()
    // for (let i = 0; i < nums.length; i++) {
    //     let sub = target - nums[i]
    //     if(map.has(sub)) return [map.get(sub),i]
    //     map.set(nums[i],i)
    // }
    // ! Map配合forEach  【用时少】
    // let map = new Map(),
    // res =[]
    // nums.forEach((item,i) => {
    //     let sub = target - item
    //     if (map.has(sub))res=[map.get(sub), i]
    //     map.set(item, i)
    // })
    // return res
    // ! for + indexOf  【内存最少】
    // for (let i = 0; i < nums.length; i++) {
    //     const sub = target - nums[i], j = nums.indexOf(sub, i + 1)
    //     if (j !== -1) return [i, j]
    // }
};

console.log(twoSum([2, 7, 11, 15], 9));

/**
 * 《总结》
 * for循环的时间不理想，实际不可超过两层for循环
 * 使用indexOf第二个参数巧妙解决重复使用数组项问题
 * forEach内部不可使用 continue break return 关键字
 * Map实列的has get set 方法
 * 
 * 《QA》
 * indexOf的查询机制？
 * indexOf第一个参数不是基本类型怎么匹配？
 * Map实列内存大小问题？
 */