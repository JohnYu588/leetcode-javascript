class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let q = root ? [root] : []
  let ans = []
  while (q.length) {
    ans.push([])
    let l = q.length
    while (l--) {
      let n = q.shift()
      ans[ans.length - 1].unshift(n.val)
      n.left && q.push(n.left)
      n.right && q.push(n.right)
    }
  }
  return ans
}

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(levelOrder(t))

// 同103