var topKFrequent = function (words, k) {
  const cnt = new Map()
  for (const word of words) {
    cnt.set(word, (cnt.get(word) || 0) + 1)
  }
  const rec = []
  for (const entry of cnt.keys()) {
    rec.push(entry)
  }
  rec.sort((word1, word2) => {
    // 具体地，我们利用哈希表记录每一个字符串出现的频率，然后将哈希表中所有字符串进行排序，排序时，如果两个字符串出现频率相同，那么我们让两字符串中字典序较小的排在前面，
    否则我们让出现频率较高的排在前面
    return cnt.get(word1) === cnt.get(word2)
      ? word1.localeCompare(word2)
      : cnt.get(word2) - cnt.get(word1)
  })
  // 返回前 k 个字符串即可。
  return rec.slice(0, k)
}
topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2)

// 给一非空的单词列表，返回前 k 个出现次数最多的单词。
// 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

// 示例 1：
// 输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
// 输出: ["i", "love"]
// 解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
//     注意，按字母顺序 "i" 在 "love" 之前。

// 示例 2：
// 输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
// 输出: ["the", "is", "sunny", "day"]
// 解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
//     出现次数依次为 4, 3, 2 和 1 次。

// 链接：https://leetcode-cn.com/problems/top-k-frequent-words/solution/qian-kge-gao-pin-dan-ci-by-leetcode-solu-3qk0/
