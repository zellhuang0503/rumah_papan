# 產品需求文件 (PRD) - 班達故事館 (Rumah Papan)

## 1. 專案概覽 (Project Overview)
**專案名稱**：班達故事館 (Rumah Papan)
**版本**：v1.0
**狀態**：開發中
**日期**：2026-01-05

### 1.1 背景 (Background)
本專案為「班達故事館」的官方網站，旨在透過數位平台展示新村的歷史、故事與文化。設計風格強調視覺吸引力，結合復古與現代元素（如拍立得風格）。

### 1.2 目標 (Objectives)
- 建立一個具備高度視覺吸引力的響應式網站。
- 提供雙語介面（中文/英文）以服務不同受眾。
- 透過互動式介面（如首頁的散落照片）引導使用者探索內容。

## 2. 目標受眾 (Target Audience)
- 對在地文化、歷史故事感興趣的遊客。
- 社區居民與相關文化工作者。
- 一般網路使用者。

## 3. 功能需求 (Functional Requirements)

### 3.1 首頁 (Home Page)
- **視覺呈現**：
  - 滿版背景設計（配合紙質紋理）。
  - 標題：「班達故事館 Rumah Papan」。
  - 歡迎詞：「Welcome to Rumah Papan」。
- **互動元素**：
  - **散落拍立得 (Scattered Polaroids)**：隨機或固定角度擺放的照片，具備懸停效果 (Hover Effect)。
  - **進入按鈕 (CTA Button)**：「進入新村」，引導至主要內容頁。
  - **語言切換 (Language Switcher)**：支援中/英切換（目前為 UI 預留）。

### 3.2 內容頁面 (Content Pages) (規劃中)
- **關於我們 (About)**：介紹故事館緣起。
- **故事展示 (Stories)**：詳細的歷史圖文。
- **聯絡資訊 (Contact)**：交通方式與聯絡表單。

## 4. 非功能需求 (Non-Functional Requirements)

### 4.1 效能 (Performance)
- 頁面載入時間需優化，圖片需進行壓縮處理。
- 支援現代瀏覽器 (Chrome, Safari, Edge, Firefox)。

### 4.2 設計規範 (Design Guidelines)
- **配色系統**：
  - Primary: `#F1592C` (橘紅色)
  - Secondary: `#242527` (深灰色)
  - Background: `#F3E3CB` (米色/紙質感)
- **字型**：
  - 中文：`Noto Sans TC`
  - 英文/標題：`Roboto Slab`

### 4.3 技術堆疊 (Tech Stack)
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS v3
- **Deployment**: (待定)

## 5. 待辦事項與未來規劃 (Roadmap)
- [x] 專案建置與基礎架構 (v0.1)
- [x] 首頁視覺實作 (v0.2)
- [ ] 實作響應式手機版面 (Mobile Responsive)
- [ ] 整合真實圖片素材
- [ ] 實作多語系邏輯 (i18n)
- [ ] 開發內頁路由與內容
