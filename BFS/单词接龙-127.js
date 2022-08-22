const ladderLength = (beginWord, endWord, wordList) => {
  const wordSet = new Set(wordList)
  const queue = []
  queue.push([beginWord, 1])

  while (queue.length) {
    const [word, level] = queue.shift() // 当前出列的单词
    if (word == endWord) {
      return level
    }
    for (let i = 0; i < word.length; i++) {
      // 遍历当前单词的所有字符
      for (let c = 97; c <= 122; c++) {
        // 对应26个字母
        const newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1) // 形成新词
        // 获取符合的字母,queue保存下一级子数,哪一级层级最少抵达终点,就是最短路径
        if (wordSet.has(newWord)) {
          // 单词表里有这个新词
          queue.push([newWord, level + 1])
          // 作为下一层的词入列;hot下面dot和hot的level是一样的,都是从上一级取出来+1,就是广度遍历下数的同一层
          wordSet.delete(newWord) // 避免该词重复入列
        }
      }
    }
  }
  return 0 // bfs结束，始终没有遇到终点
}

console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
)

// [hit,1] => [hot,2] =>[[dot,3],[lot,3]] => [[dog,4],[log,4]]=>[[cog,5]],word == endWord 结束循环返回5

// 题意
// 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
// 输入：beginWord = "hit", endWord = "cog"
// wordList = ["hot","dot","dog","lot","log","cog"]
// 输出：5
// 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
// 每一对相邻的单词只差一个字母, 中间的每个单词都要在 wordList 中。 beginWord 不需要在 wordList 中。

// 思路
// 题意：从起点词出发，每次变一个字母，变换 n 次，变成终点词，希望 n 尽量小。
// 我们需要找出邻接关系，比如hit的转换词是*it、h*t、hi*形式，看看这样的新词是否在单词表里，如果存在，就找到了一个下一层的转换词。
// 同时，要避免重复访问，hot->dot->hot，别这样变回来，徒增转换的次数。所以，确定了下一个转换词，就把它从单词表中删除。
// 下一层的转换词可能有多个，都要考察，哪一条转换路径先遇到终点词，它就最短。

// 整理一下
// 把单词看作结点，由一个结点带出下一层的邻接点，用BFS去做。
// 维护一个队列，让起点词入列，level 为 1，然后出列考察。
// 将逐个字符变成26字母之一，看看是否在单词表，如果在，该新词为下一层的转换词。
// 将它入列，它的 level +1，并从单词表中删去这个词。
// 出列、入列…重复，当出列的单词和终点词相同，就遇到了终点词，返回它的 level。
// 当队列为空时，代表考察完所有词，始终没有遇到终点词，没有路径通往终点。

// 链接：https://leetcode.cn/problems/word-ladder/solution/shou-hua-tu-jie-127-dan-ci-jie-long-bfsde-dian-x-2/

// 复盘总结
// 有一层抽象，将单词作为节点，如果两个单词可以互相转换，就是邻接关系，之间有一条无向边。
// 用图的 BFS 探索路径，求一点到另一点的最短路径，先遇到终点的路径最短。
