/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (!nums.length) return 0
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}

// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shuang-zhi-zhen-shan-chu-you-xu-shu-zu-z-3pi4/

// 复杂度分析：

// 时间复杂度：O(n)O(n)。
// 空间复杂度：O(1)O(1)。

// 题目中已经明确要求：原地修改，我们必须得放弃暴破等需要多余存储空间的做法。（需要注意是有序数组，说明后面不会再和前面的相等了）
// 我们就能想到双指针，解题流程如下：
// 创建一个慢指针 i，指向数组第一位数字，再创建一个快指针 j，指向数组第二位。
// 如果nums[j]和 nums[i]相等，将j递增1， 若 nums[j]和 nums[i]不等，则先将 i 递增 1，然后把nums[i] 改为 nums[j](就是将原本i的下一位改成j)。
// 因为最初 i 等于 0 时的数字未统计，所以最终返回结果需要 +1。

// 总结：i不等时才右移一位，j是一直往右移，和新的i做比对
