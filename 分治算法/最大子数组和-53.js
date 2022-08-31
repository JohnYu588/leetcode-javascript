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

// 分治法解析 https://blog.csdn.net/xiaozeiqwe/article/details/125896071
// https://blog.csdn.net/weixin_41423494/article/details/103284069
function crossSum(nums, left, right, mid) {
  if (left === right) {
    //左右相等，即将数组分成两半，直到只有一个元素，每个都分到末节点的时候左右就相等了
    return nums[left]
  }

  let leftMaxSum = Number.MIN_SAFE_INTEGER //左边最大值初始化
  let leftSum = 0
  // 从中间向左依次加找到最大值）
  for (let i = mid; i >= left; --i) {
    leftSum += nums[i]
    leftMaxSum = Math.max(leftMaxSum, leftSum) //更新左边最大子序和
  }

  let rightMaxSum = Number.MIN_SAFE_INTEGER
  let rightSum = 0
  // 从中间向右依次加找到最大值
  for (let i = mid + 1; i <= right; ++i) {
    rightSum += nums[i]
    rightMaxSum = Math.max(rightMaxSum, rightSum) //更新右边最大子序和
  }

  // 返回左右合并之后的最大子序和(跨越左右的最大和，处理方法为：s从中间位置开始，分别向左和向右两个方向进行操作，通过累加找到两个方向的最大和，分别为l_max和r_max
  // 因此存在于中间的最大和为（l_max+r_max）；)
  return leftMaxSum + rightMaxSum
  // 中间从右到左最大值+中间从左到右最大值
}

function _maxSubArray(nums, left, right) {
  if (left === right) {
    // 递归终止条件，分到不能再分了，
    return nums[left]
  }

  const mid = Math.floor((left + right) / 2)
  const lsum = _maxSubArray(nums, left, mid) // 左边最大子序和(最后一行代码return的值作为上一级的左边最大值（从末尾节点上来的崽第一步就return了）)
  const rsum = _maxSubArray(nums, mid + 1, right) // 右边最大子序和
  const cross = crossSum(nums, left, right, mid) // 合并左右的之后的最大子序和
  return Math.max(lsum, rsum, cross) // 返回3中子序和中最大的和（作为递归上一级的左边做大和），中间从右到左最大值+中间从左到右最大值
}

var maxSubArray = function (nums) {
  return _maxSubArray(nums, 0, nums.length - 1)
}

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])

// 思路：不断分割，直到每个部分都是一个数字为止left===right开始回溯，然后不断合并，返回左右和左右合并之后，3个最大子序和中的最大的一个
// 复杂度：时间复杂度O(nlogn)，二分复杂度O(logn)，二分之后每一层统计左右和合并之后的最大子序和复杂度是O(n)，所以之后的复杂度是O(nlogn)。空间复杂度O(logn)，递归的栈空间，因为是二分，每次数据规模减半

// 整体流程：
// 不断分割，直到每个部分都是一个数字left===right为止开始回溯把每部分的值作为 lsum 和 rsum 和cross进行比较；
// cross是中间从右到左最大值+中间从左到右最大值的和
// 将前面比对的最大值返回到上一级 lsum 或者 rsum 中，继续和cross进行比较
// 。。。
