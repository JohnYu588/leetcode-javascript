let TreeNode = require("../工具/二叉树.js")

var zigzagLevelOrder = function (root) {
  let q = root ? [root] : [],
    r = []
  while (q.length) {
    let l = q.length
    r.push([])
    while (l--) {
      // 遍历当前层
      let n = q.shift()
      f(r, n.val)
      // 队列里面存 3清空；存9，20清空；存15，7清空
      n.left && q.push(n.left)
      n.right && q.push(n.right)
    }
  }
  return r
}

f = (r, v) =>
  r.length & 1 ? r[r.length - 1].push(v) : r[r.length - 1].unshift(v)
// 偶数 & 1为0.基数为1。 1（001），偶数push，基数unshift
var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(zigzagLevelOrder(t))

// 作者：mantoufan
// 链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/solution/shen-du-yan-du-di-gui-die-dai-qian-zhong-nucl/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
/**
 q=[3]
 q.shift 清空q，返回3
 奇数添加3
 奇数 push 3,r[0]=[3]
 q=[9,20]
 q.shift q=[20]，返回9
 偶数 unshift 9,r[1]=[9]
 q.shift，返回20
 偶数 unshift 9,r[1]=[20,9]
 20有left和right，q=[15,7]
 q.shift q=[7]，返回15
 奇数 push 15,r[2]=[15]
 q.shift，返回7
 奇数 push 7,r[2]=[15,7]
 */

// var zigzagLevelOrder = function (root) {
//   let q = root ? [root] : [],
//     r = []
//   while (q.length) {
//     // 直到某个节点没有子节点了，跟下面的n.left && q.push(n.left), n.right && q.push(n.right)相呼应
//     let l = q.length
//     r.push([])
//     while (l--) {
//       // 遍历当前层
//       let n = q.shift() // push和shift一套模仿队列，先进先出,用pop也行，但是f方法逻辑就要反过来
//       f(r, n.val)
//       // 添加下个层级
//       n.right && q.push(n.right)
//       n.left && q.push(n.left)
//     }
//   }
//   return r
// }

// f = (r, v) =>
//   r.length % 2 ? r[r.length - 1].unshift(v) : r[r.length - 1].push(v)
