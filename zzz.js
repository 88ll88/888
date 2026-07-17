var baseId = 115114; 
var baseDateStr = "2026-05-09(六)";
var pivotIndex = ddd.findIndex(row => row[0] === baseDateStr);
var zzz = ddd.map((item, index) => {
    var dateStr = item[0];
    var originalOrder = item.slice(1, 6).map(n => String(n).padStart(2, '0'));
    var news = [...originalOrder].sort();
    var currentId = 0;
    if (pivotIndex !== -1) {
        currentId = baseId + (pivotIndex - index);
    }
    return [dateStr, news, originalOrder, currentId];
});

var DateStr = (function(){
  var d = new Date();
  var pad = function(n) { return (n < 10 ? '0' : '') + n; };
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
})();

var WeekStr = (function(){
  var weeks = ['日', '一', '二', '三', '四', '五', '六'];
  var index = new Date().getDay(); // 取得 0 (日) 到 6 (六)
  return '(' + weeks[index] + ')';
})();

var TimeStr = (function(){
  var d = new Date();
  var pad = function(n) { return (n < 10 ? '0' : '') + n; };
  return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
})();
function toggleRow(rowElement) {
            // 切換 .show-active 這個類名，有就移除，沒有就加上
            rowElement.classList.toggle("show-active");
}

        function toggleRowColor(rowElement) {
            var activeRows = document.querySelectorAll('.active-row');
            activeRows.forEach(r => { if (r !== rowElement) r.classList.remove('active-row'); });
            rowElement.classList.toggle('active-row');
        }


        // 📅 ---------------- 🛠️ 完備流曆控制邏輯 ---------------- 📅
        var activeInput = null;

        function initSelectOptions() {
            var ySelect = document.getElementById("pickerYearSelect");
            var mSelect = document.getElementById("pickerMonthSelect");
            
            var yHtml = '';
            for (var y = 2007; y <= 2026; y++) {
                yHtml += `<option value="${y}">${y} 年</option>`;
            }
            ySelect.innerHTML = yHtml;

            var mHtml = '';
            for (var m = 1; m <= 12; m++) {
                mHtml += `<option value="${String(m).padStart(2, '0')}">${m} 月</option>`;
            }
            mSelect.innerHTML = mHtml;
        }
        initSelectOptions();

        function openPicker(inputElement) {
            activeInput = inputElement;
            var picker = document.getElementById("datePicker");
            
            var rect = inputElement.getBoundingClientRect();
            var wrapperRect = document.getElementById("mainWrapper").getBoundingClientRect();
            picker.style.left = (rect.left - wrapperRect.left) + "px";
            picker.style.top = (rect.top - wrapperRect.top - 250) + "px"; 
            picker.style.display = "block";

            var currentVal = inputElement.value;
            var year = "2026", month = "07", day = "02";
            if (currentVal) {
                var parts = currentVal.split("-");
                if (parts.length === 3) { year = parts[0]; month = parts[1]; day = parts[2]; }
            }

            document.getElementById("pickerYearSelect").value = year;
            document.getElementById("pickerMonthSelect").value = month;

            renderCalendarDays(year, month, day);
        }

        function onHeaderChange() {
            var year = document.getElementById("pickerYearSelect").value;
            var month = document.getElementById("pickerMonthSelect").value;
            activeInput.value = year + "-" + month + "-01";
            renderCalendarDays(year, month, "01");
        }

        function renderCalendarDays(year, month, selectedDay) {
            var grid = document.getElementById("pickerDaysGrid");
            grid.innerHTML = "";

            var firstDayIndex = new Date(parseInt(year), parseInt(month) - 1, 1).getDay();
            var totalDays = new Date(parseInt(year), parseInt(month), 0).getDate();

            for (var i = 0; i < firstDayIndex; i++) {
                var blank = document.createElement("div");
                blank.className = "day-cell disabled";
                grid.appendChild(blank);
            }

            for (var d = 1; d <= totalDays; d++) {
                var dStr = String(d).padStart(2, '0');
                var currentCellDate = year + "-" + month + "-" + dStr;

                var cell = document.createElement("div");
                cell.className = "day-cell";
                cell.innerText = dStr;

                if (currentCellDate > TODAY_STR) {
                    cell.classList.add("disabled");
                } else {
                    if (dStr === selectedDay) { cell.classList.add("selected"); }
                    
                    cell.onclick = (function(dateValue) {
                        return function() {
                            activeInput.value = dateValue;
                            closePicker();
                        };
                    })(currentCellDate);
                }
                grid.appendChild(cell);
            }
        }

        function closePicker() {
            document.getElementById("datePicker").style.display = "none";
        }

        document.addEventListener("click", function(e) {
            var picker = document.getElementById("datePicker");
            if (picker.style.display === "block") {
                if (!picker.contains(e.target) && e.target !== document.getElementById("dateStart") && e.target !== document.getElementById("dateEnd")) {
                    closePicker();
                }
            }
        });

        function toggleRowColor(rowElement) {
            var activeRows = document.querySelectorAll('.active-row');
            activeRows.forEach(r => { if (r !== rowElement) r.classList.remove('active-row'); });
            rowElement.classList.toggle('active-row');
        }

    
