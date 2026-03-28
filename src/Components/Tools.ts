/**
 * 格式化时间显示
 * @param dateString ISO 8601 时间字符串，例如 "2026-03-26T09:56:02Z"
 * @returns 1分钟内返回"刚刚"，1小时内返回"X分钟前"，12小时内返回"X小时前"，超过12小时返回"年月日 时分"
 */
export function formatTimeAgo(dateString: string): string {
    const targetDate = new Date(dateString);
    const now = Date.now();
    const diffMs = now - targetDate.getTime(); // 毫秒差值

    const MINUTE_MS = 60 * 1000;
    const HOUR_MS = 60 * MINUTE_MS;
    const TWELVE_HOURS_MS = 12 * HOUR_MS;

    if (diffMs <= TWELVE_HOURS_MS) {
        // 12小时内
        const hours = Math.floor(diffMs / HOUR_MS);
        if (hours >= 1) {
            return `${hours}小时前`;
        }
        // 不足1小时，计算分钟
        const minutes = Math.floor(diffMs / MINUTE_MS);
        if (minutes < 1) {
            return '刚刚';
        }
        return `${minutes}分钟前`;
    } else {
        // 超过12小时，输出完整日期时间（本地时间）
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth() + 1;
        const day = targetDate.getDate();
        const hours = targetDate.getHours().toString().padStart(2, '0');
        const minutes = targetDate.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
}
