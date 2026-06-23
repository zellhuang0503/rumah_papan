# CLAUDE.md — 班厝故事館 (Rumah Papan Klang) 專案重要須知

> ⚠️ 開工前必讀。每次處理本專案，先確認以下「託管位置」，不要再跑去 Vercel 找。

## 🚨 最重要：網站託管在哪裡

- **正式網站 `rumahpapanklang.com` 是託管在 GitHub Pages**，
  由 **本帳號的 repo `zellhuang0503/rumah_papan`** 透過 GitHub Actions
  (`.github/workflows/deploy.yml`) 自動部署。
- **推送到 `main` 分支** → GitHub Actions 自動 build + 部署到 GitHub Pages → 上線。
- 自訂網域是在 Namecheap 設 DNS（A 紀錄指向 GitHub Pages 的 `185.199.108~111.153`）。

### ❌ 不要再搞混的地方
- 網站**不在 Vercel 上**。`rumahpapanofficial.vercel.app` 那個 Vercel 專案
  曾經被用來測試，但**真網域沒有指向它**，不要在那邊找問題或改設定。
- 另一個 repo `rumahpapanklang01-droid/rumah_papan_official` 是舊的/別人的，
  **不是我們開發的**。我們開發的永遠是 `zellhuang0503/rumah_papan`。

## 📋 技術架構重點

- 前端：Vite + React + TypeScript + Tailwind（純靜態網站）。
- CMS：Sanity（Project ID `vm3p10fe`、dataset `production`）。
- **GitHub Pages 是純靜態，不能跑後端 / serverless function。**
  所以任何需要後端的功能（例如 `/api/...`）在這裡都不會動。

## 📩 預約表單（重要：靠 email，不是後端）

- 預約表單在 `src/pages/BookingStay.tsx`（路由 `/booking/stay`）。
- 因為靜態網站不能跑後端，預約改用 **FormSubmit**（免費）以 email 寄送，
  收件信箱：**`rumahpapanklang01@gmail.com`**。
- 注意 `index.html` 的 CSP `connect-src` 必須包含送件目標網域
  （目前已加 `https://formsubmit.co`），否則送件會被擋（`Failed to fetch`）。
- `api/submitBooking.js`（Vercel serverless 版）已不使用，留著無害。

## 🛠️ 待辦／可優化（非緊急）
- [ ] 用 FormSubmit 代號取代明碼信箱，避免被爬蟲抓去寄垃圾信。
- [ ] Sanity 後台「鄉村住宿」有一張圖的 asset 參考是壞的，重新上傳即可。
