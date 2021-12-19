var myPow = function (x, n) {
  if (n === 0) return 1 // n=0直接返回1
  if (n < 0) {
    //n<0时 x的n次方等于1除以x的-n次方分
    return 1 / myPow(x, -n)
  }
  if (n % 2) {
    //n是奇数时 x的n次方 = x*x的n-1次方
    return x * myPow(x, n - 1)
  }
  return myPow(x * x, n / 2) //n是偶数，使用分治，一分为二，等于x*x的n/2次方
}

console.log(myPow(2, 3))
//https://leetcode-cn.com/problems/powx-n/solution/fen-zhi-di-gui-jian-ji-ming-liao-by-wo-huan-neng-c/

/*
myPow(2, 3) = 2^ 3 =8:
n = 3，奇数 2 * myPow(2, 3 - 1)=>2 * myPow(2, 2)
n = 2，偶数 myPow(2 * 2, 2 / 2)=>myPow(4, 1)
n = 1，奇数 4 * myPow(4, 1 - 1)=>4 * myPow(4, 0)
n = 0，返回 1
递归倒推就是 2 * 4 * 1 = 8
*/

/*
myPow(3, 4) = 81:
n = 4，偶数 myPow(3 * 3, 4 / 2)=>myPow(9, 2)
n = 2，偶数 myPow(9 * 9, 2 / 2)=>myPow(81, 1)
n = 1，奇数 81 * myPow(81, 1 - 1)=>81 * myPow(81, 0)
n = 0，返回 1
递归倒推就是 81 * 1 = 81
*/

// 就是把一个大的拆开,直到乘以一个指数为0的数（*1）

// 下面这种解法也能得到正确答案，但是当执行下面时会报错
// myPow(0.00001, 2147483647) RangeError :Maximum call stack size exceeded
// 超出最大调用堆栈大小
// 出现这种错误最常见的原因是：在代码中的某个地方，您正在调用一个函数，该函数又调用另一个函数，依此类推，直到达到调用堆栈限制。

// var myPow = function (x, n) {
//   if (n === 0) return 1 // n=0直接返回1
//   if (n < 0) {
//     //n<0时 x的n次方等于1除以x的-n次方分
//     return 1 / myPow(x, -n)
//   }
//   return x * myPow(x, n - 1)
// }
