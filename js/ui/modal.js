/**
 * 模态框管理模块
 */
const Modal = (function() {
    // 模态框元素
    let modal = null;
    let modalContent = null;
    let cardPreview = null;

    // 配置
    const config = {
        modalId: 'cardModal',
        previewId: 'cardPreview'
    };

    // 初始化
    function init() {
        modal = document.getElementById(config.modalId);
        modalContent = modal?.querySelector('.card-content');
        cardPreview = document.getElementById(config.previewId);

        if (!modal) {
            console.error('Modal element not found');
            return;
        }

        // 绑定事件
        bindEvents();
    }

    // 绑定事件
    function bindEvents() {
        // 点击模态框外部关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                close();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen()) {
                close();
            }
        });
    }

    // 打开模态框
    function open() {
        if (!modal) return;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动

        // 触发打开事件
        const event = new CustomEvent('modalOpen', { detail: { modal } });
        document.dispatchEvent(event);
    }

    // 关闭模态框
    function close() {
        if (!modal) return;

        modal.classList.remove('show');
        document.body.style.overflow = ''; // 恢复滚动

        // 触发关闭事件
        const event = new CustomEvent('modalClose', { detail: { modal } });
        document.dispatchEvent(event);
    }

    // 切换模态框状态
    function toggle() {
        if (isOpen()) {
            close();
        } else {
            open();
        }
    }

    // 检查模态框是否打开
    function isOpen() {
        return modal?.classList.contains('show') || false;
    }

    // 设置模态框内容
    function setContent(content) {
        if (!modalContent) return;
        modalContent.innerHTML = content;
    }

    // 更新卡片预览
    function updateCardPreview(birthDate) {
        if (!cardPreview || !birthDate) return;
        
        CardGenerator.generatePreview(birthDate, cardPreview);
    }

    // 设置模态框标题
    function setTitle(title) {
        const titleElement = modalContent?.querySelector('h2');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    // 获取模态框元素
    function getModal() {
        return modal;
    }

    // 获取模态框内容区域
    function getContent() {
        return modalContent;
    }

    // 添加自定义样式
    function addStyle(styles) {
        if (!modal) return;
        
        const styleId = 'modal-custom-styles';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = styles;
    }

    // 移除自定义样式
    function removeStyle() {
        const styleElement = document.getElementById('modal-custom-styles');
        if (styleElement) {
            styleElement.remove();
        }
    }

    // 公共API
    return {
        init,
        open,
        close,
        toggle,
        isOpen,
        setContent,
        setTitle,
        updateCardPreview,
        getModal,
        getContent,
        addStyle,
        removeStyle
    };
})();

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
} else {
    window.Modal = Modal;
}