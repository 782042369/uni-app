# 组件设计规范

> 基于「马郎综管平台产品设计文档（移动端）」的前端组件设计规范

## 目录

- [基础组件](#基础组件)
- [业务组件](#业务组件)
- [布局组件](#布局组件)
- [反馈组件](#反馈组件)

---

## 基础组件

### 按钮 Button

**尺寸**: 标准（44dp 最小触摸区域）、小（36dp）、大（52dp）

**类型**:

| 类型 | 样式 | 用途 |
|------|------|------|
| 主按钮 | 主色调背景，白色文字 | 主要操作 |
| 次按钮 | 白色背景，主色调边框 | 次要操作 |
| 文字按钮 | 无背景，主色调文字 | 辅助操作 |
| 危险按钮 | 红色背景，白色文字 | 删除、退出等危险操作 |

**状态**: 正常、悬停、按下、禁用、加载中

```vue
<wd-button type="primary" size="large">确认</wd-button>
<wd-button type="default" size="medium">取消</wd-button>
<wd-button type="text" size="small">详情</wd-button>
<wd-button type="danger" size="large">删除</wd-button>
```

### 图标 Icon

**尺寸**: 16dp、20dp（小）、24dp（标准）、32dp（大）、48dp（超大）

**类型**: 线性图标、填充图标

```vue
<wd-icon name="home" size="24" />
<wd-icon name="warning" size="24" color="#F97316" />
```

### 输入框 Input

**类型**: 文本、数字、密码、搜索

**状态**: 正常、聚焦、禁用、错误

```vue
<wd-input v-model="value" placeholder="请输入" />
<wd-input v-model="value" type="number" placeholder="请输入数字" />
<wd-input v-model="value" type="password" placeholder="请输入密码" />
```

### 选择器 Picker

**类型**: 单列、多列、联动

```vue
<wd-picker v-model="value" :columns="options" />
```

---

## 业务组件

### 数据卡片 DataCard

**用途**: 展示核心数据（生产、安全、设备、环保、产存销）

**样式**: 浅灰色背景，边框轻微加粗

**数据结构**:

```typescript
interface DataCardProps {
  title: string           // 卡片标题
  value: string | number  // 核心数据
  unit: string           // 单位
  status?: 'normal' | 'warning' | 'error'  // 状态
  trend?: string         // 趋势说明
  clickable?: boolean    // 是否可点击
}
```

**使用示例**:

```vue
<DataCard
  title="今日采煤量"
  :value="1.2"
  unit="万吨"
  status="normal"
  trend="运输量：1.5万吨"
  :clickable="true"
  @click="handleClick"
/>
```

### 待办条目 TodoItem

**用途**: 展示待办事项

**样式**: 左侧橙色警示点，标题、内容、截止时间

**数据结构**:

```typescript
interface TodoItemProps {
  type: string          // 待办类型
  content: string       // 待办内容（不超过15字）
  deadline: string      // 截止时间
  status: 'pending' | 'processing' | 'completed'
}
```

**使用示例**:

```vue
<TodoItem
  type="隐患整改"
  content="边坡隐患需整改"
  deadline="今日18:00前"
  status="pending"
  @click="handleClick"
/>
```

### 功能宫格 GridMenu

**用途**: 常用功能快捷菜单

**样式**: 3×3 宫格，图标（24×24dp）+ 文字（不超过6字）

**数据结构**:

```typescript
interface GridMenuItem {
  id: string
  name: string          // 功能名称
  icon: string          // 图标名称
  path: string          // 跳转路径
}

interface GridMenuProps {
  items: GridMenuItem[]
  columns?: number      // 列数，默认3
}
```

**使用示例**:

```vue
<GridMenu
  :items="[
    { id: '1', name: '隐患上报', icon: 'warning', path: '/pages/safety/hazard' },
    { id: '2', name: '视频监控', icon: 'video', path: '/production/video' },
    { id: '3', name: '风险查看', icon: 'risk', path: '/pages/safety/risk' },
  ]"
  :columns="3"
/>
```

### 监测点标记 MapMarker

**用途**: 地图上的监测点标记

**样式**: 圆点，按状态区分颜色（正常-绿色、异常-红色、预警-橙色）

**数据结构**:

```typescript
interface MapMarkerProps {
  id: string
  position: { lat: number, lng: number }
  status: 'normal' | 'warning' | 'error'
  type: string          // 监测类型
  data?: Record<string, any>
}
```

### 预警卡片 AlertCard

**用途**: 展示预警信息

**样式**: 左侧颜色条（预警级别色），预警内容、时间、位置

**数据结构**:

```typescript
interface AlertCardProps {
  level: 'info' | 'minor' | 'major' | 'critical'
  content: string
  time: string
  location: string
  status: 'pending' | 'processing' | 'completed'
}
```

### 风险卡片 RiskCard

**用途**: 展示风险信息

**样式**: 风险等级色边框，风险名称、等级、责任人、措施

**数据结构**:

```typescript
interface RiskCardProps {
  name: string
  level: 'major' | 'large' | 'general' | 'low'
  manager: string
  measures: string[]
  location: string
}
```

### 联系人卡片 ContactCard

**用途**: 展示联系人信息

**样式**: 头像、姓名、部门、职务、联系方式

**数据结构**:

```typescript
interface ContactCardProps {
  name: string
  department: string
  position: string
  phone: string
  avatar?: string
}
```

### 图表组件 Chart

**类型**: 折线图、柱状图

**用途**: 展示数据趋势、对比

```vue
<Chart type="line" :data="chartData" :options="chartOptions" />
<Chart type="bar" :data="chartData" :options="chartOptions" />
```

### 视频播放器 VideoPlayer

**功能**: 全屏播放、倍速播放、暂停、抓拍、回放

```vue
<VideoPlayer
  :src="videoUrl"
  :controls="true"
  @snapshot="handleSnapshot"
/>
```

---

## 布局组件

### 页面容器 PageContainer

**用途**: 统一的页面布局容器

```vue
<PageContainer title="首页" show-refresh>
  <template #default>
    <!-- 页面内容 -->
  </template>
</PageContainer>
```

### 标题栏 PageHeader

**用途**: 页面顶部标题栏

```vue
<PageHeader
  title="安全环保中心"
  :show-back="true"
  :show-refresh="true"
  @refresh="handleRefresh"
/>
```

### 二级菜单 TabBar

**用途**: 横向滑动的二级菜单栏

```vue
<TabBar v-model="activeTab" :tabs="tabs" />
```

### 筛选栏 FilterBar

**用途**: 横向滑动的筛选选项

```vue
<FilterBar
  v-model="activeFilter"
  :options="filterOptions"
  :scrollable="true"
/>
```

### 列表容器 ListContainer

**用途**: 统一的列表布局容器

```vue
<ListContainer
  :data="listData"
  :loading="loading"
  :finished="finished"
  @load="loadMore"
>
  <template #default="{ item }">
    <!-- 列表项 -->
  </template>
</ListContainer>
```

---

## 反馈组件

### 加载中 Loading

**类型**: 全屏加载、局部加载、加载按钮

```vue
<wd-loading type="spinner" />

<!-- 全屏加载 -->
<FullPageLoading />

<!-- 按钮加载 -->
<wd-button loading>提交中</wd-button>
```

### 提示 Toast

**类型**: 成功、错误、警告、信息

```vue
<wd-toast message="操作成功" type="success" />
<wd-toast message="操作失败" type="error" />
<wd-toast message="请注意" type="warning" />
```

### 弹窗 Dialog

**类型**: 确认弹窗、警告弹窗、表单弹窗

```vue
<wd-dialog
  v-model="visible"
  title="提示"
  content="确定要删除吗？"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

### 操作菜单 ActionSheet

**用途**: 底部弹出的操作菜单

```vue
<wd-action-sheet
  v-model="visible"
  :actions="actions"
  @select="handleSelect"
/>
```

### 空状态 EmptyState

**用途**: 暂无数据时的占位显示

```vue
<EmptyState
  icon="inbox"
  title="暂无数据"
  description="点击刷新按钮重新加载"
  :show-button="true"
  button-text="刷新"
  @button-click="handleRefresh"
/>
```

### 错误状态 ErrorState

**用途**: 加载失败时的占位显示

```vue
<ErrorState
  title="加载失败"
  description="网络异常，请重试"
  :show-button="true"
  button-text="重新加载"
  @button-click="handleRetry"
/>
```

---

## 组件使用规范

### 组件命名

- PascalCase 命名（如 `DataCard`）
- 业务组件添加业务前缀（如 `SafetyDataCard`）

### 组件属性

- 必需属性必须有默认值或校验
- 可选属性提供合理默认值
- 复杂属性使用 TypeScript 类型定义

### 组件事件

- 事件名使用 kebab-case（如 `@item-click`）
- 事件参数使用对象传递

### 组件样式

- 优先使用 UnoCSS 原子类
- 复杂样式使用 scoped CSS
- 避免内联样式

---

## Wot Design Uni 组件

项目使用 Wot Design Uni 组件库，以下是常用组件映射：

| 组件名称 | Wot 组件 | 说明 |
|---------|---------|------|
| 按钮 | wd-button | 支持多种类型和尺寸 |
| 图标 | wd-icon | 内置图标库 |
| 输入框 | wd-input | 支持多种输入类型 |
| 选择器 | wd-picker | 支持多列和联动 |
| 日期选择 | wd-datetime-picker | 日期时间选择器 |
| 开关 | wd-switch | 开关选择器 |
| 复选框 | wd-checkbox | 复选框组 |
| 单选框 | wd-radio | 单选框组 |
| 上传 | wd-upload | 文件上传 |
| 标签页 | wd-tabs | 标签页切换 |
| 折叠面板 |wd-collapse | 折叠面板 |
| 列表 | wd-cell | 单元格列表 |
| 加载 | wd-loading | 加载指示器 |
| 提示 | wd-toast | 轻提示 |
| 弹窗 | wd-dialog | 对话框 |
| 操作菜单 | wd-action-sheet | 操作菜单 |
| 轮播 | wd-swiper | 轮播图 |
| 网格 | wd-grid | 宫格布局 |

详细文档请参考：@.claude/skills/wot-ui/SKILL.md

---

## 组件开发规范

### 组件模板

```vue
<!-- src/components/ComponentName.vue -->
<script setup lang="ts">
import type { PropType } from 'vue'

interface ComponentProps {
  // 组件属性定义
}

const props = withDefaults(defineProps<ComponentProps>(), {
  // 默认值
})

const emit = defineEmits<{
  // 组件事件定义
}>()

// 组件逻辑
</script>

<template>
  <view class="component-name">
    <!-- 组件模板 -->
  </view>
</template>

<style scoped lang="scss">
.component-name {
  // 组件样式
}
</style>
```

### 组件目录结构

```
src/components/
├── business/              # 业务组件
│   ├── CoreDataDashboard/
│   │   ├── index.vue
│   │   ├── types.ts
│   │   └── README.md
│   └── ...
├── layout/                # 布局组件
│   ├── PageContainer/
│   ├── PageHeader/
│   └── ...
└── common/                # 通用组件
    ├── Button/
    ├── Icon/
    └── ...
```

---

## 参考资料

- 产品设计文档：@docs/马郎综管平台产品设计文档（移动端）.docx
- UI 设计规范：@docs/frontend/UI_DESIGN_GUIDE.md
- Wot Design UI 文档：@.claude/skills/wot-ui/SKILL.md

---

最后更新：2026-02-27
