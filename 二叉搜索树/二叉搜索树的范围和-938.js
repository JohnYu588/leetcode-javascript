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

/* 作者：LeetCode-Solution
链接：https://leetcode.cn/problems/range-sum-of-bst/solution/er-cha-sou-suo-shu-de-fan-wei-he-by-leet-rpq7/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
