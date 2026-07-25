/* ===================================================
 * ds.js - 微型日曆與區間搜尋工具 (預設日期 + 秒速自動搜尋版)
 * =================================================== */

// 1. 初始化年份與月份下拉選單，並設定預設日期 (左:今天 / 右:100天前)
function dsInitYearMonth() {
    var ySel = document.getElementById("dsYear");
    var mSel = document.getElementById("dsMonth");
    if (ySel && mSel && ySel.options.length === 0) {
        for (var y = 2007; y <= 2026; y++) ySel.innerHTML += `<option value="${y}">${y}年</option>`;
        for (var m = 1; m <= 12; m++) mSel.innerHTML += `<option value="${String(m).padStart(2,'0')}">${m}月</option>`;
    }

    // 💡 設定預設日期：左邊今天、右邊100天前
    var startInput = document.getElementById('ds_start');
    var endInput = document.getElementById('ds_end');

    if (startInput && endInput && (!startInput.value || !endInput.value)) {
        var today = new Date();
        var pastDay = new Date();
        pastDay.setDate(today.getDate() - 100); // 往前推 100 天

        var formatDate = function(d) {
            var yyyy = d.getFullYear();
            var mm = String(d.getMonth() + 1).padStart(2, '0');
            var dd = String(d.getDate()).padStart(2, '0');
            return yyyy + '-' + mm + '-' + dd;
        };

        startInput.value = formatDate(today);   // 左邊：今天
        endInput.value = formatDate(pastDay);   // 右邊：100天前
    }
}

// 頁面載入完成後初始化
document.addEventListener("DOMContentLoaded", function() {
    dsInitYearMonth();
});

// 2. 微型日曆開啟與繪製邏輯
var dsActiveInput = null;

function dsOpenPicker(inputEl) {
    dsInitYearMonth(); // 確保選單與預設值已載入
    dsActiveInput = inputEl;
    var picker = document.getElementById("dsPicker");
    if (!picker) return;
    
    // 計算彈出日曆的位置，貼在當前輸入框的正上方
    picker.style.left = inputEl.offsetLeft + "px";
    picker.style.display = "block";

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
            cell.classList.add("disabled"); // 未開獎的日期變灰格
        } else {
            if (fullDate === curVal) cell.classList.add("selected");
            
            // 🎯 只要點擊日期，立刻更新輸入框、關閉日曆，並直接觸發搜尋！
            cell.onclick = (function(val) {
                return function() {
                    if (dsActiveInput) dsActiveInput.value = val;
                    document.getElementById("dsPicker").style.display = "none";
                    dsSearch(); // 點擊即搜尋！
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

// 4. 點擊日期自動執行的區間搜尋動作
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
