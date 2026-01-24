# 專案交接與權限移交標準作業程序 (SOP)
**文件編號**：SOP-HANDOVER-202601
**適用專案**：Rumah Papan / 一般 Next.js + Sanity 專案
**文件用途**：指導如何將開發完成的專案，安全且完整地移交給客戶 (Client)。

---

## 🎯 核心原則
*   **不重建 (Don't Rebuild)**：盡量保留開發期間的 Project ID 與資料庫，避免重新設定導致錯誤。
*   **權限移交 (Transfer Ownership)**：透過邀請與轉移擁有權的方式進行交接。
*   **環境變數 (Environment Variables)**：這是交接過程中最容易被遺忘的關鍵，務必妥善備份與轉移。

---

## 步驟一：Sanity 資料庫移交 (Database)
資料庫存放了所有文章與圖片，ID (`projectId`) 一旦更改，前端程式碼就必須重改，因此**絕對不要**幫客戶開新專案，而是採用「邀請加入」的方式。

1.  **請客戶註冊**：
    *   請客戶使用他們的 Email (推薦 Gmail) 至 [Sanity.io](https://www.sanity.io) 註冊帳號。
2.  **發出邀請**：
    *   您登入 [Sanity Manage](https://www.sanity.io/manage)。
    *   選擇該專案 -> 點選 **Members** -> **Invite New Member**。
    *   輸入客戶 Email -> 權限選擇 **Administrator** (最高管理員)。
3.  **確認加入**：
    *   待客戶接受邀請後，確認其狀態已變更為 Active。
4.  *(選用) 帳單轉移*：
    *   若專案流量超過免費額度，請客戶至 **Billing** 頁面輸入他們的信用卡資訊。

---

## 步驟二：GitHub 程式碼移交 (Source Code)
將程式碼的所有權轉給客戶，確保智慧財產權歸屬。

1.  **客戶準備**：
    *   請客戶提供其 GitHub 帳號名稱 (Username)。
2.  **轉移專案 (Transfer)**：
    *   進入 Repo -> **Settings** -> **General**。
    *   捲動至最底部的 Danger Zone -> 點選 **Transfer repository**。
    *   輸入客戶的帳號名稱並確認。
3.  **保留維護權**：
    *   轉移後，請客戶進入該 Repo 的 Settings -> **Collaborators**。
    *   將您 (開發商) 加回為協作者，以便未來進行維護或修復 Bug。

---

## 步驟三：Vercel 主機部署移交 (Hosting)
這是唯一建議由「客戶端發起」的步驟，以確保主機帳單與網域歸屬正確。

1.  **客戶註冊**：
    *   請客戶至 [Vercel.com](https://vercel.com) 註冊 (建議直接用 GitHub 登入連結)。
2.  **匯入專案 (Import)**：
    *   在 Vercel 後台點選 **Add New Project**。
    *   選擇 **Import Git Repository**。
    *   選擇剛剛轉移給他的 GitHub Repo。
3.  **設定環境變數 (關鍵步驟!)**：
    *   在部署前的 Configure Project 階段，展開 **Environment Variables**。
    *   請將您開發環境 (`.env.local`) 中的關鍵變數複製過去：
        *   `NEXT_PUBLIC_SANITY_PROJECT_ID`: (參照原專案)
        *   `NEXT_PUBLIC_SANITY_DATASET`: `production`
        *   *(若有其他 API Key 也要一併複製)*
4.  **網域設定 (Domain)**：
    *   部署完成後，至 **Settings** -> **Domains** 協助客戶綁定正式網址。

---

## ✅ 交接後檢查清單 (Checklist)
- [ ] 客戶已成功登入 Sanity 並能看到資料。
- [ ] 客戶 GitHub 帳號下已出現該 Repository。
- [ ] Vercel 部署成功，且網站能正常讀取 Sanity 內容 (代表環境變數設定正確)。
- [ ] (選用) 測試「聯絡表單」功能是否能寄信到客戶信箱。

---
*文件維護：梵亞行銷技術團隊*
