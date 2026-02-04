# 运维手册

本文档提供部署、监控和故障排查指南。

## 目录

- [部署流程](#部署流程)
- [监控告警](#监控告警)
- [常见问题](#常见问题)
- [回滚流程](#回滚流程)

---

## 部署流程

### H5 部署

#### 构建准备

```bash
# 1. 切换到主分支
git checkout main
git pull origin main

# 2. 安装依赖
pnpm install

# 3. 类型检查
pnpm type-check

# 4. 生产构建
pnpm build:h5
```

#### 部署到服务器

```bash
# 方式1：直接复制
scp -r unpackage/dist/build/h5/* user@server:/var/www/html/

# 方式2：使用 rsync（增量更新）
rsync -avz --delete unpackage/dist/build/h5/ user@server:/var/www/html/

# 方式3：CI/CD 自动部署
# 配置 GitHub Actions 自动构建并部署
```

#### Nginx 配置

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/html;
  index index.html;

  # SPA 路由回退
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源缓存
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Gzip 压缩
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
}
```

#### 部署验证

```bash
# 1. 检查文件是否完整
curl -I https://example.com

# 2. 检查关键页面
curl https://example.com/index.html

# 3. 测试 API 连接
curl https://example.com/api/health
```

---

### Android 部署

#### 构建准备

```bash
# 1. 生成本地打包资源
pnpm build:android

# 2. 检查资源生成
ls -la unpackage/resources/
```

#### 使用 Android Studio 打包

**详细步骤见 [BUILD.md](./BUILD.md#方式二本地打包推荐生产)**

**快速命令：**
```bash
cd /path/to/uni-app-android-sdk

# 构建 Release APK
./gradlew assembleRelease

# 构建 App Bundle（推荐用于 Google Play）
./gradlew bundleRelease
```

#### 签名配置

确保 `app/build.gradle` 配置正确：
```gradle
signingConfigs {
  release {
    keyAlias System.getenv("KEY_ALIAS")
    keyPassword System.getenv("KEY_PASSWORD")
    storeFile file(System.getenv("STORE_FILE"))
    storePassword System.getenv("STORE_PASSWORD")
  }
}
```

#### 发布渠道

**Google Play：**
- 上传 `.aab` 文件
- 填写版本说明
- 提交审核

**国内应用商店：**
- 华为应用市场
- 小米应用商店
- OPPO 软件商店
- vivo 应用商店
- 应用宝

#### 增量更新

使用 uni-app 原生插件实现热更新：
```typescript
// 检查更新
uni.checkUpdate({
  success: (res) => {
    if (res.hasUpdate) {
      // 下载并安装
      uni.downloadUpdate({
        success: () => {
          uni.installUpdate()
        },
      })
    }
  },
})
```

---

### HarmonyOS 部署

#### 构建准备

```bash
# 1. 生成 HarmonyOS 工程
pnpm build:harmony

# 2. 检查工程文件
ls -la unpackage/dist/build/app-harmony/
```

#### 使用 DevEco Studio 打包

**详细步骤见 [BUILD.md](./BUILD.md#harmonyos-应用打包)**

**快速命令：**
```bash
cd unpackage/dist/build/app-harmony

# 构建 HAP
hvigorw assembleHap

# 构建 APP
hvigorw assembleApp
```

#### 发布渠道

**华为应用市场：**
- 上传 `.app` 文件
- 填写应用信息
- 提交审核

---

## 监控告警

### H5 监控

#### 性能监控

**使用 Web Vitals：**
```typescript
// src/main.ts
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals'

onCLS(console.log)
onFID(console.log)
onFCP(console.log)
onLCP(console.log)
onTTFB(console.log)
```

**关键指标：**
- **LCP** (Largest Contentful Paint)：< 2.5s
- **FID** (First Input Delay)：< 100ms
- **CLS** (Cumulative Layout Shift)：< 0.1

#### 错误监控

**全局错误捕获：**
```typescript
// src/main.ts
window.addEventListener('error', (event) => {
  // 上报到监控服务
  reportError({
    message: event.message,
    source: event.filename,
    line: event.lineno,
    col: event.colno,
  })
})

window.addEventListener('unhandledrejection', (event) => {
  reportError({
    message: event.reason,
    type: 'unhandledRejection',
  })
})
```

#### 日志收集

**集成 Sentry：**
```bash
pnpm add @sentry/vue
```

```typescript
// src/main.ts
import * as Sentry from '@sentry/vue'

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
})
```

### App 监控

#### 崩溃监控

**Android：**
```typescript
// 集成第三方服务（如友盟、神策）
// 或使用 uni-app 内置统计
uni.reportEvent('crash', {
  message: error.message,
  stack: error.stack,
})
```

#### 性能监控

**页面加载时间：**
```typescript
const startTime = Date.now()

onMounted(() => {
  const loadTime = Date.now() - startTime
  uni.reportEvent('pageLoad', { time: loadTime })
})
```

### 告警配置

**推荐告警阈值：**

| 指标 | 警告 | 严重 |
|------|-----|------|
| 错误率 | >1% | >5% |
| 响应时间 | >3s | >5s |
| 崩溃率 | >0.1% | >1% |
| 可用性 | <99.9% | <99% |

**告警通知：**
- 邮件：开发团队
- 钉钉/企业微信：运维团队
- 短信：严重问题

---

## 常见问题

### H5 问题

#### 白屏问题

**症状：** 页面显示空白，控制台无错误

**排查步骤：**
1. 检查构建产物是否完整
   ```bash
   ls -la unpackage/dist/build/h5/
   ```
2. 检查 Nginx 配置是否正确
   ```bash
   nginx -t
   ```
3. 查看浏览器控制台 Network 标签
4. 检查 `index.html` 是否正确引用资源

**解决方案：**
- 确保静态资源路径正确
- 配置 SPA 路由回退
- 检查 CDN 配置

#### API 请求失败

**症状：** 接口返回 404 或 500 错误

**排查步骤：**
1. 测试 API 是否正常
   ```bash
   curl https://api.example.com/health
   ```
2. 检查 CORS 配置
3. 查看浏览器控制台错误信息

**解决方案：**
- 配置代理（开发环境）
- 配置 CORS（生产环境）
- 检查 API 密钥是否正确

#### 路由刷新 404

**症状：** 刷新页面时显示 404

**原因：** 服务器未配置 SPA 路由回退

**解决方案：**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### App 问题

#### APK 安装失败

**症状：** 安装时提示"解析包时出现问题"

**排查步骤：**
1. 检查 APK 是否完整下载
2. 检查签名是否正确
3. 检查 Android 版本兼容性

**解决方案：**
- 重新下载 APK
- 使用正确的签名证书
- 降低 `minSdkVersion`

#### App 闪退

**症状：** 打开 App 立即关闭

**排查步骤：**
1. 查看 logcat 日志
   ```bash
   adb logcat | grep "FATAL"
   ```
2. 检查是否缺少权限
3. 检查原生模块兼容性

**解决方案：**
- 修复崩溃的代码
- 添加必要的权限声明
- 更新原生 SDK

#### 热更新失败

**症状：** 提示更新下载失败

**排查步骤：**
1. 检查更新服务器是否正常
2. 检查网络连接
3. 检查存储权限

**解决方案：**
- 确保更新 URL 可访问
- 添加下载失败重试逻辑
- 引导用户开启存储权限

### HarmonyOS 问题

#### HAP 安装失败

**症状：** 提示"应用安装失败"

**排查步骤：**
1. 检查设备 HarmonyOS 版本
2. 检查签名配置
3. 检查 API Level 兼容性

**解决方案：**
- 更新 DevEco Studio
- 使用正确的证书签名
- 降低 `targetAPIVersion`

---

## 回滚流程

### H5 回滚

**快速回滚：**
```bash
# 方式1：恢复上一个版本
git checkout HEAD~1
pnpm build:h5
rsync -avz --delete unpackage/dist/build/h5/ user@server:/var/www/html/

# 方式2：使用备份
cp -r /backup/h5-previous/* /var/www/html/

# 方式3：切换 Git 分支
git checkout main
git reset --hard previous-commit
pnpm build:h5
rsync -avz --delete unpackage/dist/build/h5/ user@server:/var/www/html/
```

**验证回滚：**
```bash
curl https://example.com
```

### App 回滚

**Android：**
1. 在应用商店发布旧版本
2. 通知用户更新到旧版本
3. 或下架新版本

**HarmonyOS：**
1. 下架新版本
2. 重新审核旧版本
3. 或发布修复版本

### 回滚检查清单

- [ ] 确认回滚版本稳定
- [ ] 备份当前版本数据
- [ ] 执行回滚操作
- [ ] 验证功能正常
- [ ] 监控错误率
- [ ] 通知相关团队

---

## 备份策略

### 代码备份

```bash
# Git 远程备份
git push origin main

# Git 标签备份重要版本
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 配置备份

```bash
# 备份配置文件
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
  manifest.config.ts \
  vite.config.ts \
  uno.config.ts
```

### 数据备份

- 数据库定期备份
- 日志归档
- 用户数据导出

---

## 参考资源

- [BUILD.md](./BUILD.md) - 构建指南
- [CONTRIB.md](./CONTRIB.md) - 开发工作流
- [uni-app 运维文档](https://uniapp.dcloud.net.cn/tutorial/operation.html)

---

最后更新：2026-02-04
