let TreeNode = require("../工具/二叉树.js")

// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/solution/javadi-gui-qiu-er-cha-shu-de-zui-xiao-sh-8x89/
// https://blog.csdn.net/abcdef314159/article/details/106489263

var minDepth = function (root) {
  if (root == null) return 0
  //如果左子树等于空，我们返回右子树的最小高度+1【因为也算这个父节点所在分支的高度啊（他只有这个分支了，只有这一条路下来）】
  if (root.left == null) {
    return minDepth(root.right) + 1
  }
  //如果右子树等于空，我们返回左子树的最小高度+1
  if (root.right == null) {
    return minDepth(root.left) + 1
  }
  //如果左右子树都不为空，我们返回左右子树深度最小的那个+1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
// 其实递归就应该正向读

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.left.left = new TreeNode(null) // null也有一个空节点
t.left.right = new TreeNode(null)

t.right = new TreeNode(20)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(minDepth(t))
