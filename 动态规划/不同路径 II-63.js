// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
// 网格中的障碍物和空位置分别用 1 和 0 来表示。

// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// 输出：2
// 解释：3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右

// 链接：https://leetcode.cn/problems/unique-paths-ii

var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = Array(m)
    .fill()
    .map((item) => Array(n).fill(0))

  for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
    dp[i][0] = 1
  }

  for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
    // [0][1] === 1结束循环，后面的点还是0
    dp[0][i] = 1
  }
  // [1, 0, 0, 0]
  // [1, 0, 0, 0]
  // [1, 0, 0, 0]
  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1] // 到障碍点的路线为0
    }
  }

  return dp[m - 1][n - 1]
  // [1, 0, 0, 0]
  // [1, 0, 0, 0]
  // [1, 1, 1, 1]
}

// 链接：https://leetcode.cn/problems/unique-paths-ii/solution/dai-ma-sui-xiang-lu-63-bu-tong-lu-jing-i-dha9/

console.log(
  uniquePathsWithObstacles([
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ])
)
// 但就算是做过62.不同路径，在做本题也会有感觉遇到障碍无从下手。
// 其实只要考虑到，遇到障碍dp[i][j]保持0就可以了。
// 初始化的部分，障碍之后应该都是0。
