/* ===================================================
 * right.js - 8個獨立頁面自動跳轉與亮起側邊欄
 * =================================================== */

(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // 1. 注入 CSS 樣式
        var style = document.createElement('style');
        style.innerHTML = `
            .right-sidebar {
                position: fixed;
                right: 5px;
                top: 50px;
                width: 25px;
                height: 600px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 0;
                z-index: 9999;
                user-select: none;
            }

            .capsule-btn {
                width: 25px;
                height: 75px;
                border-radius: 10em;
                background-color: #888888; /* 預設中灰 */
                color: #ffffff; /* 白字 */
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-sizing: border-box;
                transition: all 0.2s ease;
                
                writing-mode: vertical-lr;
                font-size: 11px;
                font-weight: bold;
                letter-spacing: 2px;
                text-align: center;
                border: 0.5px solid #fff;
            }

            .capsule-btn:hover {
                background-color: #a0a0a0;
            }

            /* 當前頁面亮起：白灰底黑字 */
            .capsule-btn.active {
                background-color: #e0e0e0 !important;
                color: #000000 !important;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);

        // 2. 自動取得當前是第幾頁 (例如 1.html -> 1)
        var path = window.location.pathname;
        var currentPageName = path.split("/").pop(); // 拿到 "1.html"
        var currentNum = parseInt(currentPageName.replace(".html", "")) || 1; // 預設 1

        // 3. 建立右側欄 HTML
        var sidebar = document.createElement("div");
        sidebar.className = "right-sidebar";

        var html = '';
        for (var i = 1; i <= 8; i++) {
            // 如果按鈕編號等於目前頁面編號，就加上 active 亮起
            var activeClass = (i === currentNum) ? ' active' : '';
            html += `<div class="capsule-btn${activeClass}" onclick="goToPage(${i})">三分區</div>`;
        }
        sidebar.innerHTML = html;
        document.body.appendChild(sidebar);
    });
})();

// 點擊直接跳轉對應的 HTML 檔
function goToPage(pageNum) {
    window.location.href = pageNum + '.html';
}
