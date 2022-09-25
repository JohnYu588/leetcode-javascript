// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
// 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

// 示例 1：
// 输入：nums = [2,3,2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

// 示例 2：
// 输入：nums = [1,2,3,1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
// 偷窃到的最高金额 = 1 + 3 = 4 。
const rob = (nums) => {
  if (nums.length === 1) {
    return nums[0]
  }
  // 数组长度
  const len = nums.length - 1
  // 获得不偷第一家的数组
  const nums1 = nums.slice(1)
  // 获得不偷最后一家的数组
  const nums2 = nums.slice(0, nums.length - 1)
  // dp1数组初始化
  const dp1 = [nums1[0], Math.max(nums1[0], nums1[1])]
  // dp2数组初始化
  const dp2 = [nums2[0], Math.max(nums2[0], nums2[1])]
  // 从下标2开始遍历
  for (let i = 2; i < len; i++) {
    dp1[i] = Math.max(dp1[i - 2] + nums1[i], dp1[i - 1])
  }
  for (let i = 2; i < len; i++) {
    dp2[i] = Math.max(dp2[i - 2] + nums2[i], dp2[i - 1])
  }
  return Math.max(dp1[len - 1], dp2[len - 1])
}

// var rob = function (nums) {
//     // 边界情况判断
//     if(nums.length < 1) {
//         return 0
//     }
//     if(nums.length == 1) {
//         return nums[0]
//     }
//     // 获得不偷第一家的数组
//     let arr1 = nums.slice(1)
//     // 获得不偷最后一家的数组
//     let arr2 = nums.slice(0, nums.length - 1)

//     // 创建dp数组
//     let opt1 = new Array(arr1.length).fill(0)
//     let opt2 = new Array(arr2.length).fill(0)

//     opt1[0] = arr1[0]
//     opt2[0] = arr2[0]
//     // 循环遍历获得两种情况分别的最大值
//     for (let i = 1; i < arr1.length; i++) {
//         opt1[i] = Math.max(opt1[i - 1], opt1[i - 2] ? (opt1[i - 2] + arr1[i]) : arr1[i])
//     }
//     for (let i = 1; i < arr2.length; i++) {
//         opt2[i] = Math.max(opt2[i - 1], opt2[i - 2] ? (opt2[i - 2] + arr2[i]) : arr2[i])
//     }
//     // 返回两种情况的最大值
//     return Math.max(opt1[opt1.length - 1], opt2[opt2.length - 1])
// };

// 示例 3：
// 输入：nums = [1,2,3]
// 输出：3

// dp[i]表示前i天（包括第i天）打劫的最大收益

// 最大收益有三种情况：
// 1、前天的收益加上今天的收益
// 2、假如昨天不抢的话（即减去昨天的收益），再加上今天的收益
// 3、今天就不抢了，还维持昨天的最大收益
// dp[i] = Math.max(dp[i-2], dp[i-1]-nums[i-1]) + nums[i];
// dp[i] = Math.max(dp[i], dp[i-1]);

// 链接：https://leetcode.cn/problems/house-robber-ii/solution/javascriptban-jie-ti-si-lu-by-ityou-o-fvd2/
