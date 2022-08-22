const updateBoard = (board, click) => {
  const m = board.length
  const n = board[0].length
  const dx = [1, 1, 1, -1, -1, -1, 0, 0]
  const dy = [1, 0, -1, 0, 1, -1, 1, -1] // 四周的点 [1,1][1,0][1,-1]...
  const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n // 辅助函数,没超出范围

  const update = (x, y) => {
    if (!inBound(x, y) || board[x][y] != "E") return // 不在界内或不是E(空地)说明已经挖过，直接返回
    let count = 0
    for (let i = 0; i < 8; i++) {
      // 周围一共8个点
      // 统计周围雷的个数
      const nX = x + dx[i]
      const nY = y + dy[i]
      if (inBound(nX, nY) && board[nX][nY] == "M") {
        // 代表未挖出的地雷数量
        count++
      }
    }
    if (count == 0) {
      // 如果周围没有雷，标记B，递归周围的点
      board[x][y] = "B"
      for (let i = 0; i < 8; i++) {
        update(x + dx[i], y + dy[i])
      }
    } else {
      board[x][y] = count + "" // 如果一个 至少与一个地雷相邻 的空方块（'E'）被挖出，修改它为数字（'1' 到 '8' ），表示相邻地雷的数量。
    }
  }

  const [cX, cY] = click
  if (board[cX][cY] == "M") {
    // 第一下就踩雷了
    board[cX][cY] = "X"
  } else {
    update(cX, cY) // 开启dfs
  }
  return board
}

console.log(
  updateBoard(
    [
      ["E", "E", "E", "E", "E"],
      ["E", "E", "M", "E", "E"],
      ["E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E"],
    ],
    [3, 0]
  )
)

//   链接：https://leetcode.cn/problems/minesweeper/solution/dfs-he-bfs-jie-fa-bu-xu-yao-e-wai-kai-pi-kong-jian/
// 思路
// 点开一个点，要么是雷，要么不是：

// 点到 M，踩雷了，更新为X，游戏结束。
// 点到 E，空地，分两种情况：
// 周围 8 个格子有雷，更新为雷数。
// 周围 8 个格子没有雷，更新为 B，并继续探测这 8 个格子。
// 关键就是这个继续探测，就是一种搜索，有 DFS、BFS 两种实现方式。

// DFS
// 无论是 DFS 还是 BFS，都要避免重复访问，这里怎么避免呢？
// 我们每访问一个 E，都会更新标记，不再是 E，下次再访问就直接返回。
// 不用再开辟空间去存访问过的节点，已经把访问信息就地存储了。
