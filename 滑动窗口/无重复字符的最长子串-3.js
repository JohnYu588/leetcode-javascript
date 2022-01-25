/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0
  let ans = 0
  let map = new Map()
  for (let end = 0; end < s.length; end++) {
    let key = s.charAt(end)
    if (map.get(key)) {
      // 下面保存的时候+1,这里就不会为0了
      start = Math.max(map.get(key), start)
    }
    ans = Math.max(ans, end - start + 1)
    map.set(key, end + 1)
  }
  return ans
}
console.log(lengthOfLongestSubstring("abba"))
