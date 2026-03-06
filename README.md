# 🌙 La Nuit Puff - 線上甜點店舖平台

> 深夜的溫暖陪伴 | 線上購物 + 後台管理系統
> 一個完整的 React + Vite 電商平台，包含前台顧客購物系統與後台管理系統。

---

## ✨ 核心功能

### 👩‍💼 後台管理系統

- **商品管理** - 完整的商品新增、編輯、刪除、啟用/停用功能
- **訂單管理** - 訂單查看、編輯、狀態追蹤（待烘焙、已出貨等）
- **消息發佈** - 公告和新聞文章管理
- **圖片上傳** - 本地檔案上傳 + URL 管理，支援預覽

### 🛍️ 前台購物系統

- **商品瀏覽** - 分類篩選、排序功能
- **購物車** - 商品新增、數量調整、移除
- **結帳系統** - 訂單確認、付款
- **會員功能** - 登入、訂單紀錄、收藏商品
- **特色展示** - 新聞輪播、人氣商品、系列推薦

---

## 🛠 技術棧

| 層面            | 技術               |
| --------------- | ------------------ |
| **前端框架**    | React 18           |
| **建構工具**    | Vite               |
| **樣式**        | Bootstrap 5 + SCSS |
| **路由**        | React Router v6    |
| **狀態管理**    | Redux Toolkit      |
| **HTTP 客戶端** | Axios              |
| **輪播**        | Swiper             |
| **UI 對話框**   | SweetAlert2        |
| **表單驗證**    | React Hook Form    |
| **CSS 動畫**    | Animate.css、AOS   |

---

## 📁 專案結構

```
LaNuitPuff/
├── src/
│   ├── components/          # React 組件庫
│   │   ├── admin/          # 後台管理組件
│   │   └── ...其他組件
│   ├── hooks/               # 自訂 Hooks
│   ├── layout/              # 頁面佈局
│   ├── views/               # 頁面視圖
│   │   ├── admin/           # 後台頁面
│   │   └── frontend/        # 前台頁面
│   ├── services/            # API 服務層
│   ├── store/               # Redux 狀態管理
│   ├── assets/              # 靜態資源
│   ├── router.jsx           # 路由設定
│   ├── ProtectedRoute.jsx   # 路由保護
│   └── main.jsx             # 應用入口
├── public/                  # 公開資源
├── package.json             # 依賴管理
└── README.md               # 本檔案
```

---

## 🚀 快速開始

### 環境需求

- Node.js >= 16.0
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 生產構建

```bash
npm run build
```

### 程式碼檢查

```bash
npm run lint
```

---

## 📚 主要功能模組說明

### 商品管理 (`AdminProducts`)

- 分頁顯示商品列表
- 新增商品：上傳主圖、新增細節圖、填入商品資訊
- 編輯商品：修改所有商品資訊
- 刪除商品：搭配確認對話框

### 訂單管理 (`AdminOrders`)

- 按狀態篩選訂單（全部、待烘焙、已出貨等）
- 按關鍵字搜尋訂單
- 編輯訂單狀態
- 刪除單筆或全部訂單

### 消息發佈 (`AdminNews`)

- 新增、編輯、刪除公告
- 上傳消息圖片
- 分頁展示消息列表

### 購物流程 (Frontend)

1. **瀏覽商品** - 分類篩選、排序、檢視詳情
2. **加入購物車** - 選擇規格、數量
3. **確認訂單** - 編輯購物車內容
4. **結帳** - 填入收貨資訊、選擇付款方式
5. **訂單完成** - 查看訂單號，接收確認信

---

## 🎨 設計特色

- **響應式設計** - 支援桌機、平板、手機
- **深色主題選項** - 自訂主題切換
- **流暢動畫** - AOS 滾動動畫、Swiper 輪播
- **無障礙考量** - 符合 WCAG 標準

---

## 📦 核心依賴

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router": "^6.x",
    "redux": "^4.x",
    "axios": "^1.x",
    "bootstrap": "^5.x",
    "swiper": "^10.x",
    "sweetalert2": "^11.x",
    "react-hook-form": "^7.x"
  }
}
```

詳見 [package.json](package.json)

---

## 📝 開發指南

1. 在 `services/` 中定義 API 調用函式
2. 在 `hooks/` 中建立相關邏輯 Hook
3. 在 `views/` 中建立頁面組件
4. 在 `router.jsx` 中註冊路由

**提交訊息規範**：

- `feat:` 新功能
- `fix:` 修復 bug
- `refactor:` 程式碼重構
- `docs:` 文件修改

---

© 2026 La Nuit Puff. All Rights Reserved.
