const maxProfit = (prices) => {
  if (prices == null || prices.length < 2) {
    return 0
  }
  let dp = Array.from(Array(prices.length), () => Array(2 * 2 + 1).fill(0)) // 5行5列【2 * k + 1买入卖出的总次数】的二维数组
  for (let j = 1; j < 2 * 2; j += 2) {
    dp[0][j] = -prices[0]
  }
  for (let i = 1; i < prices.length; i++) {
    for (let j = 0; j < 2 * 2; j += 2) {
      // 这里要类比j为奇数是买，偶数是卖的状态。
      dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i]) // 第i天没有操作和第i天买入股票选最大
      dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i]) // 第i天没有操作和第i天卖出股票选最大
    }
  }
  // 最后一次卖出，一定是利润最大的，dp[prices.size() - 1][2 * k]即红色部分就是最后求解
  return dp[prices.length - 1][2 * 2]
}
console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])) // 7

// 把188的k变成2就好了

// 链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/solution/123-mai-mai-gu-piao-de-zui-jia-shi-ji-ii-zfh9/

/* 题目：

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。

示例 2：
输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

示例 3：
输入：prices = [7,6,4,3,1]
输出：0
解释：在这个情况下, 没有交易完成, 所以最大利润为 0。

示例 4：
输入：prices = [1]
输出：0
链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii
 */
