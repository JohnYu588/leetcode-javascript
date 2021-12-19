var trap = function (height) {
  let res = 0
  const stack = []
  // 这边首尾不用0，0 而是判断.length 然后break，因为是递减加0，0会影响结果（会使第一个不入栈），加太大会影响结果，最后一个加
  // height = [0, ...height, 0]
  for (let i = 0; i < height.length; ++i) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      let top = stack.pop()
      if (!stack.length) {
        break
      }
      res +=
        (Math.min(height[stack[stack.length - 1]], height[i]) - height[top]) *
        (i - stack[stack.length - 1] - 1)
    }
    stack.push(i)
  }
  return res
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
// https://leetcode-cn.com/problems/trapping-rain-water/solution/jie-yu-shui-by-leetcode-solution-tuvc/
