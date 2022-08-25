/* 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。 */

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23

function crossSum(nums, left, right, mid) {
  if (left === right) {
    //左右相等 返回左边的值
    return nums[left]
  }

  let leftMaxSum = Number.MIN_SAFE_INTEGER //左边最大值初始化
  let leftSum = 0
  for (let i = mid; i >= left; --i) {
    leftSum += nums[i]
    leftMaxSum = Math.max(leftMaxSum, leftSum) //更新左边最大子序和
  }

  let rightMaxSum = Number.MIN_SAFE_INTEGER
  let rightSum = 0
  for (let i = mid + 1; i <= right; ++i) {
    rightSum += nums[i]
    rightMaxSum = Math.max(rightMaxSum, rightSum) //更新右边最大子序和
  }

  return leftMaxSum + rightMaxSum //返回左右合并之后的最大子序和
}

function _maxSubArray(nums, left, right) {
  if (left === right) {
    //递归终止条件
    return nums[left]
  }

  const mid = Math.floor((left + right) / 2)
  const lsum = _maxSubArray(nums, left, mid) //左边最大子序和
  //   0,1,0
  // 0,2,1
  // 0,4,2
  // 0,8,4
  const rsum = _maxSubArray(nums, mid + 1, right) //右边最大子序和
  //   7,8,7
  // 5,8,6
  // 0,8,4
  const cross = crossSum(nums, left, right, mid) //合并左右的之后的最大子序和
  console.log(left + "," + right + "," + mid)
  // 0,1,0,-1 从左边递归的最后一级开始 ,回溯顺序是从下往上，从右往左的
  // 0,2,1,-2
  // 3,4,3,3（合并左右的）
  // 0,4,2,2
  // 5,6,5,3（合并左右的）
  // 7,8,7,-1
  // 5,8,6,2
  // 0,8,4,6
  // 6
  return Math.max(lsum, rsum, cross) //返回3中子序和中最大的
}

var maxSubArray = function (nums) {
  return _maxSubArray(nums, 0, nums.length - 1)
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

// 思路：不断分割，直到每个部分是一个数字为止，然后不断合并，返回左右和左右合并之后，3个最大子序和中的最大的一个
// 复杂度：时间复杂度O(nlogn)，二分复杂度O(logn)，二分之后每一层统计左右和合并之后的最大子序和复杂度是O(n)，所以之后的复杂度是O(nlogn)。空间复杂度O(logn)，递归的栈空间，因为是二分，每次数据规模减半

// 链接：https://leetcode.cn/problems/maximum-subarray/solution/dai-ma-jian-ji-yi-chong-huan-bu-cuo-de-j-1mab/
