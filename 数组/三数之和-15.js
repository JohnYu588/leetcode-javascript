/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let ans = []
  const len = nums.length
  if (nums == null || len < 3) return ans
  nums.sort((a, b) => a - b) // 排序
  for (let i = 0; i < len; i++) {
    // 如果当前数字大于0，则三数之和一定大于0，所以结束循环（因为L和R都在i后面，已经排序好的，后面只会都是正数）
    if (nums[i] > 0) break
    // 去重，和前面i相同值就没有再重复遍历一遍的必要了，回到for内部继续i+1，不执行循环体内的其他代码了
    if (i > 0 && nums[i] == nums[i - 1]) continue
    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]])
        // 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
        // 当 sum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--
        while (L < R && nums[L] == nums[L + 1]) L++ // 去重
        while (L < R && nums[R] == nums[R - 1]) R-- // 去重
        // 等于0，并且去重后，就两个换值继续进入while循环，固定一个值和i没有必要，因为这样另一个值肯定时固定的
        L++
        R--
        // 不等于0时，就固定一个值，另一个值移动比较
      } else if (sum < 0) L++
      // L右移增大
      else if (sum > 0) R--
    }
  }
  return ans
}

// https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
// 时间复杂度：O(n^2)，n 为数组长度

// 首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，
// 数字分别为 nums[L] 和 nums[R]，计算三个数的和 sumsum 判断是否满足为 0，满足则添加进结果集
// 如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
// 如果 nums[i] == nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过
// 当 sumsum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
// 当 sumsum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--
