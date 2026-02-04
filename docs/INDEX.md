# 文档中心

集中管理 uni-app 项目的所有文档，避免重复，通过引用链接提供详细信息。

## 快速导航

### 🚀 新人上手
1. [项目概述](./PROJECT.md) - 技术栈、特性、平台支持
2. [快速开始](./GETTING_STARTED.md) - 环境准备、安装、第一个页面
3. [开发工作流](./CONTRIB.md) - 代码规范、Git 流程、测试

### 💼 日常开发
1. [脚本参考](./SCRIPTS.md) - 所有 npm scripts 命令
2. [环境配置](./ENV.md) - 环境变量配置规范
3. [开发规范](./CONTRIB.md#代码规范) - Vue/TypeScript/样式规范
4. [常见问题](./FAQ.md) - 开发、构建、部署问题解答

### 🏗️ 构建部署
1. [构建指南](./BUILD.md) - 各平台构建流程
2. [运维手册](./RUNBOOK.md) - 部署、监控、故障排查

### 📚 参考资料
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [UnoCSS 文档](https://unocss.dev/)

---

## 文档架构

```
docs/
├── INDEX.md              # 本文档 - 导航中心
│
├── 项目文档
│   ├── PROJECT.md        # 项目概述（技术栈、架构、特性）
│   └── GETTING_STARTED.md # 快速开始（安装、开发）
│
├── 开发文档
│   ├── CONTRIB.md        # 开发工作流（规范、Git、测试）
│   ├── SCRIPTS.md        # 脚本命令（基于 package.json）
│   ├── ENV.md            # 环境配置（基于 .env.example）
│   └── FAQ.md            # 常见问题解答（集中管理）
│
└── 运维文档
    ├── BUILD.md          # 构建指南
    └── RUNBOOK.md        # 运维手册（部署、监控、排错）
```

---

## 避免重复策略

### 单一数据源原则

所有文档基于以下源文件自动生成：

| 源文件 | 生成文档 | 内容 |
|--------|---------|------|
| `package.json` | SCRIPTS.md | 命令脚本 |
| `.env.example` | ENV.md | 环境变量 |
| `README.md` | PROJECT.md | 项目信息 |
| 实际问题汇总 | FAQ.md | 常见问题解答 |
| 源代码注释 | API.md | API 文档（待添加） |

### 引用链接机制

使用 `@` 语法链接到详细文档，避免重复：

```markdown
详见 @BUILD.md#android
参见 @CONTRIB.md#代码规范
参考 @SCRIPTS.md#开发模式
```

---

## 按场景查找

### 场景 1：首次接触项目

**阅读路径：** PROJECT.md → GETTING_STARTED.md → CONTRIB.md

- 了解项目技术栈和特性
- 安装开发环境
- 创建第一个页面
- 学习代码规范

### 场景 2：日常功能开发

**阅读路径：** SCRIPTS.md → CONTRIB.md → ENV.md → FAQ.md

- 查看开发命令
- 遵循代码规范
- 配置环境变量
- 解决常见问题

### 场景 3：构建和部署

**阅读路径：** BUILD.md → RUNBOOK.md

- 选择构建方式（云打包/本地打包）
- 执行构建流程
- 部署到生产环境
- 配置监控告警

### 场景 4：问题排查

**阅读路径：** FAQ.md → RUNBOOK.md → BUILD.md#常见问题

- 查看常见问题解答
- 执行回滚流程
- 联系支持团队

---

## 按平台查找

### H5 开发
- 快速开始：@GETTING_STARTED.md#h5-开发
- 构建部署：@BUILD.md#h5-构建
- 运维排错：@RUNBOOK.md#h5-问题

### Android 开发
- 快速开始：@GETTING_STARTED.md#android-开发
- 构建打包：@BUILD.md#android-apk-打包
- 运维排错：@RUNBOOK.md#android-问题

### HarmonyOS 开发
- 快速开始：@GETTING_STARTED.md#harmonyos-开发
- 构建打包：@BUILD.md#harmonyos-应用打包
- 运维排错：@RUNBOOK.md#harmonyos-问题

---

## 环境要求

**必需版本：**
- Node.js: ≥24.0.0
- pnpm: ≥10

**详细安装步骤：** @GETTING_STARTED.md#环境要求

---

## 文档维护

### 更新频率
- **自动化文档**：每次变更源文件时自动更新
- **手写文档**：按需更新，每季度审查

### 贡献指南
1. 更新源文件（如 package.json）
2. 运行文档生成脚本
3. 提交 PR

### 版本控制
- 所有文档纳入 Git
- 重要变更记录在文档顶部
- 过时内容标记 `DEPRECATED`

---

## 快速命令参考

| 操作 | 命令 | 说明 |
|------|------|------|
| 安装依赖 | `pnpm install` | 首次使用 |
| H5 开发 | `pnpm dev` | 启动开发服务器 |
| H5 构建 | `pnpm build` | 生产构建 |
| 类型检查 | `pnpm type-check` | TypeScript 检查 |
| 代码检查 | `pnpm lint` | ESLint 检查并自动修复 |

**完整命令列表：** @SCRIPTS.md

**详细构建流程：** @BUILD.md

---

## 获取帮助

### 遇到问题？
1. 查看 @FAQ.md - 常见问题解答
2. 查看 @RUNBOOK.md#常见问题 - 运维问题
3. 搜索 [GitHub Issues](https://github.com/uni-helper/vitesse-uni-app/issues)
4. 提问 [DCloud 社区](https://ask.dcloud.net.cn/)

### 反馈建议？
- 提交 Issue
- 发起 Pull Request
- 联系维护团队

---

最后更新：2026-02-04
