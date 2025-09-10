/**
 * 暖心文字管理模块
 */
const Quotes = (function() {
    // 暖心文字库
    const quotes = [
        "生命是由一周一周的点滴，编织成的浩瀚星图。",
        "时间不会停下脚步，但会在记忆里留下温柔的光。",
        "每一个今天，都是未来岁月里最年轻的时刻。",
        "不必追问生命的长度，珍惜每一寸正在流动的时光。",
        "时间是最公平的老师，也是最温柔的雕刻师。",
        "你走过的每一步，都在为生命涂抹独特的色彩。",
        "岁月的意义，不在远方，而在每一个被认真度过的瞬间。",
        "生命是一场旅程，目的地重要，沿途的风景更珍贵。",
        "时间让我们明白：最耀眼的风景，常常在平凡里。",
        "生命的宽度，由爱和热情来拓展。",
        "未来是一张未完成的画布，笔在你手中。",
        "岁月从不辜负认真生活的人。",
        "时间的价值，不在长短，而在浓淡。",
        "人生不是倒计时，而是点亮每一个属于你的当下。",
        "当下这一刻，是我们真正能够把握的全部。",
        "生命不必惊艳，但要真实而温热。",
        "时间是最沉默的见证者，却记得你所有的努力。",
        "每一次呼吸，都是生命赠予的答卷。",
        "岁月温柔，它让失去成为懂得，让开始成为勇敢。",
        "一生太短，短到来不及浪费，足够好好热爱。"
    ];

    // 已使用的文字索引（避免重复）
    let usedIndices = new Set();

    // 获取随机暖心文字
    function getRandomQuote() {
        // 如果所有文字都用过了，重置
        if (usedIndices.size >= quotes.length) {
            usedIndices.clear();
        }

        // 获取未使用的文字
        const availableIndices = [];
        for (let i = 0; i < quotes.length; i++) {
            if (!usedIndices.has(i)) {
                availableIndices.push(i);
            }
        }

        // 随机选择一个
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        usedIndices.add(randomIndex);

        return {
            text: quotes[randomIndex],
            index: randomIndex
        };
    }

    // 获取指定索引的文字
    function getQuoteByIndex(index) {
        if (index >= 0 && index < quotes.length) {
            return {
                text: quotes[index],
                index: index
            };
        }
        return null;
    }

    // 获取所有文字
    function getAllQuotes() {
        return quotes.map((text, index) => ({
            text,
            index
        }));
    }

    // 获取文字数量
    function getCount() {
        return quotes.length;
    }

    // 重置已使用记录
    function resetUsage() {
        usedIndices.clear();
    }

    // 搜索文字
    function searchQuotes(keyword) {
        const results = [];
        const lowerKeyword = keyword.toLowerCase();
        
        quotes.forEach((text, index) => {
            if (text.toLowerCase().includes(lowerKeyword)) {
                results.push({
                    text,
                    index
                });
            }
        });
        
        return results;
    }

    // 公共API
    return {
        getRandomQuote,
        getQuoteByIndex,
        getAllQuotes,
        getCount,
        resetUsage,
        searchQuotes
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Quotes;
} else {
    window.Quotes = Quotes;
}