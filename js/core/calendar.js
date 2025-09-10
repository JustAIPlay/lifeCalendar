/**
 * 日历核心逻辑模块
 */
const Calendar = (function() {
    // 配置
    const config = {
        totalWeeks: 4680, // 90年
        weeksPerYear: 52,
        years: 90,
        containerId: 'calendar'
    };

    // 私有变量
    let container = null;

    // 初始化
    function init(containerId = config.containerId) {
        container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Calendar container with id '${containerId}' not found`);
        }
        createCalendar();
    }

    // 创建日历格子
    function createCalendar() {
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < config.totalWeeks; i++) {
            const week = document.createElement('div');
            week.className = 'week future';
            week.dataset.week = i;
            
            // 添加悬停提示
            week.title = `第 ${i + 1} 周`;
            
            container.appendChild(week);
        }
    }

    // 更新日历状态
    function updateCalendar(birthDate) {
        if (!container || !birthDate) return;

        const weeksLived = DateUtils.calculateWeeksSinceBirth(birthDate);
        const weeks = container.querySelectorAll('.week');

        weeks.forEach((week, index) => {
            week.className = 'week';
            
            if (index < weeksLived) {
                week.classList.add('past');
            } else if (index === weeksLived) {
                week.classList.add('present');
            } else {
                week.classList.add('future');
            }
        });

        return {
            weeksLived,
            totalWeeks: config.totalWeeks,
            progress: DateUtils.calculateLifeProgress(weeksLived, config.totalWeeks)
        };
    }

    // 获取日历统计信息
    function getStats(birthDate) {
        if (!birthDate) return null;

        const weeksLived = DateUtils.calculateWeeksSinceBirth(birthDate);
        const age = DateUtils.calculateAge(birthDate);
        const remainingWeeks = DateUtils.calculateRemainingWeeks(weeksLived, config.totalWeeks);
        const progress = DateUtils.calculateLifeProgress(weeksLived, config.totalWeeks);

        return {
            weeksLived,
            remainingWeeks,
            age,
            progress,
            totalWeeks: config.totalWeeks
        };
    }

    // 公共API
    return {
        init,
        updateCalendar,
        getStats,
        createCalendar,
        config
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calendar;
} else {
    window.Calendar = Calendar;
}