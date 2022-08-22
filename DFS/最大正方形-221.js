const maximalSquare = (matrix) => {
  let m = matrix.length
  if (!m) return 0
  let n = matrix[0].length,
    res = 0,
    pre = 0
  let dp = new Array(m + 1).fill(0)
  for (let j = 0; j < n; ++j) {
    // 为了向前找，下标从1开始
    for (let i = 1; i <= m; ++i) {
      let t = dp[i]
      if (matrix[i - 1][j] == "1") {
        dp[i] = Math.min(dp[i], Math.min(dp[i - 1], pre)) + 1
        res = Math.max(res, dp[i])
      } else {
        dp[i] = 0
      }
      pre = t
    }
  }
  return res * res
}
console.log(
  maximalSquare([
    ["1", "1", "0", "1"],
    ["1", "1", "0", "0"],
    ["1", "1", "1", "1"],
    ["1", "1", "1", "1"],
  ])
)

// 原理是建立好了累加和数组后，我们开始遍历二维数组的每一个位置，对于任意一个位置 (i, j)，我们从该位置往 (0,0) 点遍历所有的正方形，正方形的个数为 min(i,j)+1，
// 由于我们有了累加和矩阵，能快速的求出任意一个区域之和，所以我们能快速得到所有子正方形之和，比较正方形之和跟边长的平方是否相等，相等说明正方形中的数字均为1，更新 res 结果即可

// 链接：https://www.cnblogs.com/grandyang/p/4550604.html
