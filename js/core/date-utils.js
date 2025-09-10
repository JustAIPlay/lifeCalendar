/**
 * 日期计算工具模块
 */
const DateUtils = {
    // 计算从出生日期到现在的周数
    calculateWeeksSinceBirth(birthDate, currentDate = new Date()) {
        const birthTime = birthDate.getTime();
        const currentTime = currentDate.getTime();
        return Math.floor((currentTime - birthTime) / (1000 * 60 * 60 * 24 * 7));
    },

    // 计算生命进度百分比
    calculateLifeProgress(weeksLived, totalWeeks = 4680) {
        return ((weeksLived / totalWeeks) * 100).toFixed(1);
    },

    // 计算剩余周数
    calculateRemainingWeeks(weeksLived, totalWeeks = 4680) {
        return totalWeeks - weeksLived;
    },

    // 计算年龄
    calculateAge(birthDate, currentDate = new Date()) {
        const ageInMs = currentDate - birthDate;
        const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
        return Math.floor(ageInYears);
    },

    // 格式化日期显示
    formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 获取周的开始日期（周一）
    getWeekStartDate(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    },

    // 获取周的结束日期（周日）
    getWeekEndDate(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() + (day === 0 ? 0 : 7 - day);
        return new Date(d.setDate(diff));
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
} else {
    window.DateUtils = DateUtils;
}