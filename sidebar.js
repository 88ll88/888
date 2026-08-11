// 1. 注入 CSS：精準調小所有元件的尺寸比例
const style = document.createElement('style');
style.textContent = `
  /* 整個元件容器固定在右下角，完全貼緊 */
  .scale-container.right-sidebar-widget {
    position: fixed;
    right: 12px;
    bottom: 12px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    user-select: none;
  }

  /* 垂直排列，且強制所有子元素極致靠右對齊 */
  .lottery-widget {
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    gap: 8px; /* 縮小間距 */
    width: auto;
  }

  /* 膠囊選單容器：精準貼齊右側，預設隱藏並帶有淡入動畫 */
  .lottery-menu {
    display: none;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px; /* 縮小膠囊之間的間距 */
    padding-right: 0px;
  }
  
  .lottery-menu.show {
    display: flex;
    animation: fadeInCapsule 0.15s ease-out;
  }

  @keyframes fadeInCapsule {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* 還原精緻小巧的圓角膠囊樣式 */
  .menu-btn {
    display: block;
    width: 105px;         /* 從 140px 縮小到 105px */
    padding: 7px 0;       /* 從 12px 縮小到 7px，高度變精緻 */
    text-align: center;
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    font-size: 13px;      /* 字體縮小，更貼合原圖比例 */
    letter-spacing: 1px;
    border-radius: 20px;  /* 完美的精緻小圓角 */
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2), inset 0 -2px 0 rgba(0,0,0,0.15);
    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
    position: relative;
    transition: transform 0.1s;
  }
  .menu-btn:active { transform: scale(0.96); }

  /* 彩種經典配色的漸層 */
  .btn-539 { background: linear-gradient(to bottom, #e67300, #cc5200); }
  .btn-california { background: linear-gradient(to bottom, #0088cc, #006699); }
  .btn-lotto { background: linear-gradient(to bottom, #e63956, #cc1433); }
  .btn-mark6 { background: linear-gradient(to bottom, #a347e6, #8020cc); }
  .btn-power { background: linear-gradient(to bottom, #149974, #0f7357); }

  /* 539 膠囊右上角綠色狀態點（等比例縮小） */
  .status-dot {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 7px;
    height: 7px;
    background: #39e600;
    border-radius: 50%;
    box-shadow: 0 0 4px #39e600;
  }

  /* 大圓形控制按鈕（從 56px 縮小到 44px，完美對齊截圖比例） */
  .swap-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    color: #ffffff;
    font-size: 18px;      /* 箭頭字級同步縮小 */
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    margin-right: 5px;   /* 讓圓圈中線與膠囊更完美契合 */
  }

  /* 預設的藍底上下箭頭與展開後的左右箭頭 */
  .arrow-updown, .arrow-leftright {
    background: linear-gradient(to bottom, #1a4d80, #103050);
  }
  .arrow-leftright {
    cursor: default;
  }
`;
document.head.appendChild(style);

// 2. 動態生成 HTML
const sidebarContainer = document.createElement('div');
sidebarContainer.className = 'scale-container right-sidebar-widget';
sidebarContainer.innerHTML = `
  <div class="lottery-widget" id="lotteryWidget">
    <div class="lottery-menu" id="lotteryMenu">
      <a href="分佈.html" class="menu-btn btn-539">分佈<span class="status-dot"></span></a>
      <a href="三分.html" class="menu-btn btn-california">三分</a>
      <a href="大樂透.html" class="menu-btn btn-lotto">大樂透</a>
      <a href="六合彩.html" class="menu-btn btn-mark6">六合彩</a>
      <a href="威力彩.html" class="menu-btn btn-power">威力彩</a>
    </div>
    <button class="swap-btn arrow-updown" id="actionBtn">⇅</button>
  </div>
`;
document.body.appendChild(sidebarContainer);

// 3. 核心互動邏輯
const actionBtn = document.getElementById('actionBtn');
const lotteryMenu = document.getElementById('lotteryMenu');
let isOpen = false;

actionBtn.addEventListener('click', function(event) {
  event.stopPropagation(); 
  
  if (!isOpen) {
    lotteryMenu.classList.add('show');
    actionBtn.innerText = '⇄';
    isOpen = true;
  }
});

document.addEventListener('click', function() {
  if (isOpen) {
    lotteryMenu.classList.remove('show');
    actionBtn.innerText = '⇅';
    isOpen = false;
  }
});
