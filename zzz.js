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
