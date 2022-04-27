// ac地址：https://leetcode-cn.com/problems/find-median-from-data-stream/
// 原文地址：https://xxoo521.com/2020-02-27-find-median-from-data-stream/
const defaultCmp = (x, y) => x > y // 默认是最大堆

const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]])
const result = 2 + 3
class Heap {
  /**
   * 默认是最大堆
   * @param {Function} cmp
   */
  constructor(cmp = defaultCmp) {
    this.container = []
    this.cmp = cmp
  }

  // 添加，然后递归判断添加的值是否比父节点大，如果比父节点大替换，然后继续判断新的父节点大小，保持最大（小）堆
  insert(data) {
    const { container, cmp } = this

    container.push(data)
    let index = container.length - 1
    while (index) {
      // 长度大于1，否则直接加不进到while
      let parent = Math.floor((index - 1) / 2) // 父节点
      if (!cmp(container[index], container[parent])) {
        // parent=0;如果新来的2 < 1不处理，否则交换位置；
        return
      }
      swap(container, index, parent)
      index = parent
    }
  }

  // 提取根节点值取出后，需要补位。首先将堆数组最后一个节点值，补位到根节点，此时对于最大堆，根节点不是最大值，需要下移重组。组成一个新的数，但是基本结构不变
  extract() {
    const { container, cmp } = this
    if (!container.length) {
      return null
    }

    // 被提取的数首位交换 [5,1,2]=>[2,1,5]
    swap(container, 0, container.length - 1)
    // 移除最大堆的最大值，也就是被提取的数
    // [2,1,5]=>[2,1]
    const res = container.pop()
    // 此时对于最大堆，根节点不是最大值，需要下移重组。
    const length = container.length
    let index = 0, //根结点
      exchange = index * 2 + 1 //左子节点

    // 将根节点与其两个子节点值进行比较，三节点最大者如果是子节点之一，则根节点与其交换位置。
    while (exchange < length) {
      //存在左子节点
      // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
      let right = index * 2 + 2 //右子节点
      // 存在右子节点，且右子节点大于左子节点,交换让左节点始终比右节点大
      if (right < length && cmp(container[right], container[exchange])) {
        exchange = right
      }
      // 如果左节点小于根结点，说明根结点最后，不变，退出循环
      if (!cmp(container[exchange], container[index])) {
        break
      }
      // 否则交换左节点和根结点
      swap(container, exchange, index)
      // 让这个节点继续下沉，直至无子节点大于该值
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

// 1、max加入后重新排序（就是不断和它父元素比对，找到他的位置）
// 2、min加入max的最大值(保证min的一半永远是最大的)后重新排序(max加一个，min也要加一个，保证两个大小一样)
// 3、max.extract() top被插入后，要把根节点取出（为了保证两边不会有重复值）然后补位重新排序，
// 4、如果max长度小于min，把min的最小值加入max(保证max的一半永远是最大的);min.extract() （为了保证max===min或max===min+1）
MedianFinder.prototype.addNum = function (num) {
  this.maxHeap.insert(num) // maxHeap长度为0直接加
  this.minHeap.insert(this.maxHeap.top()) // minHeap长度为0时也是直接加,所以变成max[] min[1]
  this.maxHeap.extract()

  if (this.maxHeap.container.length < this.minHeap.container.length) {
    this.maxHeap.insert(this.minHeap.top())
    this.minHeap.extract()
  }
}
// max加，min加max最大值，max取，如果max.length<min.length=>max加,min提取

MedianFinder.prototype.findMedian = function () {
  return this.maxHeap.container.length > this.minHeap.container.length
    ? this.maxHeap.top()
    : (this.maxHeap.top() + this.minHeap.top()) / 2
}

// insert和extract 一个插一个取
const medianFinder = new MedianFinder()
medianFinder.addNum(1) //max:[1] min:[] => max:[1] min:[1] => max:[] min:[1] => max:[1] min:[]
medianFinder.addNum(2) // max:[2,1] min:[] => max:[2,1] min:[2] => max:[1] min:[2]
console.log(medianFinder.findMedian()) // 1.5 maxHeap[1] minHeap[2]
medianFinder.addNum(3) // max:[3,1] min[2] =>  max:[3,1] min[2,3] =>  max:[1] min[2,3] => max[2,1] min[3]
console.log(medianFinder.findMedian()) // 2  maxHeap [2,1] minHeap[3]
medianFinder.addNum(5) //  max[5,1,2](比元素2，大，交换位置) min[3] => max[5,1,2] min[3,5] => max[2,1](5取出，最后一个节点2替换) min[3,5]
console.log(medianFinder.findMedian()) // 2.5 max[2,1] min[3,5]
medianFinder.addNum(4) //  max[4,1,2] min[3,5] => max[4,1,2] min[3,5,4] => max[2,1] min[3,5,4] =>max[3,1,2] min[4,5]
console.log(medianFinder.findMedian()) // 3 max[3,1,2] min[4,5]
// max [1],min [1]为1的栈顶；长度为1仅仅插入
// this.maxHeap.extract() max[];pop 栈顶
// max<min, max[1] min[]
// max[1,2] 长度大于1，交换=>max[2,1] min[2]
// this.maxHeap.extract()交换又变成[1,2],pop变成=>max[1],min[2] =>1+2=>1.5
// max[3,1] min[2,3]
// this.maxHeap.extract() max[1] min[2,3]
// max[2,1] min[2,3]
//  max[2,1] min[3] => 2
// max[2,1,5] parent = floor(0.5) =0=>5>0交换首尾=>[5,1,2]
// max[5,1,2] min[3,5]=>parent=0,!cmp(5,3)不交换
// this.maxHeap.extract() 首尾交换[2,1,5]，max pop=>[2,1] exchange=1<2 right=2 !cmp(1, 2) break
// max[2,1] min[3,5] =>2.5
// max[2,1,4] cpm(4,2)=>max[4,1,2]
// max[4,1,2] min[3,5,4] !cmp(4,3) return
// this.maxHeap.extract() 首尾交换[2,1,4]，max pop=>[2,1] exchange=1<2 right=2 !cmp(1, 2) break
// max[2,1,3] 3>2 swap=>max[3,1,2]
// minHeap.extract() swap=>min[4,5,3] =>pop:min[4,5] exchange=1<2 right=2 !cmp(5, 4) break

// 链接：https://leetcode-cn.com/problems/find-median-from-data-stream/solution/tu-xie-zheng-li-bao-li-fa-er-fen-cha-zhao-shou-d-2/

// 对于这种动态数据，堆是极好的解决方案。准备两个堆：
// 最大堆：存放数据流中较小的一半元素 顶部最大
// 最小堆：存放数据流中较大的一半元素 顶部最小
// 需要保证这 2 个堆的“平衡”。这里的平衡指得是：最大堆的大小 = 最小堆的大小， 或者 最大堆的大小 = 最小堆的大小 + 1。

// 当调用 findMedian 查询中位数的时候，中位数就是最大堆的堆顶元素[因为他是较大的一半元素，当最大堆的大小等于 = 最小堆的大小 + 1时候]
// 或者 (最大堆的堆顶元素 + 最小堆的堆顶元素)/2 两边大小一样时

// 剩下的问题就是怎么保证堆的平衡？步骤如下：

// 1、先让 num 入 maxHeap
// 2、取出 maxHeap 的堆顶元素，放入 minHeap（保障min中是较大的一半）
// 3、若此时最大堆的大小 < 最小堆的大小，取出 minHeap 的堆顶元素，让入 maxHeap
// 由于 JavaScript 中没有堆，所以要自己实现。在实现的时候，堆的代码其实只需要一份
// 堆中进行判定的比较函数由外界传入即可。这是一种名为「桥接模式」的设计模式，具体可以看这篇文章：《设计模式 - 桥接模式 - JavaScript》

// 堆的特性
// 堆是一棵二叉树。根据根节点是最大值或最小值，分别称为最大堆或最小堆。
// 堆是左平衡树。随着节点增加，树会逐级从左至右增长。
// 堆比较好的实现方式，是采用数组实现。当i作为节点索引时，其父节点索引为(i-1)/2，其子节点索引分别为2i+1或2i+2，从而可以迅速定位。
// 堆的结构

// 这是一个包含5个节点的最大堆，根节点是所有节点的最大值。
// 在实现上采用数组存储每个节点，按照每一层从左往右排列。
// 堆的插入操作（Insert）

// 插入的节点首先写入数组末尾。此时的二叉树可能不满足结构特性，因此需要重组。
// 当前写入节点值与其父节点比较，如果大于父节点，则交换两个节点的值。（对于最小堆则是在小父节点时上移）
// 不断向上比较直至到达根节点，或者父节点值不再大于当前插入节点。

// 堆的提取操作（Extract)
// 堆的提取操作针对二叉树的根节点。根节点值取出后，需要补位。
// 首先将堆数组最后一个节点值，补位到根节点。此时对于最大堆，根节点不是最大值，需要下移重组。
// 将根节点与其两个子节点值进行比较，三节点最大者如果是子节点之一，则根节点与其交换位置。
// 递归执行上一步骤直至无子节点大于该值。
// https://www.cnblogs.com/chenkeyu/p/7505637.html
