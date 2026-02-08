# 项目概览 (Project Overview)

本项目是一个基于 [Wot Starter](https://starter.wot-ui.cn/) 的现代化 **uni-app** 快速开发模板，专门针对 **工业物联网 (Industrial IoT)** 场景进行了深度定制。它采用了 Vue 3、Vite、TypeScript 等主流技术栈，并集成了一套完整的工业风 UI 设计系统。

## 核心技术栈 (Tech Stack)

- **框架**: [Vue 3 (Composition API)](https://vuejs.org/) + [uni-app](https://uniapp.dcloud.net.cn/)
- **构建工具**: [Vite 5](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 组件库**: [Wot UI](https://github.com/Moonofweisheng/wot-design-uni) (70+ 高质量组件)
- **样式**: [UnoCSS](https://unocss.dev/) (原子化 CSS，内置工业风预设)
- **网络请求**: [Alova](https://alova.js.org/) (极致高效的请求工具集，支持自动代码生成)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由 & 布局**: [uni-helper](https://uni-helper.cn/) 插件系列 (基于文件的路由、自动化布局)
- **图表**: [ECharts](https://echarts.apache.org/) (通过 `uni-echarts` 适配)

## 构建与运行 (Building and Running)

项目使用 `pnpm` 作为包管理器，通过 `@uni-helper/unh` 进行开发和构建。

| 任务 | 命令 |
| :--- | :--- |
| 安装依赖 | `pnpm install` |
| H5 开发 | `pnpm dev` |
| App 开发 | `pnpm dev:app` |
| 鸿蒙开发 | `pnpm dev:harmony` |
| H5 构建 | `pnpm build` |
| App 构建 | `pnpm build:app` |
| 代码校验 | `pnpm lint` |
| 类型检查 | `pnpm type-check` |
| 生成 API | `pnpm alova-gen` |

## 开发规范 (Development Conventions)

### 目录结构

- `src/pages/`: **基于文件的路由**。在该目录下创建 `.vue` 文件会自动映射为页面，无需在 `pages.json` 中手动声明。
- `src/components/`: **组件自动导入**。在该目录下的组件可以直接在模板中使用，无需手动 import。
- `src/layouts/`: **布局系统**。使用 `route-block` 或插件配置来切换页面布局（如 `default`, `tabbar`）。
- `src/api/`: 请求层逻辑。包含 Alova 实例配置及自动生成的 API 模块。
- `src/store/`: Pinia 状态管理，已配置持久化支持。
- `src/composables/`: 共享的组合式逻辑（如主题切换、全局加载提示等）。
- `src/theme.json`: 定义了明暗主题的颜色变量，通过 `useTheme` 自动适配。

### 编程风格

- **Script Setup**: 强制使用 `<script setup>` 语法。
- **Auto Import**: 常用 API（如 `ref`, `onLoad`, `useRequest` 等）已配置自动导入，无需显式 import。
- **UnoCSS**: 优先使用 UnoCSS 提供的原子化类进行开发。本项目在 `uno.config.ts` 中定义了大量 `industrial-*` 快捷方式。
- **TypeScript**: 严格的类型约束，请确保新功能都有完整的类型定义。

## 关键功能模块

- **工业监控面板**: 在 `uno.config.ts` 中预设了 `card-panel`, `tech-card`, `status-dot-glow` 等具有科技感的 UI 样式。
- **主题切换**: 支持一键切换明暗模式，适配工业现场的不同环境需求。
- **自动化 API**: 通过 Alova 的 `alova-gen` 脚本，可以根据接口定义自动生成前端请求函数。

## 文档参考 (Documentation)

- 项目详细文档存放于 `docs/` 目录。
- UI 组件库参考 [Wot UI 文档](https://wot-design-uni.site/)。
- 更多进阶配置参考 `vite.config.ts` 和 `uno.config.ts`。
