# Vercel → GitHub Pages 迁移指南

本指南详细说明如何将项目从 Vercel 免费版迁移到 GitHub Pages，并配置 Sanity CMS 实现即时更新。

---

## 📋 迁移前准备

### 需要的信息
- GitHub 仓库名称：`zellhuang0503/rumah_papan`
- 自定义域名：[rumahpapanKlang.com]
- Sanity Project ID 和 Dataset：已配置在项目中

### 预估时间
- 配置时间：15-30 分钟
- 首次部署：5-10 分钟

---

## ✅ 已完成的配置（本次已完成）

以下文件已创建/修改，无需额外操作：

### 1. GitHub Actions Workflow
**文件**：`.github/workflows/deploy.yml`

**功能**：
- 推送到 main 分支时自动部署
- 支持手动触发（用于 Sanity webhook）
- 自动安装依赖并构建
- 部署到 GitHub Pages

### 2. Vite 配置更新
**文件**：`vite.config.ts`

**修改**：
- 添加 `base: '/'` 配置
- 支持自定义域名路由

### 3. 404 错误处理
**文件**：`public/404.html`

**功能**：
- 处理 SPA 路由的 404 重定向
- 支持 React Router 客户端路由

---

## 🚀 完整迁移步骤

### 步骤 1：设置 GitHub Secrets

**目的**：安全存储 Sanity 配置

1. 进入 GitHub 仓库页面
2. 点击 `Settings` → `Secrets and variables` → `Actions`
3. 点击 `New repository secret`，添加以下两个 secret：

| Secret Name | Secret Value | 说明 |
|-------------|-------------|------|
| `VITE_SANITY_PROJECT_ID` | `vm3p10fe` | Sanity 项目 ID |
| `VITE_SANITY_DATASET` | `production` | Sanity 数据集名称 |

---

### 步骤 2：启用 GitHub Pages

**目的**：配置 GitHub Pages 作为部署目标

1. 进入 GitHub 仓库页面
2. 点击 `Settings` → `Pages`
3. 在 `Build and deployment` 部分：
   - **Source**: 选择 `GitHub Actions`（不是 Deploy from a branch）
4. 点击 `Save`

---

### 步骤 3：配置自定义域名（如果有）

**目的**：使用客户购买的域名

#### 选项 A：使用主域名（如 example.com）

1. 在 GitHub Pages 设置中：
   - `Custom domain` 输入你的域名（如 `your-domain.com`）
   - 点击 `Save`

2. 配置 DNS 记录：
   - 登录你的域名服务商（如 GoDaddy、Namecheap、阿里云等）
   - 添加 A 记录：

     | Type | Name | Value |
     |------|------|-------|
     | A | `@` 或留空 | `185.199.108.153` |
     | A | `@` 或留空 | `185.199.109.153` |
     | A | `@` 或留空 | `185.199.110.153` |
     | A | `@` 或留空 | `185.199.111.153` |

3. 等待 DNS 生效（通常 10 分钟 - 24 小时）
4. 在 GitHub Pages 设置中，点击 `Check DNS configuration` 验证
5. 点击 `Enforce HTTPS` 启用 SSL

#### 选项 B：使用子域名（如 www.example.com）

1. 在 GitHub Pages 设置中：
   - `Custom domain` 输入 `www.your-domain.com`
   - 点击 `Save`

2. 配置 DNS 记录：
   - 添加 CNAME 记录：

     | Type | Name | Value |
     |------|------|-------|
     | CNAME | `www` | `zellhuang0503.github.io` |

---

### 步骤 4：首次部署

**目的**：验证配置是否正确

1. 提交当前更改到 GitHub：

```bash
git add .
git commit -m "chore: configure GitHub Pages deployment"
git push
```

2. 在 GitHub 仓库页面查看 Actions：
   - 点击 `Actions` 标签
   - 查看 `Deploy to GitHub Pages` 工作流是否正在运行
   - 等待构建完成（约 5-10 分钟）

3. 部署成功后：
   - 在 `Actions` 中点击工作流
   - 滚动到底部，找到 `Deploy to GitHub Pages` 步骤
   - 点击部署链接查看网站

---

### 步骤 5：配置 Sanity Webhook（可选，推荐）

**目的**：当业者在 Sanity Studio 更新内容时，自动触发重新部署

#### 5.1 创建 GitHub Personal Access Token (PAT)

1. 访问 https://github.com/settings/tokens
2. 点击 `Generate new token` → `Generate new token (classic)`
3. 配置 token：
   - **Note**: `Sanity Webhook Deployment`
   - **Expiration**: 选择较长时间（如 No expiration）
   - **Scopes**: 勾选 `repo` 和 `workflow`
4. 点击 `Generate token`
5. **重要**：复制 token（只显示一次，请妥善保存）

#### 5.2 在 Sanity 配置 Webhook

