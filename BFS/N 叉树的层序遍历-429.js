var levelOrder = function (root) {
  if (!root) {
    return []
  }

  const ans = []
  const queue = [root]

  while (queue.length) {
    const cnt = queue.length
    const level = []
    for (let i = 0; i < cnt; ++i) {
      const cur = queue.shift() // 父节点全部遍历完,将子节点添加到queue,把子节点当作新的父节点,重新开始遍历子节点
      level.push(cur.val) // 已经遍历完的节点
      for (const child of cur.children) {
        queue.push(child) // 需要遍历的子节点
      }
    }
    ans.push(level) // 已经遍历完的节点先添加到answer
  }

  return ans
}

// 链接：https://leetcode.cn/problems/n-ary-tree-level-order-traversal/solution/n-cha-shu-de-ceng-xu-bian-li-by-leetcode-lxdr/

console.log(levelOrder([1, null, 3, 2, 4, null, 5, 6]))
// [[1],[3,2,4],[5,6]]

// 思路与算法

// 对于「层序遍历」的题目，我们一般使用广度优先搜索。在广度优先搜索的每一轮中，我们会遍历同一层的所有节点。

// 具体地，我们首先把根节点 root 放入队列中，随后在广度优先搜索的每一轮中，我们首先记录下当前队列中包含的节点个数（记为 cnt），即表示上一层的节点个数。
// 在这之后，我们从队列中依次取出节点，直到取出了上一层的全部 cnt 个节点为止。当取出节点 cur 时，我们将 cur 的值放入一个临时列表，再将 cur 的所有子节点全部放入队列中。

// 当这一轮遍历完成后，临时列表中就存放了当前层所有节点的值。这样一来，当整个广度优先搜索完成后，我们就可以得到层序遍历的结果。
