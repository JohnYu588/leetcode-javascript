// 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
// 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
// 返回获得利润的最大值。
// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费

// 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出：8
// 解释：能够达到的最大利润:
// 在此处买入 prices[0] = 1
// 在此处卖出 prices[3] = 8
// 在此处买入 prices[4] = 4
// 在此处卖出 prices[5] = 9
// 总利润: ((8 - 1) - 2)[买入卖出一次交易花费2元手续费] + ((9 - 4) - 2) = 8
var maxProfit = function (prices, fee) {
  let result = 0
  let minPrice = prices[0] // 记录最低价格
  for (let i = 1; i < prices.length; i++) {
    // 情况二：相当于买入
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    }

    // 情况三：保持原有状态（因为此时买则不便宜，卖则亏本）
    if (prices[i] >= minPrice && prices[i] <= minPrice + fee) {
      continue
    }

    // 计算利润，可能有多次计算利润，最后一次计算利润才是真正意义的卖
    if (prices[i] > minPrice + fee) {
      result += prices[i] - minPrice - fee
      // 买入和卖出只需要支付一次手续费
      minPrice = prices[i] - fee // 情况一，这一步很关键
    }
  }
  return result
}
// 本题有了手续费，就要关系什么时候买卖了，因为计算所获得利润，需要考虑买卖利润可能不足以手续费的情况。
// 如果使用贪心策略，就是最低值买，最高值（如果算上手续费还盈利）就卖。
// 此时无非就是要找到两个点，买入日期，和卖出日期。

// 买入日期：其实很好想，遇到更低点就记录一下。
// 卖出日期：这个就不好算了，但也没有必要算出准确的卖出日期，只要当前价格大于（最低价格+手续费），就可以收获利润，至于准确的卖出日期，就是连续收获利润区间里的最后一天（并不需要计算是具体哪一天）。
// 所以我们在做收获利润操作的时候其实有三种情况：

// 情况一：收获利润的这一天并不是收获利润区间里的最后一天（不是真正的卖出，相当于持有股票），所以后面要继续收获利润。
// 情况二：前一天是收获利润区间里的最后一天（相当于真正的卖出了），今天要重新记录最小价格了。
// 情况三：不作操作，保持原有状态（买入，卖出，不买不卖）

// 从代码中可以看出对情况一的操作，因为如果还在收获利润的区间里，表示并不是真正的卖出，而计算利润每次都要减去手续费，所以要让minPrice = prices[i] - fee;，
// 这样在明天收获利润的时候，才不会多减一次手续费！
// 大家也可以发现，情况三，那块代码是可以删掉的，我是为了让代码表达清晰，所以没有精简

// 链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/714-mai-mai-gu-piao-tan-xin-dong-gui-xia-p3h1/
