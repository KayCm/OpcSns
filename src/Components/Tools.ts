// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const TWELVE_HOURS_MS = 24 * HOUR_MS;

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
        // const year = targetDate.getFullYear();
        // const month = targetDate.getMonth() + 1;
        // const day = targetDate.getDate();
        // const hours = targetDate.getHours().toString().padStart(2, '0');
        // const minutes = targetDate.getMinutes().toString().padStart(2, '0');
        // return `${year}/${month}/${day}`;

        const year = targetDate.getFullYear();
        const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
        const day = targetDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}



export function getDateInfo(language: 'zh' | 'en', date: Date = new Date()): string {
    // 月份映射（中文和英文）
    const monthsZh = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // 星期几映射（中文完整，英文缩写）
    const weekdaysZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekdaysEnAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const month = date.getMonth();      // 0-11
    const day = date.getDate();         // 1-31
    const weekday = date.getDay();      // 0-6 (0 表示星期日)

    if (language === 'zh') {
        return {month:monthsZh[month],day:day,weekday:weekdaysZh[weekday]}
    } else {
        return {month:monthsEn[month],day:day,weekday:weekdaysEnAbbr[weekday]}
    }
}




// 定义存储的 key
const LAST_LOGIN_KEY = '@last_login_info';

// 保存上次登录的账号信息
export const saveLastLoginInfo = async (username, remember = true) => {
    if (remember) {
        try {
            await AsyncStorage.setItem(LAST_LOGIN_KEY, username);
        } catch (error) {
            console.error('保存失败', error);
        }
    } else {
        // 如果用户选择不记住，则清除存储
        await removeLastLoginInfo();
    }
};

// 读取上次登录的账号信息
export const getLastLoginInfo = async () => {
    try {
        const username = await AsyncStorage.getItem(LAST_LOGIN_KEY);
        return username || '';
    } catch (error) {
        console.error('读取失败', error);
        return '';
    }
};

// 清除存储的上次登录信息（例如用户登出时调用）
export const removeLastLoginInfo = async () => {
    try {
        await AsyncStorage.removeItem(LAST_LOGIN_KEY);
    } catch (error) {
        console.error('清除失败', error);
    }
};
