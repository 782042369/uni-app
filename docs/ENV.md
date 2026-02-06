# 环境变量配置

> 单一数据源：`.env.development` 和 `.env.production`

本文档说明项目中的环境变量配置。

## 环境变量文件

项目支持以下环境变量文件（按优先级排序）：

1. `.env.local` - 本地覆盖（不提交到 Git）
2. `.env.development` - 开发环境
3. `.env.production` - 生产环境
4. `.env.staging` - 预发布环境
5. `.env` - 默认配置

---

## 当前配置的环境变量

### 开发环境（.env.development）

```bash
# API 基础 URL - 开发环境
VITE_API_BASE_URL=https://petstore3.swagger.io/api/v3

# 环境名称
VITE_ENV_NAME=development
```

### 生产环境（.env.production）

```bash
# API 基础 URL - 生产环境
VITE_API_BASE_URL=https://api.yourapp.com

# 环境名称
VITE_ENV_NAME=production
```

### 预发布环境（.env.staging）

配置文件已创建，当前未配置具体变量。

---

## 建议添加的环境变量

### 应用基础配置

```bash
# 应用名称
VITE_APP_NAME=uni-app

# 应用版本
VITE_APP_VERSION=1.0.0

# 应用环境（development | production | staging）
VITE_APP_ENV=development
```

### API 配置

```bash
# API 基础 URL
VITE_API_BASE_URL=https://api.example.com

# API 超时时间（毫秒）
VITE_API_TIMEOUT=10000

# API 重试次数
VITE_API_RETRY_COUNT=3
```

### 平台配置

```bash
# DCloud AppID
VITE_DCLOUD_APPID=your-dcloud-appid

# 微信 AppID（小程序）
VITE_WECHAT_APPID=your-wechat-appid

# 支付宝 AppID（小程序）
VITE_ALIPAY_APPID=your-alipay-appid
```

### 第三方服务

```bash
# 统计服务 ID
VITE_ANALYTICS_ID=your-analytics-id

# 错误监控 DSN
VITE_SENTRY_DSN=your-sentry-dsn

# 地图服务 Key
VITE_MAP_KEY=your-map-key
```

### 功能开关

```bash
# 启用调试模式
VITE_DEBUG=true

# 启用性能监控
VITE_ENABLE_PERFORMANCE=false

# 启用错误上报
VITE_ENABLE_ERROR_REPORTING=true
```

---

## 使用环境变量

### 在 Vite 配置中使用

```typescript
// vite.config.ts
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.VITE_APP_VERSION),
  },
})
```

### 在代码中使用

```typescript
// 自动导入，无需手动引入
console.log(import.meta.env.VITE_API_BASE_URL)

// 类型安全
const apiUrl = import.meta.env.VITE_API_BASE_URL as string
```

### 条件编译

```typescript
if (import.meta.env.MODE === 'development') {
  console.log('开发模式')
}
```

---

## 类型定义

创建 `src/env.d.ts` 以获得类型提示：

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENV_NAME: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
  // ... 其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## 最佳实践

### 安全原则

**始终遵循：**
- ✅ 敏感信息使用后端 API，不在前端存储
- ✅ 密钥和 Token 通过 `.env.local` 本地配置
- ✅ `.env.local` 添加到 `.gitignore`
- ❌ 不在代码中硬编码密钥
- ❌ 不提交包含真实密钥的 `.env.*` 文件

**错误示例：**
```typescript
// ❌ 危险：直接硬编码
const apiKey = 'sk-proj-xxxxx'

// ❌ 危险：可能暴露到前端
const apiKey = process.env.SECRET_API_KEY
```

**正确示例：**
```typescript
// ✅ 安全：通过后端 API 获取
const apiKey = await fetchApiKeyFromBackend()

// ✅ 安全：明确区分前后端
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### 环境区分

**开发环境：** `.env.development`
```bash
VITE_ENV_NAME=development
VITE_API_BASE_URL=http://localhost:3000
VITE_DEBUG=true
```

**生产环境：** `.env.production`
```bash
VITE_ENV_NAME=production
VITE_API_BASE_URL=https://api.example.com
VITE_DEBUG=false
```

### 文件组织

```
project/
├── .env                  # 默认配置（提交）
├── .env.example          # 示例模板（提交）
├── .env.development      # 开发环境（提交）
├── .env.production       # 生产环境（提交）
├── .env.staging          # 预发布环境（提交）
├── .env.local            # 本地覆盖（不提交）
└── .gitignore           # 忽略 .env.local
```

### Git 配置

**`.gitignore` 添加：**
```gitignore
# 环境变量
.env.local
.env*.local
```

---

## 常见问题

### Q: 环境变量不生效？
A: 检查以下几点：
1. 变量名必须以 `VITE_` 开头才能在客户端代码中访问
2. 修改 `.env.*` 文件后需要重启开发服务器
3. 确认文件在项目根目录

### Q: 如何在构建时注入环境变量？
A: Vite 会自动根据 `--mode` 加载对应的环境文件：
```bash
pnpm build --mode production
```

### Q: 如何使用服务器端环境变量？
A: 使用 `define` 在构建时注入：
```typescript
// vite.config.ts
export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
```

### Q: 环境变量在 uni-app 各平台表现一致吗？
A: 注意：
- **H5**：完全支持
- **App**：支持，但需测试真机表现
- **小程序**：部分平台可能有限制，建议实测

---

## 参考资源

- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html)
- [uni-app 环境配置](https://uniapp.dcloud.net.cn/tutorial/env.html)
- [Vue 3 环境变量](https://vuejs.org/guide/scaling-up/tooling.html#env-variables)

---

## 下一步

1. 创建 `.env.example` 文件作为模板
2. 根据实际需求添加更多环境变量
3. 完善 TypeScript 类型定义
4. 配置各环境的专属变量

---

最后更新：2026-02-06
数据源：.env.development, .env.production
