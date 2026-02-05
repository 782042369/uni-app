# 开发工作流指南

本文档说明 uni-app 项目的开发规范和最佳实践。

## 目录

- [环境准备](#环境准备)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [Git 工作流](#git-工作流)
- [测试](#测试)
- [代码审查](#代码审查)

---

## 环境准备

### 必需工具

```bash
# Node.js
node -v  # 推荐 ≥18.0.0

# pnpm
npm install -g pnpm@9.15.4

# 验证安装
pnpm -v
```

### 项目安装

```bash
# 克隆项目
git clone <repository-url>
cd uni-app

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 推荐工具

- **编辑器**：VSCode
- **插件**：
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 语言支持
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

---

## 开发流程

### 1. 创建功能分支

```bash
# 同步主分支
git checkout main
git pull origin main

# 创建功能分支
git checkout -b feat/your-feature-name
```

**分支命名规范：**
- `feat/` - 新功能
- `fix/` - Bug 修复
- `refactor/` - 重构
- `docs/` - 文档更新
- `test/` - 测试相关
- `chore/` - 构建/工具链更新

### 2. 开发功能

#### 添加页面

在 `src/pages/` 创建 `.vue` 文件，自动生成路由：

```vue
<!-- src/pages/about.vue -->
<script setup lang="ts">
definePage({
  layout: 'default',
})

const title = ref('关于我们')
</script>

<template>
  <div class="p-4">
    <h1>{{ title }}</h1>
  </div>
</template>
```

#### 添加组件

在 `src/components/` 创建组件，自动全局导入：

```vue
<!-- src/components/UserCard.vue -->
<script setup lang="ts">
interface Props {
  name: string
  email: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="rounded-lg bg-white p-4 shadow">
    <h3>{{ props.name }}</h3>
    <p>{{ props.email }}</p>
  </div>
</template>
```

使用时无需导入：
```vue
<template>
  <UserCard name="张三" email="zhangsan@example.com" />
</template>
```

#### 使用 Composables

在 `src/composables/` 创建可复用逻辑：

```typescript
// src/composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    }
    catch (e) {
      error.value = e as Error
    }
    finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetch }
}
```

自动导入，无需 `import`：
```vue
<script setup lang="ts">
const { data, loading } = await useFetch<User>('/api/user')
</script>
```

### 3. 代码检查

```bash
# 类型检查
pnpm type-check

# 代码检查并自动修复
pnpm lint
```

### 4. 提交代码

Git hooks 会自动运行 `lint-staged`：
```bash
git add .
git commit -m "feat: add user profile page"
```

**提交信息规范：**
```
<type>: <description>

[optional body]
```

**类型：**
- `feat:` - 新功能
- `fix:` - Bug 修复
- `refactor:` - 重构
- `docs:` - 文档更新
- `test:` - 测试相关
- `chore:` - 构建/工具更新
- `perf:` - 性能优化
- `ci:` - CI 配置

**示例：**
```bash
git commit -m "feat: add user authentication"

git commit -m "fix: resolve login redirect loop

- Fix infinite loop when token expires
- Add proper error handling
"
```

---

## 代码规范

### Vue 组件

**使用 `<script setup>` 语法：**
```vue
<script setup lang="ts">
// ✅ 推荐
const count = ref(0)

// ❌ 避免
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

**组件命名：**
- 文件名：PascalCase（如 `UserCard.vue`）
- 组件引用：PascalCase（如 `<UserCard />`）

**Props 定义：**
```typescript
// 使用 TypeScript 接口
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
```

### TypeScript

**类型优先：**
```typescript
// ✅ 推荐：明确类型
function fetchData(url: string): Promise<User> {
  // ...
}

// ❌ 避免：使用 any
function fetchData(url: string): Promise<any> {
  // ...
}
```

**接口 vs 类型：**
- 优先使用 `interface` 定义对象结构
- 使用 `type` 定义联合类型和工具类型

### 样式

**优先使用 UnoCSS：**
```vue
<template>
  <!-- ✅ 推荐：原子类 -->
  <div class="flex items-center justify-between p-4">
    <!-- ❌ 避免：内联样式 -->
    <div style="display: flex; padding: 1rem;" />
  </div>
</template>
```

**在 `<style scoped>` 中编写复杂样式：**
```vue
<style scoped>
.custom-animation {
  animation: slide-in 0.3s ease;
}
</style>
```

---

## Git 工作流

### 分支策略

```
main (生产)
  ↑
develop (开发集成分支)
  ↑
feat/* (功能分支)
fix/* (修复分支)
```

### Pull Request 流程

1. **推送分支**
   ```bash
   git push origin feat/your-feature
   ```

2. **创建 PR**
   - 在 GitHub 上创建 Pull Request
   - 填写 PR 模板
   - 关联相关 Issue

3. **代码审查**
   - 至少一人审查通过
   - 所有 CI 检查通过
   - 解决审查意见

4. **合并**
   - Squash and merge
   - 删除功能分支

---

## 测试

### 测试类型

**单元测试**（待添加）：
```bash
pnpm test
```

**E2E 测试**（待添加）：
```bash
pnpm test:e2e
```

### 测试覆盖率目标

- 单元测试：≥80%
- E2E 测试：覆盖核心用户流程

---

## 代码审查

### 审查清单

**代码质量：**
- [ ] 代码可读性良好
- [ ] 遵循项目规范
- [ ] 无明显性能问题
- [ ] 错误处理完善

**类型安全：**
- [ ] TypeScript 类型定义完整
- [ ] 无 `any` 类型（除非必要）
- [ ] 类型检查通过

**测试：**
- [ ] 新功能有测试覆盖
- [ ] 所有测试通过
- [ ] 测试覆盖率达标

**文档：**
- [ ] 复杂逻辑有注释
- [ ] 公开组件/函数有文档
- [ ] 变更更新相关文档

---

## 常见问题

### 开发环境问题

- **组件无法自动导入？** → @GETTING_STARTED.md#常见问题
- **类型错误？** → @GETTING_STARTED.md#常见问题
- **样式不生效？** → @RUNBOOK.md#h5-问题

### Git 工作流问题

- **提交格式不通过？** → 查看上方 Git 提交规范
- **CI 检查失败？** → 查看 GitHub Actions 日志

---

## 参考资源

- [Vue 3 文档](https://vuejs.org/)
- [uni-app 文档](https://uniapp.dcloud.net.cn/)
- [UnoCSS 文档](https://unocss.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

最后更新：2026-02-04
