(function() {
    // 1. 自動注入 CSS 樣式
    const style = document.createElement('style');
    style.textContent = `
        /* 右側欄固定定位容器：高 600px */
        .glass-nav-sidebar {
            position: fixed;
            right: 0px;
            top: 2px;
            width: 25px;
            height: 600px;
            
            display: flex;
            flex-direction: column;
            justify-content: space-between !important; 
            align-items: center;
            
            z-index: 9999;
            user-select: none;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* 項目尺寸 (22px × 70px) */
        .glass-nav-sidebar .glass-nav__item {
            width: 25px !important;
            height: 70px !important;
            line-height: normal !important;
            margin: 0 !important;
            padding: 0 !important;
            
            display: flex;
            align-items: center;
            justify-content: center;
            
            /* 直書排版 */
            writing-mode: vertical-lr;
            letter-spacing: 0px;
            font-size: 16px;
            font-weight: bold;
            
            /* 未選中時無膠囊框 */
            background-color: transparent !important;
            border:0.5px solid #ccc!important;
            border-radius: 0 !important;
            color: #ccc;
            
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        /* Hover 懸停效果 */
        .glass-nav-sidebar .glass-nav__item:hover {
            color: #ccc;
        }

        /* Active（選中）膠囊框 */
        .glass-nav-sidebar .glass-nav__item--active {
            background-color: #e0e0e0 !important;
            color: #000000 !important;
            border-radius: 20em !important;
            border: 0.5px solid #e6e6e6 !important;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // 2. 選項資料設定
    const navItems = ["走勢", "三分", "拖牌", "遺漏", "統計", "連莊", "連號", "尾號"];

    // 3. 建立 DOM 元素
    const navContainer = document.createElement('nav');
    navContainer.className = 'glass glass-nav glass-nav-sidebar';

    navItems.forEach((text, index) => {
        const item = document.createElement('span');
        item.className = 'glass-nav__item' + (index === 0 ? ' glass-nav__item--active' : '');
        item.setAttribute('tabindex', '0');
        item.innerText = text;

        // 綁定點擊切換事件
        item.addEventListener('click', function() {
            // 移除其他項目的 active
            navContainer.querySelectorAll('.glass-nav__item').forEach(el => {
                el.classList.remove('glass-nav__item--active');
            });

            // 加上 active
            this.classList.add('glass-nav__item--active');

            // 觸發自訂切換邏輯 (可在此擴充你的功能)
            onNavChange(text);
        });

        navContainer.appendChild(item);
    });

    // 4. 當 DOM 載入完成後自動掛載到 body
    if (document.body) {
        document.body.appendChild(navContainer);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(navContainer);
        });
    }

    // 5. 切換分頁時的事件處理函式
    function onNavChange(tabName) {
        console.log("切換到分頁：", tabName);
        
        // 💡 可以在這裡根據 tabName 執行相應的動作，例如：
        // if (tabName === "遺漏") { loadOmissionPage(); }
    }
})();
