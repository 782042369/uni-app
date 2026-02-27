# 露天煤矿移动端平台 UI 设计系统

> 设计版本：v1.0.0
> 最后更新：2026-02-27
> 基于原则：最简设计、高效便捷、聚焦核心

---

## 目录

- [1. 设计总则](#1-设计总则)
- [2. UnoCSS 快捷样式类](#2-uno-css-快捷样式类)
- [3. 色彩系统](#3-色彩系统)
- [4. 字体排版](#4-字体排版)
- [5. 间距系统](#5-间距系统)
- [6. 图标系统](#6-图标系统)
- [7. 组件规范](#7-组件规范)
- [8. 交互设计](#8-交互设计)
- [9. 布局规范](#9-布局规范)
- [10. 可访问性](#10-可访问性)
- [11. 性能要求](#11-性能要求)
- [12. 最佳实践](#12-最佳实践)
- [13. 完整页面示例](#13-完整页面示例)

---

## 1. 设计总则

### 1.1 设计核心

**设计哲学：最简设计、高效便捷、聚焦核心**

针对露天煤矿移动端使用场景的特殊性：

| 场景特征 | 设计应对 |
|---------|---------|
| 🏔️ 户外作业 | 强光下清晰可见，高对比度设计 |
| 👆 单手操作 | 核心按钮大尺寸、合理间距，避免误触 |
| ⚡ 快速获取 | 关键信息一目了然，数据层级清晰 |
| 📡 复杂网络 | 离线缓存、加载状态友好提示 |
| 🛡️ 安全优先 | 警示信息醒目，操作确认机制 |

**设计原则：**

1. **简化操作路径** - 核心需求不超过 3 步操作
2. **减少冗余功能** - 每个页面聚焦单一核心任务
3. **关键数据优先** - 核心数据首屏可见，重要指标突出显示
4. **兼顾安全与实用** - 安全警示醒目，但不过度干扰正常操作

### 1.2 适配要求

#### 设备适配

| 平台 | 要求 |
|------|------|
| **Android** | 10.0 及以上 |
| **HarmonyOS** | 4.0 及以上 |

#### 屏幕适配

```
支持尺寸：3.5 - 7.0 英寸
基准尺寸：375 × 667 (iPhone SE)
最小触控：44 × 44 dp (WCAG 2.1 标准)
```

#### 操作适配

**触控目标规范：**

| 元素类型 | 最小尺寸 | 推荐尺寸 | 间距 |
|---------|---------|---------|------|
| 主要按钮 | 44×44 dp | 48×56 dp | ≥12 dp |
| 次要按钮 | 40×40 dp | 44×48 dp | ≥8 dp |
| 图标按钮 | 44×44 dp | 48×48 dp | ≥12 dp |
| 列表项 | 高度≥48 dp | 56 dp | ≥16 dp |
| 输入框 | 高度≥44 dp | 48 dp | ≥12 dp |

### 1.3 信息架构原则

```
用户任务 → 最短路径 → 完成反馈
    ↓
减少层级（≤3级）
减少选择（≤5个选项）
减少输入（智能默认）
```

---

## 2. UnoCSS 快捷样式类

UnoCSS 配置中定义了大量快捷样式类（shortcuts），可以大幅提升开发效率。

### 2.1 布局类

| 快捷类 | 等价于 | 用途 |
|-------|--------|------|
| `flex-center` | `flex items-center justify-center` | 居中布局 |
| `flex-between` | `flex items-center justify-between` | 两端对齐 |
| `flex-start` | `flex items-center justify-start` | 左对齐 |
| `flex-end` | `flex items-center justify-end` | 右对齐 |
| `flex-col-center` | `flex flex-col items-center justify-center` | 垂直居中 |
| `abs-center` | `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` | 绝对居中 |

```vue
<!-- 示例：居中内容 -->
<div class="flex-center h-screen">
  <div>内容居中</div>
</div>
```

### 2.2 卡片类

| 快捷类 | 样式 |
|-------|------|
| `card` | 标准卡片（白色背景，圆角，阴影）|
| `card-plain` | 纯净卡片（无底部间距）|
| `card-warning` | 警示卡片（橙色左边框）|
| `card-success` | 成功卡片（绿色左边框）|
| `card-error` | 错误卡片（红色左边框）|
| `card-blink` | 闪烁提醒卡片 |

### 2.3 按钮类

| 快捷类 | 样式 |
|-------|------|
| `btn` | 主按钮（深蓝背景）|
| `btn-warning` | 警告按钮（橙色背景）|
| `btn-secondary` | 次要按钮（灰色边框）|
| `btn-text` | 文字按钮（无背景）|
| `btn-icon` | 图标按钮 |

### 2.4 文字类

| 快捷类 | 字号 | 字重 | 用途 |
|-------|------|------|------|
| `text-title-large` | 20sp | Bold | 页面主标题 |
| `text-title` | 18sp | Bold | 区块标题 |
| `text-data` | 22sp | Bold | 核心数据 |
| `text-body` | 14sp | Regular | 正文 |
| `text-body-large` | 16sp | Regular | 大号正文 |
| `text-body-small` | 12sp | Regular | 小号正文 |
| `text-caption` | 10sp | Regular | 说明文字 |
| `text-warning` | 14sp | Bold | 警示文字 |

### 2.5 状态类

| 快捷类 | 用途 |
|-------|------|
| `status-dot-success` | 绿色状态点 |
| `status-dot-error` | 红色状态点 |
| `status-dot-warning` | 橙色状态点 |
| `status-dot-online` | 闪烁绿点（在线）|
| `status-dot-offline` | 灰色点（离线）|
| `badge-warning` | 橙色角标 |
| `badge-error` | 红色角标 |
| `badge-success` | 绿色角标 |

### 2.6 布局容器类

| 快捷类 | 用途 |
|-------|------|
| `grid-container` | 3列宫格容器 |
| `grid-item` | 宫格项目 |
| `list-item` | 列表项 |
| `list-item-content` | 列表项内容区 |
| `list-item-title` | 列表项标题 |
| `list-item-desc` | 列表项描述 |

### 2.7 加载与反馈类

| 快捷类 | 用途 |
|-------|------|
| `loading` | 加载动画 |
| `loading-with-text` | 带文字的加载 |
| `touch-feedback` | 触摸反馈（缩放+透明）|

---

## 3. 色彩系统

### 3.1 色彩规范

#### 主色调 - 深蓝色

```css
/* 代表安全、专业、可靠 */
--primary-600: #1E40AF;  /* 主色值 */
```

**用途：** 主要按钮、导航选中状态、重要信息强调、链接文本

#### 辅助色 - 橙色

```css
/* 代表警示、醒目、注意 */
--warning-500: #F97316;  /* 主色值 */
```

**用途：** 警告提示、注意事项、待处理状态、延迟提醒

#### 功能色

```css
--success-500: #10B981;  /* 成功色 - 绿色 */
--error-500:   #EF4444;  /* 错误色 - 红色 */
--info-500:    #06B6D4;  /* 信息色 - 蓝色 */
--caution-500: #F59E0B;  /* 警示色 - 黄色 */
```

#### 预警级别色

```
alert-1 → #3B82F6 (一般 - 蓝色)
alert-2 → #F59E0B (较重 - 黄色)
alert-3 → #F97316 (严重 - 橙色)
alert-4 → #EF4444 (特别严重 - 红色)
```

#### 风险等级色

```
risk-major   → #EF4444 (重大风险 - 红色)
risk-large   → #F97316 (较大风险 - 橙色)
risk-general → #F59E0B (一般风险 - 黄色)
risk-low     → #3B82F6 (低风险 - 蓝色)
```

#### 中性色

```css
/* 背景色 */
--bg-primary:   #FFFFFF;   /* 白色背景 */
--bg-secondary: #F3F4F6;   /* 浅灰背景 */
--bg-tertiary:  #E5E7EB;   /* 边框灰背景 */

/* 文本色 */
--text-primary:   #1F2937;  /* 主要文字 */
--text-secondary: #6B7280;  /* 次要文字 */
--text-tertiary:  #9CA3AF;  /* 辅助文字 */
--text-disabled:  #D1D5DB;  /* 禁用文字 */
```

### 3.2 UnoCSS 色彩使用

#### 语义化颜色

```vue
<!-- 主色调 -->
<button class="bg-primary text-white">主要按钮</button>
<div class="text-primary">主色文字</div>

<!-- 警示色 -->
<div class="text-warning">警告信息</div>
<div class="bg-warning">警示背景</div>

<!-- 功能色 -->
<div class="text-success">成功</div>
<div class="text-error">错误</div>
<div class="text-info">信息</div>
```

#### 预警级别色

```vue
<div class="text-alert-1">一般 - 蓝色</div>
<div class="text-alert-2">较重 - 黄色</div>
<div class="text-alert-3">严重 - 橙色</div>
<div class="text-alert-4">特别严重 - 红色</div>
```

#### 风险等级色

```vue
<div class="text-risk-major">重大风险</div>
<div class="text-risk-large">较大风险</div>
<div class="text-risk-general">一般风险</div>
<div class="text-risk-low">低风险</div>
```

#### 文本颜色

```vue
<h1 class="text-text-primary">主要文字</h1>
<p class="text-text-secondary">次要文字</p>
<span class="text-text-tertiary">辅助文字</span>
<span class="text-text-disabled">禁用文字</span>
```

#### 背景颜色

```vue
<div class="bg-bg-primary">白色背景</div>
<div class="bg-bg-secondary">浅灰背景</div>
<div class="bg-bg-tertiary">边框灰背景</div>
```

### 3.3 色彩对比度（WCAG 2.1 AA）

| 元素 | 最小对比度 | 推荐对比度 |
|------|----------|----------|
| 正常文本 | 4.5:1 | 7:1 |
| 大文本(18px+) | 3:1 | 4.5:1 |
| 图标/图形 | 3:1 | 4.5:1 |

### 3.4 户外强光模式

```css
/* 强光模式增强 */
.high-contrast-mode {
  --text-primary: #000000;
  --text-secondary: #1F2937;
  --border-color: #000000;
  --shadow-strong: 0 4px 8px rgba(0, 0, 0, 0.3);
  --touch-target: 56px;
}
```

---

## 4. 字体排版

### 4.1 字体规范

#### 字体族

```css
/* 中文为主 */
--font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI",
                    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
                    "Helvetica Neue", Helvetica, Arial, sans-serif;

/* 数字专用（等宽，确保数据对齐）*/
--font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
                     Consolas, "Courier New", monospace;
```

#### 字体尺寸规范

| 用途 | 大小 | 字重 | 行高 | UnoCSS 类 |
|------|------|------|------|-----------|
| 大标题 | 20-22 sp | Bold (700) | 1.3 | `text-title-large` |
| 中标题 | 18-20 sp | Bold (700) | 1.3 | `text-title` |
| 小标题 | 16-18 sp | Semibold (600) | 1.4 | - |
| 正文 | 14-16 sp | Regular (400) | 1.5-1.75 | `text-body` |
| 辅助文本 | 12-14 sp | Regular (400) | 1.5 | `text-body-small` |
| 核心数据 | 20-24 sp | Bold (700) | 1.2 | `text-data` |

### 4.2 UnoCSS 字体使用

#### 标题快捷类

```vue
<h1 class="text-title-large">页面主标题 (20sp Bold)</h1>
<h2 class="text-title">区块标题 (18sp Bold)</h2>
<div class="text-data">核心数据 (22sp Bold)</div>
```

#### 正文快捷类

```vue
<p class="text-body">正文内容 (14sp)</p>
<p class="text-body-large">大号正文 (16sp)</p>
<p class="text-body-small">小号正文 (12sp)</p>
<span class="text-caption">说明文字 (10sp)</span>
<p class="text-body-secondary">次要信息</p>
```

#### 警示文字

```vue
<span class="text-warning">警告信息 (14sp Bold 橙色)</span>
```

### 4.3 文本处理

```css
/* 单行截断 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行截断 */
.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 5. 间距系统

### 5.1 间距规范

| 类名 | 值 | 用途 |
|------|-----|------|
| `xs` | 4dp | 超小间距 |
| `sm` | 8dp | 小间距 |
| `md` | 16dp | 标准间距 |
| `lg` | 24dp | 大间距 |
| `xl` | 32dp | 超大间距 |
| `touch` | 44dp | 最小触控区域 |

### 5.2 UnoCSS 间距使用

#### Padding

```vue
<div class="p-xs">超小内边距 (4px)</div>
<div class="p-sm">小内边距 (8px)</div>
<div class="p-md">标准内边距 (16px)</div>
<div class="p-lg">大内边距 (24px)</div>
<div class="p-xl">超大内边距 (32px)</div>
```

#### Margin

```vue
<div class="m-xs">超小外边距 (4px)</div>
<div class="m-sm">小外边距 (8px)</div>
<div class="m-md">标准外边距 (16px)</div>
<div class="m-lg">大外边距 (24px)</div>
<div class="m-xl">超大外边距 (32px)</div>

<!-- 底部间距 -->
<div class="mb-sm">底部小间距 (8px)</div>
<div class="mb-md">底部标准间距 (16px)</div>
```

#### Gap (Flex/Grid)

```vue
<div class="flex gap-sm">小间距 (8px)</div>
<div class="flex gap-md">标准间距 (16px)</div>
<div class="grid gap-lg">大间距 (24px)</div>
```

---

## 6. 图标系统

### 6.1 图标规范

| 属性 | 规范 |
|------|------|
| 风格 | 线性图标 (Outline) |
| 尺寸 | 24×24 dp (标准) |
| 描边 | 2 px |
| 圆角 | 2-3 px |
| 色彩 | 继承文本色或指定品牌色 |

### 6.2 Carbon Icons

#### 标准图标

```vue
<!-- 标准尺寸 24×24 -->
<i class="i-carbon-home" />        <!-- 首页 -->
<i class="i-carbon-settings" />    <!-- 设置 -->
<i class="i-carbon-user" />        <!-- 用户 -->
<i class="i-carbon-warning" />     <!-- 警告 -->
<i class="i-carbon-checkmark" />   <!-- 成功 -->
<i class="i-carbon-error" />       <!-- 错误 -->
<i class="i-carbon-notification" /><!-- 通知 -->
```

#### 自定义尺寸

```vue
<i class="i-carbon-add w-icon-sm h-icon-sm" />  <!-- 20×20 -->
<i class="i-carbon-add w-icon-md h-icon-md" />  <!-- 24×24 -->
<i class="i-carbon-add w-icon-lg h-icon-lg" />  <!-- 32×32 -->
<i class="i-carbon-add w-icon-xl h-icon-xl" />  <!-- 48×48 -->
```

#### 带颜色

```vue
<i class="i-carbon-warning text-warning" />
<i class="i-carbon-checkmark text-success" />
<i class="i-carbon-close text-error" />
<i class="i-carbon-info text-info" />
```

#### 图标与文字组合

```vue
<div class="flex items-center gap-sm">
  <i class="i-carbon-warning w-icon-md h-icon-md text-warning" />
  <span class="text-warning">警告信息</span>
</div>
```

### 6.3 图标使用原则

**✅ 应该做：**
- 使用 SVG 矢量图标
- 保持统一的视觉重量
- 确保图标尺寸 ≥ 24×24 dp
- 为图标提供 aria-label

**❌ 不应该做：**
- 使用 Emoji 作为 UI 图标
- 混用不同风格的图标
- 使用复杂图案图标
- 图标过小难以识别

---

## 7. 组件规范

### 7.1 卡片组件

```vue
<!-- 标准卡片 -->
<div class="card">
  <h3 class="text-title mb-sm">卡片标题</h3>
  <p class="text-body">卡片内容</p>
</div>

<!-- 警示卡片 -->
<div class="card-warning">
  <h3 class="text-warning mb-sm">⚠️ 警告</h3>
  <p class="text-body">设备温度过高</p>
</div>

<!-- 成功卡片 -->
<div class="card-success">
  <p class="text-success">操作成功</p>
</div>

<!-- 错误卡片 -->
<div class="card-error">
  <p class="text-error">操作失败</p>
</div>

<!-- 闪烁卡片（异常提醒）-->
<div class="card-blink">
  <p class="text-warning">异常状态</p>
</div>
```

### 7.2 按钮组件

```vue
<!-- 主按钮 -->
<button class="btn">确认提交</button>
<button class="btn touch-feedback">带反馈</button>

<!-- 警示按钮 -->
<button class="btn-warning">删除</button>

<!-- 次要按钮 -->
<button class="btn-secondary">取消</button>

<!-- 文字按钮 -->
<button class="btn-text">查看详情</button>

<!-- 图标按钮 -->
<button class="btn-icon">
  <i class="i-carbon-add w-icon-md h-icon-md" />
</button>
```

#### 按钮尺寸

| 尺寸 | 高度 | 字体 | 图标 | 触控区 |
|------|------|------|------|--------|
| large | 48 px | 16 sp | 20 px | ≥48×48 |
| normal | 40 px | 14 sp | 18 px | ≥44×44 |
| small | 32 px | 12 sp | 16 px | ≥40×40 |

### 7.3 状态指示器

```vue
<!-- 状态点 -->
<div class="flex items-center gap-sm">
  <div class="status-dot-success"></div>
  <span>在线</span>
</div>

<div class="flex items-center gap-sm">
  <div class="status-dot-offline"></div>
  <span>离线</span>
</div>

<!-- 闪烁状态点 -->
<div class="flex items-center gap-sm">
  <div class="status-dot-online"></div>
  <span>运行中</span>
</div>

<!-- 状态角标 -->
<span class="badge-warning">警告</span>
<span class="badge-error">错误</span>
<span class="badge-success">正常</span>
```

### 7.4 宫格布局

```vue
<!-- 3列宫格 -->
<div class="grid-container">
  <div class="grid-item">
    <i class="i-carbon-chart-bar w-icon-lg h-icon-lg mb-sm" />
    <span class="text-body">生产数据</span>
  </div>
  <div class="grid-item">
    <i class="i-carbon-video w-icon-lg h-icon-lg mb-sm" />
    <span class="text-body">视频监控</span>
  </div>
  <div class="grid-item">
    <i class="i-carbon-notification w-icon-lg h-icon-lg mb-sm" />
    <span class="text-body">预警信息</span>
  </div>
</div>
```

### 7.5 列表布局

```vue
<!-- 标准列表项 -->
<div class="list-item">
  <div class="list-item-content">
    <div class="list-item-title">设备名称</div>
    <div class="list-item-desc">挖掘机 #001</div>
  </div>
  <i class="i-carbon-chevron-right w-icon-md h-icon-md text-text-tertiary" />
</div>
```

### 7.6 加载状态

```vue
<!-- 加载图标 -->
<div class="loading"></div>

<!-- 带文字的加载 -->
<div class="flex-center">
  <div class="loading"></div>
  <span class="loading-with-text">加载中...</span>
</div>

<!-- 骨架屏 -->
<div class="card">
  <div class="h-4 bg-bg-tertiary rounded animate-pulse mb-sm"></div>
  <div class="h-4 bg-bg-tertiary rounded animate-pulse w-2/3"></div>
</div>
```

---

## 8. 交互设计

### 8.1 页面切换

**无多余动画原则：**

```css
/* 页面切换过渡 */
.page-transition {
  transition: transform 0.2s ease-out;
}
```

**支持的过渡：**
- 滑动切换（左右滑动）
- 淡入淡出（模态弹窗）
- 无动画（快速响应）

### 8.2 加载状态

**加载文案：**
- ✅ "加载中..."
- ✅ "正在获取数据..."
- ❌ "请稍候正在连接服务器获取您的数据..."（过长）

### 8.3 错误提示

| 场景 | 提示文案 |
|------|---------|
| 网络异常 | "网络异常，请重试" |
| 数据加载失败 | "数据加载失败" |
| 请求超时 | "请求超时，请检查网络" |
| 服务器错误 | "服务器暂时不可用" |

### 8.4 操作反馈

**触觉反馈：**

```typescript
// 轻微振动（轻提示）
uni.vibrateShort({ type: 'light' })

// 中等振动（确认操作）
uni.vibrateShort({ type: 'medium' })

// 成功反馈
uni.showToast({ title: '操作成功', icon: 'success' })
```

**视觉反馈时间：**

| 交互类型 | 持续时间 |
|---------|---------|
| 按钮点击 | 150-200 ms |
| 页面切换 | 200-300 ms |
| 弹窗显示 | 250 ms |

### 8.5 手势交互

| 手势 | 功能 | 场景 |
|------|------|------|
| 点击 | 主要操作 | 按钮触发 |
| 长按 | 上下文菜单 | 列表项操作 |
| 滑动 | 页面切换 | 标签页切换 |
| 下拉 | 刷新数据 | 列表页 |
| 上滑 | 加载更多 | 列表分页 |

---

## 9. 布局规范

### 9.1 网格系统

**基础栅格：**

```
┌────────────────────────────────────┐
│  4px  │  8px  │  12px  │  16px     │  间距系统
├────────────────────────────────────┤
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
│  │ 4  │  │ 8  │  │ 12 │  │ 16 │   │  间距值
│  └────┘  └────┘  └────┘  └────┘   │
└────────────────────────────────────┘
```

### 9.2 页面布局结构

```
┌────────────────────┐
│  导航栏 (44-56dp)   │  固定顶部
├────────────────────┤
│                    │
│   内容滚动区域      │  自适应高度
│                    │
├────────────────────┤
│  底部操作 (48-56dp) │  固定底部
└────────────────────┘
```

### 9.3 安全区域适配

```css
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 9.4 响应式断点

```css
/* 移动端优先 */
@media (min-width: 375px)  { /* 小屏手机 */ }
@media (min-width: 768px)  { /* 平板 */ }
@media (min-width: 1024px) { /* 桌面 */ }
```

---

## 10. 可访问性

### 10.1 触控目标

**最小尺寸要求（WCAG 2.1）：**
```
所有可交互元素触控区域 ≥ 44 × 44 dp
```

### 10.2 颜色对比

- ✅ 正常文本：≥ 4.5:1
- ✅ 大文本(18px+)：≥ 3:1
- ✅ 图标/图形：≥ 3:1

### 10.3 语义化 HTML

```vue
<!-- ✅ 正确 -->
<button @click="handleClick">提交</button>
<nav aria-label="主导航">...</nav>

<!-- ❌ 错误 -->
<div @click="handleClick">提交</div>
```

### 10.4 ARIA 标签

```vue
<!-- 图标按钮 -->
<button aria-label="关闭对话框">
  <i-carbon-close />
</button>

<!-- 状态指示 -->
<div role="status" aria-live="polite">
  数据已更新
</div>
```

---

## 11. 性能要求

### 11.1 图片优化

```vue
<!-- 使用 WebP 格式 -->
<img src="image.webp" alt="描述" />

<!-- 响应式图片 -->
<img src="image-small.jpg" srcset="image-small.jpg 1x, image-large.jpg 2x" alt="描述" />
```

### 11.2 减少动画

```css
/* 尊重用户偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 11.3 离线支持

**弱网/离线策略：**
1. 关键数据本地缓存
2. 离线时显示缓存数据
3. 后台静默同步
4. 网络恢复时提示更新

```typescript
// 离线检测
window.addEventListener('offline', () => {
  uni.showToast({ title: '网络已断开', icon: 'none' })
})

window.addEventListener('online', () => {
  uni.showToast({ title: '网络已恢复', icon: 'success' })
  syncData()
})
```

---

## 12. 最佳实践

### 12.1 使用快捷类而非组合类

```vue
<!-- ✅ 推荐：使用快捷类 -->
<div class="card">...</div>
<button class="btn">提交</button>

<!-- ❌ 避免：冗长的组合类 -->
<div class="bg-bg-primary rounded-md p-md shadow-sm mb-sm">...</div>
<button class="inline-flex items-center justify-center px-md py-sm rounded-md font-medium text-body bg-primary text-bg-primary transition-all min-h-11">提交</button>
```

### 12.2 语义化颜色优于硬编码

```vue
<!-- ✅ 推荐：语义化颜色 -->
<div class="text-warning">警告</div>
<div class="bg-bg-secondary">背景</div>

<!-- ❌ 避免：硬编码颜色值 -->
<div class="text-[#F97316]">警告</div>
<div class="bg-[#F3F4F6]">背景</div>
```

### 12.3 使用设计系统间距

```vue
<!-- ✅ 推荐：设计系统间距 -->
<div class="p-md gap-sm mb-lg">

<!-- ❌ 避免：任意数值 -->
<div class="p-[15px] gap-[7px] mb-[25px]">
```

### 12.4 触控区域规范

```vue
<!-- ✅ 推荐：确保最小触控区域 -->
<button class="min-h-11 min-w-11">...</button>
<div class="touch-feedback p-md">...</div>

<!-- ❌ 避免：过小的触控区域 -->
<button class="h-4 w-4">...</button>
```

---

## 13. 完整页面示例

```vue
<template>
  <div class="min-h-screen bg-bg-secondary">
    <!-- 顶部导航 -->
    <header class="flex-between items-center p-md bg-bg-primary shadow-sm">
      <h1 class="text-title-large">生产监控</h1>
      <button class="btn-icon">
        <i class="i-carbon-notification w-icon-md h-icon-md" />
      </button>
    </header>

    <!-- 核心数据卡片 -->
    <div class="p-md">
      <div class="card">
        <div class="flex-between items-center mb-sm">
          <span class="text-text-secondary">今日产量</span>
          <div class="status-dot-success"></div>
        </div>
        <div class="text-data mb-xs">12,345</div>
        <div class="text-caption text-text-secondary">吨</div>
      </div>
    </div>

    <!-- 功能宫格 -->
    <div class="grid-container">
      <div class="grid-item touch-feedback">
        <i class="i-carbon-chart-bar w-icon-lg h-icon-lg text-primary mb-sm" />
        <span class="text-body">生产数据</span>
      </div>
      <div class="grid-item touch-feedback">
        <i class="i-carbon-video w-icon-lg h-icon-lg text-primary mb-sm" />
        <span class="text-body">视频监控</span>
      </div>
      <div class="grid-item touch-feedback">
        <i class="i-carbon-notification w-icon-lg h-icon-lg text-warning mb-sm" />
        <span class="text-body">预警信息</span>
      </div>
    </div>

    <!-- 列表 -->
    <div class="p-md">
      <h2 class="text-title mb-md">设备列表</h2>
      <div class="card-plain">
        <div class="list-item" v-for="i in 3" :key="i">
          <div class="list-item-content">
            <div class="list-item-title">挖掘机 #00{{ i }}</div>
            <div class="list-item-desc">运行中 · 油耗正常</div>
          </div>
          <i class="i-carbon-chevron-right w-icon-md h-icon-md text-text-tertiary" />
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## 附录 A：快速参考

### 设计规范速查表

| 类别 | 关键规范 |
|------|---------|
| **主色调** | #1E40AF (深蓝) |
| **辅助色** | #F97316 (橙色) |
| **背景色** | #F3F4F6 (浅灰) |
| **文本色** | #1F2937 (深灰) |
| **标题字号** | 18-20 sp Bold |
| **正文字号** | 14-16 sp Regular |
| **图标尺寸** | 24×24 dp |
| **触控最小** | 44×44 dp |
| **间距标准** | 4/8/12/16 px |
| **圆角标准** | 6/8 px |

### UnoCSS 快捷类速查表

| 分类 | 快捷类 |
|------|-------|
| **布局** | `flex-center`, `flex-between`, `flex-col-center`, `abs-center` |
| **卡片** | `card`, `card-warning`, `card-success`, `card-error`, `card-blink` |
| **按钮** | `btn`, `btn-warning`, `btn-secondary`, `btn-text`, `btn-icon` |
| **文字** | `text-title`, `text-title-large`, `text-data`, `text-body`, `text-warning` |
| **状态** | `status-dot-*`, `badge-*`, `loading` |
| **布局** | `grid-container`, `grid-item`, `list-item` |
| **交互** | `touch-feedback` |

---

## 附录 B：实施检查清单

### 设计交付前

- [ ] 所有触控目标 ≥ 44×44 dp
- [ ] 文本对比度 ≥ 4.5:1
- [ ] 主要功能 ≤ 3 步操作
- [ ] 核心数据首屏可见
- [ ] 强光模式可用性测试

### 开发实现前

- [ ] 设计稿标注完整
- [ ] 交互原型确认
- [ ] 组件库选型确认
- [ ] 无障碍需求明确

### 上线前

- [ ] 多设备兼容性测试
- [ ] 户外强光场景测试
- [ ] 弱网环境测试
- [ ] 无障碍测试
- [ ] 性能测试

---

## 附录 C：相关文档

- [菜单与路由结构](./MENU_STRUCTURE.md)
- [页面设计规范](./PAGES_SPEC.md)
- [组件设计规范](./COMPONENTS_SPEC.md)
- [数据模型定义](./DATA_MODELS.md)
- [交互设计规范](./INTERACTION_PATTERNS.md)

---

## 附录 D：设计资源

- **组件库**: Wot Design Uni
- **图标库**: Carbon Icons
- **设计工具**: Figma / Sketch
- **原型工具**: Axure / Figma
- **UnoCSS 配置**: `uno.config.ts`

---

**文档维护：** 设计团队
**版本历史：** v1.0.0 - 2026-02-27 初始版本
