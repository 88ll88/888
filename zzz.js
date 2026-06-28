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
