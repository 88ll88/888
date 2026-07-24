/* ===/* ===================================================
 * ds.js - 微型日曆與單一期數搜尋工具
 * =================================================== */

(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // 預設日期（自動抓 zzz 第一筆與第30筆）
        var dStart = "2026-07-02", dEnd = "2025-01-01";
        if (typeof zzz !== 'undefined' && zzz.length > 0) {
            dStart = String(zzz[0][0]).replace(/\(.\)/g, '').trim();
            var lastIdx = Math.min(29, zzz.length - 1);
            dEnd = String(zzz[lastIdx][0]).replace(/\(.\)/g, '').trim();
        }

        // 注入微型 CSS 樣式
        var style = document.createElement('style');
        style.innerHTML = `
            .ds-panel { width:1175px; margin:10px 0; padding:4px 8px; background:#f8f9fa; border:1px solid #ccc; box-sizing:border-box; display:flex; align-items:center; justify-content:flex-start; gap:6px; font-size:12px; font-weight:bold; position:relative; text-align:left; }
            .ds-input { width:95px; height:20px; text-align:center; font-weight:bold; font-size:12px; border:1px solid #999; background:#fff; cursor:pointer; }
            .ds-p-input { width:55px; height:20px; text-align:center; font-weight:bold; font-size:12px; border:1px solid #999; background:#fff; }
            .ds-btn { height:22px; padding:0 8px; background:#222; color:#fff; border:none; border-radius:2px; font-size:12px; font-weight:bold; cursor:pointer; }
            
            /* 📅 超小巧微型日曆 (寬度僅 180px) */
            .ds-picker { position:absolute; background:#fff; border:1px solid #999; box-shadow:2px 2px 8px rgba(0,0,0,0.2); padding:6px; z-index:9999; display:none; width:180px; box-sizing:border-box; border-radius:3px; }
            .ds-picker-head { display:flex; justify-content:space-between; margin-bottom:4px; }
            .ds-picker-head select { font-size:11px; padding:1px; font-weight:bold; }
            .ds-weekdays { display:grid; grid-template-columns:repeat(7, 1fr); text-align:center; font-size:10px; font-weight:bold; color:#666; margin-bottom:2px; }
            .ds-days-grid { display:grid; grid-template-columns:repeat(7, 1fr); gap:2px; }
            .ds-cell { height:18px; background:#fff; border:1px solid #eee; font-size:11px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:2px; }
            .ds-cell:hover:not(.disabled) { background:#eee; }
            .ds-cell.selected { background:#007bff !important; color:#fff !important; }
            .ds-cell.disabled { background:#f0f0f0 !important; color:#ccc !important; cursor:not-allowed !important; }
        `;
        document.head.appendChild(style);

        // 建立單一控制列 HTML
        var bar = document.createElement("div");
        bar.className = "ds-panel";
        bar.innerHTML = `
            <!-- 1. 最左邊：單一期數填寫框 + 搜尋按鈕 -->
            <span>期數：</span>
            [ <input type="text" id="start_p" class="ds-p-input" value="30"> ]
            <button class="ds-btn" onclick="searchData()">搜尋</button>

            <!-- 2. 快捷切換按鈕 30, 60, 100, 200, 500 -->
            <span style="margin-left: 4px;">
                [ <a href="javascript:void(0)" onclick="setPeriod(30)">30</a> ] 
                [ <a href="javascript:void(0)" onclick="setPeriod(60)">60</a> ] 
                [ <a href="javascript:void(0)" onclick="setPeriod(100)">100</a> ] 
                [ <a href="javascript:void(0)" onclick="setPeriod(200)">200</a> ] 
                [ <a href="javascript:void(0)" onclick="setPeriod(500)">500</a> ]
            </span>
            
            <span style="margin: 0 4px;">│</span>

            <!-- 3. 日期區間搜尋與日曆 -->
            <span>區間：</span>
            <input type="text" id="ds_start" class="ds-input" value="${dStart}" readonly onclick="dsOpenPicker(this)">
            <span>至</span>
            <input type="text" id="ds_end" class="ds-input" value="${dEnd}" readonly onclick="dsOpenPicker(this)">
            <button class="ds-btn" onclick="dsSearch()">搜尋區間</button>

            <!-- 微型彈出日曆 -->
            <div id="dsPicker" class="ds-picker">
                <div class="ds-picker-head">
                    <select id="dsYear" onchange="dsRenderDays()"></select>
                    <select id="dsMonth" onchange="dsRenderDays()"></select>
                </div>
                <div class="ds-weekdays"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>
                <div id="dsGrid" class="ds-days-grid"></div>
            </div>
        `;
        document.body.appendChild(bar);

        // 初始化年份和月份選單
        var ySel = document.getElementById("dsYear");
        var mSel = document.getElementById("dsMonth");
        for (var y = 2007; y <= 2026; y++) ySel.innerHTML += `<option value="${y}">${y}年</option>`;
        for (var m = 1; m <= 12; m++) mSel.innerHTML += `<option value="${String(m).padStart(2,'0')}">${m}月</option>`;
    });
})();

