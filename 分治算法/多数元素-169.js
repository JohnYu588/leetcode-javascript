/* 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */
/*
输入：nums = [3,2,3]
输出：3

输入：nums = [2,2,1,1,1,2,2]
输出：2 */
var majorityElement = function (nums) {
  const getCount = (num, lo, hi) => {
    //统计lo到hi之间num的数量
    let count = 0

    for (let i = lo; i <= hi; i++) {
      if (nums[i] === num) count++
    }

    return count
  }

  const getMode = (lo, hi) => {
    if (lo === hi) return nums[lo]

    //拆分成更小的区间
    let mid = Math.floor((lo + hi) / 2)
    let left = getMode(lo, mid)
    let right = getMode(mid + 1, hi)

    if (left === right) return left

    let leftCount = getCount(left, lo, hi) //统计区间内left的个数
    let rightCount = getCount(right, lo, hi) //统计区间内right的个数

    return leftCount > rightCount ? left : right //返回left和right中个数多的那个
  }

  return getMode(0, nums.length - 1)
}
// 二分法和分治法概念区别--记录
// https://blog.csdn.net/qq_35746739/article/details/111606862

// 思路：不断从数组的中间进行递归分割，直到每个区间的个数是1，然后向上合并左右区间个数较多的数，向上返回。
// 链接：https://leetcode.cn/problems/majority-element/solution/dai-ma-jian-ji-yi-chong-huan-bu-cuo-de-j-7vzo/

/* 这里我们使用经典的分治算法递归求解，直到所有的子问题都是长度为 1 的数组【递归知道没法再分了】。由于传输子数组需要额外的时间和空间，所以我们实际上只传输子区间的左右指针 lo 和 hi 表示相应区间的左右下标。
长度为 1 的子数组中唯一的数显然是众数，直接返回即可。
如果回溯后某区间的长度大于 1 ，我们必须将左右子区间的值合并。如果它们的众数相同，那么显然这一段区间的众数是它们相同的值。否则，我们需要比较两个众数在整个区间内出现的次数来决定该区间的众数。
原问题的答案就是下标为 0 和 n 之间的众数这一子问题。 */
