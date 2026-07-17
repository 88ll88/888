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

    var color=[
["#000000","#272727","#3C3C3C","#4F4F4F","#5B5B5B","#6C6C6C","#7B7B7B","#8E8E8E","#9D9D9D","#ADADAD","#BEBEBE","#D0D0D0","#E0E0E0","#F0F0F0","#FCFCFC","#FFFFFF"],
["#2F0000","#4D0000","#600000","#750000","#930000","#AE0000","#CE0000","#EA0000","#FF0000","#FF2D2D","#FF5151","#FF7575","#FF9797","#FFB5B5","#FFD2D2","#FFECEC"],
["#600030","#820041","#9F0050","#BF0060","#D9006C","#F00078","#FF0080","#FF359A","#FF60AF","#FF79BC","#FF95CA","#FFAAD5","#FFC1E0","#FFD9EC","#FFECF5","#FFF7FB"],
["#460046","#5E005E","#750075","#930093","#AE00AE","#D200D2","#E800E8","#FF00FF","#FF44FF","#FF77FF","#FF8EFF","#FFA6FF","#FFBFFF","#FFD0FF","#FFE6FF","#FFF7FF"],
["#28004D","#3A006F","#4B0091","#5B00AE","#6F00D2","#8600FF","#921AFF","#9F35FF","#B15BFF","#BE77FF","#CA8EFF","#D3A4FF","#DCB5FF","#E6CAFF","#F1E1FF","#FAF4FF"],
["#000079","#000093","#0000C6","#0000C6","#0000E3","#2828FF","#4A4AFF","#6A6AFF","#7D7DFF","#9393FF","#AAAAFF","#B9B9FF","#CECEFF","#DDDDFF","#ECECFF","#FBFBFF"],
["#003060","#003D79","#004B97","#005AB5","#0066CC","#0072E3","#0080FF","#2894FF","#46A3FF","#66B3FF","#84C1FF","#97CBFF","#ACD6FF","#C4E1FF","#D2E9FF","#ECF5FF"],
["#003E3E","#005757","#007979","#009393","#00AEAE","#00CACA","#00E3E3","#00FFFF","#4DFFFF","#80FFFF","#A6FFFF","#BBFFFF","#CAFFFF","#D9FFFF","#ECFFFF","#FDFFFF"],
["#006030","#01814A","#019858","#01B468","#02C874","#02DF82","#02F78E","#1AFD9C","#4EFEB3","#7AFEC6","#96FED1","#ADFEDC","#C1FFE4","#D7FFEE","#E8FFF5","#FBFFFD"],
["#006000","#007500","#009100","#00A600","#00BB00","#00DB00","#00EC00","#28FF28","#53FF53","#79FF79","#93FF93","#A6FFA6","#BBFFBB","#CEFFCE","#DFFFDF","#F0FFF0"],
["#467500","#548C00","#64A600","#73BF00","#82D900","#8CEA00","#9AFF02","#A8FF24","#B7FF4A","#C2FF68","#CCFF80","#D3FF93","#DEFFAC","#E8FFC4","#EFFFD7","#F5FFE8"],
["#424200","#5B5B00","#737300","#8C8C00","#A6A600","#C4C400","#E1E100","#F9F900","#FFFF37","#FFFF6F","#FFFF93","#FFFFAA","#FFFFB9","#FFFFCE","#FFFFDF","#FFFFF4"],
["#5B4B00","#796400","#977C00","#AE8F00","#C6A300","#D9B300","#EAC100","#FFD306","#FFDC35","#FFE153","#FFE66F","#FFED97","#FFF0AC","#FFF4C1","#FFF8D7","#FFFCEC"],
["#844200","#9F5000","#BB5E00","#D26900","#EA7500","#FF8000","#FF9224","#FFA042","#FFAF60","#FFBB77","#FFC78E","#FFD1A4","#FFDCB9","#FFE4CA","#FFEEDD","#FFFAF4"],
["#642100","#842B00","#A23400","#BB3D00","#D94600","#F75000","#FF5809","#FF8040","#FF8F59","#FF9D6F","#FFAD86","#FFBD9D","#FFCBB3","#FFDAC8","#FFE6D9","#FFF3EE"],
["#613030","#743A3A","#804040","#984B4B","#AD5A5A","#B87070","#C48888","#CF9E9E","#D9B3B3","#E1C4C4","#EBD6D6","#F2E6E6","","","",""],
["#616130","#707038","#808040","#949449","#A5A552","#AFAF61","#B9B973","#C2C287","#CDCD9A","#D6D6AD","#DEDEBE","#E8E8D0","","","",""],
["#336666","#3D7878","#408080","#4F9D9D","#5CADAD","#6FB7B7","#81C0C0","#95CACA","#A3D1D1","#B3D9D9","#C4E1E1","#D1E9E9","","","",""],
["#484891","#5151A2","#5A5AAD","#7373B9","#8080C0","#9999CC","#A6A6D2","#B8B8DC","#C7C7E2","#D8D8EB","#E6E6F2","#F3F3FA","","","",""],
["#6C3365","#7E3D76","#8F4586","#9F4D95","#AE57A4","#B766AD","#C07AB8","#CA8EC2","#D2A2CC","#DAB1D5","#E2C2DE","#EBD3E8","","","",""]
];
