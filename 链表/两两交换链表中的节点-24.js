const ListNode = require("../工具/链表")
const { makeListNode } = require("../工具/链表")

var swapPairs = function (head) {
  const dummyHead = new ListNode(0)
  dummyHead.next = head
  let temp = dummyHead
  while (temp.next !== null && temp.next.next !== null) {
    const node1 = temp.next
    const node2 = temp.next.next
    temp.next = node2
    node1.next = node2.next
    node2.next = node1
    temp = node1
  }
  return dummyHead.next
}
const head = new makeListNode([1, 2, 3, 4])
swapPairs(head)

// https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/

// 复杂度分析

// 时间复杂度：O(n)O(n)，其中 nn 是链表的节点数量。需要对每个节点进行更新指针的操作。

// 空间复杂度：O(1)O(1)。

/*
创建一个头部的伪节点作为node1和node2的暂存节点，执行
 temp.next = node2;
 node1.next = node2.next;
 node2.next = node1;
两两交换(就是把下一个指针节点变换)，
交换完成后再把原来的node1（比较后面的）设置为他后面两个交换节点的暂存节点
直到暂存节点后面不足两个节点
看图
*/
