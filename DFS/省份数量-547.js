var findCircleNum = function (isConnected) {
  //城市的数量
  const cities = isConnected.length
  //表示哪些城市被访问过
  const visited = new Set()
  let provinces = 0 //相连的城市数量，也就是省份
  //遍历所有的城市
  for (let i = 0; i < cities; i++) {
    //如果当前城市没有被访问过，说明是一个新的省份，count
    //要加1，并且和这个城市相连的都标记为已访问过，也就是
    //同一省份的
    if (!visited.has(i)) {
      dfs(isConnected, visited, cities, i)
      provinces++
    }
  }
  //返回省份的数量
  return provinces
}

const dfs = (isConnected, visited, cities, i) => {
  for (let j = 0; j < cities; j++) {
    if (isConnected[i][j] == 1 && !visited.has(j)) {
      //如果第i和第j个城市相连，说明他们是同一个省份的，把它标记为已访问过
      visited.add(j)
      //然后继续查找和第j个城市相连的城市
      dfs(isConnected, visited, cities, j)
    }
  }
}

console.log(
  findCircleNum([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ])
)

// [0,0] [1,1] [2,3]本身一个城市,但是[0,1][1,0]是1说明1，0城市相连在一个省份，所以结果为2

// 作者：LeetCode-Solution
// 链接：https://leetcode.cn/problems/number-of-provinces/solution/sheng-fen-shu-liang-by-leetcode-solution-eyk0/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
