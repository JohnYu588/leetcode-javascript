// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
var solveNQueens = function (n) {
  function isValid(row, col, chessBoard, n) {
    for (let i = 0; i < row; i++) {
      if (chessBoard[i][col] === "Q") {
        return false
      }
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessBoard[i][j] === "Q") {
        return false
      }
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (chessBoard[i][j] === "Q") {
        return false
      }
    }
    return true
  }

  function transformChessBoard(chessBoard) {
    let chessBoardBack = []
    chessBoard.forEach((row) => {
      let rowStr = ""
      row.forEach((value) => {
        rowStr += value
      })
      chessBoardBack.push(rowStr)
    })

    return chessBoardBack
  }

  let result = []
  function backtracing(row, chessBoard) {
    if (row === n) {
      result.push(transformChessBoard(chessBoard))
      return
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, chessBoard, n)) {
        chessBoard[row][col] = "Q"
        backtracing(row + 1, chessBoard)
        chessBoard[row][col] = "."
      }
    }
  }
  let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill("."))
  backtracing(0, chessBoard)
  return result
}

// 链接：https://leetcode.cn/problems/n-queens/solution/dai-ma-sui-xiang-lu-51-n-queenshui-su-fa-2k32/
// 回溯三部曲
// 按照我总结的如下回溯模板，我们来依次分析：
// void backtracking(参数) {
//     if (终止条件) {
//         存放结果;
//         return;
//     }
//     for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
//         处理节点;
//         backtracking(路径，选择列表); // 递归
//         回溯，撤销处理结果
//     }
// }
// 递归函数参数
// 我依然是定义全局变量二维数组result来记录最终结果。
// 参数n是***的大小，然后用row来记录当前遍历到棋盘的第几层了。

// 代码如下：
// vector<vector<string>> result;
// void backtracking(int n, int row, vector<string>& chessboard) {
// 递归终止条件
// 在如下树形结构中：

// 可以看出，当递归到棋盘最底层（也就是叶子节点）的时候，就可以收集结果并返回了。

// 代码如下：
// if (row == n) {
//     result.push_back(chessboard);
//     return;
// }
// 单层搜索的逻辑
// 递归深度就是row控制棋盘的行，每一层里for循环的col控制棋盘的列，一行一列，确定了放置皇后的位置。

// 每次都是要从新的一行的起始位置开始搜，所以都是从0开始。

// 代码如下：
// for (int col = 0; col < n; col++) {
//     if (isValid(row, col, chessboard, n)) { // 验证合法就可以放
//         chessboard[row][col] = 'Q'; // 放置皇后
//         backtracking(n, row + 1, chessboard);
//         chessboard[row][col] = '.'; // 回溯，撤销皇后
//     }
// }
// 验证***是否合法
// 按照如下标准去重：

// 不能同行
// 不能同列
// 不能同斜线 （45度和135度角）
// 代码如下：

// bool isValid(int row, int col, vector<string>& chessboard, int n) {
//     int count = 0;
//     // 检查列
//     for (int i = 0; i < row; i++) { // 这是一个剪枝
//         if (chessboard[i][col] == 'Q') {
//             return false;
//         }
//     }
//     // 检查 45度角是否有皇后
//     for (int i = row - 1, j = col - 1; i >=0 && j >= 0; i--, j--) {
//         if (chessboard[i][j] == 'Q') {
//             return false;
//         }
//     }
//     // 检查 135度角是否有皇后
//     for(int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
//         if (chessboard[i][j] == 'Q') {
//             return false;
//         }
//     }
//     return true;
// }
// 在这份代码中，细心的同学可以发现为什么没有在同行进行检查呢？

// 因为在单层搜索的过程中，每一层递归，只会选for循环（也就是同一行）里的一个元素，所以不用去重了。
