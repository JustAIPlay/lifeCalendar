/**
 * 主题配置模块
 */
const Themes = {
    // 主题定义
    themes: {
        default: {
            name: '清新蓝调',
            colors: {
                bg: '#F6F8FA',
                past: '#1E88E5',
                future: '#E6EEF6',
                now: '#FFC857'
            },
            preview: ['#1E88E5', '#FFC857', '#E6EEF6']
        },
        warm: {
            name: '温柔岁月',
            colors: {
                bg: '#FFF8F3',
                past: '#D87C56',
                future: '#F6EDEC',
                now: '#FFC857'
            },
            preview: ['#D87C56', '#FFC857', '#F6EDEC']
        },
        monochrome: {
            name: '极简黑白',
            colors: {
                bg: '#FFFFFF',
                past: '#111827',
                future: '#E6E7EB',
                now: '#FFD166'
            },
            preview: ['#111827', '#FFD166', '#E6E7EB']
        }
    },

    // 获取所有主题
    getAllThemes() {
        return Object.keys(this.themes);
    },

    // 获取主题配置
    getTheme(themeName) {
        return this.themes[themeName] || this.themes.default;
    },

    // 获取主题颜色
    getThemeColors(themeName) {
        const theme = this.getTheme(themeName);
        return theme ? theme.colors : this.themes.default.colors;
    },

    // 获取主题预览颜色
    getThemePreview(themeName) {
        const theme = this.getTheme(themeName);
        return theme ? theme.preview : this.themes.default.preview;
    },

    // 获取主题名称
    getThemeName(themeName) {
        const theme = this.getTheme(themeName);
        return theme ? theme.name : this.themes.default.name;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Themes;
} else {
    window.Themes = Themes;
}