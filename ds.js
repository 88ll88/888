/* ===================================================
 * ds.js - 微型日曆與區間搜尋工具 (靠右對齊 + 切換月預設1號版)
 * =================================================== */

// 1. 初始化年份與月份下拉選單，並設定初始預設日期
function dsInitYearMonth() {
    var ySel = document.getElementById("dsYear");
    var mSel = document.getElementById("dsMonth");
    if (ySel && mSel && ySel.options.length === 0) {
        for (var y = 2007; y <= 2026; y++) ySel.innerHTML += `<option value="${y}">${y}年</option>`;
        for (var m = 1; m <= 12; m++) mSel.innerHTML += `<option value="${String(m).padStart(2,'0')}">${m}月</option>`;
        
        // 💡 年月選單切換時，自動設定為 1 號並秒觸發搜尋！
        ySel.onchange = dsOnYearMonthChange;
        mSel.onchange = dsOnYearMonthChange;
    }

    // 設定初始預設日期：左邊今天、右邊100天前
    var startInput = document.getElementById('ds_start');
    var endInput = document.getElementById('ds_end');

    if (startInput && endInput && (!startInput.value || !endInput.value)) {
        var today = new Date();
        var pastDay = new Date();
        pastDay.setDate(today.getDate() - 100);

        var formatDate = function(d) {
            var yyyy = d.getFullYear();
            var mm = String(d.getMonth() + 1).padStart(2, '0');
            var dd = String(d.getDate()).padStart(2, '0');
            return yyyy + '-' + mm + '-' + dd;
        };

        startInput.value = formatDate(today);
        endInput.value = formatDate(pastDay);
    }
}

// 💡 下拉選單（切換年月）時的處理：自動抓 1 號 + 搜尋
function dsOnYearMonthChange() {
    var yearEl = document.getElementById("dsYear");
    var monthEl = document.getElementById("dsMonth");
    if (!yearEl || !monthEl || !dsActiveInput) return;

    var newDate = yearEl.value + '-' + monthEl.value + '-01';
    dsActiveInput.value = newDate; // 預設帶入 1 號
    
    dsRenderDays(); // 重新繪製日曆
    dsSearch();     // 秒觸發搜尋！
}

document.addEventListener("DOMContentLoaded", function() {
    dsInitYearMonth();
});

// 2. 微型日曆開啟與繪製邏輯
var dsActiveInput = null;

function dsOpenPicker(inputEl) {
    dsInitYearMonth();
    dsActiveInput = inputEl;
    var picker = document.getElementById("dsPicker");
    if (!picker) return;
    
    picker.style.display = "block";
    
    // 💡 關鍵：改為靠右對齊！計算右邊界線，確保日曆右側不超出點擊欄位的右側
    var inputRight = inputEl.offsetLeft + inputEl.offsetWidth;
    var pickerWidth = picker.offsetWidth || 220; // 預設日曆寬度
    var calculatedLeft = inputRight - pickerWidth;
    
    // 如果靠右對齊算出來太靠左，最少貼著 offsetLeft
    picker.style.left = (calculatedLeft < 0 ? inputEl.offsetLeft : calculatedLeft) + "px";

    var parts = inputEl.value.split("-");
    if (parts.length === 3) {
        var yEl = document.getElementById("dsYear");
        var mEl = document.getElementById("dsMonth");
        if (yEl) yEl.value = parts[0];
        if (mEl) mEl.value = parts[1];
    }
    dsRenderDays();
}

function dsRenderDays() {
    var yearEl = document.getElementById("dsYear");
    var monthEl = document.getElementById("dsMonth");
    var grid = document.getElementById("dsGrid");
    if (!yearEl || !monthEl || !grid) return;
    
    var year = yearEl.value;
    var month = monthEl.value;
    grid.innerHTML = "";

    // 整理開獎歷史日期 Set
    var drawnDates = new Set();
    if (typeof zzz !== 'undefined') {
        zzz.forEach(function(item) { 
            if (item && item[0]) drawnDates.add(item[0].replace(/\(.\)/g, '').trim()); 
        });
    }

    var firstDay = new Date(parseInt(year), parseInt(month) - 1, 1).getDay();
    var totalDays = new Date(parseInt(year), parseInt(month), 0).getDate();

    // 補齊月首空白格
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
            
            // 🎯 點擊日期格子：更新日期、關閉日曆、觸發搜尋
            cell.onclick = (function(val) {
                return function() {
                    if (dsActiveInput) dsActiveInput.value = val;
                    document.getElementById("dsPicker").style.display = "none";
                    dsSearch();
                };
            })(fullDate);
        }
        grid.appendChild(cell);
    }
}

// 3. 核心去括號比對邏輯
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

// 4. 區間搜尋動作
function dsSearch() {
    var v1 = document.getElementById('ds_start').value;
    var v2 = document.getElementById('ds_end').value;

    var filtered = getZzzByRange(v1, v2);

    if (filtered.length > 0 && typeof renderAll === 'function') {
        renderAll(filtered);
    } else {
        alert("找不到此區間內的開獎紀錄！");
    }
}

// 點擊空白處關閉日曆
document.addEventListener("click", function(e) {
    var picker = document.getElementById("dsPicker");
    if (picker && picker.style.display === "block") {
        var startInput = document.getElementById("ds_start");
        var endInput = document.getElementById("ds_end");
        if (!picker.contains(e.target) && e.target !== startInput && e.target !== endInput) {
            picker.style.display = "none";
        }
    }
});
