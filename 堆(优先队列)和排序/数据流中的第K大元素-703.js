class MinHeap {
  constructor(k) {
    this.heap = [] // 维护一个最小堆来保存前 k 大的数字
    // 最后 heap 数组存的是前 k 大的数字，堆顶是第 k 大的数字，是最小堆里最小的元素。
    this.k = k
  }
  add(num) {
    // 当 heap 数组长度不够 k 时，新数从数组末尾推入，执行“上浮”，交换到它合适的位置。
    if (this.heap.length < this.k) {
      this.heap.push(num)
      this.up(this.heap.length - 1)
    } else if (num > this.heap[0]) {
      // 当 heap 数组长度够 k 时，如果新数字比栈顶大，用它替换堆顶，执行“下沉”，交换到合适的位置。
      this.heap[0] = num
      this.down(0)
    }
    // 其他情况 不加入

    // 4,heap=[4],up(0),0!>0,不做up
    // 5,heap=[4,5],up(1),1>0,parent为4(下标0),4<5;break
    // 8,heap=[4,5,8],up(2),2>0,parent为4(下标0),4<8;break
    // 2,heap满3位,2小于栈顶元素,不做处理
    // 3,heap满3位,2小于栈顶元素,不做处理
    // ... 看down需要下沉的
    // 4,heap满3位,2小于栈顶元素,不做处理
  }

  /**
   * 上升
   * @param {*} i heap的当前长度,长度不够时才调用
   * 将当前数字和他的父节点比较,如果比父节点小,就交换位置,
   * 然后再拿当前数字(新的位置)再和他的父节点比较,如此循环,直到满足最小堆
   * 否则说明满足最小堆退出
   */
  up(i) {
    // 将索引i上的元素，上浮到合适位置
    // 上浮到索引0就停止上浮
    while (i > 0) {
      const parent = (i - 1) >> 1 // 找到父节点在heap数组中的位置
      // c语言程序中x>>=1，如果作用于整数x，就是把x右移一位，把x的二进制值的最后一位丢弃，最高位补0。
      // 实际就是把x的值除以2。在运算结果上等价于x=x/2。
      if (this.heap[parent] > this.heap[i]) {
        // 如果父节点的数字比插入的数字大
        ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]] // 交换
        i = parent // 更新 i
      } else {
        // 父比自己小，满足最小堆的性质，break
        break
      }
    }
  }

  // 测试up的运行结果
  // num = 4,heap =  [8, 4], 1 > 0,parent = 0
  // 父节点 8 > 当前节点4 => 交换位置,i = 0退出while循环

  /**
   * 下沉
   * @param {*} i 需要下沉元素的下标,这里始终是栈顶元素下标0
   * 新数字比栈顶大，用它替换堆顶，执行“下沉”，交换到合适的位置。
   * 新数字和他的左右子节点中比较小的一个做比较,如果比他大就交换,然后再拿新数字(新的位置)再和他的子节点比较,如此循环,直到满足最小堆
   * 否则说明满足最小堆退出
   */
  down(i) {
    // 下沉到合适的位置
    // 左子节点的索引如果已经越界，终止下沉
    while (2 * i + 1 < this.heap.length) {
      let child = 2 * i + 1 //  左子节点在heap数组中的位置
      if (
        child + 1 < this.heap.length &&
        this.heap[child + 1] < this.heap[child]
      ) {
        child++ // 如果右子节点存在且值更小，则用它，去比较
      }
      // 用比较小的子节点和父节点比较
      if (this.heap[i] > this.heap[child]) {
        // 如果插入的数字比最小的子节点大
        ;[this.heap[child], this.heap[i]] = [this.heap[i], this.heap[child]] // 交换(把最小的节点放到最前面)
        i = child // 更新 i
      } else {
        // 子比自己大，满足最小堆的属性，break
        break
      }
    }
  }
}
// 5 > 4,heap=[5,5,8],down(0),0的子节点child = 1 < 3,不越界,开始下沉
// 右子节点下标 2 < 3(不越界) && 右子节点8 > 左子节点5,因此还是用左节点比较
// 5!>5 => break,子节点和自己一样大,满足最小堆属性(子节点均大于等于父节点,兄弟节点不做比较),break

// 10 > 5,heap=[10,5,8],down(0),0的子节点child = 1 < 3,不越界,开始下沉
// 右子节点下标 2 < 3(不越界) && 右子节点8(heap[2]) > 左子节点5(heap[1]),因此还是用左子节点比较
// 10(heap[0]) > 5(heap[1]),插入的数字10比最小的子节点大(这里是左子节点), 交换 5 和 10 => heap=[5,10,8]
// i = 1 ;3 !< 3结束down

// 9 > 5,heap=[9,10,8],down(0),0的子节点child = 1 < 3,不越界,开始下沉
// 右子节点下标 2 < 3(不越界) && 右子节点8(heap[2]) < 左子节点10(heap[1]),child++用右子节比较
// 9(heap[0]) > 8(heap[2]),插入的数字9比最小的子节点大(这里是右子节点), 交换 9 和 8 => heap=[8,10,9]
// i = 1 ;3 !< 3结束down

var KthLargest = function (k, nums) {
  this.minHeap = new MinHeap(k)
  // 把 nums 的数字放进去初始化
  for (let i = 0; i < nums.length; i++) {
    this.minHeap.add(nums[i])
  }
}

KthLargest.prototype.add = function (val) {
  this.minHeap.add(val)
  return this.minHeap.heap[0] // heap保存前 k 大的数字,heap[0]永远是第 K 大的数字
}

const kthLargest = new KthLargest(3, [4, 5, 8, 2])
console.log(kthLargest.add(3)) // return 4 [4, 5, 8]
console.log(kthLargest.add(5)) // return 5 [5, 5, 8]
console.log(kthLargest.add(10)) // return 5 [5,10,8]
console.log(kthLargest.add(9)) // return 8 [8,10,9]
console.log(kthLargest.add(4)) // return 8 [8,10,9]

// 测试up
// const kthLargest = new KthLargest(3, [8, 4, 5, 2])

// 这道题数组是变化的，会有数加进来，但我们始终关心前 k 大的数
// 所以维护一个heap 数组存的是前 k 大的数字，堆顶是第 k 大的数字，是最小堆里最小的元素。

// 当 heap 数组长度不够 k 时，新数从数组末尾推入，执行“上浮”，如果比他父节点小就往上循环交换直到到它合适的位置。
// 当 heap 数组长度够 k 时，如果新数字比栈顶大，用它替换堆顶, 执行“下沉”，，如果比他子节点中比较小的节点还小就往下循环交换直到到合适的位置。
// 最后 heap 数组存的是前 k 大的数字，堆顶是第 k 大的数字，是最小堆里最小的元素。

// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/solution/zui-xiao-dui-de-mo-ban-dai-ma-zhi-jie-wa-hkvc/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/solution/python-dong-hua-shou-xie-shi-xian-dui-by-ypz2/
// 堆的原理
