/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  const arr = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    arr[s.charCodeAt(i) - 97]++
  }
  for (let i = 0; i < s.length; i++) {
    if (arr[s.charCodeAt(i) - 97] === 1) {
      return s[i]
    }
  }
  return " "
}
