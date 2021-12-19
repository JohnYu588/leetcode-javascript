let TreeNode = require("../工具/二叉树.js")

var isValidBST = function (root) {
  let ans = true, // 结果
    flag = -1, //-1 左 1右
    pre = -Infinity,
    leftPre = Infinity
  const dfs = (root) => {
    if (root === null) {
      return
    }
    if (leftPre !== -1) {
      if (leftPre <= root.val && flag === -1) {
        // 往左节点走比较root和root.left
        ans = false
      }
    }
    leftPre = root.val // 访问右节点之前才会赋值pre
    flag = -1
    dfs(root.left)
    if (pre >= root.val) {
      // 往右节点走比较root和root.right
      ans = false
    }
    pre = root.val // 访问右节点之前才会赋值pre
    flag = 1
    dfs(root.right)
  }
  dfs(root)
  return ans
}
//https://leetcode-cn.com/problems/validate-binary-search-tree/solution/zhong-xu-bian-li-qing-song-na-xia-bi-xu-miao-dong-/

// var t = new TreeNode (5)
// t.left = new TreeNode(1)
// t.left.left = new TreeNode(3) // null也有一个空节点
// t.left.right = new TreeNode(6)
// t.right = new TreeNode(4)

var t = new TreeNode(2)
t.left = new TreeNode(1)
t.right = new TreeNode(3)

console.log(isValidBST(t))
