import java.util.HashMap;
import java.util.Map;

/**
 * @param {string} s
 * @return {number}
 */
// var lengthOfLongestSubstring = function (s) {}
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int end = 0, start = 0; end < n; end++) {
            char alpha = s.charAt(end);
            if (map.containsKey(alpha)) {
                start = Math.max(map.get(alpha), start);
            }
            ans = Math.max(ans, end - start + 1);
            map.put(s.charAt(end), end + 1);
        }
        return ans;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.lengthOfLongestSubstring("pwwkew"));
    }
};

// 作者：guanpengchn
// 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/hua-jie-suan-fa-3-wu-zhong-fu-zi-fu-de-zui-chang-z/
// 来源：力扣（LeetCode）

// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

/*
 * start=0;end=0;
 * map={'p':1} ans=1
 *
 * start=0;end=1;
 * map={'p':1,'w':2} ans=2
 *
 * start=0;end=2;
 * map={'p':1,'w':3} ans=2
 *
 * start=2;end=3;
 * map={'p':1,'w':3,'k':4} ans=2
 *
 * start=2;end=4;
 * map={'p':1,'w':3,'k':4,'e':5} ans=3
 *
 * start=2;end=5;
 * map={'p':1,'w':6,'k':4,'e':5} ans=3
 */