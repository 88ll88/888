import requests
from bs4 import BeautifulSoup
import re
import base64
import json
import os
import datetime

# 取得 GitHub 系統設定
REPO = os.environ.get("GITHUB_REPOSITORY")
TOKEN = os.environ.get("GITHUB_TOKEN")
PATH = "ddd.js"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def get_latest_data():
    # 抓取開獎網站號碼
    url = "https://i539.tw/"
    try:
        res = requests.get(url, headers=headers, timeout=10)
        res.encoding = 'utf-8'
        if res.status_code != 200:
            return None

        soup = BeautifulSoup(res.text, "html.parser")
        page_text = soup.get_text()

        # 1. 自動解析日期
        date_match = re.search(r'(\d{4})[\/\-](\d{2})[\/\-](\d{2})', page_text)
        if not date_match:
            return None
            
        year, month, day = date_match.groups()
        dt = datetime.date(int(year), int(month), int(day))
        weeks = ["一", "二", "三", "四", "五", "六", "日"]
        week_str = weeks[dt.weekday()]
        date_str = f"{year}-{month}-{day}({week_str})"

        # 2. 自動解析 5 個號碼 (01-39)
        nums = re.findall(r'\b(0[1-9]|[12][0-9]|3[0-9])\b', page_text)
        if len(nums) >= 5:
            balls = nums[:5]
            return [date_str] + balls
    except Exception as e:
        print("抓取資料時發生錯誤:", e)
    return None

def update_github(new_row):
    api_url = f"https://api.github.com/repos/{REPO}/contents/{PATH}"
    req_headers = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # 讀取原本的 ddd.js 檔案
    res = requests.get(api_url, headers=req_headers)
    if res.status_code != 200:
        print("無法取得 ddd.js")
        return

    file_json = res.json()
    sha = file_json["sha"]
    content = base64.b64decode(file_json["content"]).decode('utf-8')

    # 防呆檢查：如果今天資料已經存在，就不重複寫入
    if new_row[0] in content:
        print("當天資料已存在，不需重複更新。")
        return

    # 自動把 zzzInd 的期數數字 +1
    ind_match = re.search(r'var\s+zzzInd\s*=\s*(\d+);', content)
    if ind_match:
        old_ind = int(ind_match.group(1))
        new_ind = old_ind + 1
        content = re.sub(r'var\s+zzzInd\s*=\s*\d+;', f'var zzzInd = {new_ind};', content)

    # 將最新開獎號碼插入到 ddd 陣列的最前面
    row_str = "  " + json.dumps(new_row) + ","
    content = re.sub(r'(var\s+ddd\s*=\s*\[\n?)', r'\1' + row_str + '\n', content, count=1)

    # 寫回 GitHub 儲存
    encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
    data = {
        "message": f"🤖 自動新增開獎號碼 {new_row[0]}",
        "content": encoded_content,
        "sha": sha
    }
    put_res = requests.put(api_url, headers=req_headers, json=data)
    if put_res.status_code in [200, 201]:
        print("✅ 成功自動更新 ddd.js！")
    else:
        print("❌ 更新失敗:", put_res.text)

if __name__ == "__main__":
    new_data = get_latest_data()
    if new_data:
        print("抓取到最新開獎資料:", new_data)
        update_github(new_data)
    else:
        print("未抓到有效資料。")
