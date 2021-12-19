class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

var serialize = function (root) {
  if (root === null) {
    return "X"
  }
  const left = serialize(root.left)
  const right = serialize(root.right)
  return root.val + "," + left + "," + right
}

// var t = new TreeNode(1)
// t.left = new TreeNode(2)
// t.right = new TreeNode(3)
// t.right.left = new TreeNode(4)
// t.right.right = new TreeNode(5)

// console.log(serialize(t))

var deserialize = function (data) {
  const list = data.split(",")
  const buildTree = (list) => {
    const rootVal = list.shift()
    if (rootVal === "X") {
      return null
    }
    let root = new TreeNode(rootVal)
    root.left = buildTree(list)
    root.right = buildTree(list)
    return root
  }
  return buildTree(list)
}

console.log(deserialize("1,2,X,X,3,4,X,X,5,X,X"))

// https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/solution/shou-hui-tu-jie-gei-chu-dfshe-bfsliang-chong-jie-f/
