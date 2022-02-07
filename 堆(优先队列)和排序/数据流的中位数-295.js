// ac地址：https://leetcode-cn.com/problems/find-median-from-data-stream/
// 原文地址：https://xxoo521.com/2020-02-27-find-median-from-data-stream/
const defaultCmp = (x, y) => x > y // 默认是最大堆

const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]])

class Heap {
  /**
   * 默认是最大堆
   * @param {Function} cmp
   */
  constructor(cmp = defaultCmp) {
    this.container = []
    this.cmp = cmp
  }

  insert(data) {
    const { container, cmp } = this

    container.push(data)
    let index = container.length - 1
    while (index) {
      let parent = Math.floor((index - 1) / 2)
      if (!cmp(container[index], container[parent])) {
        return
      }
      swap(container, index, parent)
      index = parent
    }
  }

  extract() {
    const { container, cmp } = this
    if (!container.length) {
      return null
    }

    swap(container, 0, container.length - 1)
    const res = container.pop()
    const length = container.length
    let index = 0,
      exchange = index * 2 + 1

    while (exchange < length) {
      // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
      let right = index * 2 + 2
      if (right < length && cmp(container[right], container[exchange])) {
        exchange = right
      }
      if (!cmp(container[exchange], container[index])) {
        break
      }
      swap(container, exchange, index)
      index = exchange
      exchange = index * 2 + 1
    }

    return res
  }

  top() {
    if (this.container.length) return this.container[0]
    return null
  }
}

var MedianFinder = function () {
  this.maxHeap = new Heap()
  this.minHeap = new Heap((x, y) => x < y)
}

MedianFinder.prototype.addNum = function (num) {
  this.maxHeap.insert(num)
  this.minHeap.insert(this.maxHeap.top())
  this.maxHeap.extract()

  if (this.maxHeap.container.length < this.minHeap.container.length) {
    this.maxHeap.insert(this.minHeap.top())
    this.minHeap.extract()
  }
}

MedianFinder.prototype.findMedian = function () {
  return this.maxHeap.container.length > this.minHeap.container.length
    ? this.maxHeap.top()
    : (this.maxHeap.top() + this.minHeap.top()) / 2
}

const medianFinder = new MedianFinder()
medianFinder.addNum(1)
medianFinder.addNum(2)
console.log(medianFinder.findMedian()) // 1.5
medianFinder.addNum(3)
console.log(medianFinder.findMedian()) // 2

// 作者：xin-tan
// 链接：https://leetcode-cn.com/problems/find-median-from-data-stream/solution/tu-xie-zheng-li-bao-li-fa-er-fen-cha-zhao-shou-d-2/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 对于这种动态数据，堆是极好的解决方案。准备两个堆：

// 最大堆：存放数据流中较小的一半元素
// 最小堆：存放数据流中较大的一半元素
// 需要保证这 2 个堆的“平衡”。这里的平衡指得是：最大堆的大小 = 最小堆的大小， 或者 最大堆的大小 = 最小堆的大小 + 1。

// 当调用 findMedian 查询中位数的时候，中位数就是最大堆的堆顶元素，或者 (最大堆的堆顶元素 + 最小堆的堆顶元素)/2

// 剩下的问题就是怎么保证堆的平衡？步骤如下：

// 先让 num 入 maxHeap
// 取出 maxHeap 的堆顶元素，放入 minHeap
// 若此时最大堆的大小 < 最小堆的大小，取出 minHeap 的堆顶元素，让入 maxHeap
// 由于 JavaScript 中没有堆，所以要自己实现。在实现的时候，堆的代码其实只需要一份
// 堆中进行判定的比较函数由外界传入即可。这是一种名为「桥接模式」的设计模式，具体可以看这篇文章：《设计模式 - 桥接模式 - JavaScript》
