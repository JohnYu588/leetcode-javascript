// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列

// 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// 输出：true

// 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
// 输出：false

searchMatrix = (matrix, target) => {
  if (matrix.length === 0 || matrix[0].length === 0) return false
  //  选择右上角的点为起点：往左比它小，往下比它大
  for (let i = matrix.length - 1, j = 0; j < matrix[0].length && i >= 0; ) {
    if (matrix[i][j] == target) return true
    else if (matrix[i][j] > target) i-- // 如果目标值比他大就往左
    else j++ // 如果目标值比他小就往下
  }
  return false
}

console.log(
  //   searchMatrix(
  //     [
  //       [1, 4, 7, 11, 15],
  //       [2, 5, 8, 12, 19],
  //       [3, 6, 9, 16, 22],
  //       [10, 13, 14, 17, 24],
  //       [18, 21, 23, 26, 30],
  //     ],
  //     5
  //   )
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20
  )
)

// https://blog.csdn.net/weixin_45798993/article/details/126223674
