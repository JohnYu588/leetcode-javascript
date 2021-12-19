let TreeNode = require("../工具/二叉树.js")

var lowestCommonAncestor = function (root, p, q) {
  if (root == null || root == p || root == q) return root
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  // 当 left 和 right 同时为空 ：说明 root 的左 / 右子树中都不包含 p,q ，返回 null ；
  if (left == null && right == null) return null
  // 当 left 为空 ，right 不为空 ：p,q 都不在 root 的左子树中，直接返回 right 。具体可分为两种情况：
  // p,q 其中一个在 root 的 右子树 中，此时 right 指向 p（假设为 p ）；
  // p,q 两节点都在 root 的 右子树 中，此时的 right 指向 最近公共祖先节点
  if (left == null) return right
  // 当 left 不为空 ， right 为空 ：与上面同理；
  if (right == null) return left
  // 当 left 和 right 同时不为空 ：说明 p, q 分列在 root 的 异侧 （分别在 左 / 右子树），因此 root 为最近公共祖先，返回 root ；
  return root
}

var t = new TreeNode(3)
t.left = new TreeNode(5)
t.left.left = new TreeNode(6)
t.left.right = new TreeNode(2)
t.left.left.left = new TreeNode(null)
t.left.left.right = new TreeNode(null)
t.left.right.left = new TreeNode(7)
t.left.right.right = new TreeNode(4)

t.right = new TreeNode(1)
t.right.left = new TreeNode(0)
t.right.right = new TreeNode(8)

console.log(lowestCommonAncestor(t, 5, 1))

// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/236-er-cha-shu-de-zui-jin-gong-gong-zu-xian-hou-xu/
// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/236-er-cha-shu-de-zui-jin-gong-gong-zu-xian-di-g-2/
// 看第三个链接应该是后序遍历