1. 登录 [Sanity Dashboard](https://www.sanity.io/dashboard)
2. 选择你的项目（Project ID: `vm3p10fe`）
3. 进入 `API` → `Webhooks`
4. 点击 `New webhook`
5. 配置 webhook：
   - **URL**: `https://api.github.com/repos/zellhuang0503/rumah_papan/dispatches`
   - **Method**: `POST`
   - **Projection**: `draft` 或 `clean`（根据你的需求选择）
   - **HTTP Headers**:
     ```
     Authorization: Bearer YOUR_GITHUB_PAT
     Content-Type: application/json
     Accept: application/vnd.github.v3+json
     ```
   - **HTTP Body**:
     ```json
     {
       "event_type": "sanity-update",
       "client_payload": {
         "reason": "Content updated in Sanity",
         "dataset": "{dataset}",
         "projectId": "{projectId}",
         "documentId": "{documentId}"
       }
     }
     ```
6. 在 `Filter` 部分，选择你想要监听的内容类型：
   - 勾选 `Create`, `Update`, `Delete`
   - 选择相关的内容类型（如 `about` 等）
7. 点击 `Save` 保存 webhook

#### 5.3 测试 Webhook

1. 在 Sanity Studio 中，更新任意内容
2. 点击 `Publish`
3. 查看 webhook 日志：
   - 在 Sanity Dashboard → API → Webhooks → 点击你的 webhook
   - 查看 `Recent deliveries` 是否成功
4. 查看 GitHub Actions：
   - 访问 GitHub 仓库的 `Actions` 页面
   - 确认是否有新的部署工作流被触发

---

## 🔧 故障排除

### 问题 1：构建失败

**症状**：GitHub Actions workflow 显示错误

**解决方案**：
1. 检查 `Actions` 日志中的错误信息
2. 确认 GitHub Secrets 已正确配置
3. 确认 `package.json` 中的 `build` 脚本正常
4. 本地运行 `npm run build` 验证

### 问题 2：网站显示空白

**症状**：部署成功但访问页面空白

**解决方案**：
1. 检查浏览器控制台是否有 JavaScript 错误
2. 确认 `vite.config.ts` 中的 `base` 配置正确
3. 检查 Sanity API 是否可访问
4. 确认网络请求未被 CORS 阻止

### 问题 3：路由 404 错误

**症状**：直接访问子页面（如 /about-rental）显示 404

**解决方案**：
1. 确认 `public/404.html` 文件存在
2. 确认 GitHub Pages 的 `Source` 设置为 `GitHub Actions`
3. 如果使用自定义域名，确保 DNS 配置正确

### 问题 4：Sanity 内容不更新

**症状**：在 Sanity 更新后，网站内容没有变化

**解决方案**：
1. 确认 webhook 配置正确
2. 检查 GitHub PAT 是否有足够的权限
3. 手动触发部署：在 GitHub Actions 页面点击 `Run workflow`
4. 检查 Sanity webhook 日志是否有错误

### 问题 5：HTTPS 证书未生效

**症状**：自定义域名显示不安全警告

**解决方案**：
1. 确认 DNS 记录已完全生效（使用 `dig your-domain.com` 检查）
2. 在 GitHub Pages 设置中点击 `Enforce HTTPS`
3. 等待 Let's Encrypt 证书签发（最多 24 小时）

---

## 📝 迁移后维护

### 日常更新流程

**代码更新**：
```bash
git add .
git commit -m "描述你的更改"
git push
# 自动触发部署
```

**内容更新（通过 Sanity Studio）**：
1. 登录 Sanity Studio
2. 更新内容并发布
3. webhook 自动触发重新部署（如果已配置）
4. 或手动触发：GitHub → Actions → `Run workflow`

### 监控部署状态

- GitHub Actions: https://github.com/zellhuang0503/rumah_papan/actions
- Sanity Webhooks: https://www.sanity.io/manage/project/vm3p10fe/api/webhooks

### 性能优化建议

1. **构建缓存**：GitHub Actions 已配置 npm 缓存
2. **CDN 加速**：GitHub Pages 自带全球 CDN
3. **图片优化**：继续使用 Sanity 的图片优化功能
4. **代码分割**：Vite 默认支持代码分割

---

## 🆚 Vercel vs GitHub Pages 对比

| 功能 | Vercel 免费版 | GitHub Pages |
|------|-------------|--------------|
| 部署延迟 | 受限（排队） | ~5 分钟 |
| 构建时间限制 | 6,000 分钟/年 | 无限制 |
| 自定义域名 | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| 预览部署 | ✅ | ❌（可配置） |
| webhook 自动部署 | ✅ | ✅（需配置） |
| 成本 | 免费 | 完全免费 |

---

## 📞 技术支持

如遇到问题，请检查以下资源：

- GitHub Pages 文档：https://docs.github.com/en/pages
- GitHub Actions 文档：https://docs.github.com/en/actions
- Sanity Webhook 文档：https://www.sanity.io/docs/webhooks
- Vite 部署文档：https://vitejs.dev/guide/static-deploy.html

---

## ✅ 迁移检查清单

迁移完成后，请确认以下项目：

- [ ] GitHub Secrets 已配置（`VITE_SANITY_PROJECT_ID` 和 `VITE_SANITY_DATASET`）
- [ ] GitHub Pages Source 已设置为 `GitHub Actions`
- [ ] 自定义域名 DNS 已配置（如适用）
- [ ] HTTPS 已启用
- [ ] 首次部署成功
- [ ] 网站可正常访问
- [ ] 所有页面路由正常工作
- [ ] Sanity 内容可正常加载
- [ ] Webhook 已配置并测试成功（如适用）
- [ ] 从 Vercel 删除项目（可选，避免混淆）

---

## 🎉 迁移完成！

恭喜你已完成从 Vercel 到 GitHub Pages 的迁移。现在你的项目具有：

- ✅ 无限制的即时部署
- ✅ 零成本的托管服务
- ✅ 支持自定义域名
- ✅ Sanity CMS 集成
- ✅ 自动化的部署流程

业者现在可以随时通过 Sanity Studio 更新内容，并立即看到效果！
