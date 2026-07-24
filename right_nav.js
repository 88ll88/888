/* ===================================================
 * right_nav.js - 自動生成右側欄選單 (8個頁面自動跳轉)
 * =================================================== */

(function() {
    // 8 個按鈕對應的文字與檔名
    var menuData = [
        { name: "pppp", file: pppp.html" },
        { name: "分佈", file: "分佈.html" },
        { name: "拖牌", file: "3.html" },
        { name: "遺漏", file: "4.html" },
        { name: "統計", file: "5.html" },
        { name: "連莊", file: "6.html" },
        { name: "連號", file: "7.html" },
        { name: "尾號", file: "8.html" }
    ];

    function initRightSidebar() {
        // 1. 動態注入 CSS 樣式
        if (!document.getElementById('glass-nav-sidebar-style')) {
            var style = document.createElement('style');
            style.id = 'glass-nav-sidebar-style';
            style.innerHTML = `
                .glass-nav-sidebar {
                    position: fixed !important;
                    right: 5px !important;
                    top: 50px !important;
                    width: 25px !important;
                    height: 600px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: space-between !important; /* 首尾貼邊，中間均分 */
                    align-items: center !important;
                    z-index: 9999 !important;
                    user-select: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: transparent !important;
                }

                .glass-nav-sidebar .glass-nav__item {
                    width: 25px !important;
                    height: 70px !important;
                    line-height: normal !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    
                    writing-mode: vertical-lr !important;
                    letter-spacing: 0px !important;
                    font-size: 11px !important;
                    font-weight: bold !important;
                    
                    /* 未選中時透明無框 */
                    background-color: transparent !important;
                    border: none !important;
                    border-radius: 0 !important;
                    color: #888888 !important;
                    
                    cursor: pointer !important;
                    box-sizing: border-box !important;
                    transition: all 0.2s ease !important;
                }

                .glass-nav-sidebar .glass-nav__item:hover {
                    color: #ffffff !important;
                }

                /* 點擊/當前頁面：白灰膠囊框 */
                .glass-nav-sidebar .glass-nav__item--active {
                    background-color: #e0e0e0 !important;
                    color: #000000 !important;
                    border-radius: 10em !important;
                    border: 0.5px solid #fff !important;
                    font-weight: bold !important;
                }
            `;
            document.head.appendChild(style);
        }

        // 2. 自動判斷當前是第幾頁 (例如網址是 1.html)
        var path = window.location.pathname;
        var currentPage = path.split("/").pop() || "1.html"; // 預設 1.html

        // 3. 自動建立外層 <nav> 容器
        if (!document.getElementById('autoRightNav')) {
            var nav = document.createElement("nav");
            nav.id = "autoRightNav";
            nav.className = "glass glass-nav glass-nav-sidebar";

            // 4. 用迴圈生出 8 個按鈕，自動比對亮起與點擊跳轉
            var html = '';
            menuData.forEach(function(item) {
                var isActive = (currentPage === item.file) ? ' glass-nav__item--active' : '';
                html += `<span class="glass-nav__item${isActive}" tabindex="0" onclick="window.location.href='${item.file}'">${item.name}</span>`;
            });

            nav.innerHTML = html;
            document.body.appendChild(nav);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRightSidebar);
    } else {
        initRightSidebar();
    }
})();
