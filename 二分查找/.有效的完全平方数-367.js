var isPerfectSquare = function (num) {
  let l = 0
  let r = num
  let mid = 0

  while (l <= r) {
    mid = l + ((r - l) >> 1)

    if (mid ** 2 > num) {
      r = mid - 1
    } else if (mid ** 2 < num) {
      l = mid + 1
    } else {
      return true
    }
  }

  return false
}

console.log(isPerfectSquare(14))

const foo = (num) => {
  let l = 0
  let r = num
  let mid = 0

  while (l < r) {
    mid = Math.floor((r - l + 1) / 2) + l

    if (mid ** 2 < num) {
      l = mid
    } else if (mid ** 2 > num) {
      r = mid - 1
    } else {
      return true
    }
  }

  return false
}

console.log(foo(14))

// https://leetcode.cn/problems/valid-perfect-square/solution/dai-ma-jian-ji-de-jie-fa-jsban-ben-by-it-y2ku/
