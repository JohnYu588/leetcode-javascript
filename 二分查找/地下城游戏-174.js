// 说明的是dfs算法（深度优先搜索），没看到二分查找解法
const calculateMinimumHP = (dungeon) => {
  const m = dungeon.length
  const n = dungeon[0].length
  // memo初始化，每一项都为0，代表还没记录
  const memo = new Array(m)
  for (let i = 0; i < m; i++) {
    memo[i] = new Array(n).fill(0)
  }
  const minSaveHP = (dungeon, i, j) => {
    if (i == m - 1 && j == n - 1) {
      // 递归的出口
      return dungeon[i][j] > 0 ? 1 : 1 - dungeon[i][j]
    }
    if (memo[i][j] > 0) return memo[i][j] // 如果备忘录中有，就直接返回它
    let goDown = Infinity,
      goRight = Infinity
    if (i < m - 1)
      // 走下方的点，需要带着的最小安全血量
      goDown = minSaveHP(dungeon, i + 1, j)
    if (j < n - 1)
      // 走右方的点，需要带着的最小安全血量
      goRight = minSaveHP(dungeon, i, j + 1)
    if (goDown < goRight) {
      if (goDown - dungeon[i][j] <= 0) {
        memo[i][j] = 1
      } else {
        memo[i][j] = goDown - dungeon[i][j]
      }
    } else {
      if (goRight - dungeon[i][j] <= 0) {
        memo[i][j] = 1
      } else {
        memo[i][j] = goRight - dungeon[i][j]
      }
    }
    return memo[i][j]
  }
  return minSaveHP(dungeon, 0, 0)
}

console.log(
  calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5],
  ])
)

// https://leetcode-cn.com/problems/dungeon-game/solution/fei-dp-xiang-jie-dfsjie-fa-yi-ji-ta-de-you-hua-by-/
/**
 * 备忘录作用：
 * 比如1,0 2,0 2,1 2,2走过的2,1在下面能用
 * 而1,0 1,1 2,1 2,2 走过的 1,1
 * 在0,1 1,1 2,1 2,2 路线走到1,1的时候也能直接从数组中取直接return给0,1 因为这个血量已经是走到1,1这个节点所需的最小血量了
 * （因为赋值到memo的都是已经走过的，对比过godown和goRight取小的值存进去并且return出去的）
 * 因为是走完下半部分（优先走下，然后走右，右边全部走完回溯） 再走上半部分 所以下半部分的最优步骤已经算好了 上面部分只要取用就好了
 */
