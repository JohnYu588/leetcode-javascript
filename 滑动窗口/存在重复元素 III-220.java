import java.util.TreeSet;

class A {
    public static boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        // 滑动窗口结合查找表，此时滑动窗口即为查找表本身（控制查找表的大小即可控制窗口大小）
        TreeSet<Long> set = new TreeSet<>();
        for (int i = 0; i < nums.length; i++) {
            // nums[i] 为其中一个值,我们要边添加边查找另一个值所在范围，查找表中是否有大于等于 nums[i] - t 且小于等于 nums[i] + t 的值
            // abs(nums[i] - nums[j]) <= t => nums[i] - t <= nums[j] <= nums[i] + t
            // 即[nums[i] - t,nums[i] + t]([]:含等():不含等)
            // abs(2-x) <= 4 => -2<=x<=6
            Long ceiling = set.ceiling((long) nums[i] - (long) t); // 找到大于等于nums[j]的最小值
            if (ceiling != null && ceiling <= ((long) nums[i] + (long) t)) { // 这个值同时满足<= nums[i] + t
                return true;
            }
            // 添加后，控制查找表（窗口）大小，移除窗口最左边元素
            set.add((long) nums[i]);
            // 每次范围同步右滑一位,控制区间元素个数为k [max(0, i - k), i) => [max(0, i - k), i-1]在这个范围内找
            if (set.size() == k + 1) {
                // abs(i - j) <= k => j:[i-k,i+k]
                set.remove((long) nums[i - k]); // 超出移除这个范围最左边的元素
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int data[] = { 1, 2, 3, 1 }; // 到最后一个1时(下标3),存在1+-0 区间的数(第一个1),并且下标为3+-3([0,6])
        System.out.println(A.containsNearbyAlmostDuplicate(data, 3, 0));
        // int data[] = { 1, 5, 9, 1, 5, 9 };
        // System.out.println(A.containsNearbyAlmostDuplicate(data, 2, 3));

    }
}
// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j
// 使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
// 如果存在则返回 true，不存在返回 false。

// 链接：https://leetcode-cn.com/problems/contains-duplicate-iii/solution/hua-dong-chuang-kou-er-fen-sou-suo-shu-zhao-shang-/
// 看图链接:https://leetcode-cn.com/problems/contains-duplicate-iii/solution/gong-shui-san-xie-yi-ti-shuang-jie-hua-d-dlnv/
// 官方说明:https://leetcode-cn.com/problems/contains-duplicate-iii/solution/cun-zai-zhong-fu-yuan-su-iii-by-leetcode-bbkt/
