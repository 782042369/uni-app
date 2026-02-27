# 交互设计规范

> 基于「马郎综管平台产品设计文档（移动端）」的前端交互设计规范

## 目录

- [交互原则](#交互原则)
- [页面切换](#页面切换)
- [手势交互](#手势交互)
- [反馈机制](#反馈机制)
- [数据刷新](#数据刷新)
- [异常处理](#异常处理)
- [弱网适配](#弱网适配)

---

## 交互原则

### 核心原则

1. **操作简洁** - 核心功能不超过 3 步操作
2. **反馈及时** - 每个操作都有明确的反馈
3. **防错容错** - 避免误触，提供错误恢复
4. **高效便捷** - 单手操作，常用功能一键可达

### 操作步骤限制

```
核心功能：≤ 3 步
常用功能：≤ 5 步
复杂功能：提供引导
```

---

## 页面切换

### 切换方式

**滑动切换**

- 方向：左右滑动
- 动画：无多余动画
- 切换时间：< 200ms
- 手势跟随：支持

### 导航模式

```
┌─────────────────────────────┐
│         [返回]  标题         │  标题栏（可返回）
├─────────────────────────────┤
│                             │
│        页面内容              │
│                             │
├─────────────────────────────┤
│    [首页][安全][生产]...     │  底部导航（固定）
└─────────────────────────────┘
```

### 返回导航

**物理返回键**

- 返回上一页
- 保存表单状态（如适用）
- 确认退出（编辑页面）

**返回按钮**

- 标题栏左侧显示
- 图标：左箭头
- 文字："返回"（可选）

### 导航守卫

```typescript
// 页面离开确认
function onBeforeLeave() {
  if (hasUnsavedChanges) {
    showConfirm({
      title: '提示',
      content: '有未保存的修改，确定要离开吗？',
      onConfirm: () => {
        navigateBack()
      },
    })
    return false
  }
  return true
}
```

---

## 手势交互

### 支持的手势

| 手势 | 功能 | 场景 |
|------|------|------|
| 点击 | 选择、确认、跳转 | 按钮、列表项、卡片 |
| 长按 | 显示更多操作 | 列表项、图片 |
| 滑动 | 切换页面、滚动内容 | 页面切换、列表滚动 |
| 下拉 | 刷新数据 | 列表页面 |
| 双击 | 放大（图片、地图） | 图片查看器、地图 |

### 下拉刷新

```vue
<script setup lang="ts">
import { ref } from 'vue'

const refreshing = ref(false)

async function onRefresh() {
  refreshing.value = true
  await fetchData()
  refreshing.value = false
}
</script>

<template>
  <scroll-view
    refresher-enabled
    :refresher-triggered="refreshing"
    @refresherrefresh="onRefresh"
  >
    <!-- 内容 -->
  </scroll-view>
</template>
```

### 上拉加载

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const finished = ref(false)

async function onLoadMore() {
  if (loading.value || finished.value) return

  loading.value = true
  await fetchData()
  loading.value = false
}
</script>

<template>
  <scroll-view
    @scrolltolower="onLoadMore"
  >
    <!-- 内容 -->
    <view v-if="loading" class="loading">加载中...</view>
    <view v-if="finished" class="finished">没有更多了</view>
  </scroll-view>
</template>
```

### 双击放大

```vue
<script setup lang="ts">
import { ref } from 'vue'

const scale = ref(1)

function onDoubleClick() {
  scale.value = scale.value === 1 ? 2 : 1
}
</script>

<template>
  <image
    :src="imageUrl"
    :style="{ transform: `scale(${scale})` }"
    @dblclick="onDoubleClick"
  />
</template>
```

---

## 反馈机制

### 操作反馈

**点击反馈**

```css
.button:active {
  transform: scale(0.98);
  opacity: 0.8;
}
```

**加载反馈**

- 显示加载图标
- 禁用操作按钮
- 保持原内容可见

**完成反馈**

- 成功：显示成功提示
- 失败：显示错误信息和重试按钮

### 提示方式

| 类型 | 组件 | 持续时间 | 使用场景 |
|------|------|---------|---------|
| Toast | 轻提示 | 2秒 | 操作成功/失败提示 |
| Message | 消息提示 | 3秒 | 重要信息提醒 |
| Dialog | 对话框 | 持久显示 | 确认操作、警告 |
| Notification | 通知栏 | 持久显示 | 系统消息、预警 |

### Toast 提示

```typescript
// 成功提示
uni.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000,
})

// 失败提示
uni.showToast({
  title: '操作失败',
  icon: 'error',
  duration: 2000,
})

// 加载提示
uni.showLoading({
  title: '加载中...',
  mask: true,
})

// 关闭加载
uni.hideLoading()
```

### Dialog 确认

```typescript
uni.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success: (res) => {
    if (res.confirm) {
      // 确认删除
    }
  },
})
```

---

## 数据刷新

### 自动刷新

```typescript
// 定时刷新
let refreshTimer: number

function startAutoRefresh() {
  refreshTimer = setInterval(() => {
    refreshData()
  }, 5 * 60 * 1000)  // 每5分钟
}

function stopAutoRefresh() {
  clearInterval(refreshTimer)
}

onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
```

### 手动刷新

```vue
<script setup lang="ts">
function onRefresh() {
  refreshData()
}
</script>

<template>
  <view class="page-header">
    <text class="title">马郎综管平台</text>
    <wd-icon name="refresh" @click="onRefresh" />
  </view>
</template>
```

### 刷新状态

| 状态 | 显示内容 | 说明 |
|------|---------|------|
| 正常 | 当前数据 | 显示数据 |
| 刷新中 | 加载图标 | 显示加载图标 |
| 刷新失败 | 重试按钮 | 显示错误和重试 |
| 数据更新 | 更新时间 | 显示最后更新时间 |

---

## 异常处理

### 数据异常

**空数据状态**

```vue
<EmptyState
  v-if="!loading && list.length === 0"
  icon="inbox"
  title="暂无数据"
  description="点击刷新按钮重新加载"
  :show-button="true"
  button-text="刷新"
  @button-click="handleRefresh"
/>
```

**加载失败状态**

```vue
<ErrorState
  v-if="error"
  title="加载失败"
  description="网络异常，请重试"
  :show-button="true"
  button-text="重新加载"
  @button-click="handleRetry"
/>
```

### 网络异常

**错误提示**

```
网络异常，请重试
数据加载失败
连接超时，请检查网络
```

**重试机制**

```typescript
async function fetchDataWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const data = await fetchData()
      return data
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

### 表单验证

```typescript
// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入名称' },
    { maxLength: 50, message: '名称不能超过50个字符' },
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
  ],
}

// 验证表单
function validateForm(data: Record<string, any>) {
  const errors: string[] = []

  for (const [field, value] of Object.entries(data)) {
    const fieldRules = rules[field]
    if (!fieldRules) continue

    for (const rule of fieldRules) {
      if (rule.required && !value) {
        errors.push(rule.message)
        break
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(rule.message)
        break
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(rule.message)
        break
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
```

---

## 弱网适配

### 离线缓存

```typescript
// 缓存数据
function cacheData(key: string, data: any) {
  uni.setStorageSync(key, {
    data,
    timestamp: Date.now(),
  })
}

// 获取缓存
function getCachedData(key: string, maxAge = 30 * 60 * 1000) {
  const cached = uni.getStorageSync(key)
  if (!cached) return null

  const { data, timestamp } = cached
  const age = Date.now() - timestamp

  if (age > maxAge) {
    uni.removeStorageSync(key)
    return null
  }

  return data
}

// 获取数据（优先使用缓存）
async function getDataWithCache(key: string) {
  // 先返回缓存数据
  const cached = getCachedData(key)
  if (cached) {
    return cached
  }

  // 请求最新数据
  const data = await fetchData()
  cacheData(key, data)
  return data
}
```

### 图片懒加载

```vue
<image
  :src="imageUrl"
  lazy-load
  mode="aspectFill"
/>
```

### 视频适配

```vue
<script setup lang="ts>
import { ref, watch } from 'vue'

const networkType = ref('unknown')
const videoQuality = ref<'high' | 'medium' | 'low'>('medium')

uni.getNetworkType({
  success: (res) => {
    networkType.value = res.networkType
  },
})

watch(networkType, (type) => {
  // 根据网络类型调整视频质量
  if (type === 'wifi') {
    videoQuality.value = 'high'
  } else if (type === '4g' || type === '5g') {
    videoQuality.value = 'medium'
  } else {
    videoQuality.value = 'low'
  }
})
</script>

<template>
  <video
    :src="videoUrl"
    :quality="videoQuality"
  />
</template>
```

---

## 特殊交互

### 异常数据提醒

**闪烁提醒**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isBlinking = ref(true)
let blinkTimer: number

onMounted(() => {
  // 每2秒闪烁一次
  blinkTimer = setInterval(() => {
    isBlinking.value = !isBlinking.value
  }, 2000) as unknown as number
})

onUnmounted(() => {
  clearInterval(blinkTimer)
})
</script>

<template>
  <view
    class="data-card"
    :class="{ blinking: isBlinking }"
  >
    <!-- 内容 -->
  </view>
</template>

<style scoped>
.data-card {
  border: 2px solid #EF4444;
}

.data-card.blinking {
  animation: blink 0.5s ease-in-out;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
```

### 待办提醒角标

```vue
<template>
  <view class="tab-item">
    <text>消息</text>
    <view v-if="unreadCount > 0" class="badge">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </view>
  </view>
</template>

<style scoped>
.tab-item {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #EF4444;
  color: #FFFFFF;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
}
</style>
```

---

## 交互规范总结

### 操作步骤

| 功能 | 操作步骤 | 说明 |
|------|---------|------|
| 查看核心数据 | 1 步 | 打开首页即可查看 |
| 上报隐患 | 2 步 | 首页宫格 → 填写表单 |
| 处置预警 | 3 步 | 查看预警 → 分配处置 → 反馈结果 |
| 查看报表 | 2 步 | 生产运营 → 选择报表类型 |

### 触摸区域

```
最小触摸区域：44dp × 44dp
推荐触摸区域：48dp × 48dp
重要按钮：52dp × 52dp
```

### 响应时间

| 操作 | 响应时间 | 说明 |
|------|---------|------|
| 按钮点击 | < 100ms | 即时反馈 |
| 页面切换 | < 200ms | 流畅切换 |
| 数据加载 | < 1s | 显示加载动画 |
| 数据刷新 | < 3s | 更新内容 |

---

## 参考资料

- 产品设计文档：@docs/马郎综管平台产品设计文档（移动端）.docx
- UI 设计规范：@docs/frontend/UI_DESIGN_GUIDE.md
- Wot Design UI 交互文档：@.claude/skills/wot-ui/SKILL.md

---

最后更新：2026-02-27
