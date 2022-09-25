// 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
// 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
// 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
// 示例 1:
// 输入: root = [3,2,3,null,3,null,1]
// 输出: 7
// 解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7

// 示例 2:
// 输入: root = [3,4,5,1,3,null,1]
// 输出: 9
// 解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
const rob = (root) => {
  // 后序遍历函数
  const postOrder = (node) => {
    // 递归出口
    if (!node) return [0, 0]
    // 遍历左子树
    const left = postOrder(node.left) // 这里left返回结果就是 最底下return的[DoNot,Do]，所以left[0] = DoNot,left[1] = Do
    // 遍历右子树
    const right = postOrder(node.right)
    // left,right 代表不同子树的 root 节点; [0],[1]表示是否打劫了 root。
    // 不偷当前节点，左右子节点都可以偷或不偷，取最大值;左子树的两个状态的较大值 + 右子树的两个状态的较大值。
    const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    // 偷当前节点，左右子节点只能不偷;root.val + 左子树的 [0] 状态 + 右子树的 [0] 状态。
    const Do = node.val + left[0] + right[0]
    // [不偷，偷]
    return [DoNot, Do]
  }
  const res = postOrder(root)
  // 返回最大值
  return Math.max(...res)
}
/**
 * [3,2,3,null,3,null,1] =>7
 * 后序遍历 [不打劫当前节点，打劫当前节点]
 *    [6,7]
 *     /  \
 * [3,2]  [1,3]
 *    \      \
 *   [0,3]  [0,1]
 */
// 动态规划（树形DP）
// 打劫一个树的最大收益，是 robIncludeRoot 和 robExcludeRoot 中的较大者。
// 即每个子树都有两个状态下的最优解：没打劫 root、和有打劫 root 下的最优解。
// 有两个变量共同决定一个状态：1、代表不同子树的 root 节点、2、是否打劫了 root。
// 可以维护一个二维数组 dp，但对象不能作为数组索引，改用 map。key 是当前子树的 root 节点，value 是存放两个状态的 res 数组。
// 没打劫根节点，则左右子树的根节点可打劫可不打劫：
// res[0] = 左子树的两个状态的较大值 + 右子树的两个状态的较大值。
// 打劫了根节点，则左右子树的根节点不能打劫：
// res[1] = root.val + 左子树的 [0] 状态 + 右子树的 [0] 状态。
// 链接：https://leetcode.cn/problems/house-robber-iii/solution/dai-ma-sui-xiang-lu-337-da-jia-jie-she-i-j60v/

// const rob = (root) => {
//   const dp = new Map()
//   // 辅助函数返回打劫以root为根节点的子树的收益
//   const helper = (root) => {
//     // 递归的出口，遍历到null节点，两种状态下收益都是0
//     if (root == null) return [0, 0]
//     // 递归调用左右子树
//     const left = helper(root.left)
//     const right = helper(root.right)
//     // 之前没遍历过当前节点
//     if (!dp.has(root)) {
//       // 在map中添加当前节点，和对应的res数组
//       dp.set(root, [0, 0])
//     }
//     // 获取当前节点对应的res数组
//     const res = dp.get(root)
//     // 将当前子树的两个状态记录到map中
//     res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
//     res[1] = root.val + left[0] + right[0]
//     // 返回出这两个状态
//     return res
//   }
//   // 递归的入口
//   const res = helper(root)
//   // 两种状态下的最优解，取其大
//   return Math.max(res[0], res[1])
// }

//   链接：https://leetcode.cn/problems/house-robber-iii/solution/si-chong-xie-fa-di-gui-ji-yi-hua-di-gui-shu-xing-d/
