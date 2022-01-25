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
        Map<Character, Integer> map = new HashMap<>(); // 存字符(最新)的下标+1
        for (int end = 0, start = 0; end < n; end++) {
            char alpha = s.charAt(end);
            if (map.containsKey(alpha)) {
                // 所以要取上个start(第二个b)和他的重复值后面一个数(第一个b)偏后面的
                start = Math.max(map.get(alpha), start);
            }
            ans = Math.max(ans, end - start + 1); // 测试前面的结果和当前窗口大小哪个大
            map.put(s.charAt(end), end + 1);// 存上一个重复值下一个数的坐标
        }
        return ans;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        // 测试为什么要Max来计算start,如果直接用map.get(alpha)在end为最后一个a的时候start就会变成第一个重复的a后面的b
        // 这样计算的ans虽然不包含重复a了,但是包含了重复b,所以要取上个start(第二个b,就是前一次去重后的start)和他的重复值后面一个数(第一个b)偏后面的
        System.out.println(s.lengthOfLongestSubstring("abba"));
        // 测试为什么用map.get(alpha)不用end,
        // 因为map.get(alpha)是跟当前值重复的数的后面一个数,如果start取了end结果就变成了df,但结果明显是vdf
        // System.out.println(s.lengthOfLongestSubstring("dvdf"));

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