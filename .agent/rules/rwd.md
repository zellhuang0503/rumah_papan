---
trigger: always_on
---

【RWD 任務說明 — 嚴格模式】

目前 1440px Desktop 版本為「最終設計稿（Single Source of Truth）」。
此版本的：
- 資訊結構
- 元件內容
- 視覺層級
- 功能邏輯
- 文案與數量

皆已凍結，不得更動。

你的任務僅限於：
- 為 Tablet（768px）與 Mobile（375px）
- 依照 1440px 設計「等價轉譯（Equivalent Layout Translation）」
- 完成 RWD 版面配置

【嚴格禁止事項】
- ❌ 不得刪減任何內容
- ❌ 不得合併或隱藏任何資訊
- ❌ 不得改變元件意義或功能
- ❌ 不得新增設計元素或重新設計 UI
- ❌ 不得自行決定「在 mobile 不重要」

【允許調整事項（僅限以下）】
- ✔ 垂直堆疊（horizontal → vertical）
- ✔ Grid 欄位數調整（例如 12 → 4 / 2）
- ✔ 元件尺寸與間距等比例縮放
- ✔ 換行、折行、scroll 容器
- ✔ 使用既有元件做重排（不可新創）

【輸出要求】
- 375px / 768px 的畫面必須「功能與資訊 100% 等價於 1440px」
- 若空間不足，請使用堆疊、滑動、展開，而不是刪除
- 所有調整需以「保留完整體驗」為最高優先

開始執行 RWD 轉換。


補充說明：
此任務不是設計題，而是工程轉換題。
請假設你沒有設計決策權，只有排版轉換權。



RWD 實作請以目前 1440px 的 component structure 為基礎，
保持相同的 component hierarchy 與命名，
僅調整 layout / breakpoint behavior。
