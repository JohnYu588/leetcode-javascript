const countSmaller = (nums) => {
  const len = nums.length
  if (len == 0) return nums
  const counts = new Array(len) // 放置结果
  const sorted = [] // 右边的排序数组
  for (let i = len - 1; i >= 0; i--) {
    const index = findIndex(sorted, nums[i]) // 当前值应该出现在他右边排序后数组的位置
    sorted.splice(index, 0, nums[i]) // 将当前值插入他sorted数组的位置，保持当前仍是排序数组
    counts[i] = index // 将index存到结果的索引i处
  }
  return counts
}

/**
 *
 */
const findIndex = (arr, target) => {
  let left = 0,
    right = arr.length - 1
  while (left < right) {
    // Math.floor()向下取整--  3/2=1.5； Math.floor(3/2)=1
    // 先加1再除以2是因为如果不+1的话，是向下取整的，也就是偏左，而本题中对左值的处理是 left=mid ，会造成死循环
    const mid = Math.floor((right - left + 1) / 2) + left
    if (arr[mid] < target) {
      left = mid
    } else {
      right = mid - 1
    }
  }

  // 如果当前位置大值小于目标值，应该把目标值放在它后面，否则替换他
  if (arr[left] < target) return left + 1
  return left // 第一条都是执行这个
}

console.log(countSmaller([5, 2, 6, 1])) // [2,1,1,0]
// console.log(countSmaller([-1, -1])) // [0,0]

/**
 * 跟排列硬币的区别 441
 * 1、left = 1,rigth = n => left = 0,right = arr.length - 1
 * 2、最后加了一句  if (arr[left] < target) return left + 1
 */

// https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/solution/shou-hua-tu-jie-er-fen-cha-zhao-si-lu-by-hyj8/
// 不断和右边排序好的数组比对插入，形成新的排序数组
// 1 => [1] 返回0
// 6和1 => [1,6] 返回 1
// 2和[1,6] => [1,2,6] 返回 1
// 5和[1,2,6] => [1,2,5,6] 返回 2
// count [2,1,1,0]
