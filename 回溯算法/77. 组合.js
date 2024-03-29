// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案

// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 输入：n = 1, k = 1
// 输出：[[1]]
const combine = (n, k) => {
  const res = []

  const helper = (start, path) => {
    // start是枚举选择的起点 path是当前构建的路径（组合）
    if (path.length == k) {
      res.push(path.slice()) // 拷贝一份path，推入res
      return // 结束当前递归
    }
    for (let i = start; i <= n; i++) {
      // 枚举出所有选择
      path.push(i) // 选择
      helper(i + 1, path) // 向下继续选择
      path.pop() // 撤销选择
    }
  }

  helper(1, []) // 递归的入口，从数字1开始选
  return res
}

//   链接：https://leetcsode.cn/problems/combinations/solution/shou-hua-tu-jie-jian-zhi-he-hui-su-by-xiao_ben_zhu/
