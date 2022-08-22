const ListNode = require("../工具/链表")
const { makeListNode } = require("../工具/链表")

var reverseList = function (head) {
  if (!head) return null
  let temp = head

  while (head.next) {
    const node1 = head.next
    const node2 = head.next.next
    head.next.next = temp
    head.next = node2
    temp = node1
  }
  return temp
}
const head = new makeListNode([1, 2, 3, 4])
const result = reverseList(head)
console.log(result)
