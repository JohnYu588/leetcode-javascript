var levelOrder = function (root) {
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length > 0) {
    let len = queue.length
    let arr = []
    while (len) {
      let node = queue.shift()
      arr.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
      len--
    }
    res.push(arr)
  }
  return res
}

console.log(levelOrder([3, 9, 20, null, null, 15, 7]))
// [[3],[9,20],[15,7]]

// 和429几乎一样
// 链接：https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/yan-du-you-xian-sou-suo-by-shetia/
