/* 给你n个节点，和两两个节点相连的边的数组，返回以其中哪个节点【有多种可能】为根时能组成最小的高度数 */
// 输入：n = 4, edges = [[1,0],[1,2],[1,3]]
// 输出：[1]
// 输入：n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
// 输出：[3,4]
// TODO：难理解，先跳过
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  const degree = new Array(n).fill(0),
    connect = new Map()
  for (const edge of edges) {
    const a = edge[0],
      b = edge[1]
    degree[a]++
    degree[b]++
    var l0, l1
    if (connect.has(a)) l0 = connect.get(a)
    else l0 = new Array()
    l0.push(b)
    connect.set(a, l0)
    if (connect.has(b)) l1 = connect.get(b)
    else l1 = new Array()
    l1.push(a)
    connect.set(b, l1)
  }
  let nodes = new Array()
  for (let i = 0; i < n; i++) if (degree[i] < 2) nodes.push(i)
  while (n > 2) {
    n -= nodes.length
    const nxt = new Array()
    for (const node of nodes) {
      for (const other of connect.get(node)) {
        degree[other]--
        if (degree[other] == 1) nxt.push(other)
      }
    }
    nodes = nxt
  }
  return nodes
}

/* 解题思路
入度为1的意义
入度为1的点基本不会作为最终答案【除了只有两个点的情况】，
因为与它相连的点（入度为1所以只有这一个点）到其他点的距离，永远比它到这些点的距离小1，以相连点为根会比入度为1的点为根最小高度更小（小于等于）。
我们刨去所有入度为1的点以后，整个图有了一个新的入度，又同样有了新的一些入度为1的点，重复上面的讨论。
【入度为1的点作为根的话始终会比与他相连的点为根的树高度大】

为什么答案的点最多有两个
反证法：
假设有三个点a、b、c作为根有最小生成树，最小高度树为h。
存在点d到a的距离为h，那么b、c只能在d到a的路径上，否则d到b或c的距离会大于h，那么d到b、c的点是不足h的，【如果不在路径上，b，c为根节点不可能成为最小生成树，最小高度都是h+1】
所以必须同样存在点e到b的距离为h，a、c只能在e到b的路径上。【三个作为根节点的话另外两个根节点只能在路径上】
于是我们有了这样一个概念:
a --- b --- d
b --- a --- e
很明显只有这样构造:
e --- a --- b --- d才能满足a在be的路径上，b在ad的路径上。
那么此时c要在ad的路径上，又要在be的路径上，于是:
e --- a - c - b ---- d
我们发现什么，c到d的距离不足h，到e的距离也不足h。
还需要一个到c距离为h的点，这个点还要满足a、b到它的距离不大于h。
无论这个点在哪里，都不能保证这个距离。

作者：himymBen
链接：https://leetcode.cn/problems/minimum-height-trees/solution/pythonjavajavascriptgo-by-himymben-akh6/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
