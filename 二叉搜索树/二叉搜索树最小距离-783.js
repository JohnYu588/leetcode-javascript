let TreeNode = require("../工具/二叉树.js")

var minDiffInBST = function (root) {
  let ans = Number.MAX_SAFE_INTEGER,
    pre = -1 // 全局共享一份，每个闭包都有
  const dfs = (root) => {
    if (root === null) {
      return
    }
    dfs(root.left)
    if (pre !== -1) {
      ans = Math.min(ans, root.val - pre) // 总共执行4次
    }
    pre = root.val // 访问右节点之前才会赋值pre
    dfs(root.right)
  }
  dfs(root)
  return ans
}

var t = new TreeNode(4)
t.left = new TreeNode(2)
t.left.left = new TreeNode(1) // null也有一个空节点
t.left.right = new TreeNode(3)

t.right = new TreeNode(6)

console.log(minDiffInBST(t))
// https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/solution/er-cha-sou-suo-shu-jie-dian-zui-xiao-ju-8u87w/
// https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/solution/fu-xue-ming-zhu-fen-xiang-er-cha-shu-san-aj2m/
/*
二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树：
 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；

 因此中序遍历合适，最后只要用左子树的最大值（最近左节点的最右节点）和根结点做比较就是左子树和根结点的最小差值；（这里为什么不求根节点和他左子树的第一个节点，也是因为左子树下面的右子节点都比它大）

 实际上每个点也都回溯回去了，只不过是在回溯到根结点之前，pre一直在左子树的最底下的右节点（因为其他的回溯都被直接return不做任何操作，一直回溯 dfs(root.right)）
 直到执行到根结点的右边一个子节点时，pre又重新变成了根节点
*/
