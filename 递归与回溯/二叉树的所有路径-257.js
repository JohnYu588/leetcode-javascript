let TreeNode = require("../工具/二叉树.js")

let binaryTreePaths = function (root) {
  let res = []
  let dfs = (node, path = "") => {
    if (!node) {
      return
    }

    let newPath = path ? `${path}->${node.val}` : `${node.val}` // 前面的newPath作为后面的path
    if (!node.left && !node.right) {
      res.push(newPath) // 一个子树遍历完，遍历另一个子树
    }

    dfs(node.left, newPath)
    dfs(node.right, newPath)
  }
  dfs(root)
  return res
}

var t = new TreeNode(1)
t.left = new TreeNode(2)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(5)

t.right = new TreeNode(3)

console.log(binaryTreePaths(t))
