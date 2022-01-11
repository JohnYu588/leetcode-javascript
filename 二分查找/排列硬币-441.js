var arrangeCoins = function (n) {
  let left = 1,
    right = n
  while (left < right) {
    // Math.floor()向下取整--  3/2=1.5； Math.floor(3/2)=1
    // 先加1再除以2是因为如果不+1的话，是向下取整的，也就是偏左，而本题中对左值的处理是 left=mid ，会造成死循环
    const mid = Math.floor((right - left + 1) / 2) + left
    if (mid * (mid + 1) <= 2 * n) {
      left = mid
    } else {
      right = mid - 1
    }
  }
  return left
}

//https://leetcode-cn.com/problems/arranging-coins/solution/pai-lie-ying-bi-by-leetcode-solution-w52c/

// 之所以 +1，-1的根本目的就是让mid不会和left或者right叠加，让区间能减少：

// 当区间只剩下两个元素的时候，left = mid 和 right = mid - 1 这种划分方式，如果 mid 使用默认下取整的方式，
// 在数值上 left = mid，而它对应的其中一个区间是 [mid..right]，在这种情况下，下一轮搜索区间还是 [left..right]，
// 搜索区间没有减少，会进入死循环。

// 同样的，mid如果不减1，当区间只剩下两个元素的时候，[left..mid],在这种情况下，下一轮搜索区间还是 [left..right]，
// 搜索区间没有减少，会进入死循环。

// const mid = Math.floor((right - left) / 2) + left
// if (mid * (mid + 1) <= 2 * n) {
//   left = mid +1
// }

// 这样会有问题，因为mid === left是最终结果，如果left+1会让结果+1了
