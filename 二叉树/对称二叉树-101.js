let TreeNode = require("../工具/二叉树.js")

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true // 空树
  let helper = (left, right) => {
    if (!left && !right) {
      // 最左和最右节点都为空为对称
      return true
    }
    if (!left || !right) {
      // 只要有一个不为空就是不对称
      return false
    }
    if (left.val === right.val) {
      return helper(left.left, right.right) && helper(left.right, right.left) // 递归判断左右子节点是否对称
    } else {
      return false
    }
  }
  return helper(root, root) // 回溯到根节点退出循环
}

var t = new TreeNode(1)
t.left = new TreeNode(2)
t.left.left = new TreeNode(3) // null也有一个空节点
t.left.right = new TreeNode(4)

t.right = new TreeNode(2)
t.right.left = new TreeNode(4)
t.right.right = new TreeNode(3)

console.log(isSymmetric(t)) // true

// https://leetcode-cn.com/problems/symmetric-tree/submissions/

// var t = new TreeNode(1)
// t.left = new TreeNode(2)
// t.left.left = new TreeNode(2) // null也有一个空节点
// t.left.right = new TreeNode(3)

// t.right = new TreeNode(4)
// t.right.left = new TreeNode(4)
// t.right.right = new TreeNode(3)

// console.log(isSymmetric(t)) // false
