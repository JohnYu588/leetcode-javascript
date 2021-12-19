var groupAnagrams = function (strs) {
  var h = new Map(),
    // 之所以用质数就是因为质数的乘积结果是唯一的，这里对应0-25的26个质数，换成别的质数也没问题，比如我把11换成103一样可以得到结果
    prime = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 103,
    ]
  // 遍历单词
  for (var i = 0; i < strs.length; i++) {
    // 遍历单词里的每个字母
    for (var j = 0, sum = 1; j < strs[i].length; j++) {
      // 获取每个单词所有字母对应的质数的乘积，因为质数的乘积结果是唯一的，只能有这几个数字想乘获取，但是乘法交换率顺序可以不同
      sum *= prime[strs[i].charCodeAt(j) - 97]
    }
    // 判断map里头是否已经有这个乘积的单词，有的话就归到一个数组里头，没有的话就新开辟一块
    h.has(sum) ? h.get(sum).push(strs[i]) : h.set(sum, [strs[i]])
  }
  // 把map的所有values转为数组
  return Array.from(h.values())
}

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
console.log(groupAnagrams(strs))
// [["bat"],["nat","tan"],["ate","eat","tea"]]
// 算术基本定理:
// 任何一个大于1的自然数N，如果N不为质数，那么N可以唯一分解成有限个质数的乘积

// [a, z]Unicode编码 - 97=[0, 25] 对应26个质数。每字母代表质数的乘积表示字符串(题目中说是小写字母)
// 乘法交换律忽略字母顺序。 算术基本定理保证不同质数 或 相同质数不同个数，乘积唯一

// https://leetcode-cn.com/problems/group-anagrams/solution/zhi-shu-pai-xu-shu-zu-6xing-dai-ma-chao-9kdni/
