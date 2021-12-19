let TreeNode = require("../工具/二叉树.js")

var maxDepth = function (root) {
  if (!root) {
    return 0
  } else {
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1 // 看递归到某个rigth的节点的时候 是他的左节点高还是右节点高
  }
}

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.left.left = new TreeNode(null) // null也有一个空节点
t.left.right = new TreeNode(null)

t.right = new TreeNode(20)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(maxDepth(t))
// leet给题到数组 都是优先横向铺满

// 总结递归(深度优先)+回溯规则
/*
function foo(root){
  if(到最后一个节点){
    return 最后一个节点的结果
  }else{
    const left = foo(左节点)
    const right = foo(右节点)
    return left和right比较后你需要的结果
  }
}

走过路径重复可以加备忘录
 */

// https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/hua-jie-suan-fa-104-er-cha-shu-de-zui-da-shen-du-b/
// 递归+回溯
// 最后是3的左节点是2，右节点也是2
// 因为null也是一个节点 只不过他的左右节点是空
// var t = new TreeNode(3)
// t.left = new TreeNode(9)
// t.left.left = new TreeNode(null) // null也有一个空节点
// t.left.right = new TreeNode(null)

// t.right = new TreeNode(20)
// t.right.left = new TreeNode(null)
// t.right.right = new TreeNode(null)

// console.log(maxDepth(t)) // 这样结果也是3

