const dx = [0, 1, 0, -1]
const dy = [1, 0, -1, 0] // 0和1、1和0、0和-1、-1和0，四个方向分别对应下右上左
const longestIncreasingPath = (matrix) => {
  if (matrix.length == 0) return 0 // 矩阵中没有元素
  const m = matrix.length
  const n = matrix[0].length
  const memo = new Array(m)
  for (let i = 0; i < m; i++) memo[i] = new Array(n)
  let res = 1 // 路径长度至少为1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 对坐标(i,j)进行dfs
      res = Math.max(res, dfs(matrix, i, j, m, n, memo))
    }
  }
  return res
}

const dfs = (matrix, i, j, m, n, memo) => {
  if (memo[i][j]) return memo[i][j]
  let max = 1 // 以(i,j)为起点的路径，长度保底是1
  for (let k = 0; k < 4; k++) { // 4代表4个方向分别访问下右上左
    const x = i + dx[k]
    const y = j + dy[k] // 新的坐标
    if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
      max = Math.max(max, 1 + dfs(matrix, x, y, m, n, memo))
    }
  }
  return (memo[i][j] = max)
}

console.log(
  longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ]) // 4;最长递增路径为 [1, 2, 6, 9]
)
// [[3,4,5],[3,2,6],[2,2,1]] //  4;最长递增路径为 [3, 4, 5, 6]

// 链接：https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/solution/ji-yi-hua-di-gui-329-ju-zhen-zhong-de-zui-chang-di/
// 思路
// 遍历矩阵中的每个元素，计算以当前元素为起点的满足要求的最长路径长度
// 因为遍历每个元素，并且dfs的方向是上下左右，有些元素会被重复地访问，我们可以用一个 memo 数组去记录当前元素的dfs计算结果，下次再次访问该元素时就直接返回 memo 中的值，就不用重复地递归调用了
// 复杂度
// 矩阵元素遍历了一遍，时间复杂度是O(m*n), m是行数，n是列数
// 空间复杂度 O(m*n)
