# Sanity Studio - Rumah Papan Klang

這是 Rumah Papan Klang 網站的內容管理系統（CMS），使用 Sanity Studio 建置。

## 🚀 啟動 Studio

```bash
cd studio
npm install
npm run dev
```

Studio 將在 `http://localhost:3333` 啟動

## 📦 部署

```bash
npm run build
npm run deploy
```

## 🔧 重要設定

在使用前，請先更新以下檔案中的 `your-project-id`：
- `sanity.config.ts`
- `sanity.cli.ts`

您可以在 [Sanity 管理後台](https://www.sanity.io/manage) 找到您的 Project ID。
