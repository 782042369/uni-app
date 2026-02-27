# 项目概述

> 单一数据源：`README.md` + `package.json`

本文档提供 uni-app 项目的整体介绍。

---

## 项目简介

本项目是基于 **uni-helper Vitesse for uni-app** 模板的跨平台应用，支持 Android、HarmonyOS 和 H5 三端部署。

### 核心特性

- ⚡️ **现代化技术栈** - Vue 3 + Vite + TypeScript + pnpm
- 🚁 **文件路由** - 基于文件系统的自动路由生成
- 🤖 **组件自动导入** - 无需手动引入组件
- 📥 **API 自动导入** - 直接使用 Composition API
- 🎨 **UnoCSS** - 高性能原子化 CSS 引擎
- 😃 **图标集** - 丰富的图标库支持
- 🦾 **类型安全** - TypeScript 严格模式
- 🔍 **代码质量** - ESLint + Git Hooks

---

## 技术栈

### 核心框架

| 技术 | 版本 | 用途 |
|------|-----|------|
| **Vue** | 3.4.38 | 渐进式前端框架 |
| **Vite** | 5.2.8 | 下一代前端构建工具 |
| **TypeScript** | 5.5.4 | JavaScript 超集 |
| **UnoCSS** | 66.0.0 | 即时原子化 CSS 引擎 |
| **pnpm** | 10.0.0 | 快速、节省磁盘空间的包管理器 |

### uni-app 生态

| 包 | 版本 | 用途 |
|-----|------|------|
| **@dcloudio/uni-app** | 3.0.0-4080520251106001 | uni-app 核心运行时 |
| **@dcloudio/uni-app-plus** | 3.0.0-4080520251106001 | App 平台运行时 |
| **@dcloudio/uni-app-harmony** | 3.0.0-4080520251106001 | HarmonyOS 运行时 |
| **@dcloudio/uni-h5** | 3.0.0-4080520251106001 | H5 运行时 |

### 工具链

| 工具 | 版本 | 用途 |
|-----|------|------|
| **@uni-helper/unh** | 0.2.10 | uni-app 开发工具链 |
| **@uni-helper/vite-plugin-uni-pages** | 0.3.23 | 文件路由插件 |
| **@uni-helper/vite-plugin-uni-components** | 0.2.6 | 组件自动导入 |
| **@uni-helper/vite-plugin-uni-layouts** | 0.1.11 | 布局系统 |
| **@uni-helper/eslint-config** | 0.5.0 | ESLint 配置 |
| **unplugin-auto-import** | 0.18.6 | API 自动导入 |

### 业务框架

| 框架/库 | 版本 | 用途 |
|--------|------|------|
| **Wot Design Uni** | 1.14.0 | UI 组件库 |
| **@wot-ui/router** | 1.1.2 | 路由系统 |
| **Pinia** | 2.3.1 | 状态管理 |
| **Alova** | 3.5.0 | API 请求 |
| **ECharts** | 6.0.0 | 数据可视化 |
| **Day.js** | 1.11.19 | 日期处理 |

---

## 平台支持

### 支持的平台

| 平台 | 状态 | 说明 |
|------|------|------|
| **Android** | ✅ 完全支持 | 原生 Android 应用 |
| **HarmonyOS** | ✅ 完全支持 | 鸿蒙原生应用 |
| **H5** | ✅ 完全支持 | Web 应用 |

### 不支持的平台

- ❌ 微信小程序（需额外配置）
- ❌ 支付宝小程序（需额外配置）
- ❌ iOS（需使用不同的模板）

---

## 项目结构

