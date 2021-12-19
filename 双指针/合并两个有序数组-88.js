/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let len1 = m - 1
  let len2 = n - 1
  let len = m + n - 1
  while (len1 >= 0 && len2 >= 0) {
    // 注意--符号在后面，表示先进行计算再减1，这种缩写缩短了代码
    nums1[len--] = nums1[len1] > nums2[len2] ? nums1[len1--] : nums2[len2--]
  }
  function arrayCopy(src, srcIndex, dest, destIndex, length) {
    //   // 删除nums1头部的len2+1个元素，用nums2.slice(0,len2+1)来替换
    dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length))
  }
  // 表示将nums2数组从下标0位置开始，拷贝到nums1数组中，从下标0位置开始，长度为len2+1
  arrayCopy(nums2, 0, nums1, 0, len2 + 1)
}

// https://leetcode-cn.com/problems/merge-sorted-array/solution/hua-jie-suan-fa-88-he-bing-liang-ge-you-xu-shu-zu-/

// 从后向前数组遍历，nums1 的空间都集中在后面，所以从后向前处理排序的数据会更好，节省空间，一边遍历一边将值填充进去
// 设置指针 len1 和 len2 分别指向 nums1 和 nums2 的有数字尾部，从尾部值开始比较遍历，同时设置指针 len 指向 nums1 的最末尾，每次遍历比较值大小之后，则进行填充
// 当 len1<0 时遍历结束，说明l1的尾部已经全部填充完了， 如果此时 nums2 中 还未拷贝完全，将其直接拷贝到 nums1 的前面，最后得到结果数组
// 时间复杂度：O(m+n)O(m+n)
