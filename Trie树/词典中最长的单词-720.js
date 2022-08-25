/* 输入：words = ["w","wo","wor","worl", "world"]
输出："world"
解释： 单词"world"可由"w", "wo", "wor", 和 "worl"逐步添加一个字母组成。 */

/* 输入：words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
输出："apple"
解释："apply" 和 "apple" 都能由词典中的单词组成。但是 "apple" 的字典序小于 "apply"  */
// a->app->appl->apply
// a->app->appl->apple
let Trie = require("../工具/Trie.js")

var longestWord = function (words) {
  const trie = new Trie()
  for (const word of words) {
    trie.insert(word)
  }
  let longest = ""
  for (const word of words) {
    if (trie.search(word)) {
      if (
        word.length > longest.length ||
        (word.length === longest.length && word.localeCompare(longest) < 0) // 长度大于longest或者长度等于但是单词的字典序更小
      ) {
        longest = word
      }
    }
  }
  return longest
}

const words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
console.log(longestWord(words))
// 字典树
// 预备知识
// 该方法需要使用字典树。如果读者对字典树不了解，建议首先阅读「208. 实现 Trie (前缀树) 的官方题解」，在理解字典树的实现之后继续阅读。
// https://zhuanlan.zhihu.com/p/420663173
// https://leetcode.cn/problems/implement-trie-prefix-tree/solution/shi-xian-trie-qian-zhui-shu-by-leetcode-ti500/
// 思路和算法
// 由于符合要求的单词的每个前缀都是符合要求的单词，因此可以使用字典树存储所有符合要求的单词。
// 创建字典树，遍历数组 words 并将每个单词插入字典树。当所有的单词都插入字典树之后，将答案初始化为空字符串，
// 再次遍历数组 words，判断每个单词是否是符合要求的单词，并更新答案。如果一个单词是符合要求的单词，
// 则比较当前单词与答案，如果当前单词的长度大于答案的长度，或者当前单词的长度等于答案的长度且当前单词的字典序小于答案的字典序，则将答案更新为当前单词。
// 链接：https://leetcode.cn/problems/longest-word-in-dictionary/solution/ci-dian-zhong-zui-chang-de-dan-ci-by-lee-k5gj/
