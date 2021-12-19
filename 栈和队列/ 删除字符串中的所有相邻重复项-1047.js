/**
 * @param {string} s
 * @return {string}
 */
 var removeDuplicates = function(s) {
    const stk = [];
    for (const ch of s) {
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};

removeDuplicates("abbaca")

// https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/solution/shan-chu-zi-fu-chuan-zhong-de-suo-you-xi-4ohr/

// 题意为消除相邻值，我们从左到右比对
// 使用栈，新的元素始终和栈顶元素做比对，值相同说明相邻值相同，则移除栈顶元素，并且跳到下个元素的循环，否则添加
// 然后再比较新的值，和新的栈顶值（步骤二消除前的第二个元素）做比较，因为删除b之后，出现新的相邻重复项aa