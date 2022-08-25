class Node {
  constructor() {
    this.children = {}
    this.isEnd = false
  }
}

class Trie {
  constructor() {
    this.children = new Node()
    this.isEnd = false
  }

  // 插入字符串

  // 我们从字典树的根开始，插入字符串。对于当前字符对应的子节点，有两种情况：

  // 子节点存在。沿着指针移动到子节点，继续处理下一个字符。
  // 子节点不存在。创建一个新的子节点，记录在 children 数组的对应位置上，然后沿着指针移动到子节点，继续搜索下一个字符。
  // 重复以上步骤，直到处理字符串的最后一个字符，然后将当前节点标记为字符串的结尾。

  // 链接：https://leetcode.cn/problems/implement-trie-prefix-tree/solution/shi-xian-trie-qian-zhui-shu-by-leetcode-ti500/
  insert(word) {
    let node = this
    for (let i = 0; i < word.length; i++) {
      const ch = word[i]
      const index = ch.charCodeAt() - "a".charCodeAt() // 不是保存具体单词，应该是为了检索更快吧
      if (!node.children[index]) {
        node.children[index] = new Node()
      }
      node = node.children[index] //
    }
    node.isEnd = true
  }

  //   查找前缀

  // 我们从字典树的根开始，查找前缀。对于当前字符对应的子节点，有两种情况：

  // 子节点存在。沿着指针移动到子节点，继续搜索下一个字符。
  // 子节点不存在。说明字典树中不包含该前缀，返回空指针。
  // 重复以上步骤，直到返回空指针或搜索完前缀的最后一个字符。

  // 若搜索到了前缀的末尾，就说明字典树中存在该前缀。此外，若前缀末尾对应节点的 isEnd 为真，则说明字典树中存在该字符串。
  search(word) {
    let node = this
    for (let i = 0; i < word.length; i++) {
      const ch = word[i]
      const index = ch.charCodeAt() - "a".charCodeAt()
      if (!node.children[index] || !node.children[index].isEnd) {
        return false
      }
      node = node.children[index]
    }
    return node && node.isEnd
  }
}

module.exports = Trie
