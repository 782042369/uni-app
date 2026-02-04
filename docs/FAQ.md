# 常见问题解答

> 单一数据源：汇集所有平台常见问题

本文档集中管理项目开发、构建、部署中的常见问题。

---

## 目录

- [开发环境问题](#开发环境问题)
- [构建打包问题](#构建打包问题)
- [代码规范问题](#代码规范问题)
- [运行时问题](#运行时问题)

---

## 开发环境问题

### Q: `pnpm install` 报错？

**症状：** 安装依赖时出现版本不匹配或网络错误

**排查步骤：**
1. 检查 Node.js 版本（必须 ≥24）
   ```bash
   node -v   # 应显示 v24.x.x
   ```
2. 检查 pnpm 版本（必须 ≥10）
   ```bash
   pnpm -v   # 应显示 10.x.x
   ```
3. 清理缓存和依赖
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm store prune
   pnpm install
   ```

**相关文档：** @GETTING_STARTED.md#环境要求

---

### Q: `pnpm dev` 启动失败？

**症状：** 运行开发服务器时报错

**排查步骤：**
1. 检查端口占用
   ```bash
   # 检查 5173 端口
   lsof -i :5173
   ```
2. 清理依赖重装
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```
3. 检查 Vite 配置
   ```bash
   # 验证配置文件语法
   pnpm exec vite --debug
   ```

---

### Q: 组件无法自动导入？

**症状：** 在模板中使用组件报错"组件未注册"

**排查步骤：**
1. 确保组件在 `src/components/` 目录
2. 检查文件命名：PascalCase（如 `UserCard.vue`）
3. 重启开发服务器
4. 检查 `src/components.d.ts` 是否包含该组件
5. 确认 `@uni-helper/vite-plugin-uni-components` 插件已启用

**解决方案：**
```typescript
// vite.config.ts
export default {
  plugins: [
    UniComponents({ /* 配置 */ }),
  ],
}
```

**相关文档：** @PROJECT.md#自动化特性

---

### Q: API 无法自动导入？

**症状：** 使用 `ref`、`computed` 等 API 时报错

**排查步骤：**
1. 检查 `src/auto-imports.d.ts` 是否生成
2. 重启 TypeScript 服务器（VSCode）
   ```
   Cmd+Shift+P → TypeScript: Restart TS Server
   ```
3. 确认 `unplugin-auto-import` 插件已配置

**相关文档：** @PROJECT.md#自动化特性

---

### Q: 类型错误？

**症状：** TypeScript 报错"找不到类型定义"

**排查步骤：**
```bash
# 1. 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 2. 重新生成类型定义
pnpm exec vue-tsc --noEmit

# 3. 重启 TS 服务器（VSCode）
# Cmd+Shift+P → TypeScript: Restart TS Server
```

**常见错误：**
- `Cannot find module '@/xxx'` → 检查 `tsconfig.json` 的 `paths` 配置
- `Property 'xxx' does not exist` → 运行 `pnpm dev` 重新生成类型

---

### Q: 样式不生效？

**症状：** UnoCSS 原子类或 scoped 样式无效

**排查步骤：**
1. **UnoCSS 原子类：**
   - 检查 `uno.config.ts` 配置
   - 确认使用正确的原子类名称
   - 检查 `unocss-preset-uni` 预设是否安装

2. **Scoped 样式：**
   - 确保使用 `<style scoped>`
   - 检查选择器权重
   - 验证 CSS 语法

3. **全局样式：**
   - 确认文件在 `src/uni.scss`
   - 检查 Vite 配置中的 CSS 导入

**相关文档：** @CONTRIB.md#样式规范

---

## 构建打包问题

### Q: Android 构建后没有 APK？

**症状：** 运行 `pnpm build:android` 后找不到安装包

**原因：** 构建命令只生成资源，不生成 APK

**解决方案：**

**方式一：云打包（推荐新手）**
1. 使用 HBuilderX 打开项目
2. 发行 → 原生App-云打包
3. 选择 Android 平台
4. 下载生成的 APK

**方式二：本地打包**
1. 运行 `pnpm build:android`
2. 使用 Android Studio 打开生成的资源
3. 签名并构建 APK

**详细步骤：** @BUILD.md#android-apk-打包

---

### Q: HarmonyOS 构建失败？

**症状：** `pnpm build:harmony` 报错

**排查步骤：**
1. 检查 HBuilderX 版本（≥4.27）
2. 确认 DevEco Studio 已安装
3. 验证 HarmonyOS SDK 版本
4. 检查 `manifest.config.ts` 配置

**详细步骤：** @BUILD.md#harmonyos-应用打包

---

### Q: H5 构建后白屏？

**症状：** 构建的 H5 应用打开后显示空白

**排查步骤：**
1. 检查静态资源路径
2. 验证 `vite.config.ts` 中的 `base` 配置
3. 查看浏览器控制台错误
4. 确认服务器配置了 SPA 路由回退

**解决方案：**
```nginx
# Nginx 配置
location / {
  try_files $uri $uri/ /index.html;
}
```

**相关文档：** @RUNBOOK.md#h5-问题

---

## 代码规范问题

### Q: Git commit 被拦截？

**症状：** 提交代码时被 pre-commit hook 阻止

**原因：** ESLint 检查未通过

**解决方案：**
1. 运行自动修复
   ```bash
   pnpm lint
   ```
2. 手动修复无法自动处理的问题
3. 再次提交

**跳过检查（不推荐）：**
```bash
git commit --no-verify -m "message"
```

**相关文档：** @CONTRIB.md#git-提交规范

---

### Q: 代码格式与项目不一致？

**症状：** 拉取代码后格式与本地不同

**解决方案：**
1. 安装 VSCode 推荐插件
   ```bash
   # 查看 .vscode/extensions.json
   code --install-extension dbaeumer.vscode-eslint
   ```
2. 启用保存时自动格式化
3. 运行项目统一格式化
   ```bash
   pnpm lint
   ```

**相关文档：** @CONTRIB.md#代码规范

---

## 运行时问题

### Q: H5 路由刷新 404？

**症状：** 刷新页面时显示 404 错误

**原因：** 服务器未配置 SPA 路由回退

**解决方案：**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**相关文档：** @RUNBOOK.md#h5-问题

---

### Q: App 闪退？

**症状：** Android/HarmonyOS 应用打开后立即关闭

**排查步骤：**
1. 查看 logcat 日志
   ```bash
   adb logcat | grep "FATAL"
   ```
2. 检查 `manifest.config.ts` 权限配置
3. 验证第三方 SDK 兼容性
4. 确认 minSdkVersion/targetAPIVersion 设置

**相关文档：** @RUNBOOK.md#android-问题

---

### Q: 热更新失败？

**症状：** 提示更新下载失败或安装失败

**排查步骤：**
1. 检查更新服务器 URL 可访问性
2. 验证网络连接
3. 确认存储权限已开启
4. 检查更新包版本号

**相关文档：** @RUNBOOK.md#app-问题

---

## 平台特定问题

### Android

**Q: 安装 APK 时提示"解析包时出现问题"？**
A: 检查 APK 完整性、签名配置、Android 版本兼容性。详见 @RUNBOOK.md#android-问题

**Q: 无法识别设备？**
A: 安装 Google USB Driver，启用 USB 调试。详见 @BUILD.md#android-apk-打包

### HarmonyOS

**Q: HAP 安装失败？**
A: 检查设备 HarmonyOS 版本、签名配置、API Level。详见 @RUNBOOK.md#harmonyos-问题

**Q: DevEco Studio 无法打开工程？**
A: 确保路径不含中文，检查 HBuilderX 版本。详见 @BUILD.md#harmonyos-应用打包

### H5

**Q: API 请求失败？**
A: 检查 CORS 配置、API 密钥、网络请求。详见 @RUNBOOK.md#h5-问题

**Q: 静态资源加载失败？**
A: 验证资源路径、CDN 配置、构建输出。详见 @BUILD.md#h5-构建

---

## 获取帮助

### 问题未解决？

1. **查看项目文档：** @INDEX.md
2. **搜索 GitHub Issues：** https://github.com/uni-helper/vitesse-uni-app/issues
3. **提问 DCloud 社区：** https://ask.dcloud.net.cn/
4. **查阅官方文档：**
   - [uni-app 文档](https://uniapp.dcloud.net.cn/)
   - [Vue 3 文档](https://vuejs.org/)
   - [Vite 文档](https://vitejs.dev/)

### 反馈问题？

- **Bug 报告：** 提交 GitHub Issue
- **功能建议：** 发起 Feature Request
- **安全问题：** 发送邮件到维护团队

---

## 贡献指南

### 发现了新问题？

欢迎补充常见问题！请：
1. 在本文档添加问题描述和解决方案
2. 提交 PR
3. 帮助其他开发者

---

最后更新：2026-02-04
