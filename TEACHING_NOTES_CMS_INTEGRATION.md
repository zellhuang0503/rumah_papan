# 專案實戰教學：由靜態網頁轉型至 Headless CMS (Sanity) 整合實錄

**文件編號**：DOC-20250204-001
**適用對象**：前端開發學習者、全端見習生
**專案背景**：將「班厝故事館 (Rumah Papan)」的靜態 React 網站，與 Sanity CMS 進行深度整合，實現內容可後台管理化。

---

## 🚀 核心學習目標
1.  **理解 Headless CMS 架構**：如何分離「內容管理 (Backend)」與「內容呈現 (Frontend)」。
2.  **資料結構設計 (Schema)**：如何將網頁內容轉化為資料庫欄位。
3.  **自動化遷移 (Migration)**：如何透過腳本批量處理圖片與資料上傳。
4.  **前端整合 (Integration)**：使用 GROQ 語言查詢資料並渲染。
5.  **開發者體驗 (DX)**：如何優化 CMS 後台操作流程。

---

## 步驟一：資料建模 (Data Modeling)

任何 CMS 整合的第一步都是「定義資料」。我們需要告訴 Sanity，我們的網頁有哪些欄位。

### 實作重點
*   **分析頁面**：拆解網頁 UI，識別出哪些是「標題 (String)」、哪些是「圖片 (Image)」、哪些對應到「陣列 (Array)」。
*   **修改 Schema**：在 Sanity Studio (`schema/about.ts`) 中定義結構。

```typescript
// 範例：定義一個圖片欄位
defineField({
    name: 'environment',
    title: '環境介紹',
    type: 'array',
    of: [
        {
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: '標題' },
                { name: 'desc', type: 'text', title: '描述' },
                { name: 'image', type: 'image', title: '圖片' }
            ]
        }
    ]
})
```

---

## 步驟二：資料遷移自動化 (Content Migration)

當手上有數十張圖片和既有的 JSON 資料時，手動一張張上傳到 CMS 是沒有效率的。我們編寫了 Node.js 腳本來自動化這個過程。

### 腳本邏輯 (`scripts/migrateAllImages.js`)
1.  **讀取本地檔案**：使用 `fs` 模組讀取 `src/assets/images`。
2.  **上傳至 Sanity**：透過 Client API 將圖片串流 (Stream) 上傳。
3.  **取得 Asset ID**：上傳成功後，Sanity 會回傳一個唯一的 `_id`。
4.  **建立關聯 (Reference)**：將這個 ID 寫入到對應的文章欄位中。

> **💡 教學重點**：這展示了 "Infrastructure as Code" 的某些精神，讓資料初始化變得可重複且精準。

---

## 步驟三：前端資料串接 (Frontend Fetching)

在 React 端，我們不再 import 靜態 JSON 檔案，而是向 Sanity 發送請求。

### 核心技術
*   **GROQ (Graph-Relational Object Queries)**：Sanity 專用的查詢語言，比 GraphQL 更靈活。
*   **React Hooks**：使用 `useEffect` 進行非同步資料獲取。

```typescript
// 範例：前端獲取資料
useEffect(() => {
    const fetchData = async () => {
        // 使用 GROQ 查詢
        const data = await client.fetch(`*[_type == "about"][0]`);
        // 處理資料並更新 State
        setHeroData(data);
    }
    fetchData();
}, []);
```

### 關鍵細節：圖片網址轉換
Sanity 儲存的是圖片的 Reference，前端需要使用 `@sanity/image-url` 工具函式 (`urlFor`) 來將 Reference 轉為真實的 `https` 網址。

---

## 步驟四：存取權限與安全性 (CORS)

### 遇到的問題
在整合過程中，我們發現前端圖片無法顯示，瀏覽器 Console 出現紅色錯誤。

### 原因分析
這是瀏覽器的安全性機制 **CORS (Cross-Origin Resource Sharing)**。
*   前端跑在 `localhost:5175`
*   後端 API 在 `api.sanity.io`
*   預設情況下，API 拒絕陌生來源的請求。

### 解決方案
進入 Sanity Management 後台，將 `http://localhost:5175` 加入 **CORS Allowed Origins** 白名單。

---

## 步驟五：優化後台體驗 (Studio DX)

為了讓非技術人員（如內容小編）好上手，我們安裝了第三方插件。

1.  **Media Plugin (媒體庫)**：
    *   **痛點**：Sanity 預設找不到「所有的圖片在哪裡」，只能在文章內看到。
    *   **解決**：安裝 `sanity-plugin-media`，提供類似檔案總管的介面管理所有素材。

2.  **Dashboard Widget**：
    *   **解決**：在首頁顯示「最近編輯的文章」，提升工作效率。

---

## 特別補充：何時**不該**使用 CMS？

在「歡迎頁 (Welcome Page)」的實作中，我們做了一個反向決定：**不使用 CMS，改為 Hardcode**。

### 決策理由
*   **效能優先**：歡迎頁是門面，需要極致的載入速度 (LCP)。等待 CMS API 回傳會造成視覺延遲。
*   **內容穩定性**：這些背景圖片是「設計素材」而非「內容」，不應該被小編隨意更換導致版面崩壞。
*   **離線可用性**：即使後端當機，首頁依然能正常運作。

> **💡 教學總結**：工程師的價值在於「判斷」。知道何時該用技術（CMS），何時該回歸簡單（Hardcode），才是成熟的表現。

---

*文件製作：梵亞行銷技術團隊 / AI 代理人*
*日期：2026-01-16*
