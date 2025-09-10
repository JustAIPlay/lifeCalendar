/**
 * 卡片生成器模块
 */
const CardGenerator = (function() {
    // 配置
    const config = {
        width: 800,
        height: 500,
        cellSize: 3,
        gap: 1,
        cols: 52,
        rows: 90,
        fontSize: {
            title: 22,
            subtitle: 16,
            quote: 16
        }
    };

    // 当前选中的文字
    let selectedQuote = null;

    // 初始化
    function init() {
        selectedQuote = Quotes.getRandomQuote();
    }

    // 设置选中的文字
    function setSelectedQuote(quote) {
        selectedQuote = quote;
    }

    // 获取当前选中的文字
    function getSelectedQuote() {
        return selectedQuote;
    }

    // 创建SVG卡片
    function createSVGCard(birthDate, weeksLived, colors, quote) {
        const { width, height, cellSize, gap, cols, rows, fontSize } = config;
        const totalWeeks = 4680;
        const percentage = DateUtils.calculateLifeProgress(weeksLived, totalWeeks);

        // 计算格子图位置
        const gridWidth = cols * (cellSize + gap);
        const gridHeight = rows * (cellSize + gap);
        const startX = (width - gridWidth) / 2;
        const startY = 70;

        let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
        
        // 背景
        svg += `<rect width="${width}" height="${height}" fill="${colors.bg}"/>`;
        
        // 标题
        svg += `<text x="${width/2}" y="35" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize.title}" font-weight="bold" fill="${colors.past}">我的生命日历</text>`;
        svg += `<text x="${width/2}" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize.subtitle}" fill="${colors.past}">已度过 ${percentage}%</text>`;
        
        // 绘制格子
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const weekIndex = row * cols + col;
                const x = startX + col * (cellSize + gap);
                const y = startY + row * (cellSize + gap);
                
                let color = colors.future;
                if (weekIndex < weeksLived) {
                    color = colors.past;
                } else if (weekIndex === weeksLived) {
                    color = colors.now;
                }
                
                svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" rx="0.5"/>`;
            }
        }
        
        // 暖心文字
        const quoteY = startY + gridHeight + 50;
        svg += `<text x="${width/2}" y="${quoteY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize.quote}" font-style="italic" fill="${colors.past}">${quote.text}</text>`;
        
        svg += `</svg>`;
        
        return svg;
    }

    // 下载PNG卡片 - 使用Canvas直接绘制
    function downloadPNGCard(birthDate, weeksLived, colors, quote) {
        const { width, height, cellSize, gap, cols, rows, fontSize } = config;
        const totalWeeks = 4680;
        const percentage = DateUtils.calculateLifeProgress(weeksLived, totalWeeks);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        
        // 绘制背景
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 计算格子图位置
        const gridWidth = cols * (cellSize + gap);
        const gridHeight = rows * (cellSize + gap);
        const startX = (canvas.width - gridWidth) / 2;
        const startY = 70;
        
        // 绘制标题
        ctx.fillStyle = colors.past;
        ctx.font = `bold ${fontSize.title}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('我的生命日历', canvas.width / 2, 35);
        
        ctx.font = `${fontSize.subtitle}px Arial`;
        ctx.fillText(`已度过 ${percentage}%`, canvas.width / 2, 60);
        
        // 绘制格子
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const weekIndex = row * cols + col;
                const x = startX + col * (cellSize + gap);
                const y = startY + row * (cellSize + gap);
                
                let color = colors.future;
                if (weekIndex < weeksLived) {
                    color = colors.past;
                } else if (weekIndex === weeksLived) {
                    color = colors.now;
                }
                
                ctx.fillStyle = color;
                ctx.fillRect(x, y, cellSize, cellSize);
            }
        }
        
        // 绘制暖心文字
        ctx.fillStyle = colors.past;
        ctx.font = `italic ${fontSize.quote}px Arial`;
        ctx.textAlign = 'center';
        const quoteY = startY + gridHeight + 50;
        
        // 处理文字换行
        const maxWidth = 700;
        const words = quote.text.split('');
        let line = '';
        let lineY = quoteY;
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, canvas.width / 2, lineY);
                line = words[i];
                lineY += 20;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvas.width / 2, lineY);
        
        // 下载图片
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `life-calendar-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    // 生成卡片预览
    function generatePreview(birthDate, container) {
        if (!container || !birthDate) return;

        const weeksLived = DateUtils.calculateWeeksSinceBirth(birthDate);
        const colors = ThemeManager.getCurrentThemeColors();
        const quote = selectedQuote || Quotes.getRandomQuote();
        
        const svg = createSVGCard(birthDate, weeksLived, colors, quote);
        container.innerHTML = svg;
    }

    // 公共API
    return {
        init,
        setSelectedQuote,
        getSelectedQuote,
        createSVGCard,
        downloadPNGCard,
        generatePreview
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardGenerator;
} else {
    window.CardGenerator = CardGenerator;
}