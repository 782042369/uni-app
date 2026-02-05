# 矿山监控移动端应用 UI/UX 设计规范

> **项目名称：** 矿山安全生产监控系统移动端
> **技术栈：** Vue 3 + UnoCSS + TypeScript + uni-app
> **设计定位：** 工业专业、数据优先、高对比度、科技感
> **最后更新：** 2026-02-05

---

## 目录

- [整体设计风格](#1-整体设计风格)
- [关键页面设计](#2-关键页面设计)
- [组件设计规范](#3-组件设计规范)
- [UnoCSS 配置](#4-unocss-配置)
- [响应式布局](#5-响应式布局)
- [交互与动画](#6-交互与动画)
- [可访问性](#7-可访问性)
- [实施建议](#8-实施建议)

---

## 1. 整体设计风格

### 1.1 设计语言定位

**核心理念：**

- **工业专业感**：采用严谨的网格系统，强调数据准确性和可靠性
- **数据优先**：关键数据突出显示，次要信息弱化处理
- **高对比度**：适应户外/井下低光照环境，确保可读性
- **科技感**：适度使用渐变、阴影和微动画，体现现代化监控系统特性

### 1.2 颜色方案

#### 主色调

```css
/* 主色 - 科技蓝（专业、可靠、冷静）*/
--primary: #1890ff;
--primary-dark: #096dd9;
--primary-light: #40a9ff;
--primary-bg: #e6f7ff;

/* 辅助色 - 矿山橙（警示、重点）*/
--secondary: #fa8c16;
--secondary-dark: #d46b08;
--secondary-light: #ffd591;
```

#### 功能色

```css
/* 成功/正常 - 绿色系 */
--success: #52c41a;
--success-bg: #f6ffed;
--success-border: #b7eb8f;

/* 警告 - 橙色系 */
--warning: #faad14;
--warning-bg: #fffbe6;
--warning-border: #ffe58f;

/* 告警/危险 - 红色系 */
--danger: #f5222d;
--danger-bg: #fff1f0;
--danger-border: #ffa39e;
--danger-pulse: #ff4d4f; /* 呼吸动画用 */

/* 信息 - 蓝色系 */
--info: #1890ff;
--info-bg: #e6f7ff;
--info-border: #91d5ff;
```

#### 中性色系统

```css
/* 文本色 */
--text-primary: rgba(0, 0, 0, 0.85);     /* 主要文字 */
--text-secondary: rgba(0, 0, 0, 0.65);   /* 次要文字 */
--text-tertiary: rgba(0, 0, 0, 0.45);    /* 辅助文字 */
--text-disabled: rgba(0, 0, 0, 0.25);    /* 禁用文字 */

/* 背景色 */
--bg-primary: #ffffff;       /* 主背景 */
--bg-secondary: #fafafa;     /* 次级背景 */
--bg-tertiary: #f5f5f5;      /* 三级背景 */
--bg-hover: rgba(0, 0, 0, 0.04);  /* 悬停背景 */

/* 边框色 */
--border-light: #f0f0f0;
--border-base: #d9d9d9;
--border-dark: #bfbfbf;

/* 阴影色 */
--shadow-1: 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-2: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-3: 0 3px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
```

#### 数据可视化专用色

```css
/* 图表色板（高对比度，色盲友好）*/
--chart-blue: #3b82f6;      /* 温度 */
--chart-green: #10b981;     /* 湿度 */
--chart-orange: #f59e0b;    /* CH4 */
--chart-red: #ef4444;       /* CO */
--chart-purple: #8b5cf6;    /* CO2 */
--chart-cyan: #06b6d4;      /* 风速 */
```

### 1.3 排版系统

#### 字体家族

```css
/* 系统字体栈（保证跨平台一致性）*/
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                   'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
--font-family-code: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
```

#### 字号规范

```css
--font-size-xs: 10px;    /* 极小文字：标签、角标 */
--font-size-sm: 12px;    /* 小文字：辅助信息 */
--font-size-base: 14px;  /* 基础文字：正文 */
--font-size-lg: 16px;    /* 大文字：小标题 */
--font-size-xl: 18px;    /* 特大文字：标题 */
--font-size-2xl: 20px;   /* 超大文字：主标题 */
--font-size-3xl: 24px;   /* 巨大文字：数据展示 */
--font-size-4xl: 32px;   /* 特大数字：关键指标 */
```

#### 字重规范

```css
--font-weight-light: 300;   /* 轻体：辅助文字 */
--font-weight-normal: 400;  /* 常规：正文 */
--font-weight-medium: 500;  /* 中等：强调文字 */
--font-weight-semibold: 600; /* 半粗：小标题 */
--font-weight-bold: 700;    /* 粗体：标题 */
```

#### 行高规范

```css
--line-height-tight: 1.25;   /* 紧凑：标题 */
--line-height-base: 1.5;     /* 常规：正文 */
--line-height-loose: 1.75;   /* 宽松：长文 */
```

### 1.4 间距系统

采用 **4px 基准网格**，所有间距为 4 的倍数：

```css
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

#### 应用场景

```css
/* 卡片内边距 */
--card-padding-sm: 12px;
--card-padding-base: 16px;
--card-padding-lg: 20px;

/* 卡片间距 */
--card-gap-sm: 8px;
--card-gap-base: 12px;
--card-gap-lg: 16px;

/* 列表项内边距 */
--list-item-padding: 12px 16px;

/* 屏幕边距 */
--screen-padding-base: 16px;
--screen-padding-lg: 20px;
```

### 1.5 圆角系统

```css
--radius-xs: 2px;    /* 极小：标签、按钮 */
--radius-sm: 4px;    /* 小：输入框、小卡片 */
--radius-base: 8px;  /* 中：卡片、按钮 */
--radius-lg: 12px;   /* 大：大卡片、弹窗 */
--radius-xl: 16px;   /* 超大：特殊容器 */
--radius-full: 9999px; /* 圆形：头像、徽章 */
```

---

## 2. 关键页面设计

### 2.1 首页仪表板

#### 布局结构

```
┌─────────────────────────────────────────────┐
│ [顶部状态栏]                     🔔 3    👤 │
├─────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐ │
│  │  🏭 矿山安全生产监控系统              │ │
│  │  2024-02-05 周一 14:30               │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │ 128  │ │ 85   │ │ 12   │ │ 3    │     │
│  │在线  │ │正常  │ │告警  │ │故障  │     │
│  └──────┘ └──────┘ └──────┘ └──────┘     │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ⚠️ 紧急告警                        │   │
│  │  📍 1号矿井 - CO浓度超标           │   │
│  │  时间：14:25  状态：待处理        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────┐ ┌─────────┐                 │
│  │温度     │ │湿度     │                 │
│  │  25°C   │ │  65%    │                 │
│  │ ━━━━   │ │ ━━━━━  │                 │
│  └─────────┘ └─────────┘                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  📊 实时数据趋势                    │   │
│  │  [折线图：最近24小时温度变化]      │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  🏠  📊  📹  ⚠️  👥  📈  ⚙️              │
└─────────────────────────────────────────────┘
```

#### 设计规范

**顶部状态栏**
- 高度：44px
- 背景：透明渐变
- 内容：左侧标题，右侧告警徽章 + 用户头像
- UnoCSS：`h-11 flex items-center justify-between px-4 bg-gradient-to-b from-black/20 to-transparent`

**关键指标卡片**
- 布局：2x2 网格
- 内边距：16px
- 圆角：12px
- 数字字号：32px / 粗体
- UnoCSS：`grid grid-cols-2 gap-3`

```html
<!-- 示例代码 -->
<view class="bg-white rounded-xl p-4 shadow-sm">
  <view class="text-3xl font-bold text-primary">128</view>
  <view class="text-sm text-secondary mt-1">在线设备</view>
</view>
```

**紧急告警卡片**
- 背景：渐变色 `from-danger-bg to-white`
- 边框：左侧 4px 红色实线
- 图标：32px 告警图标
- UnoCSS：`bg-gradient-to-r from-danger-bg to-white border-l-4 border-danger`

**环境监测卡片**
- 布局：2x2 网格
- 高度：120px
- 图表：迷你仪表盘
- UnoCSS：`h-30 bg-white rounded-xl p-4 shadow-sm`

**底部导航栏**
- 高度：56px
- 图标：24px
- 文字：12px
- 激活状态：主色
- UnoCSS：`h-14 flex items-center justify-around border-t border-light`

### 2.2 实时监控页

#### 布局结构

```
┌─────────────────────────────────────────────┐
│ ← 实时监控                   🔄 刷新  ⚙️   │
├─────────────────────────────────────────────┤
│  [区域选择器] ▼ 全部矿井                    │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  1号矿井 - 东区采掘面              │   │
│  │  状态：正常 ●                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────┐ ┌─────────┐                 │
│  │ 温度    │ │ 湿度    │                 │
│  │ 25.5°C  │ │ 68%     │                 │
│  │ +0.3°C ↑│ │ +2% ↑   │                 │
│  └─────────┘ └─────────┘                 │
│                                             │
│  ┌─────────┐ ┌─────────┐                 │
│  │ CH4     │ │ CO      │                 │
│  │ 0.45%   │ │ 0.002%  │                 │
│  │ 正常 ✓  │ │ 正常 ✓  │                 │
│  └─────────┘ └─────────┘                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  📈 温度趋势图（最近24小时）       │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  📹 实时视频监控                   │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

#### 设计规范

**区域选择器**
- 高度：40px
- 圆角：8px
- UnoCSS：`h-10 border border-base rounded-lg px-3`

**数据卡片**
- 布局：2列网格
- 内边距：16px
- 圆角：12px
- 数值字号：24px / 粗体
- 趋势指示：绿色↑ 红色↓
- UnoCSS：`bg-white rounded-xl p-4 shadow-sm`

**趋势图表**
- 高度：200px
- 圆角：12px
- 图表类型：折线图 + 渐变填充
- UnoCSS：`h-50 bg-white rounded-xl p-4 shadow-sm`

**视频监控卡片**
- 高度：240px
- 圆角：12px
- 背景：黑色
- UnoCSS：`h-60 bg-black rounded-xl overflow-hidden relative`

### 2.3 告警中心页

#### 布局结构

```
┌─────────────────────────────────────────────┐
│ ← 告警中心              🔍 筛选  📅 历史   │
├─────────────────────────────────────────────┤
│  [Tab切换] 全部  待处理  已处理  已忽略   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ⚠️  紧急  CO浓度超标             │   │
│  │  📍 1号矿井 - 东区采掘面          │   │
│  │  🕒 14:25  🔴 待处理              │   │
│  │  当前值：0.05%  限值：0.0024%     │   │
│  │  [查看详情] [立即处理]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  ⚠️  警告  温度异常升高           │   │
│  │  📍 2号矿井 - 通风机房            │   │
│  │  🕒 13:50  🟡 处理中              │   │
│  │  [查看详情] [继续处理]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

#### 设计规范

**Tab切换**
- 高度：44px
- 选中状态：主色底边线 2px
- UnoCSS：`h-11 flex bg-white border-b border-base`

**告警卡片**
- 内边距：16px
- 圆角：12px
- 左侧边框：4px（紧急=红色，警告=橙色，提示=蓝色）
- UnoCSS：`bg-white rounded-xl p-4 shadow-sm border-l-4`

**告警级别色彩**
- 紧急：红色 `border-danger` + `text-danger`
- 警告：橙色 `border-warning` + `text-warning`
- 提示：蓝色 `border-info` + `text-info`

**状态徽章**
- 待处理：红色背景 + 白色文字
- 处理中：橙色背景 + 白色文字
- 已处理：绿色背景 + 白色文字
- UnoCSS：`px-2 py-1 rounded text-xs`

---

## 3. 组件设计规范

### 3.1 卡片组件

#### 基础卡片

```html
<template>
  <view class="mine-card">
    <slot />
  </view>
</template>

<style scoped>
.mine-card {
  @apply bg-white rounded-xl p-4 shadow-sm;
}
</style>
```

**UnoCSS规范：**
- 基础：`bg-white rounded-xl p-4 shadow-sm`
- 大尺寸：`p-5 shadow-md`
- 小尺寸：`p-3 shadow-sm`
- 无内边距：`p-0`

#### 数据卡片

```html
<view class="bg-white rounded-xl p-4 shadow-sm">
  <view class="text-3xl font-bold text-primary">{{ value }}</view>
  <view class="text-sm text-secondary mt-1">{{ label }}</view>
  <view class="mt-2 text-xs text-tertiary">
    <text>较昨日</text>
    <text :class="trend > 0 ? 'text-success' : 'text-danger'">
      {{ trend > 0 ? '+' : '' }}{{ trend }}%
    </text>
  </view>
</view>
```

#### 告警卡片

```html
<view
  class="bg-white rounded-xl p-4 shadow-sm border-l-4"
  :class="{
    'border-danger': level === 'emergency',
    'border-warning': level === 'warning',
    'border-info': level === 'info'
  }"
>
  <view class="flex items-start justify-between">
    <view class="flex items-center gap-2">
      <view class="i-carbon-warning-alt text-xl" :class="colorClass" />
      <text class="text-sm font-medium" :class="colorClass">{{ levelText }}</text>
    </view>
    <text class="text-xs text-tertiary">{{ time }}</text>
  </view>

  <view class="mt-3">
    <text class="text-base font-semibold text-primary">{{ title }}</text>
  </view>

  <view class="mt-2 text-sm text-secondary">
    <text>📍 {{ location }}</text>
  </view>

  <view class="mt-3 flex gap-2">
    <button class="flex-1 py-2 text-primary border border-primary rounded-lg text-sm">
      查看详情
    </button>
    <button class="flex-1 py-2 text-white rounded-lg text-sm" :class="bgClass">
      {{ actionText }}
    </button>
  </view>
</view>
```

### 3.2 按钮组件

#### 基础按钮

```html
<template>
  <view
    class="mine-btn"
    :class="[`mine-btn-${type}`, `mine-btn-${size}`]"
    @click="handleClick"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  type?: 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost'
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
})

const emit = defineEmits<{
  click: [event: Event]
}>()

function handleClick(event: Event) {
  emit('click', event)
}
</script>

<style scoped>
.mine-btn {
  @apply inline-flex items-center justify-center rounded-lg font-medium;
  @apply transition-all active:scale-95 active:opacity-80;
}

.mine-btn-primary {
  @apply bg-primary text-white;
}

.mine-btn-secondary {
  @apply bg-secondary text-white;
}

.mine-btn-danger {
  @apply bg-danger text-white;
}

.mine-btn-warning {
  @apply bg-warning text-white;
}

.mine-btn-ghost {
  @apply bg-transparent border border-base text-primary;
}

.mine-btn-small {
  @apply h-8 px-3 text-sm;
}

.mine-btn-medium {
  @apply h-10 px-4 text-base;
}

.mine-btn-large {
  @apply h-12 px-6 text-lg;
}
</style>
```

#### 图标按钮

```html
<template>
  <view class="w-10 h-10 flex items-center justify-center rounded-full
                bg-bg-tertiary text-secondary
                active:bg-bg-hover active:scale-90
                transition-all duration-200"
        @click="handleClick">
    <view :class="icon" />
  </view>
</template>
```

### 3.3 导航组件

#### 底部标签栏

```html
<template>
  <view class="h-14 flex items-center justify-around
              bg-white border-t border-light
              safe-area-bottom">
    <view
      v-for="tab in tabs"
      :key="tab.name"
      class="flex flex-col items-center justify-center
             flex-1 h-full relative
             text-tertiary transition-colors duration-200"
      :class="{ 'text-primary': current === tab.name }"
      @click="handleTabClick(tab)"
    >
      <view :class="tab.icon" />
      <text class="text-xs mt-1">{{ tab.label }}</text>

      <view v-if="tab.badge" class="absolute top-1 right-4
                             min-w-4 h-4 px-1
                             flex items-center justify-center
                             bg-danger text-white text-xs rounded-full">
        {{ tab.badge }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Tab {
  name: string
  label: string
  icon: string
  path: string
  badge?: number
}

interface Props {
  tabs: Tab[]
  current: string
}

defineProps<Props>()

const emit = defineEmits<{
  change: [tab: Tab]
}>()

function handleTabClick(tab: Tab) {
  emit('change', tab)
}
</script>
```

### 3.4 图表组件

#### 仪表盘

```html
<template>
  <view class="relative w-full h-30">
    <svg viewBox="0 0 200 120" class="w-full h-full">
      <!-- 背景弧 -->
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="#f0f0f0"
        stroke-width="16"
        stroke-linecap="round"
      />
      <!-- 进度弧 -->
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        :stroke="color"
        stroke-width="16"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
    </svg>
    <view class="absolute bottom-0 left-0 right-0
                  text-center text-2xl font-bold">
      {{ value }}{{ unit }}
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  value: number
  min: number
  max: number
  unit: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#1890ff',
})

const circumference = 251.2 // 80 * PI
const percentage = computed(() =>
  ((props.value - props.min) / (props.max - props.min)) * 100
)
const offset = computed(() =>
  circumference - (percentage.value / 100) * circumference
)
</script>
```

### 3.5 状态徽章

```html
<template>
  <view
    class="inline-flex items-center justify-center rounded-full font-medium
           px-2 py-1 text-sm"
    :class="badgeClass"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  type?: 'success' | 'warning' | 'danger' | 'info' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
})

const badgeClass = computed(() => ({
  'bg-success-bg text-success border border-success-border': props.type === 'success',
  'bg-warning-bg text-warning border border-warning-border': props.type === 'warning',
  'bg-danger-bg text-danger border border-danger-border': props.type === 'danger',
  'bg-info-bg text-info border border-info-border': props.type === 'info',
  'bg-bg-tertiary text-secondary border border-light': props.type === 'default',
}))
</script>
```

---

## 4. UnoCSS 配置

### 4.1 主题配置

更新 `uno.config.ts`：

```typescript
import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],

  // 主题色板
  theme: {
    colors: {
      // 主色
      primary: {
        DEFAULT: '#1890ff',
        dark: '#096dd9',
        light: '#40a9ff',
        bg: '#e6f7ff',
      },

      // 辅助色
      secondary: {
        DEFAULT: '#fa8c16',
        dark: '#d46b08',
        light: '#ffd591',
      },

      // 功能色
      success: {
        DEFAULT: '#52c41a',
        bg: '#f6ffed',
        border: '#b7eb8f',
      },
      warning: {
        DEFAULT: '#faad14',
        bg: '#fffbe6',
        border: '#ffe58f',
      },
      danger: {
        DEFAULT: '#f5222d',
        bg: '#fff1f0',
        border: '#ffa39e',
        pulse: '#ff4d4f',
      },
      info: {
        DEFAULT: '#1890ff',
        bg: '#e6f7ff',
        border: '#91d5ff',
      },

      // 中性色
      text: {
        primary: 'rgba(0, 0, 0, 0.85)',
        secondary: 'rgba(0, 0, 0, 0.65)',
        tertiary: 'rgba(0, 0, 0, 0.45)',
        disabled: 'rgba(0, 0, 0, 0.25)',
      },
      bg: {
        primary: '#ffffff',
        secondary: '#fafafa',
        tertiary: '#f5f5f5',
        hover: 'rgba(0, 0, 0, 0.04)',
      },
      border: {
        light: '#f0f0f0',
        base: '#d9d9d9',
        dark: '#bfbfbf',
      },

      // 图表色
      chart: {
        blue: '#3b82f6',
        green: '#10b981',
        orange: '#f59e0b',
        red: '#ef4444',
        purple: '#8b5cf6',
        cyan: '#06b6d4',
      },
    },

    // 字号
    fontSize: {
      'xs': '10px',
      'sm': '12px',
      'base': '14px',
      'lg': '16px',
      'xl': '18px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '32px',
    },

    // 间距
    spacing: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
    },

    // 圆角
    borderRadius: {
      xs: '2px',
      sm: '4px',
      base: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },

    // 阴影
    boxShadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.03)',
      DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0 3px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    },
  },

  // 快捷方式
  shortcuts: {
    // 卡片
    'card': 'bg-white rounded-xl p-4 shadow-sm',
    'card-lg': 'bg-white rounded-xl p-5 shadow-md',
    'card-sm': 'bg-white rounded-xl p-3 shadow-sm',

    // 按钮
    'btn': 'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 active:opacity-80',
    'btn-primary': 'btn bg-primary text-white',
    'btn-secondary': 'btn bg-secondary text-white',
    'btn-danger': 'btn bg-danger text-white',
    'btn-ghost': 'btn bg-transparent border border-base text-primary',
    'btn-sm': 'btn h-8 px-3 text-sm',
    'btn-md': 'btn h-10 px-4 text-base',
    'btn-lg': 'btn h-12 px-6 text-lg',

    // 文本
    'text-primary': 'text-text-primary',
    'text-secondary': 'text-text-secondary',
    'text-tertiary': 'text-text-tertiary',

    // 布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',

    // 安全区域
    'safe-area-top': 'pt-safe-top',
    'safe-area-bottom': 'pb-safe-bottom',
    'safe-area-left': 'pl-safe-left',
    'safe-area-right': 'pr-safe-right',
  },
})
```

### 4.2 自定义规则

```typescript
// 在 uno.config.ts 中添加
rules: [
  // 呼吸动画
  ['animate-pulse-slow', {
    'animation': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  }],

  // 毛玻璃效果
  ['backdrop-blur-md', {
    'backdrop-filter': 'blur(12px)',
    '-webkit-backdrop-filter': 'blur(12px)',
  }],

  // 隐藏滚动条
  ['scrollbar-hide', {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }],

  // 卡片悬浮效果
  ['card-hover', {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
  }],
],
```

### 4.3 动画配置

```typescript
// 在 uno.config.ts 中添加
animations: {
  'fade-in': 'fade-in 0.3s ease-out',
  'slide-in-right': 'slide-in-right 0.3s ease-out',
  'slide-in-left': 'slide-in-left 0.3s ease-out',
  'scale-in': 'scale-in 0.2s ease-out',
}

keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'slide-in-right': {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  'slide-in-left': {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  'scale-in': {
    '0%': { transform: 'scale(0.9)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
}
```

---

## 5. 响应式布局

### 5.1 断点系统

```typescript
// 在 uno.config.ts 中添加
theme: {
  breakpoints: {
    'xs': '320px',   // 小屏手机
    'sm': '375px',   // 标准手机
    'md': '414px',   // 大屏手机
    'lg': '768px',   // 平板
    'xl': '1024px',  // 桌面
  },
}
```

### 5.2 响应式网格

```html
<!-- 首页指标卡片 -->
<view class="grid grid-cols-2 gap-3 md:grid-cols-4">
  <!-- 自适应：小屏2列，平板4列 -->
  <view class="card">
    <view class="text-3xl font-bold text-primary">128</view>
    <view class="text-sm text-secondary">在线设备</view>
  </view>
</view>

<!-- 监控页面数据卡片 -->
<view class="grid grid-cols-2 lg:grid-cols-3 gap-3">
  <!-- 自适应：手机2列，大屏3列 -->
  <view class="card">
    <view class="text-xl font-bold">25.5°C</view>
    <view class="text-sm text-secondary">温度</view>
  </view>
</view>
```

### 5.3 安全区域适配

```html
<!-- 带安全区域的页面布局 -->
<view class="h-screen flex flex-col safe-area-top">
  <!-- 顶部导航 -->
  <view class="h-11 flex items-center px-4 safe-area-top">
    <view class="text-lg font-semibold">标题</view>
  </view>

  <!-- 内容区域 -->
  <view class="flex-1 overflow-y-auto px-4 pb-4 safe-area-bottom">
    <slot />
  </view>

  <!-- 底部导航 -->
  <view class="h-14 border-t safe-area-bottom">
    <!-- 导航内容 -->
  </view>
</view>
```

---

## 6. 交互与动画

### 7.1 点击反馈

```css
/* 所有可点击元素 */
.clickable {
  @apply transition-all duration-200 active:scale-95 active:opacity-80;
}
```

### 7.2 加载状态

```html
<!-- 骨架屏 -->
<view class="bg-white rounded-xl p-4">
  <view class="w-12 h-12 rounded-full bg-bg-tertiary animate-pulse" />
  <view class="h-4 mt-3 rounded bg-bg-tertiary animate-pulse" />
  <view class="h-4 mt-2 rounded bg-bg-tertiary animate-pulse w-2/3" />
</view>
```

### 7.3 呼吸动画（告警）

```css
@keyframes pulse-danger {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.alarm-pulse {
  animation: pulse-danger 2s ease-in-out infinite;
}
```

---

## 7. 可访问性

### 7.1 对比度要求

**WCAG 2.1 AA 级标准：**
- 普通文字：对比度 ≥ 4.5:1
- 大文字（18px+ 或 14px+ 粗体）：对比度 ≥ 3:1
- 图标和图形：对比度 ≥ 3:1

### 7.2 触摸目标尺寸

**最小尺寸：44×44px（iOS/Android标准）**

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  @apply flex items-center justify-center;
}
```

### 7.3 屏幕阅读器支持

```html
<!-- 语义化标签 -->
<view role="button" aria-label="关闭对话框">
  <view class="i-carbon-close" />
</view>

<!-- 动态内容区域 -->
<view role="status" aria-live="polite">
  {{ message }}
</view>
```

---

## 8. 实施建议

### 8.1 优先级

**P0（必须）：**
1. 核心颜色系统配置
2. 基础组件（卡片、按钮、导航）
3. 首页仪表板布局
4. 响应式网格系统
5. 安全区域适配

**P1（重要）：**
1. 图表组件（仪表盘、折线图）
2. 告警卡片组件
3. 动画配置
4. 加载/错误状态

**P2（可选）：**
1. 高级动画效果
2. 自定义图标库
3. 无障碍功能增强

### 8.2 渐进式实施

**第一阶段（1-2周）：**
1. 配置 UnoCSS 主题系统
2. 创建基础组件库
3. 实现首页仪表板

**第二阶段（2-3周）：**
1. 实现监控页面
2. 实现告警中心
3. 集成图表库

**第三阶段（1-2周）：**
1. 动画优化
2. 性能优化
3. 用户体验优化

### 8.3 开发工具推荐

**设计工具：**
- Figma（UI设计）
- Carbon Icons（图标库）

**开发工具：**
- VSCode + UnoCSS 插件
- Vue DevTools
- uni-app 官方 HBuilderX

**测试工具：**
- Chrome DevTools（响应式测试）
- Lighthouse（性能和可访问性）
- WebAIM Contrast Checker（对比度检查）

---

## 9. 参考资源

### 设计规范
- [Material Design](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Ant Design Mobile](https://mobile.ant.design/)

### 技术文档
- @PROJECT.md - 项目技术栈
- @CONTRIB.md - 开发规范
- @GETTING_STARTED.md - 快速开始

### 工具库
- [UnoCSS](https://unocss.dev/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [ECharts](https://echarts.apache.org/)

---

**最后更新：2026-02-05**
**版本：v1.0.0**
