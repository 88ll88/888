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
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date()).replace(/\//g, '-');
})();

var WeekStr = (function(){
  // 'narrow' 會直接輸出 "一"、"二"、"日"
  const w = new Intl.DateTimeFormat('zh-TW', { weekday: 'narrow' }).format(new Date());
  return `(${w})`;
})();

var TimeStr = (function(){
  return new Intl.DateTimeFormat('zh-TW', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).format(new Date());
})();
