/**
 * 主题管理器模块
 */
const ThemeManager = (function() {
    // 当前主题
    let currentTheme = 'default';
    
    // 回调函数列表
    const callbacks = [];

    // 初始化主题管理器
    function init() {
        // 从本地存储加载主题
        const savedTheme = localStorage.getItem('life-calendar-theme');
        if (savedTheme && Themes.getTheme(savedTheme)) {
            currentTheme = savedTheme;
        }
        
        // 应用主题
        applyTheme(currentTheme);
        
        // 渲染主题选择器
        renderThemeSelector();
    }

    // 切换主题
    function switchTheme(themeName) {
        if (!Themes.getTheme(themeName)) {
            console.warn(`Theme '${themeName}' not found`);
            return;
        }

        currentTheme = themeName;
        applyTheme(themeName);
        
        // 保存到本地存储
        localStorage.setItem('life-calendar-theme', themeName);
        
        // 更新选择器UI
        updateThemeSelector();
        
        // 触发回调
        notifyCallbacks(themeName);
    }

    // 应用主题到DOM
    function applyTheme(themeName) {
        const body = document.body;
        
        // 移除所有主题类
        body.classList.remove('theme-warm', 'theme-monochrome');
        
        // 添加新主题类
        if (themeName !== 'default') {
            body.classList.add(`theme-${themeName}`);
        }
    }

    // 获取当前主题
    function getCurrentTheme() {
        return currentTheme;
    }

    // 获取当前主题颜色
    function getCurrentThemeColors() {
        return Themes.getThemeColors(currentTheme);
    }

    // 渲染主题选择器
    function renderThemeSelector() {
        const selector = document.querySelector('.theme-selector');
        if (!selector) return;

        selector.innerHTML = '';
        
        const allThemes = Themes.getAllThemes();
        
        allThemes.forEach(themeName => {
            const theme = Themes.getTheme(themeName);
            const option = document.createElement('div');
            option.className = 'theme-option';
            option.dataset.theme = themeName;
            
            if (themeName === currentTheme) {
                option.classList.add('active');
            }
            
            // 预览颜色
            const preview = document.createElement('div');
            preview.className = 'theme-preview';
            
            theme.preview.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'preview-color';
                colorDiv.style.backgroundColor = color;
                preview.appendChild(colorDiv);
            });
            
            // 主题名称
            const name = document.createElement('span');
            name.textContent = theme.name;
            
            option.appendChild(preview);
            option.appendChild(name);
            
            // 点击事件
            option.addEventListener('click', () => {
                switchTheme(themeName);
            });
            
            selector.appendChild(option);
        });
    }

    // 更新主题选择器状态
    function updateThemeSelector() {
        const options = document.querySelectorAll('.theme-option');
        options.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === currentTheme) {
                option.classList.add('active');
            }
        });
    }

    // 添加主题变化回调
    function onThemeChange(callback) {
        if (typeof callback === 'function') {
            callbacks.push(callback);
        }
    }

    // 移除主题变化回调
    function offThemeChange(callback) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    // 通知所有回调
    function notifyCallbacks(themeName) {
        callbacks.forEach(callback => {
            try {
                callback(themeName);
            } catch (error) {
                console.error('Theme change callback error:', error);
            }
        });
    }

    // 公共API
    return {
        init,
        switchTheme,
        getCurrentTheme,
        getCurrentThemeColors,
        onThemeChange,
        offThemeChange
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} else {
    window.ThemeManager = ThemeManager;
}