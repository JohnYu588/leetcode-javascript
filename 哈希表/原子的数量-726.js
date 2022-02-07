var countOfAtoms = function (formula) {
  let i = 0
  const n = formula.length

  const stack = [new Map()]
  while (i < n) {
    const ch = formula[i]

    const parseAtom = () => {
      const sb = []
      sb.push(formula[i++]) // 扫描首字母
      while (i < n && formula[i] >= "a" && formula[i] <= "z") {
        sb.push(formula[i++]) // 扫描首字母后的小写字母
      }
      return sb.join("")
    }

    const parseNum = () => {
      if (i === n || isNaN(Number(formula[i]))) {
        return 1 // 不是数字，视作 1
      }
      let num = 0
      while (i < n && !isNaN(Number(formula[i]))) {
        num = num * 10 + formula[i++].charCodeAt() - "0".charCodeAt() // 扫描数字
      }
      return num
    }

    if (ch === "(") {
      i++
      stack.unshift(new Map()) // 将一个空的哈希表压入栈中，准备统计括号内的原子数量
    } else if (ch === ")") {
      i++
      const num = parseNum() // 括号右侧数字
      const popMap = stack.shift() // 弹出括号内的原子数量
      const topMap = stack[0]
      for (const [atom, v] of popMap.entries()) {
        topMap.set(atom, (topMap.get(atom) || 0) + v * num) // 将括号内的原子数量乘上 num，加到上一层的原子数量中
      }
    } else {
      // 如果后面跟小写字母就算一个元素里面存起来
      const atom = parseAtom()
      const num = parseNum()
      const topMap = stack[0]
      topMap.set(atom, (topMap.get(atom) || 0) + num) // 统计原子数量
    }
  }

  let map = stack.pop()
  map = Array.from(map)
  map.sort()
  const sb = []
  for (const [atom, count] of map) {
    sb.push(atom)
    if (count > 1) {
      sb.push(count)
    }
  }
  return sb.join("")
}

console.log(countOfAtoms("K4(ON(SiO3)2)2"))

// 解析:
/**
 * [{K:4}] 数量默认1,如果后面一位是小写,拼到key,是字母加到value
 * 碰到左括号添加新的map[{O:1,N:1},{K:4}]
 * [{Si:1,O:3},{O:1,N:1},{K:4}]
 * 遇到右括号获取数字,把{Si:1,O:3}弹出,之后取出第一项{O:1,N:1},第一项里面没有Si直接添加Si:1*2=2,有O, O:1+2*3=7=>{O:7,N:1,Si:2}
 * 新数组[{O:7,N:1,Si:2},{K:4}],遇到右括号获取数字,把{O:7,N:1,Si:2}弹出,之后取出第一项{K:4},第一项里面没有O,N,Si直接添加他们的数量*2=>[{O:14,N:2,Si:4,K:4}]
 * 转成数组并排序[['K',4],['N',2],['O',14],['Si',4]]
 * 遍历这个数组结构每条的前两项,分别是key和数量,如果数量不为0添加到一个数组里头
 * ['K',4,'N',2,'O',14,'Si',4] 然后转字符串K4N2O14Si4
 */

// 链接：https://leetcode-cn.com/problems/number-of-atoms/solution/yuan-zi-de-shu-liang-by-leetcode-solutio-54lv/

// 给你一个字符串化学式 formula ，返回 每种原子的数量 。
// 原子总是以一个大写字母开始，接着跟随 0 个或任意个小写字母，表示原子的名字。
// 如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。

// 例如，"H2O" 和 "H2O2" 是可行的，但 "H1O2" 这个表达是不可行的。
// 两个化学式连在一起可以构成新的化学式。

// 例如 "H2O2He3Mg4" 也是化学式。
// 由括号括起的化学式并佐以数字（可选择性添加）也是化学式。

// 例如 "(H2O2)" 和 "(H2O2)3" 是化学式。
// 返回所有原子的数量，格式为：第一个（按字典序）原子的名字，跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。

// 示例 1：
// 输入：formula = "H2O"
// 输出："H2O"
// 解释：原子的数量是 {'H': 2, 'O': 1}。

// 示例 2：
// 输入：formula = "Mg(OH)2"
// 输出："H2MgO2"
// 解释：原子的数量是 {'H': 2, 'Mg': 1, 'O': 2}。

// 示例 3：
// 输入：formula = "K4(ON(SO3)2)2"
// 输出："K4N2O14S4"
// 解释：原子的数量是 {'K': 4, 'N': 2, 'O': 14, 'S': 4}。

// 示例 4：
// 输入：formula = "Be32"
// 输出："Be32"
