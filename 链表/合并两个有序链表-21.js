const { makeArray, makeListNode } = require("../工具/链表")

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}

var num1 = new makeListNode([1, 2, 4])

var num2 = new makeListNode([1, 3, 4])

console.log(makeArray(mergeTwoLists(num1, num2)))

// https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/hua-jie-suan-fa-21-he-bing-liang-ge-you-xu-lian-bi/


/* 1、如果l1的val小于l2的val，将l1的next（下一个指针）指向 -> l1的next和l2，第一个val比较小的链
2、依次循环，最后如果指向l1就返回l1，否则返回l2 */