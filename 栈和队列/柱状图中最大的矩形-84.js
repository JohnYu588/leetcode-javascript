/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const stack = []
  heights = [0, ...heights, 0]
  let maxArea = 0
  for (let i = 0; i < heights.length; i++) {
    while (heights[i] < heights[stack[stack.length - 1]]) {
      const index = stack.pop()
      maxArea = Math.max(
        maxArea,
        (i - stack[stack.length - 1] - 1) * heights[index]
      )
    }
    stack.push(i)
  }
  return maxArea
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/wo-yong-qiao-miao-de-bi-yu-jiang-dan-diao-zhan-jie/
