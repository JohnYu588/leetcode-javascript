/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// var isAnagram = function (s, t) {
//   return (
//     s.length == t.length && [...s].sort().join("") === [...t].sort().join("")
//   )
// }

// 因此我们可以对字符串 s 和 t 分别排序，看排序后的字符串是否相等即可判断。此外，如果 s 和 t 的长度不同，tt 必然不是 s 的异位词。

// 时间复杂度：O(nlogn)，其中 n 为 s 的长度。排序的时间复杂度为 O(nlogn)，比较两个字符串是否相等时间复杂度为 O(n)，因此总体时间复杂度为 O(nlogn+n)=O(nlogn)。
// 空间复杂度：O(logn)。排序需要 O(logn) 的空间复杂度。注意，在某些语言（比如 Java & JavaScript）中字符串是不可变的，因此我们需要额外的 O(n) 的空间来拷贝字符串。

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false
  }
  const table = new Array(26).fill(0)
  for (let i = 0; i < s.length; ++i) {
    // 根据当前元素的Unicode 编码点值（编码索引）和26个字幕的第一个字幕（a）的偏差，获取当前元素在数组中的索引，因为a在数组中的索引是0
    // 这个字母索引对应的值+1
    table[s.codePointAt(i) - "a".codePointAt(0)]++
  }
  for (let i = 0; i < t.length; ++i) {
    table[t.codePointAt(i) - "a".codePointAt(0)]--
    // 说明s里头不存在这个值，或者说某个值多出来了（肯定就有别的值会少，如果判断>0或者!==0一开始就会返回false了）
    if (table[t.codePointAt(i) - "a".codePointAt(0)] < 0) {
      return false
    }
  }
  return true
}

console.log(isAnagram("anagram", "nagaram"))

// 'ABCB'.codePointAt(1);          // 66
// 0 65
// 2 67
// 3 66

// https://leetcode-cn.com/problems/valid-anagram/solution/you-xiao-de-zi-mu-yi-wei-ci-by-leetcode-solution/

// 哈希表(其实类似就是用数组模拟hash的key和value，key是索引，value是值)：从另一个角度考虑，t 是 s 的异位词等价于「两个字符串中字符出现的种类和次数均相等」。
// 由于字符串只包含 26 个小写字母，因此我们可以维护一个长度为 26 的频次数组 table，
// 先遍历记录字符串 s 中字符出现的频次，然后遍历字符串 t，减去 table 中对应的频次，如果出现
//  table[i]<0，则说明 t 包含一个不在 s 中的额外字符，返回 false 即可。

// 复杂度分析

// 时间复杂度：O(n)，其中 n 为 s 的长度。
// 空间复杂度：O(S)，其中 S 为字符集大小，此处 S=26。