```
uni-app/
├── src/                      # 源代码目录
│   ├── components/           # 全局组件（自动导入）
│   │   ├── GlobalLoading.vue    # 全局加载组件
│   │   ├── GlobalToast.vue      # 全局提示组件
│   │   ├── GlobalMessage.vue    # 全局消息组件
│   │   ├── SecondaryTabBar.vue  # 二级导航栏
│   │   └── index/               # 首页专用组件
│   │       ├── CoreDataDashboard.vue  # 核心数据仪表盘
│   │       ├── QuickActionGrid.vue    # 快捷操作网格
│   │       └── TodoReminder.vue       # 待办提醒
│   ├── composables/          # 组合式函数（自动导入）
│   ├── layouts/              # 布局模板
│   │   ├── default.vue           # 默认布局
│   │   └── tabbar.vue            # TabBar 布局
│   ├── pages/                # 页面路由（自动生成）
│   │   ├── index/               # 首页模块
│   │   │   └── index.vue
│   │   ├── safety/              # 安全生产管理（8个页面）
│   │   │   ├── index.vue
│   │   │   ├── hazard.vue       # 隐患管理
│   │   │   ├── risk.vue         # 风险管理
│   │   │   ├── environmental.vue # 环保管理
│   │   │   ├── monitor.vue      # 安全监控
│   │   │   ├── contacts.vue     # 联系人
│   │   │   ├── warning.vue      # 预警信息
│   │   │   └── warning-detail.vue
│   │   ├── production/          # 生产管理（6个页面）
│   │   │   ├── index.vue
│   │   │   ├── monitor.vue      # 生产监控
│   │   │   ├── report.vue       # 生产报表
│   │   │   ├── automation.vue   # 自动化
│   │   │   ├── video.vue        # 视频监控
│   │   │   └── sales.vue        # 销售管理
│   │   ├── knowledge/           # 知识库管理（5个页面）
│   │   │   ├── index.vue
│   │   │   ├── search.vue       # 知识搜索
│   │   │   ├── detail.vue       # 知识详情
│   │   │   ├── manage.vue       # 知识管理
│   │   │   └── favorites.vue    # 我的收藏
│   │   └── profile/             # 个人中心（7个页面）
│   │       ├── index.vue
│   │       ├── settings.vue     # 设置
│   │       ├── tasks.vue        # 我的任务
│   │       ├── messages.vue     # 消息通知
│   │       ├── feedback.vue     # 意见反馈
│   │       ├── favorites.vue    # 我的收藏
│   │       └── about.vue        # 关于我们
│   ├── store/                 # Pinia 状态管理
│   ├── api/                   # Alova.js API 层
│   ├── router/                # @wot-ui/router 路由
│   ├── utils/                 # 工具函数
│   ├── types/                 # TypeScript 类型定义
│   ├── customize-tab-bar/     # 自定义 TabBar
│   ├── static/                # 静态资源
│   ├── App.vue                # 根组件
│   ├── main.ts                # 入口文件
│   ├── uni.scss               # 全局样式
│   └── env.d.ts               # 环境变量类型
├── docs/                     # 项目文档
│   ├── INDEX.md              # 文档导航
│   ├── PROJECT.md            # 项目概述（本文档）
│   ├── GETTING_STARTED.md    # 快速开始
│   ├── CONTRIB.md            # 开发工作流
│   ├── SCRIPTS.md            # 脚本参考
│   ├── ENV.md                # 环境配置
│   ├── BUILD.md              # 构建指南
│   ├── RUNBOOK.md            # 运维手册
│   ├── FAQ.md                # 常见问题
│   ├── UI_DESIGN.md          # UI 设计规范
│   └── frontend/             # 前端规范文档
│       ├── UI_DESIGN_GUIDE.md
│       ├── MENU_STRUCTURE.md
│       ├── PAGES_SPEC.md
│       ├── COMPONENTS_SPEC.md
│       ├── DATA_MODELS.md
│       └── INTERACTION_PATTERNS.md
├── .claude/                  # AI 配置
│   └── skills/               # AI 技能模块
│       ├── alova-api-module/
│       ├── global-feedback/
│       ├── pinia-store-generator/
│       ├── uni-page-generator/
│       ├── vue-composable-creator/
│       ├── wot-router-usage/
│       └── wot-ui/
├── .github/                  # GitHub 配置
│   └── workflows/            # CI/CD 工作流
├── .vscode/                  # VSCode 配置
├── dist/                     # 构建输出
├── unpackage/                # uni-app 构建产物
├── node_modules/             # 依赖包
├── .gitignore                # Git 忽略配置
├── .editorconfig             # 编辑器配置
├── .node-version             # Node.js 版本
├── eslint.config.js          # ESLint 配置
├── package.json              # 项目配置
├── pnpm-lock.yaml            # 依赖锁定文件
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
├── uno.config.ts             # UnoCSS 配置
├── unh.config.ts             # uni-helper 工具配置
├── pages.config.ts           # 页面路由配置
├── manifest.config.ts        # 应用清单配置
├── alova.config.ts           # Alova API 配置
├── CLAUDE.md                 # AI 上下文文档
└── README.md                 # 项目说明
```

---

## 自动化特性

### 1. 文件路由系统

