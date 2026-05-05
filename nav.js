// nav.js - 集中管理導航列
(function() {
    // 1. 定義所有導航項目
    var menuItems = [
        { name: "分佈", url: "分佈.html" },
        { name: "遺漏", url: "遺漏.html" },
        { name: "拖牌", url: "拖牌.html" },
        { name: "統計", url: "統計.html" },
        { name: "三分", url: "三分.html" },
        { name: "連莊", url: "連莊.html" },
        { name: "連號", url: "連號.html" },
        { name: "單双", url: "單双.html" },
        { name: "頭尾", url: "頭尾.html" },
        { name: "双胞", url: "双胞.html" }
    ];

    // 2. 取得當前檔案名稱 (處理中文編碼)
    var path = window.location.pathname;
    var page = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));

    // 3. 組合 HTML 字串
    var html = '<div class="nav-container">';
    
    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];
        // 比對檔名，若符合則加入 nav-active 類別
        var activeClass = (page === item.url) ? ' nav-active' : '';
        html += '<a href="' + item.url + '" class="nav-item' + activeClass + '">' + item.name + '</a>';
    }
    
    html += '</div>';

    // 4. 將導航列輸出到頁面
    document.write(html);
})();