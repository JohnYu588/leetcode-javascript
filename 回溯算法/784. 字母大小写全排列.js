// 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。
// 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出

// 输入：s = "a1b2"
// 输出：["a1b2", "a1B2", "A1b2", "A1B2"]

// 输入: s = "3z4"
// 输出: ["3z4","3Z4"]
// js 中字符串进行位运算会被隐式转换成 0，需要注意一下
/**
 * @param {string} s
 * @return {string[]}
 */
const letterCasePermutation = function (s) {
  const res = []
  const sLen = s.length

  dfs()

  return res

  function dfs(index = 0, str = "") {
    if (index === sLen) {
      res.push(str)
      return
    }

    const letter = s[index]

    dfs(index + 1, str + letter) // 递：0,1,2,3走完第一轮push a1b1，return开始归3，2,1,0

    if (isNaN(letter)) {
      // 归到index=2,isNaN('b')===true;(isNaN:返回一个 Boolean 值，指明提供的值是否是保留值 NaN （不是数字）)。
      // dfs index=3,a1B 碰到上面一个dfs a1B2 push 继续return归到上面一个dfs的3，归完再归回上一轮的1，a，转大写继续递到A1b2...
      dfs(index + 1, str + String.fromCharCode(letter.charCodeAt() ^ 32)) // index 2，0，2
    }
  }
}
console.log(letterCasePermutation("a1b2")) // ["a1b2", "a1B2", "A1b2", "A1B2"]

// 链接：https://leetcode.cn/problems/letter-case-permutation/solution/by-ai-xiao-de-tycho-2-et0o/
// 当作树形图看 左子节点递完 归到右子节点，递完右子节点然后归到根节点 https://leetcode.cn/problems/letter-case-permutation/solution/shen-du-you-xian-bian-li-hui-su-suan-fa-python-dai/
// 树里面的前序遍历

// a=>a1=>a1b=>a1b2
// a1B=>a1B2
// A=>A1=>A1b=>A1b2
// A1B=>A1B2