在 `src/pages/` 创建 `.vue` 文件，自动生成路由：

```bash
src/pages/
├── index.vue        # → /
├── about.vue        # → /about
└── users/
    └── [id].vue     # → /users/:id
```

配置文件：`pages.config.ts`

### 2. 组件自动导入

在 `src/components/` 创建组件，自动全局注册：

```vue
<!-- src/components/UserCard.vue -->
<template>
  <div>User Card</div>
</template>
```

使用时无需导入：
```vue
<template>
  <UserCard />  <!-- 直接使用 -->
</template>
```

配置插件：`@uni-helper/vite-plugin-uni-components`

### 3. API 自动导入

直接使用 Vue/VueUse/uni-app API，无需手动引入：

```vue
<script setup lang="ts">
// 无需 import，自动可用
const count = ref(0)
const { width } = useWindowSize()
uni.showToast({ title: 'Hello' })
</script>
```

配置插件：`unplugin-auto-import`

类型定义：`src/auto-imports.d.ts`

### 4. 布局系统

在页面中使用布局包装：

```vue
<!-- src/pages/index.vue -->
<script setup lang="ts">
definePage({
  layout: 'default', // 使用 src/layouts/default.vue
})
</script>
```

配置插件：`@uni-helper/vite-plugin-uni-layouts`

### 5. 配置文件生成

自动生成 `pages.json` 和 `manifest.json`：

- `pages.config.ts` → `pages.json`
- `manifest.config.ts` → `manifest.json`

配置插件：
- `@uni-helper/vite-plugin-uni-pages`
- `@uni-helper/vite-plugin-uni-manifest`

---

## 开发约定

### 代码风格

**Vue 组件：**
- 使用 `<script setup>` 语法
- 组件命名：PascalCase（如 `UserCard.vue`）
- 优先使用 Composition API

**TypeScript：**
- 严格模式启用
- 明确类型注解
- 避免使用 `any`

**样式：**
- 优先使用 UnoCSS 原子类
- 复杂动画使用 `<style scoped>`
- 避免内联样式

**详细规范：** @CONTRIB.md#代码规范

### 命名规范

**文件命名：**
- 组件：PascalCase（`UserCard.vue`）
- 页面：kebab-case（`user-profile.vue`）
- Composables：use 前缀（`useFetch.ts`）

**变量命名：**
- 常量：UPPER_SNAKE_CASE（`API_BASE_URL`）
- 变量/函数：camelCase（`getUserInfo`）
- 类/接口：PascalCase（`UserService`）

**详细规范：** @CONTRIB.md#命名规范

### Git 提交规范

**提交格式：** @CONTRIB.md#git-提交规范

**分支策略：** @CONTRIB.md#分支策略

---

## 快速开始

### 环境要求

**必需版本：** Node.js ≥24.0.0、pnpm ≥10

**详细安装步骤：** @GETTING_STARTED.md#环境要求

### 安装与开发

```bash
# 安装依赖
pnpm install

# H5 开发
pnpm dev

# Android 开发
pnpm dev:android

# HarmonyOS 开发
pnpm dev:harmony
```

**完整命令列表：** @SCRIPTS.md

**详细入门指南：** @GETTING_STARTED.md

---

## 质量工具

### 代码检查

- **ESLint** - JavaScript/TypeScript 代码规范
- **TypeScript** - 类型检查
- **UnoCSS ESLint** - CSS 原子类规范

### Git Hooks

- **simple-git-hooks** - Git hooks 管理
- **lint-staged** - 暂存文件检查

### CI/CD

- **GitHub Actions** - 自动化测试和构建
- 多 Node 版本测试
- 多操作系统兼容性测试

配置文件：`.github/workflows/check.yml`

---

## 参考资源

### 官方文档

- [uni-app 文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [UnoCSS 文档](https://unocss.dev/)

### 生态项目

- [Vitesse for uni-app](https://github.com/uni-helper/vitesse-uni-app)
- [uni-helper 生态](https://uni-helper.js.org/)
- [DCloud 插件市场](https://ext.dcloud.net.cn/)

### 社区

- [uni-app 官网](https://uniapp.dcloud.net.cn/)
- [DCloud 社区](https://ask.dcloud.net.cn/)
- [GitHub Issues](https://github.com/uni-helper/vitesse-uni-app/issues)

---

## 许可证

MIT License

---

最后更新：2026-02-27
数据源：README.md + package.json + 项目扫描
