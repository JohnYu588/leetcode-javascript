var WordDictionary = function () {
  this.root = new Trie()
}

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  this.root.insert(word)
}

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const dfs = (index, node) => {
    if (index == word.length) return node.getEnd()
    const c = word.charAt(index)
    if (c == ".") {
      for (let i = 0; i < 26; i++) {
        if (node.getTrie()[i] !== false && dfs(index + 1, node.getTrie()[i]))
          return true
      }
    } else {
      const idx = word.charAt(index).charCodeAt() - "a".charCodeAt()
      if (node.getTrie()[idx] !== false)
        return dfs(index + 1, node.getTrie()[idx])
    }
    return false
  }
  return dfs(0, this.root)
}

class Trie {
  constructor() {
    this.trie = new Array(26).fill(false)
    this.end = false
  }

  insert(word) {
    let node = this
    for (let i = 0; i < word.length; i++) {
      const idx = word.charAt(i).charCodeAt() - "a".charCodeAt()
      if (node.trie[idx] === false) {
        node.trie[idx] = new Trie()
      }
      node = node.trie[idx]
    }
    node.end = true
  }

  getTrie() {
    return this.trie
  }

  getEnd() {
    return this.end
  }
}

let wordDictionary = new WordDictionary()
wordDictionary.addWord("bad")
wordDictionary.addWord("dad")
wordDictionary.addWord("mad")
console.log(wordDictionary.search("pad")) // 返回 False
console.log(wordDictionary.search("bad")) // 返回 True
console.log(wordDictionary.search(".ad")) // 返回 True
console.log(wordDictionary.search("b..")) // 返回 True

// 链接：https://leetcode.cn/problems/design-add-and-search-words-data-structure/solution/pythonjavadict-trie-bfs-by-himymben-ttbk/
