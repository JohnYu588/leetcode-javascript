var levelOrderBottom = function (root) {
  const res = []
  if (root) {
    const queue = [root]
    while (queue.length) {
      const len = queue.length
      const temp = []
      for (let i = 0; i < len; i++) {
        const node = queue.shift()
        temp.push(node.val)
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
      }
      res.unshift(temp)
    }
  }
  return res
}

/* 输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]] */
// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
// ...把102的push改成unshift就好了
