let TreeNode = require("../工具/二叉树.js")

var rangeSumBST = function (root, low, high) {
  if (!root) {
    return 0
  }
  if (root.val > high) {
    return rangeSumBST(root.left, low, high)
  }
  if (root.val < low) {
    return rangeSumBST(root.right, low, high)
  }
  return (
    root.val +
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high)
  )
}

var t = new TreeNode(10)
t.left = new TreeNode(5)
t.left.left = new TreeNode(3)
t.left.right = new TreeNode(7)

t.right = new TreeNode(15)
t.right.right = new TreeNode(18)

console.log(rangeSumBST(t, 7, 15))

// https://leetcode-cn.com/problems/range-sum-of-bst/solution/hua-jie-suan-fa-938-er-cha-sou-suo-shu-de-fan-wei-/
