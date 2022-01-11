const twoSum = (nums, target) => {
  const prevNums = {} // 存储出现过的数字，和对应的索引

  for (let i = 0; i < nums.length; i++) {
    // 遍历元素
    const curNum = nums[i] // 当前元素
    const targetNum = target - curNum // 满足要求的目标元素
    const targetNumIndex = prevNums[targetNum] // 在prevNums中获取目标元素的索引
    if (targetNumIndex !== undefined) {
      // 如果存在，直接返回 [目标元素的索引,当前索引]
      return [targetNumIndex, i]
    } else {
      // 如果不存在，说明之前没出现过目标元素
      prevNums[curNum] = i // 存入当前的元素和对应的索引
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9)) // [0,1]
/**
 * 2，prevNums没有 7（9 - 2），把2存入
 * 7，找到 2（9 - 7）下标 0，返回[0,1]
 */
// console.log(twoSum((ums = [3, 2, 4]), 6)) // [1,2]
// 链接：https://leetcode-cn.com/problems/two-sum/solution/qing-xi-de-bian-liang-ming-ming-bang-zhu-ji-yi-bu-/

// 用 hashMap 存储遍历过的元素和对应的索引。
// 每遍历一个元素，看看 hashMap 中是否存在满足要求的目标数字。
// 所有事情在一次遍历中完成（用了空间换取时间）。
