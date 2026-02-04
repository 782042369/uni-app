# 构建指南

本文档详细说明各平台的构建流程。

## 目录

- [快速开始](#快速开始)
- [H5 构建](#h5-构建)
- [Android APK 打包](#android-apk-打包)
- [HarmonyOS 应用打包](#harmonyos-应用打包)
- [常见问题](#常见问题)

---

## 快速开始

### 构建命令总览

| 平台 | 开发 | 构建 | 命令 |
|------|-----|------|------|
| **H5** | `pnpm dev` | `pnpm build` | 立即可用 |
| **Android** | `pnpm dev:android` | `pnpm build:android` | 需额外工具 |
| **HarmonyOS** | `pnpm dev:harmony` | `pnpm build:harmony` | 需额外工具 |

### 产物位置

| 平台 | 产物位置 | 用途 |
|------|---------|------|
| H5 | `unpackage/dist/build/h5/` | 直接部署 |
| Android | `unpackage/resources/` | 打包资源 |
| HarmonyOS | `unpackage/dist/build/app-harmony/` | 工程文件 |

---

## H5 构建

### 开发模式

```bash
pnpm dev
# 或
pnpm dev:h5
```

**特点：**
- Vite HMR 热更新
- 端口：默认 5173
- 自动打开浏览器

### 生产构建

```bash
pnpm build
# 或
pnpm build:h5
```

### 部署

```bash
# 构建
pnpm build:h5

# 部署到服务器
scp -r unpackage/dist/build/h5/* user@server:/var/www/html/
```

**服务器要求：**
- 支持静态文件托管（Nginx、Apache 等）
- 配置 SPA 路由回退

**详细部署配置：** @RUNBOOK.md#h5-部署（包含完整的 Nginx 配置示例）

---

## Android APK 打包

### 方式一：云打包（推荐新手）

#### 前置准备

1. 安装 HBuilderX
2. 注册 DCloud 开发者账号
3. 配置 `manifest.config.ts` 中的 `appid`

#### 打包步骤

1. **打开项目**
   使用 HBuilderX 打开项目目录

2. **启动云打包**
   - 菜单：`发行` → `原生App-云打包`
   - 选择 Android 平台

3. **配置信息**
   - **包名**：`com.yourcompany.appname`
   - **版本号**：与 manifest.config.ts 一致
   - **证书**：生产环境使用自己的证书

4. **开始打包**
   - 点击「打包」按钮
   - 等待云端处理
   - 下载 APK

**特点：**
- ✅ 操作简单
- ✅ 自动处理依赖
- ❌ 需要网络
- ❌ 可能有次数限制

---

### 方式二：本地打包（推荐生产）

#### 环境准备

```bash
# 安装必要工具
# 1. HBuilderX
# 2. Android Studio
# 3. Android SDK (API Level ≥ 目标版本)
```

#### 打包步骤

**1. 生成资源**
```bash
pnpm build:android
```

资源生成到：`unpackage/resources/`

**2. 导入 Android Studio**
- 打开 uni-app 离线 SDK 项目
- 复制资源到 `apps/` 目录

**3. 配置签名**
编辑 `app/build.gradle`：
```gradle
signingConfigs {
  config {
    keyAlias 'your-key-alias'
    keyPassword 'your-key-password'
    storeFile file('path/to/keystore')
    storePassword 'your-store-password'
  }
}
```

**4. 构建 APK**
```bash
# 使用 Android Studio
Build → Build Bundle(s) / APK(s) → Build APK(s)

# 或命令行
./gradlew assembleRelease
```

**5. 获取 APK**
位置：`app/build/outputs/apk/release/`

**特点：**
- ✅ 完全控制
- ✅ 可自定义原生功能
- ❌ 配置复杂
- ❌ 需要本地环境

---

### 证书生成

```bash
# 使用 keytool
keytool -genkey -alias app-alias \
  -keyalg RSA -keysize 2048 -validity 36500 \
  -keystore app.keystore

# 或使用在线工具
# https://www.yuliao.com/keystore/
```

---

## HarmonyOS 应用打包

### 前置准备

- HBuilderX 4.27+
- DevEco Studio 5.0+
- HarmonyOS SDK
- 华为开发者联盟账号

### 打包步骤

**1. 编译工程**
```bash
pnpm build:harmony
```

工程生成到：`unpackage/dist/build/app-harmony/`

**2. 打开 DevEco Studio**
- 打开工程文件夹
- 等待 Gradle 同步

**3. 配置签名**
编辑 `build-profile.json5`：
```json5
{
  "app": {
    "signingProfiles": [{
      "name": "default",
      "type": "HarmonyOS",
      "material": {
        "certpath": "/path/to/cert.cer",
        "storePassword": "password",
        "keyAlias": "alias",
        "keyPassword": "password",
        "profile": "/path/to/profile.p7b"
      }
    }]
  }
}
```

**4. 构建 HAP**
```bash
# DevEco Studio 菜单
Build → Build Hap(s) / APP(s) → Build Hap(s)

# 命令行
hvigorw assembleHap
```

**5. 获取安装包**
- HAP：`entry/build/outputs/default/entry-default-signed.hap`
- APP：`entry/build/outputs/default/entry-default-signed.app`

---

## 常见问题

### Android

**Q: 云打包失败？**
A: 检查 `manifest.config.ts` 配置，确保包名格式正确

**Q: 本地打包无法识别设备？**
A: 安装 Google USB Driver，启用 USB 调试

**Q: APK 安装后闪退？**
A: 检查 Android SDK 版本兼容性，查看 logcat

### HarmonyOS

**Q: DevEco Studio 无法打开工程？**
A: 确保路径不含中文，检查 HBuilderX 版本

**Q: 签名配置错误？**
A: 验证证书路径和密码是否正确

**Q: HAP 包无法安装？**
A: 检查设备 HarmonyOS 版本和 API Level

---

## 参考资源

### 官方文档
- [DCloud 打包指南](https://uniapp.dcloud.net.cn/tutorial/build/SafePack)
- [uni-app HarmonyOS 文档](https://uniapp.dcloud.net.cn/tutorial/harmony/dev-v1.html)
- [HarmonyOS 开发者文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/)

### 教程
- [Android 云打包全流程](https://blog.csdn.net/My_story_begins/article/details/147140470)
- [Android 本地打包教程](https://juejin.cn/post/7454579652629053449)
- [鸿蒙应用上架流程](https://harmonyosdev.csdn.net/694b461dbf6b0e4b285de04c.html)

---

最后更新：2026-02-04
