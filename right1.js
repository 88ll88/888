((function() {
    // 1. 自動注入 CSS 樣式
    const style = document.createElement('style');
    style.textContent = `
        /* 外層長膠囊容器 (25px × 600px) */
        .glass-nav-sidebar {
            position: fixed;
            right: 0px;
            top: 5px;                  /* 距離頂部起始高度 */
            width: 25px !important;
            height: 600px !important;  /* 固定總高度 600px */
            
            background-color: #2b2b2b !important; /* 深灰底色 */
            border-radius: 12.5px !important;     /* 完美圓角膠囊 */
            border: none !important;
            
            display: flex;
            flex-direction: column;
            justify-content: space-between !important; /* 首尾對齊，中間均分 */
            align-items: center;
            
            z-index: 9999;
            user-select: none;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box;
        }

        /* 內部 8 個小膠囊項目 (25px × 75px) */
        .glass-nav-sidebar .glass-nav__item {
            width: 25px !important;
            height: 75px !important;   /* 75px × 8 個 = 600px 完美填滿 */
            line-height: normal !important;
            margin: 0 !important;
            padding: 0 !important;
            
            display: flex;
            align-items: center;
            justify-content: center;
            
            writing-mode: vertical-lr; /* 直書文字 */
            letter-spacing: 0px;
            font-size: 11px;
            font-weight: bold;
            
            /* 未選中時：中灰底色、無邊框 */
            background-color: #4a4a4a !important;
            color: #d0d0d0 !important;
            border: none !important;
            border-radius: 12.5px !important;
            
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        /* Hover 懸停效果 */
        .glass-nav-sidebar .glass-nav__item:hover {
            color: #ffffff !important;
            background-color: #5a5a5a !important;
        }

        /* 💡 Active（亮燈選中）：淡灰框 + 更淡的淡灰底色 */
        .glass-nav-sidebar .glass-nav__item--active {
            background-color: #e8e8e8 !important; /* 更淡的淡灰底色 */
            color: #111111 !important;             /* 深色文字 */
            border: 1px solid #cccccc !important;  /* 淡灰邊框 */
            border-radius: 12.5px !important;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // 2. 設定 8 個按鈕名稱與對應的【中文 HTML 網頁檔名】
    // (如果你的檔名有少副檔名或字不一樣，直接改引號裡面的中文即可)
    const navData = [
        { name: "分佈", url: "分佈.html" },
        { name: "三分", url: "三分.html" },
        { name: "拖牌", url: "拖牌.html" },
        { name: "遺漏", url: "遺漏.html" },
        { name: "統計", url: "統計.html" },
        { name: "連莊", url: "連莊.html" },
        { name: "連號", url: "連號.html" },
        { name: "尾號", url: "尾號.html" }
    ];

    // 3. 自動抓取「目前開著的網頁檔名」（自動進行網址轉碼解讀，精準支援中文檔名）
    const rawPath = window.location.pathname.split("/").pop() || "分佈.html";
    const currentPath = decodeURIComponent(rawPath);

    // 4. 動態建立選單
    const navContainer = document.createElement('nav');
    navContainer.className = 'glass glass-nav glass-nav-sidebar';

    navData.forEach(itemInfo => {
        const item = document.createElement('span');
        item.className = 'glass-nav__item';
        item.setAttribute('tabindex', '0');
        item.innerText = itemInfo.name;

        // 🎯 關鍵：比對中文檔名，符合就自動給它「亮燈（active）」！
        if (currentPath === itemInfo.url || currentPath.indexOf(itemInfo.name) !== -1) {
            item.classList.add('glass-nav__item--active');
        }

        // 點擊時跳轉至對應的中文網頁
        item.addEventListener('click', function() {
            if (currentPath !== itemInfo.url) {
                window.location.href = itemInfo.url;
            }
        });

        navContainer.appendChild(item);
    });

    // 5. 放進網頁中
    if (document.body) {
        document.body.appendChild(navContainer);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(navContainer);
        });
    }
})();() {
    // 1. 自動注入 CSS 樣式
    const style = document.createElement('style');
    style.textContent = `
        /* 外層長膠囊容器 (25px × 600px) */
        .glass-nav-sidebar {
            position: fixed;
            right: 0px;
            top: 5px;                  /* 距離頂部起始高度 */
            width: 25px !important;
            height: 600px !important;  /* 固定總高度 600px */
            
            background: #666 !important; /* 深灰底色 */
            border-radius: 12.5px !important;     /* 完美圓角膠囊 */
            border: none !important;
            
            display: flex;
            flex-direction: column;
            justify-content: space-between !important; /* 首尾對齊，中間均分 */
            align-items: center;
            
            z-index: 9999;
            user-select: none;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box;
        }

        /* 內部 8 個小膠囊項目 (25px × 75px) */
        .glass-nav-sidebar .glass-nav__item {
            width: 25px !important;
            height: 75px !important;   /* 75px × 8 個 = 600px 完美填滿 */
            line-height: normal !important;
            margin: 0 !important;
            padding: 0 !important;
            
            display: flex;
            align-items: center;
            justify-content: center;
            
            writing-mode: vertical-lr; /* 直書文字 */
            letter-spacing: 0px;
            font-size: 18px;
            font-weight: bold;
            
            /* 未選中時：中灰底色、無邊框 */
            background-color: #4a4a4a !important;
            color: #d0d0d0 !important;
            border: none !important;
            border-radius: 12.5px !important;
            
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        /* Hover 懸停效果 */
        .glass-nav-sidebar .glass-nav__item:hover {
            color: #ffffff !important;
            background-color: #5a5a5a !important;
        }

        /* 💡 Active（亮燈選中）：淡灰框 + 更淡的淡灰底色 */
        .glass-nav-sidebar .glass-nav__item--active {
            background-color: #e8e8e8 !important; /* 更淡的淡灰底色 */
            color: #111111 !important;             /* 深色文字 */
            border: 0.5px solid #cccccc !important;  /* 淡灰邊框 */
            border-radius: 12.5px !important;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // 2. 設定 8 個按鈕名稱與對應的【中文 HTML 網頁檔名】
    // (如果你的檔名有少副檔名或字不一樣，直接改引號裡面的中文即可)
    const navData = [
        { name: "分佈", url: "分佈.html" },
        { name: "三分", url: "三分.html" },
        { name: "拖牌", url: "拖牌.html" },
        { name: "遺漏", url: "遺漏.html" },
        { name: "統計", url: "統計.html" },
        { name: "連莊", url: "連莊.html" },
        { name: "連號", url: "連號.html" },
        { name: "尾號", url: "尾號.html" }
    ];

    // 3. 自動抓取「目前開著的網頁檔名」（自動進行網址轉碼解讀，精準支援中文檔名）
    const rawPath = window.location.pathname.split("/").pop() || "分佈.html";
    const currentPath = decodeURIComponent(rawPath);

    // 4. 動態建立選單
    const navContainer = document.createElement('nav');
    navContainer.className = 'glass glass-nav glass-nav-sidebar';

    navData.forEach(itemInfo => {
        const item = document.createElement('span');
        item.className = 'glass-nav__item';
        item.setAttribute('tabindex', '0');
        item.innerText = itemInfo.name;

        // 🎯 關鍵：比對中文檔名，符合就自動給它「亮燈（active）」！
        if (currentPath === itemInfo.url || currentPath.indexOf(itemInfo.name) !== -1) {
            item.classList.add('glass-nav__item--active');
        }

        // 點擊時跳轉至對應的中文網頁
        item.addEventListener('click', function() {
            if (currentPath !== itemInfo.url) {
                window.location.href = itemInfo.url;
            }
        });

        navContainer.appendChild(item);
    });

    // 5. 放進網頁中
    if (document.body) {
        document.body.appendChild(navContainer);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(navContainer);
        });
    }
})();