// 微型日曆邏輯
var dsActiveInput = null;

function dsOpenPicker(inputEl) {
    dsActiveInput = inputEl;
    var picker = document.getElementById("dsPicker");
    
    picker.style.left = inputEl.offsetLeft + "px";
    picker.style.top = (inputEl.offsetTop - 170) + "px";
    picker.style.display = "block";

    var parts = inputEl.value.split("-");
    if (parts.length === 3) {
        document.getElementById("dsYear").value = parts[0];
        document.getElementById("dsMonth").value = parts[1];
    }
    dsRenderDays();
}

function dsRenderDays() {
    var year = document.getElementById("dsYear").value;
    var month = document.getElementById("dsMonth").value;
    var grid = document.getElementById("dsGrid");
    grid.innerHTML = "";

    var drawnDates = new Set();
    if (typeof zzz !== 'undefined') {
        zzz.forEach(function(item) { 
            if (item && item[0]) drawnDates.add(item[0].replace(/\(.\)/g, '').trim()); 
        });
    }

    var firstDay = new Date(parseInt(year), parseInt(month) - 1, 1).getDay();
    var totalDays = new Date(parseInt(year), parseInt(month), 0).getDate();

    for (var i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement("div"));
    }

    var curVal = dsActiveInput ? dsActiveInput.value : "";

    for (var d = 1; d <= totalDays; d++) {
        var dStr = String(d).padStart(2, '0');
        var fullDate = year + '-' + month + '-' + dStr;
        var cell = document.createElement("div");
        cell.className = "ds-cell";
        cell.innerText = dStr;

        if (!drawnDates.has(fullDate)) {
            cell.classList.add("disabled");
        } else {
            if (fullDate === curVal) cell.classList.add("selected");
            cell.onclick = (function(val) {
                return function() {
                    dsActiveInput.value = val;
                    document.getElementById("dsPicker").style.display = "none";
                };
            })(fullDate);
        }
        grid.appendChild(cell);
    }
}

// 核心去括號比對邏輯
function getZzzByRange(box1Date, box2Date) {
    if (typeof zzz === 'undefined' || !zzz.length) return [];
    
    var d1 = String(box1Date).replace(/\(.\)/g, '').trim();
    var d2 = String(box2Date).replace(/\(.\)/g, '').trim();
    
    var maxD = d1 > d2 ? d1 : d2;
    var minD = d1 > d2 ? d2 : d1;

    return zzz.filter(function(item) {
        if (!item || !item[0]) return false;
        var itemDate = String(item[0]).replace(/\(.\)/g, '').trim();
        return itemDate <= maxD && itemDate >= minD;
    });
}

// 日期區間搜尋
function dsSearch() {
    var v1 = document.getElementById('ds_start').value;
    var v2 = document.getElementById('ds_end').value;
    var filtered = getZzzByRange(v1, v2);

    if (filtered.length > 0 && typeof renderAll === 'function') {
        currentData = filtered;
        renderAll(currentData);
    }
}

// 點擊空白處關閉日曆
document.addEventListener("click", function(e) {
    var picker = document.getElementById("dsPicker");
    if (picker && picker.style.display === "block") {
        if (!picker.contains(e.target) && e.target !== document.getElementById("ds_start") && e.target !== document.getElementById("ds_end")) {
            picker.style.display = "none";
        }
    }
});
