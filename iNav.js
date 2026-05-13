(function () {
        var oBar = document.getElementById("nav-bar");
        if (!oBar) return;    
        var path = window.location.pathname;
        var oName = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));    
        if (oName === "" || oName === "/") oName = "分佈.html";
        var btns = [
                {name: "分佈", url: "分佈.html"},
                {name: "遺漏", url: "遺漏.html"},
                {name: "拖牌", url: "拖牌.html"},
                {name: "統計", url: "統計.html"},
                {name: "三分", url: "三分.html"},
                {name: "連莊", url: "連莊.html"},
                {name: "連號", url: "連號.html"},
                {name: "單双", url: "單双.html"},
                {name: "頭尾", url: "頭尾.html"},
                {name: "双胞", url: "双胞.html"}
        ];
        var html = '<class="iDate"></span>';
        for (var i = 0; i < btns.length; i++) {
                var item = btns[i];
                var isCurrent = (oName === item.url) ? " active" : "";      
                html += '<div class="n-btn' + isCurrent + '" onclick="location.href=\'' + item.url + '\'">' + item.name + '</div>';
        }
        oBar.innerHTML = html;
)}();

