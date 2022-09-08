// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]

// 输入：nums = [1]
// 输出：[[1]]
const permute = (nums) => {
  const res = []
  const used = {}

  function dfs(path) {
    if (path.length == nums.length) {
      // 个数选够了
      res.push(path.slice()) // 拷贝一份path，加入解集res
      return // 结束当前递归分支
    }
    for (const num of nums) {
      // for枚举出每个可选的选项
      // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度
      if (used[num]) continue // 使用过的，跳过
      path.push(num) // 选择当前的数，加入path
      used[num] = true // 记录一下 使用了
      dfs(path) // 基于选了当前的数，递归
      path.pop() // 上一句的递归结束，回溯，将最后选的数pop出来
      used[num] = false // 撤销这个记录
    }
  }

  dfs([]) // 递归的入口，空path传进去
  return res
}

// 链接：https://leetcode.cn/problems/permutations/solution/chou-xiang-cheng-jue-ce-shu-yi-ge-pai-lie-jiu-xian/
