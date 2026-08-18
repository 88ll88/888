var ddd = [
  ["2026-08-18(二)","28","39","05","06","10"],
  ["2026-08-17(一)","22","38","28","19","27"],
  ["2026-08-15(六)","35","21","37","14","12"],
  ["2026-08-14(五)","34","25","07","19","21"],
  ["2026-08-13(四)","17","18","05","11","12"],
  ["2026-08-12(三)","32","07","12","17","20"],
  ["2026-08-11(二)","07","19","23","30","17"],
  ["2026-08-10(一)","23","35","16","07","01"],
  ["2026-08-08(六)","05","31","11","24","32"],
  ["2026-08-07(五)","13","06","11","12","19"],
  ["2026-08-06(四)","24","09","16","35","03"],
  ["2026-08-05(三)","29","22","02","04","25"],
  ["2026-08-04(二)","32","39","37","35","09"],
  ["2026-08-03(一)","07","28","21","35","23"],
  ["2026-08-01(六)","06","22","29","11","18"],
  ["2026-07-31(五)","01","12","25","09","26"],
  ["2026-07-30(四)","16","08","04","38","07"],
  ["2026-07-29(三)","33","36","05","14","32"],
  ["2026-07-28(二)","08","31","23","13","05"],
  ["2026-07-27(一)","19","16","32","24","07"],
  ["2026-07-25(六)","39","08","12","23","16"],
  ["2026-07-24(五)","05","36","17","29","27"],
  ["2026-07-23(四)","25","19","14","26","12"],
  ["2026-07-22(三)","31","14","19","21","03"],
  ["2026-07-21(二)","37","39","27","19","12"],
  ["2026-07-20(一)","24","13","10","20","12"],
  ["2026-07-18(六)","33","29","18","34","37"],
  ["2026-07-17(五)","10","12","28","35","29"],
  ["2026-07-16(四)","25","13","28","31","30"],
  ["2026-07-15(三)","16","30","21","06","19"]
];
// 1. 最新一期（第一筆 ddd[0]）的期數，每次新增開獎時只需將此數字 +1
var zzzInd = 115198; 

// 2. 自動將 ddd 轉換為 zzz 陣列（網頁載入時只計算一次）
var zzz = ddd.map(function(row, i) {
  // 取出落球序 5 個號碼
  var dropBalls = row.slice(1, 6); 
  
  // 自動由小到大排序成順球序
  var orderBalls = dropBalls.slice().sort(function(a, b) { 
    return parseInt(a, 10) - parseInt(b, 10); 
  }); 

  // 回傳格式：[日期, [順球序], [落球序], 期次]
  return [row[0], orderBalls, dropBalls, zzzInd - i];
});

var CLR=[
["#757171","#999999","#E6E6E6"], //黑
["#990000","#FF0000","#FFE5E5"], //紅
["#000080","#0000FF","#E5E5FF"], //藍
["#006600","#00CC00","#E5FFE5"], //綠
["#B36B00","#FF9900","#FFF5E5"], //橙
["#660066","#9900CC","#FFE5FF"], //紫
["#B300B0","#FF00FF","#FFF2FF"], //粉
["#999900","#FFFF00","#FFFFE5"]  //黃
];

function TT(x){
       var xz= Array(40).fill(0);
       ddd.slice(0, x).map(r =>r[1].map(n => xz[Number(n)]++));
       return xz.slice(1,40);
}
// === 1. 你的 539 開獎業務日期邏輯 (原本的 Lottedy) ===
var Lottedy = (function(){
    const now = new Date();
    
    // 將時間往回推 1240 分鐘
    now.setMinutes(now.getMinutes() - 1240);
    
    // 週日不開獎自動退回週六
    if (now.getDay() === 0) {
        now.setDate(now.getDate() - 1);
    }
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
})();

