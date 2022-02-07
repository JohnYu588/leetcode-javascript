// 总结
// 解决拓扑排序问题

// 根据依赖关系，构建邻接表、和入度数组
// 选取入度为 0 的数据，根据邻接表，减小依赖它的数据的入度
// 找出新入度为 0 的数据，重复第 2 步
// 直至所有数据的入度为 0，得到排序，如果还有数据的入度没有变到 0，说明存在环形依赖

// 和 传统BFS 不一样的地方
// 传统BFS：把出列节点的下一层子节点推入 queue，不加甄别
// 拓扑排序：实施甄别和监控，新入度为 0 的先推入 queue
var findOrder = (numCourses, prerequisites) => {
  let inDegree = new Array(numCourses).fill(0) // 初始化入度数组
  let graph = {} // 哈希表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++ // 构建入度数组
    if (graph[prerequisites[i][1]]) {
      // 构建哈希表
      graph[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      let list = []
      list.push(prerequisites[i][0])
      graph[prerequisites[i][1]] = list
    }
  }
  // findOrder(4, [
  //   [1, 0],
  //   [2, 0],
  //   [3, 1],
  //   [3, 2],
  // ])
  // graph: 邻接表,依赖关系,看当前数被谁依赖,“看[i,1]被哪些[i,0](组成数组)所依赖”(0被1,2所依赖; 1被3依赖; 2被3依赖)
  // inDegree:入度数组:“看[1,2,3]在[i,0]出现过几次”(0的入度为0; 1的入度为1; 2的入度为1; 3的入度为2)
  // inDegree:[0,1,0,0] else:graph = {0:[1]}
  // inDegree:[0,1,1,0] if:graph = {0:[1,2]}
  // inDegree:[0,1,1,1] else:graph = {0:[1,2],1:[3]}
  // inDegree:[0,1,1,2] else:graph = {0:[1,2],1:[3],2:[3]}

  let res = [] // 结果数组
  let queue = [] // 存放 入度为0的课
  for (let i = 0; i < numCourses; i++) {
    // 起初推入所有入度为0的课
    if (inDegree[i] === 0) queue.push(i)
  }
  while (queue.length) {
    // 没有了入度为0的课，没课可选，结束循环
    let cur = queue.shift() // 出栈，代表选这门课
    res.push(cur) // 推入结果数组
    let toEnQueue = graph[cur] // 查看哈希表，获取对应的后续课程
    if (toEnQueue && toEnQueue.length) {
      // 确保有后续课程
      for (let i = 0; i < toEnQueue.length; i++) {
        // 遍历后续课程
        inDegree[toEnQueue[i]]-- // 将后续课程的入度 -1
        if (inDegree[toEnQueue[i]] == 0) {
          // 一旦减到0，让该课入列
          queue.push(toEnQueue[i])
        }
      }
    }
  }
  // 0的入度为0,queue=[0],遍历queue,cur = 0,res=[0]
  // 0的后续课程是[1,2],分别把1,2的入度数组inDegree对应部分减1
  // 1的入度减1后变成0入列,queue=[1]
  // 2的入度减1后变成0入列,queue=[1,2]
  // 再次遍历queue,cur = 1,res=[0,1]
  // 1的后续课程是[3],把3的入度数组inDegree对应部分减1,此时inDegree为[0,0,0,1]
  // 再次遍历queue,cur = 2,res=[0,1,2]
  // 2的后续课程是[3],把3的入度数组inDegree对应部分减1,此时inDegree为[0,0,0,0],queue:[3]
  // 再次遍历queue,cur = 3,res=[0,1,2,3]
  // 3没有后续课程,res的长度为4,选齐了就返回res，否则返回[]

  return res.length === numCourses ? res : [] // 选齐了就返回res，否则返回[]
}
// res:[ 0, 1, 2, 3 ]
// 4的作用只是告诉程序我们有4门课程
console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ])
)
// BFS 思路
// queue 队列中始终是【入度为 0 的课】在里面流动
// 选择一门课，就让它 出列，同时 查看哈希表，看它 对应哪些后续课
// 将这些后续课的 入度 - 1，如果有 减至 0 的，就将它 推入 queue
// 不再有新的入度 0 的课入列 时，此时 queue 为空，退出循环

// https://leetcode-cn.com/problems/course-schedule-ii/solution/bao-mu-shi-ti-jie-tuo-bu-pai-xu-si-lu-zen-yao-yi-2/

// 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。

// 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
// 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。

// 示例 2：
// 输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// 输出：[0,2,1,3]
// 解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
// 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
// 示例 3：

// 一共有 n 门课要上，编号为0 ~ n-1。先决条件[1, 0]，代表必须先上课 0，才能上课 1 。给你 n 和一个先决条件表，请你判断能否完成所有课程
