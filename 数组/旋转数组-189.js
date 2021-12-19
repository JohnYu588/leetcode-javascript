let reverse = function (nums, start, end) {
  while (start < end) {
    [nums[start++], nums[end--]] = [nums[end], nums[start]]
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let rotate = function (nums, k) {
  k %= nums.length
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
  return nums
}

// https://leetcode-cn.com/problems/rotate-array/solution/shu-zu-fan-zhuan-xuan-zhuan-shu-zu-by-de-5937/

/* 复杂度分析
时间复杂度：O(n)O(n)，其中 nn 为数组的长度。每个元素被翻转两次，一共 nn 个元素，因此总时间复杂度为 O(2n)=O(n)O(2n)=O(n)。
空间复杂度：O(1)O(1)。 */

/* 思路如下：
首先对整个数组实行翻转，这样原数组中需要翻转的子数组，就会跑到数组最前面。
这时候，从 k 处分隔数组，左右两数组，各自进行翻转即可。 */