// === 2. 倒數計時功能 (自動載入，不影響其他程式) ===
(function () {
    window.addEventListener('DOMContentLoaded', function() {
        setInterval(function() {
            const now = new Date();
            const target = new Date();
            
            target.setHours(20, 35, 0, 0);
            
            if (now.getTime() >= target.getTime()) {
                target.setDate(target.getDate() + 1);
            }
            
            const diff = target.getTime() - now.getTime();
            
            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
            const ms = String(diff % 1000).padStart(3, '0');
            
            const timerEl = document.getElementById('countdown-timer');
            if (timerEl) {
                timerEl.textContent = `${hours}:${minutes}:${seconds}.${ms}`;
            }
        }, 40); // 提升每秒更新次數以流暢顯示毫秒
    });
})();
function iX(n) {
    n = (n===0||n===undefined)? zzz.length:n;
    var c = new Array(39).fill(0);
    for (var i = 0; i < n; i++) { zzz[i][1].forEach(s => {c[+s - 1]++; }); }
    return c;
}

/**
 * 539 全站超彈性通用底部總計渲染函數
 * @param {number} currentN - 當前頁面想要統計的期數（例如：30）
 */
function drawTotalRows(currentN) {
    var totalTfoot = document.getElementById("total-rows");
    if (!totalTfoot) return; // 防呆：如果該頁面沒有 tfoot 就不執行

    var currentCounts = iX(currentN);   // 當前 N 期的次數 (01-39 陣列)
    var historyCounts = iX(0);          // 歷史全期數的次數 (01-39 陣列)
    var totalHtml = '';
    
    // 1. 當前 N 期統計列 (黃字)
    totalHtml += '<tr class="total-tr" style="color:#ffeb3b;">';
    totalHtml += '  <td><div class="total-left"><span class="left-txt">第1期至第' + currentN + '期</span><span class="right-txt">共' + currentN + '期 次數</span></div></td>';
    for (var m = 0; m < 39; m++) { 
        totalHtml += '<td class="total-count-td">' + currentCounts[m] + '</td>'; 
    }
    totalHtml += '  <td></td>'; 
    totalHtml += '</tr>';
    
    // 2. 歷史全期數總計列 (綠字)
    totalHtml += '<tr class="total-tr" style="color:#00ff00;">';
    totalHtml += '  <td><div class="total-left"><span class="left-txt">第1期至第' + zzz.length + '期</span><span class="right-txt">共' + zzz.length + '期 次數</span></div></td>';
    for (var m = 0; m < 39; m++) { 
        totalHtml += '<td class="total-count-td">' + historyCounts[m] + '</td>'; 
    }
    totalHtml += '  <td></td>'; 
    totalHtml += '</tr>';

    // 塞入表格底部
    totalTfoot.innerHTML = totalHtml;
}
var CC=[
["#595959","#660000","#000066","#006600","#280051","#663D00","#666600","#660066","#513D00","#003D14","#006666","#660028"],
["#7F7F7F","#CC0000","#0000CC","#00CC00","#5100A3","#CC7A00","#CCCC00","#CC00CC","#A37A00","#007A28","#00CCCC","#CC0051"],
["#8C8C8C","#FF0000","#0000FF","#00FF00","#6600CC","#FF9900","#FFFF00","#FF00FF","#CC9900","#009933","#00FFFF","#FF0066"],
["#999999","#FF3333","#3333FF","#33FF33","#8433D6","#FFAD33","#FFFF33","#FF33FF","#D6AD33","#33AD5B","#33FFFF","#FF3384"],
["#A5A5A5","#FF4C4C","#4C4CFF","#4CFF4C","#934CDB","#FFB74C","#FFFF4C","#FF4CFF","#DBB74C","#4CB770","#4CFFFF","#FF4C93"],
["#B2B2B2","#FF6666","#6666FF","#66FF66","#A366E0","#FFC166","#FFFF66","#FF66FF","#E0C166","#66C184","#66FFFF","#FF66A3"],
["#BFBFBF","#FF9999","#9999FF","#99FF99","#C199EA","#FFD699","#FFFF99","#FF99FF","#EAD699","#99D6AD","#99FFFF","#FF99C1"],
["#CCCCCC","#FFCCCC","#CCCCFF","#CCFFCC","#E0CCF4","#FFEACC","#FFFFCC","#FFCCFF","#F4EACC","#CCEAD6","#CCFFFF","#FFCCE0"],
["#D8D8D8","#FFE5E5","#E5E5FF","#E5FFE5","#EFE5F9","#FFF4E5","#FFFFE5","#FFE5FF","#F9F4E5","#E5F4EA","#E5FFFF","#FFE5EF"]
];
