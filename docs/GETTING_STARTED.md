# 快速开始

帮助你快速上手 uni-app 项目开发。

## 环境要求

基于 `package.json` 的 `engines` 配置：

```json
{
  "engines": {
    "node": ">=24",
    "pnpm": ">=10"
  }
}
```

**必需版本：**
- Node.js: ≥24.0.0
- pnpm: ≥10

### 安装工具

```bash
# 1. 安装 Node.js
# 访问 https://nodejs.org/ 下载 LTS 版本（≥24）

# 2. 安装 pnpm
npm install -g pnpm@latest

# 或使用 corepack（推荐）
corepack enable
corepack prepare pnpm@latest --activate

# 3. 验证安装
node -v   # v24.x.x
pnpm -v   # 10.x.x
```

---

## 安装项目

```bash
# 1. 克隆项目（如需要）
git clone <repository-url>
cd uni-app

# 2. 安装依赖
pnpm install

# 3. 验证安装
pnpm about
```

**安装过程会自动：**
- 下载所有依赖包
- 配置 Git hooks
- 生成类型定义文件
- 创建自动导入配置

---

## 开发模式

### H5 开发（推荐新手）

```bash
pnpm dev
# 或
pnpm dev:h5
```

**访问地址：** http://localhost:5173

**特点：**
- ⚡️ Vite HMR 热更新
- 📦 组件和 API 自动导入
- 🎨 UnoCSS 即时编译
- 🔍 完整的 TypeScript 支持

### Android 开发

```bash
pnpm dev:android
```

**前置要求：**
- HBuilderX 或 Android Studio
- Android 设备或模拟器
- 配置 `manifest.config.ts` 中的 `appid`

详细步骤：@BUILD.md#android-apk-打包

### HarmonyOS 开发

```bash
pnpm dev:harmony
```

**前置要求：**
- HBuilderX 4.27+
- DevEco Studio 5.0+
- HarmonyOS 设备或模拟器

详细步骤：@BUILD.md#harmonyos-应用打包

---

## 项目结构

### 核心目录

```
src/
├── components/       # 全局组件（自动导入）
├── composables/      # 组合式函数（自动导入）
├── layouts/          # 布局模板
├── pages/            # 页面路由（自动生成）
├── static/           # 静态资源
├── App.vue           # 根组件
└── main.ts           # 入口文件
```

完整项目结构：@PROJECT.md#项目结构

---

## 第一个页面

### 创建页面

在 `src/pages/` 创建 `about.vue`：

```vue
<script setup lang="ts">
definePage({
  layout: 'default',
})

const title = ref('关于我们')

function handleClick() {
  uni.showToast({ title: '点击了按钮', icon: 'success' })
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="handleClick">
      点击我
    </button>
  </div>
</template>
```

访问：http://localhost:5173/about

### 创建组件

在 `src/components/` 创建组件，自动全局导入：

```vue
<!-- src/components/UserCard.vue -->
<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="p-4 bg-white rounded shadow">
    <h3>{{ props.name }}</h3>
  </div>
</template>
```

使用（无需导入）：
```vue
<template>
  <UserCard name="张三" />
</template>
```

### 创建 Composable

在 `src/composables/` 创建函数，自动导入：

```typescript
// src/composables/useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}
```

使用（无需导入）：
```vue
<script setup lang="ts">
const { count, increment } = useCounter(0)
</script>
```

---

## 开发技巧

### 自动导入特性

**组件：**
```vue
<template>
  <AppFooter />  <!-- 无需 import -->
</template>
```

**API：**
```vue
<script setup lang="ts">
const count = ref(0)  // Vue API
const { x, y } = useMouse()  // VueUse
uni.showToast({ title: 'Hello' })  // uni-app API
</script>
```

**Composables：**
```vue
<script setup lang="ts">
const { data } = useFetch('/api/user')  // 自定义
</script>
```

### 样式编写

**优先 UnoCSS：**
```vue
<template>
  <div class="flex items-center p-4 bg-white rounded-lg">
    <!-- 内容 -->
  </div>
</template>
```

**复杂样式用 scoped：**
```vue
<style scoped>
.custom {
  animation: slide-in 0.3s ease;
}
</style>
```

样式规范：@CONTRIB.md#样式规范

---

## 常见问题

遇到问题？查看详细解答：@FAQ.md

**快速链接：**
- 环境配置问题 → @FAQ.md#开发环境问题
- 构建打包问题 → @FAQ.md#构建打包问题
- 代码规范问题 → @FAQ.md#代码规范问题
- 运行时问题 → @FAQ.md#运行时问题

---

## 下一步

1. @CONTRIB.md - 学习开发工作流和代码规范
2. @SCRIPTS.md - 查看所有可用命令
3. @BUILD.md - 了解构建和部署流程
4. @PROJECT.md - 深入了解项目架构
5. @FAQ.md - 查看常见问题解答

---

最后更新：2026-02-04
