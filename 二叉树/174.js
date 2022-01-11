const calculateMinimumHP = (dungeon) => {
  const m = dungeon.length
  const n = dungeon[0].length

  const minSaveHP = (i, j) => {
    // 返回：来到点(i,j)至少要带多少血量,i纵向，j横向
    if (i == m - 1 && j == n - 1) {
      // 只需要判断最后一个节点
      // 每轮递归的出口
      // 当来到公主坐标，如果它的权重为正，以1的血量来到这里即可
      // 如果它的权重为负，则要带着 1-dungeon[i][j] 的血量来这
      // 这一步在这里都是返回6
      return dungeon[i][j] > 0 ? 1 : 1 - dungeon[i][j]
    }
    let goDown = Infinity,
      goRight = Infinity
    // 走下方的点，需要带着的最小安全血量
    if (i < m - 1) {
      goDown = minSaveHP(i + 1, j)
    }
    // 走右方的点，需要带着的最小安全血量
    if (j < n - 1) {
      goRight = minSaveHP(i, j + 1)
    }
    // 如果走下方，所需要带的血量更少
    if (goDown < goRight) {
      if (goDown - dungeon[i][j] <= 0) {
        // goDown血量，是来到(i+1,j)的稳妥血量，等于，来到(i,j)的稳妥血量 + dungeon[i][j]
        // 则，goDown血量-dungeon[i][j]，就是来到(i,j)点的稳妥血量，
        // 如果 <= 0，则要它返回 1，即来到(i,j)点的稳妥血量至少要为 1

        // 举个例子，比如从-2出发到[2,0]的安全血量为-2===来到(1,0)的稳妥血量（8） + (-5) = 3
        // 则到[1,0]:-5的稳妥血量为-2-(-5)=3
        return 1 // 题目中有说明骑士的健康血量为正整数
      } else {
        // goDown血量，是来到(i+1,j)的稳妥血量，等于，来到(i,j)的稳妥血量 + dungeon[i][j]
        // 则，goDown血量-dungeon[i][j]，就是来到(i,j)点的稳妥血量，如果 > 0
        // 则它是安全的，返回它本身即可，即 goDown血量 - dungeon[i][j]
        return goDown - dungeon[i][j]
      }
    } else {
      // 如果走右方，需要带着的血量更少。分析类似上面
      if (goRight - dungeon[i][j] <= 0) {
        return 1
      } else {
        return goRight - dungeon[i][j]
      }
    }
  }
  return minSaveHP(0, 0) // 至少需要带着多少血量来到(0,0)这点
}

console.log(
  calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5],
  ])
)
/**
 * 每个minSaveHP方法体内部都是一个闭包（自己的作用域），从最后一个节点开始，记录着回溯到这个节点能够使用最少节点的方向(godown和goRight)，
 * 他的下一步要么是godown要么是goRight，进行比较把小的返回到上个节点到goDown或者goRight变量中，
 * 最后到到全→全↓的一步回溯时，全→的回溯不再从头调用方法了，一直回溯到[0,0]节点->return minSaveHP(0, 0)返回最少血量
 */

/**
 * 总结：(正序走，每次执行到当前方法都重头走;回溯走，走到调用处，继续往下走;最后到[0,0]是因为最后一直回溯走左边不再从头执行)
 *
 * 初始化:m:3 n:3 i:0 j:0
 * 往下走到底往右走，最右边回溯goRight到最左，走到最左走完开始往上走，走到[1,0]
 * {
 * [0,0]->[1,0]->[2,0]->[2,1]->[2,2];return 6开始回溯
 * [2,1]->[2,0]->[1,0]
 * }
 * 然后又执行到了goRight = minSaveHP(i, j + 1),又开始走正序
 * {
 * [1,1]->[2,1]->[2,2];return 6开始回溯
 * [2,1]->[2,1]->[1,1]
 * }
 * 往下走goRight = minSaveHP(i, j + 1)
 * {
 * [1,2]->[2,2];return 6开始回溯
 * [1,2]->[1,1]->[1,0]->[0,0]
 * }
 * 回溯到最后一步goDown，往下执行执行到了goRight
 * {
 * [0,1]->[1,1]->[2,1]->[2,2];return 6开始回溯
 * [2,1]->[1,1]
 * }
 * 回溯到goDown，往下执行执行到了goRight
 * {
 * [1,2]->[2,2];return 6开始回溯
 * [1,2]->[1,1]->[0,1]
 * }
 * 回溯到goDown，往下执行执行到了goRight
 * {
 * [0,2]->[1,2]->[2,2];return 6开始回溯
 * [1,2]->[0,2]->[0,1]->[0,0] 返回7结束
 * }
 */