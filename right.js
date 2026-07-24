(function() {
    // 1. 確保網頁都載入好了才執行
    window.addEventListener('DOMContentLoaded', () => {
        const sidebarContainer = document.getElementById('my-js-sidebar');
        if (!sidebarContainer) return;

        // 2. 外層固定框設定 (25x640) - 調整為你今天指定的「六七成黑底」與深色大框
        Object.assign(sidebarContainer.style, {
            position: 'fixed',
            right: '0px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '640px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '9999',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.3)',
            /* 調整為你要求的新外觀 */
            border: '1px solid #111',               /* 大框顏色加深 */
            borderRadius: '4em',                    /* 完美的直立大膠囊 */
            backgroundColor: 'rgba(0, 0, 0, 0.65)', /* 六七成黑色的底色 */
            overflow: 'hidden',
            boxSizing: 'border-box'
        });

        const navItems = ["分佈", "三分", "拖牌", "遺漏", "統計", "連莊", "連號", "尾數"];
        const htmlFiles = ["分佈.html", "三分.html", "拖牌.html", "遺漏.html", "統計.html", "連莊.html", "連號.html", "尾數.html"];

        // 3. 【破解本機開檔的網址】
        const currentUrlText = decodeURIComponent(window.location.href);

        navItems.forEach((text, index) => {
            // ---- 為了實現完美的膠囊形，我們把結構拆成「外軌道」與「內膠囊」 ----
            const track = document.createElement('div');
            Object.assign(track.style, {
                height: '80px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                webkitTapHighlightColor: 'transparent', /* 消除平板點擊延遲 */
                boxSizing: 'border-box'
            });

            const capsule = document.createElement('div');
            capsule.innerText = text;

            // 4. 【檢查目前是不是這頁】
            const isActive = currentUrlText.includes(text);

            // 5. 設定格子外觀 (套用你今天指定的所有精確色調)
            Object.assign(capsule.style, {
                width: '25px',        /* 25px 扣掉大邊框，完美內嵌 */
                height: '76px',       /* 80px 稍微縮小，留出上下膠囊的微小縫隙 */
                borderRadius: '4em',  /* 完美的內層小膠囊弧度 */
                boxSizing: 'border-box',
                transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s',
                
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-lr',
                textOrientation: 'upright',
                textAlign: 'center',
                fontSize: '16px',     /* 19px 寬度內最精緻的直排字型大小 */
                fontWeight: 'bold',
                letterSpacing: '2px',

                // 核心調色邏輯：
                // 如果是當前頁面 (isActive)：亮燈（三四成黑/透光白）＋0.5px淡白框＋全白字
                // 如果不是當前頁面：膠囊背景隱藏 (transparent) ＋ 三四成淡淡的白字
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                boxShadow: isActive ? '0 0 0 0.5px rgba(255, 255, 255, 0.4)' : 'none',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'
            });

            // 6. 觸控/滑鼠反饋：壓下去或移過去時，立刻「閃出亮燈狀態」
            const triggerHighlight = () => {
                if (!isActive) {
                    capsule.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    capsule.style.boxShadow = '0 0 0 0.5px rgba(255, 255, 255, 0.4)';
                    capsule.style.color = '#ffffff';
                }
            };

            const removeHighlight = () => {
                if (!isActive) {
                    capsule.style.backgroundColor = 'transparent';
                    capsule.style.boxShadow = 'none';
                    capsule.style.color = 'rgba(255, 255, 255, 0.35)';
                }
            };

            // 兼容平板與電腦，讓點擊或觸控都有極速反應
            track.addEventListener('touchstart', triggerHighlight);
            track.addEventListener('touchend', removeHighlight);
            track.addEventListener('mouseenter', triggerHighlight);
            track.addEventListener('mouseleave', removeHighlight);

            // 7. 點擊直接換頁
            track.addEventListener('click', () => {
                window.location.href = htmlFiles[index];
            });

            // 把小膠囊裝進軌道，再把軌道塞進側邊欄
            track.appendChild(capsule);
            sidebarContainer.appendChild(track);
        });
    });
})();


