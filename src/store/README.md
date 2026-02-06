# Pinia Store 使用指南

本项目使用 **Pinia Setup 语法** 管理状态，提供更好的类型推断和代码组织。

## 目录结构

```
src/store/
├── types/              # 类型定义
│   ├── theme.ts       # 主题相关类型
│   └── index.ts       # 类型统一导出
├── manualThemeStore.ts # 手动主题管理
├── themeStore.ts      # 系统主题管理
├── persist.ts         # 持久化插件
└── index.ts           # 统一导出
```

## 使用方式

### 1. 基础用法

```vue
<script setup lang="ts">
// 自动导入，无需手动 import
const themeStore = useThemeStore()

// 访问状态
console.log(themeStore.theme)

// 调用方法
themeStore.initSystemTheme()
</script>

<template>
  <div>{{ themeStore.theme }}</div>
</template>
```

### 2. 手动主题管理

```vue
<script setup lang="ts">
const manualTheme = useManualThemeStore()

// 切换主题
const handleToggle = () => {
  manualTheme.toggleTheme() // 自动切换
  manualTheme.toggleTheme('dark') // 指定主题
}

// 设置跟随系统
const handleFollowSystem = () => {
  manualTheme.setFollowSystem(true)
}

// 更改主题色
const handleChangeColor = (color) => {
  manualTheme.setCurrentThemeColor(color)
}
</script>
```

### 3. 使用持久化插件

```typescript
// main.ts
import { createPinia } from 'pinia'
import { persistPlugin } from '@/store'

const pinia = createPinia()
pinia.use(persistPlugin)

app.use(pinia)
```

## Setup 语法优势

相比传统的 `state/getters/actions` 结构：

1. **更灵活** - 可以使用任意 Composition API
2. **更简洁** - 减少样板代码
3. **更好的类型推断** - 无需额外类型注解
4. **更容易复用逻辑** - 可以提取公共函数

## 最佳实践

### 使用 storeToRefs 保持响应性

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()

// ✅ 推荐：保持响应性
const { theme, isDark } = storeToRefs(themeStore)

// ❌ 避免：直接解构会丢失响应性
// const { theme, isDark } = themeStore

// 方法可以直接解构
const { initSystemTheme } = themeStore
</script>
```

### 组件中使用

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const manualTheme = useManualThemeStore()
const { theme, isDark } = storeToRefs(manualTheme)

function onThemeChange() {
  manualTheme.toggleTheme()
}
</script>

<template>
  <wd-switch :model-value="isDark" @change="onThemeChange" />
</template>
```

## API 参考

### useThemeStore

系统主题管理，自动跟随系统主题。

**状态：**
- `theme`: 当前主题模式
- `themeVars`: 主题变量
- `isDark`: 是否为暗色主题（computed）

**方法：**
- `initSystemTheme()`: 初始化系统主题
- `getSystemTheme()`: 获取系统主题

### useManualThemeStore

完整主题管理，支持手动切换。

**状态：**
- `theme`: 当前主题模式
- `followSystem`: 是否跟随系统
- `hasUserSet`: 用户是否手动设置过
- `currentThemeColor`: 当前主题色
- `themeVars`: 主题变量
- `isDark`: 是否为暗色主题（computed）

**方法：**
- `toggleTheme(mode?, isFollow?)`: 切换主题
- `setFollowSystem(follow)`: 设置是否跟随系统
- `setNavigationBarColor()`: 设置导航栏颜色
- `setCurrentThemeColor(color)`: 设置主题色
- `getSystemTheme()`: 获取系统主题
- `initTheme()`: 初始化主题
- `resetTheme()`: 重置主题设置

### persistPlugin

状态持久化插件。

**配置选项：**
```typescript
createPersistPlugin({
  excludedIds: ['temp'], // 排除的 store ID
  keyPrefix: 'pinia:',   // 存储键前缀
})
```

## 类型定义

所有类型定义位于 `src/store/types/theme.ts`：

```typescript
type ThemeMode = 'light' | 'dark'

interface ThemeColorOption {
  name: string
  value: string
  primary: string
}

interface ThemeVars {
  darkBackground: string
  darkColor: string
  colorTheme: string
  // ...
}
```

## 迁移指南

### 从选项式 API 迁移到 Setup 语法

**之前（选项式）：**
```typescript
export const useStore = defineStore('store', {
  state: () => ({ count: 0 }),
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() { this.count++ }
  }
})
```

**现在（Setup）：**
```typescript
export const useStore = defineStore('store', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, double, increment }
})
```

## 常见问题

### Q: 为什么使用 Setup 语法？
A: 更简洁、更好的类型推断、更灵活，与 Vue 3 Composition API 风格一致。

### Q: 如何保持响应性？
A: 使用 `storeToRefs()` 解构状态，方法可以直接解构。

### Q: 持久化如何工作？
A: 通过 `persistPlugin` 插件自动将状态保存到本地存储，应用启动时自动恢复。

## 相关文档

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- 项目配置：@.claude/rules/tech-stack.md
