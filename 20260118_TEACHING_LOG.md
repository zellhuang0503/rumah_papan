# 2026-01-18 開發與教學日誌：地圖體驗優化與雙語實作

**執行代理人**：梵亞行銷專屬 AI 助理 (Antigravity)
**對象**：黃老闆與學員
**專案**：Rumah Papan 班厝故事館官網

---

## 🎯 今日目標與成果摘要

今日重點在於優化「觀光地圖」的使用者體驗 (UX)，並解決技術細節導致的直覺落差。我們從使用者的角度出發，調整了互動邏輯，並同步完成了雙語系的架構補強。

**主要成果：**
1.  **直覺化導航**：將地圖彈窗與卡片中的「地址文字」全面改為可點擊連結，一鍵開啟 Google Maps。
2.  **介面減法 (UI Simplification)**：移除地圖彈窗中過於冗長的詳細地址，僅保留關鍵資訊與導航按鈕，避免畫面遮擋。
3.  **前端雙語實作**：針對靜態的地圖分類過濾器 (Filter)，在前端層直接實作中英切換邏輯。
4.  **即時除錯教學**：演示了在重構過程中丟失 Imports 導致的錯誤及其修復過程。

---

## 🛠️ 技術實作細節 (Technical Implementation)

### 1. 互動優化：從「找按鈕」到「隨處可點」

**問題 (Problem)**：
使用者在查看地圖時，直覺會嘗試點擊地址文字來開啟地圖，但原本只有一顆「開啟 Google 地圖」的按鈕有此功能，造成操作挫折。

**解決方案 (Solution)**：
由 AI 代理人直接修改 `MapViewer.tsx` 與 `LocationCard.tsx`，將原本的 `<span>` 地址文字包裹在 `<a>` 標籤中，並套用 Sanity CMS 傳來的 `googleMapLink`。

**(代碼片段示範)**
```tsx
// 修改前：純文字
<div className="flex items-start gap-2">
    <MapPin className="..." />
    <span>{loc.address}</span>
</div>

// 修改後：可點擊連結 + 視覺回饋 (Hover Effect)
<a href={loc.googleMapLink} target="_blank" className="flex ... hover:text-[#F1592C]">
    <MapPin className="..." />
    <span className="underline-offset-2 hover:underline">{loc.address}</span>
</a>
```

### 2. 介面設計：手機版的減法哲學

**觀察 (Observation)**：
在地圖模式下，彈跳視窗 (Tooltip) 若包含完整地址，會佔據過多版面，尤其在手機版 (Mobile Bottom Sheet) 會遮擋地圖視野。

**決策 (Decision)**：
*   **地圖彈窗/手機抽屜**：移除詳細地址文字。保留「電話」與「導航按鈕」。
*   **下方列表卡片**：保留完整地址資訊，供深度閱讀使用。
*   **效益**：讓使用者在地圖上專注於「位置感」與「導航」，而在列表中專注於「資訊」。

### 3. 架構決策：靜態資料的雙語處理

**挑戰 (Challenge)**：
地圖的過濾器分類（如「肉骨茶」、「景點」）是寫死在程式碼中的，若要為了這三個詞去改動 Sanity CMS 架構 (Schema) 顯得大材小用且增加維護成本。

**解決方案 (Solution)**：
利用 React Context 的 `useLanguage()` Hook，直接在前端判斷語系並渲染對應文字。

```tsx
// src/components/village/MapFilter.tsx
const { language } = useLanguage();

const categories = [
    { 
        id: 'food', 
        label: language === 'zh' ? '肉骨茶' : 'Bak Kut Teh', // 前端直接判斷
        icon: <Soup size={32} /> 
    },
    // ...
];
```

---

## 🐛 除錯案例 (Debug Case Study)

**狀況**：
在實作雙語過濾器時，因為全選貼上代碼，不慎覆蓋掉了檔案頭部的 `import` 宣告。

**錯誤訊息**：
> `ReferenceError: Soup is not defined`

**分析**：
瀏覽器報怨找不到 `Soup` 這個變數。这是因為我們使用了 `lucide-react` 的 icon (`<Soup />`)，但在代碼上方卻忘了 `import { Soup } ...`。

**修復**：
AI 代理人迅速識別錯誤，補回遺失的引用行：
```tsx
import { Soup, Camera, Landmark } from 'lucide-react';
```
**教學重點**：在進行 Refactoring (重構) 或 Copy-Paste 時，務必檢查文件最上方的 `import` 區域是否完整保留。

---

## 🤖 OpenCode / AI Agent 協作紀錄

本日開發運用了以下 AI 生產力指令與工具：

1.  **Browser Subagent (瀏覽器代理人)**：
    *   指令：`verify_fix_click`
    *   作用：AI 自動開啟瀏覽器，模擬使用者點擊地圖圖釘，並「肉眼」確認按鈕是否存在、連結是否正確。
    *   價值：節省人工反覆重新整理與點擊測試的時間。

2.  **Git Version Control (版本控制)**：
    *   `git commit -m "feat: optimize village map UI..."`
    *   保持了清晰的開發軌跡：優化 UI -> 修正連結 -> 實作雙語 -> 修復 Bug。

---

**紀錄時間**：2026-01-18
**狀態**：功能已上線 (Deployed to Production)
