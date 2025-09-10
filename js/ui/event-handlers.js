/**
 * 事件处理器模块
 */
const EventHandlers = (function() {
    // 元素引用
    let birthDateInput = null;
    let generateBtn = null;
    let downloadBtn = null;
    let closeBtn = null;

    // 初始化
    function init() {
        // 获取元素引用
        birthDateInput = document.getElementById('birthDate');
        generateBtn = document.querySelector('.generate-btn');
        downloadBtn = document.querySelector('.download-btn');
        closeBtn = document.querySelector('.close-btn');

        if (!birthDateInput) {
            console.error('Birth date input not found');
            return;
        }

        // 绑定事件
        bindEvents();
        
        // 设置默认日期
        setDefaultDate();
    }

    // 绑定事件
    function bindEvents() {
        // 出生日期变化事件
        birthDateInput.addEventListener('change', handleBirthDateChange);
        
        // 生成卡片按钮事件
        if (generateBtn) {
            generateBtn.addEventListener('click', handleGenerateCard);
        }
        
        // 下载按钮事件
        if (downloadBtn) {
            downloadBtn.addEventListener('click', handleDownloadCard);
        }
        
        // 关闭按钮事件
        if (closeBtn) {
            closeBtn.addEventListener('click', handleCloseModal);
        }
    }

    // 设置默认日期（30年前）
    function setDefaultDate() {
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() - 30);
        birthDateInput.value = defaultDate.toISOString().split('T')[0];
        
        // 触发初始更新
        handleBirthDateChange();
    }

    // 处理出生日期变化
    function handleBirthDateChange() {
        const birthDate = new Date(birthDateInput.value);
        
        if (isNaN(birthDate.getTime())) {
            console.error('Invalid birth date');
            return;
        }

        // 更新日历
        const calendarStats = Calendar.updateCalendar(birthDate);
        
        // 获取完整的统计信息
        const stats = Calendar.getStats(birthDate);
        
        // 更新统计信息
        updateStats(stats);
        
        // 如果模态框打开，更新卡片预览
        if (Modal.isOpen()) {
            Modal.updateCardPreview(birthDate);
        }
    }

    // 更新统计信息显示
    function updateStats(stats) {
        if (!stats) return;

        const infoElement = document.querySelector('.info');
        if (!infoElement) return;

        const age = DateUtils.calculateAge(new Date(birthDateInput.value));
        
        infoElement.innerHTML = `
            <div>已度过 ${stats.weeksLived} 周，剩余 ${stats.remainingWeeks} 周</div>
            <div>当前年龄：${age} 岁</div>
            <div>生命进度：${stats.progress}%</div>
        `;
    }

    // 处理生成卡片
    function handleGenerateCard() {
        const birthDate = new Date(birthDateInput.value);
        
        if (isNaN(birthDate.getTime())) {
            alert('请选择有效的出生日期');
            return;
        }

        // 随机选择暖心文字
        const quote = Quotes.getRandomQuote();
        CardGenerator.setSelectedQuote(quote);

        // 打开模态框
        Modal.open();
        
        // 更新卡片预览
        Modal.updateCardPreview(birthDate);
    }

    // 处理下载卡片
    function handleDownloadCard() {
        const birthDate = new Date(birthDateInput.value);
        
        if (isNaN(birthDate.getTime())) {
            alert('请选择有效的出生日期');
            return;
        }

        const weeksLived = DateUtils.calculateWeeksSinceBirth(birthDate);
        const colors = ThemeManager.getCurrentThemeColors();
        const quote = CardGenerator.getSelectedQuote();

        // 下载PNG卡片
        CardGenerator.downloadPNGCard(birthDate, weeksLived, colors, quote);
    }

    // 处理关闭模态框
    function handleCloseModal() {
        Modal.close();
    }

    // 处理主题变化
    function handleThemeChange(themeName) {
        // 重新创建日历以应用新颜色
        const birthDate = new Date(birthDateInput.value);
        if (!isNaN(birthDate.getTime())) {
            Calendar.updateCalendar(birthDate);
        }
        
        // 如果模态框打开，重新生成卡片预览
        if (Modal.isOpen()) {
            Modal.updateCardPreview(birthDate);
        }
    }

    // 重新绑定事件（用于动态内容）
    function rebindEvents() {
        bindEvents();
    }

    // 销毁事件处理器
    function destroy() {
        if (birthDateInput) {
            birthDateInput.removeEventListener('change', handleBirthDateChange);
        }
        
        if (generateBtn) {
            generateBtn.removeEventListener('click', handleGenerateCard);
        }
        
        if (downloadBtn) {
            downloadBtn.removeEventListener('click', handleDownloadCard);
        }
        
        if (closeBtn) {
            closeBtn.removeEventListener('click', handleCloseModal);
        }
    }

    // 公共API
    return {
        init,
        handleBirthDateChange,
        handleGenerateCard,
        handleDownloadCard,
        handleCloseModal,
        handleThemeChange,
        rebindEvents,
        destroy
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventHandlers;
} else {
    window.EventHandlers = EventHandlers;
}