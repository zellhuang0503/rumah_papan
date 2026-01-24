# 網站架構與路由 (Site_Structure.md)

定義導航邏輯與頁面組成，AI 代理將根據此結構建立路由。

## Site Map

### 1. Home (首頁)
- **Path**: `/`
- **ID**: `home`
- **Title**: 
  - zh: 首頁
  - en: Home
- **Components**: `Polaroid_Hero`, `Founder_Intro`, `Three_Pros_Module`

### 2. About (關於班厝)
- **Path**: `/about`
- **ID**: `about`
- **Title**: 
  - zh: 關於班厝
  - en: About
- **Sections**: `Origin`, `Founder_Story`, `Village_Intro`

### 3. Stories (故事誌)
- **Path**: `/stories`
- **ID**: `stories`
- **Title**: 
  - zh: 故事誌
  - en: Stories
- **Type**: CMS_Collection

### 4. Services (服務體驗)
- **Path**: `/services`
- **ID**: `services`
- **Title**: 
  - zh: 服務體驗
  - en: Experiences
- **Sub Items**: `Guided_Tour`, `Stay_Experience`, `Work_Swap`

### 5. Contact (聯絡我們)
- **Path**: `/contact`
- **ID**: `contact`
- **Title**: 
  - zh: 聯絡我們
  - en: Contact
- **Features**: `Google_Maps_Integration`, `Social_Links`
