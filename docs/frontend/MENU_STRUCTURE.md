# 菜单与路由结构

> 基于「马郎综管平台产品设计文档（移动端）」的前端菜单与路由结构

## 目录

- [整体架构](#整体架构)
- [一级菜单](#一级菜单)
- [二级菜单](#二级菜单)
- [路由配置](#路由配置)
- [页面导航](#页面导航)

---

## 整体架构

### 导航模式

**底部一级菜单 + 顶部二级菜单**

```
┌─────────────────────────────┐
│         标题栏               │
├─────────────────────────────┤
│    二级菜单（横向滑动）      │  ← 仅部分页面显示
├─────────────────────────────┤
│                             │
│        页面内容              │
│                             │
├─────────────────────────────┤
│    一级菜单（底部固定）      │
└─────────────────────────────┘
```

### 菜单规则

1. **一级菜单**：固定在页面底部（5个，不可滑动，始终可见）
2. **二级菜单**：仅在"安全环保中心""生产运营"页面顶部显示（可滑动）
3. 点击一级菜单切换对应主页面
4. 点击二级菜单切换对应子页面
5. 其余页面（首页、知识库、我的）无二级菜单

---

## 一级菜单

### 菜单配置

| 序号 | 菜单名称 | 图标 | 路由路径 | 默认状态 | 说明 |
|------|---------|------|---------|---------|------|
| 1 | 首页 | 房屋形状 | `/` | 默认选中 | 进入平台直接显示首页 |
| 2 | 安全环保中心 | 盾牌+绿叶 | `/safety` | 未选中 | 包含6个二级菜单 |
| 3 | 生产运营 | 挖掘机+货车 | `/production` | 未选中 | 包含5个二级菜单 |
| 4 | 知识库 | 书本形状 | `/knowledge` | 未选中 | 无二级菜单 |
| 5 | 我的 | 人形轮廓 | `/profile` | 未选中 | 无二级菜单 |

### 选中状态

- **默认选中**：首页
- **选中样式**：主色调加粗，图标加深
- **未选中样式**：默认文字色，图标常规

---

## 二级菜单

### 安全环保中心二级菜单（6个）

| 序号 | 菜单名称 | 路由路径 | 默认显示 | 说明 |
|------|---------|---------|---------|------|
| 1 | 安全监测 | `/safety/monitor` | ✅ 默认显示 | 实时监测7类安全指标 |
| 2 | 预警处置 | `/safety/warning` | - | 预警接收、查看、处置 |
| 3 | 风险管控 | `/safety/risk` | - | 风险展示、分级、管控 |
| 4 | 应急通讯录 | `/safety/contacts` | - | 应急人员、部门联系方式 |
| 5 | 隐患排查 | `/safety/hazard` | - | 隐患上报、整改、验收 |
| 6 | 环保监测 | `/safety/environmental` | - | 水质、土壤、固废等监测 |

### 生产运营二级菜单（5个）

| 序号 | 菜单名称 | 路由路径 | 默认显示 | 说明 |
|------|---------|---------|---------|------|
| 1 | 生产监控 | `/production/monitor` | ✅ 默认显示 | 车辆、无人驾驶设备监控 |
| 2 | 综合自动化 | `/production/automation` | - | 破碎站、电力系统等监控 |
| 3 | 生产报表 | `/production/report` | - | 采剥、运输、排土等报表 |
| 4 | 生产视频 | `/production/video` | - | 实时视频、历史视频回放 |
| 5 | 产运销 | `/production/sales` | - | 产量、销售、库存数据 |

---

## 路由配置

### 路由结构

```typescript
// pages.config.ts
export default {
  pages: [
    // 首页
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: '马郎综管平台',
      },
    },

    // 安全环保中心
    {
      path: 'pages/safety/index',
      style: {
        navigationBarTitleText: '安全环保中心',
      },
    },
    {
      path: 'pages/safety/monitor',
      style: {
        navigationBarTitleText: '安全监测',
      },
    },
    {
      path: 'pages/safety/warning',
      style: {
        navigationBarTitleText: '预警处置',
      },
    },
    {
      path: 'pages/safety/risk',
      style: {
        navigationBarTitleText: '风险管控',
      },
    },
    {
      path: 'pages/safety/contacts',
      style: {
        navigationBarTitleText: '应急通讯录',
      },
    },
    {
      path: 'pages/safety/hazard',
      style: {
        navigationBarTitleText: '隐患排查',
      },
    },
    {
      path: 'pages/safety/environmental',
      style: {
        navigationBarTitleText: '环保监测',
      },
    },

    // 生产运营
    {
      path: 'pages/production/index',
      style: {
        navigationBarTitleText: '生产运营',
      },
    },
    {
      path: 'pages/production/monitor',
      style: {
        navigationBarTitleText: '生产监控',
      },
    },
    {
      path: 'pages/production/automation',
      style: {
        navigationBarTitleText: '综合自动化',
      },
    },
    {
      path: 'pages/production/report',
      style: {
        navigationBarTitleText: '生产报表',
      },
    },
    {
      path: 'pages/production/video',
      style: {
        navigationBarTitleText: '生产视频',
      },
    },
    {
      path: 'pages/production/sales',
      style: {
        navigationBarTitleText: '产运销',
      },
    },

    // 知识库
    {
      path: 'pages/knowledge/index',
      style: {
        navigationBarTitleText: '知识库',
      },
    },

    // 我的
    {
      path: 'pages/profile/index',
      style: {
        navigationBarTitleText: '我的',
      },
    },
  ],
  tabBar: {
    color: '#6B7280',
    selectedColor: '#1E40AF',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/safety/index',
        text: '安全环保',
        iconPath: 'static/tabbar/safety.png',
        selectedIconPath: 'static/tabbar/safety-active.png',
      },
      {
        pagePath: 'pages/production/index',
        text: '生产运营',
        iconPath: 'static/tabbar/production.png',
        selectedIconPath: 'static/tabbar/production-active.png',
      },
      {
        pagePath: 'pages/knowledge/index',
        text: '知识库',
        iconPath: 'static/tabbar/knowledge.png',
        selectedIconPath: 'static/tabbar/knowledge-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'static/tabbar/profile.png',
        selectedIconPath: 'static/tabbar/profile-active.png',
      },
    ],
  },
}
```

### 目录结构

```
src/pages/
├── index/                    # 首页
│   └── index.vue
│
├── safety/                   # 安全环保中心
│   ├── index.vue             # 主页面（包含二级菜单）
│   ├── monitor.vue           # 安全监测
│   ├── warning.vue           # 预警处置
│   ├── risk.vue              # 风险管控
│   ├── contacts.vue          # 应急通讯录
│   ├── hazard.vue            # 隐患排查
│   └── environmental.vue     # 环保监测
│
├── production/               # 生产运营
│   ├── index.vue             # 主页面（包含二级菜单）
│   ├── monitor.vue           # 生产监控
│   ├── automation.vue        # 综合自动化
│   ├── report.vue            # 生产报表
│   ├── video.vue             # 生产视频
│   └── sales.vue             # 产运销
│
├── knowledge/                # 知识库
│   ├── index.vue             # 主页面
│   ├── detail.vue            # 资料详情
│   └── search.vue            # 搜索页面
│
└── profile/                  # 我的
    ├── index.vue             # 主页面
    ├── messages.vue          # 消息通知
    ├── tasks.vue             # 我的待办
    ├── favorites.vue         # 我的收藏
    ├── settings.vue          # 账号设置
    ├── feedback.vue          # 意见反馈
    └── about.vue             # 关于我们
```

---

## 页面导航

### 一级菜单导航

```typescript
// 使用 useRouter 进行导航
import { useRouter } from '@wot-ui/router'

const router = useRouter()

// 切换到首页
router.push('/')

// 切换到安全环保中心
router.push('/safety')

// 切换到生产运营
router.push('/production')

// 切换到知识库
router.push('/knowledge')

// 切换到我的
router.push('/profile')
```

### 二级菜单导航

```typescript
// 安全环保中心 - 二级菜单
router.push('/pages/safety/monitor')      // 安全监测
router.push('/pages/safety/warning')      // 预警处置
router.push('/pages/safety/risk')         // 风险管控
router.push('/pages/safety/contacts')     // 应急通讯录
router.push('/pages/safety/hazard')       // 隐患排查
router.push('/pages/safety/environmental') // 环保监测

// 生产运营 - 二级菜单
router.push('/production/monitor')    // 生产监控
router.push('/production/automation') // 综合自动化
router.push('/production/report')     // 生产报表
router.push('/production/video')      // 生产视频
router.push('/production/sales')      // 产运销
```

### 详情页导航

```typescript
// 带参数导航
router.push({
  path: '/pages/safety/hazard/detail',
  query: { id: '123' }
})

// 或使用命名路由（如配置了）
router.push({
  name: 'HazardDetail',
  params: { id: '123' }
})
```

---

## 二级菜单组件

### 组件结构

```vue
<!-- src/components/SecondaryTabBar.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

interface TabItem {
  label: string
  path: string
}

const props = defineProps<{
  tabs: TabItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const router = useRouter()

function handleTabClick(tab: TabItem) {
  activeTab.value = tab.path
  router.push(tab.path)
}
</script>

<template>
  <view class="secondary-tabbar">
    <scroll-view
      scroll-x
      class="tabbar-scroll"
      :show-scrollbar="false"
    >
      <view class="tabbar-list">
        <view
          v-for="tab in tabs"
          :key="tab.path"
          class="tabbar-item"
          :class="{ active: activeTab === tab.path }"
          @click="handleTabClick(tab)"
        >
          <text class="tabbar-text">{{ tab.label }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.secondary-tabbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
}

.tabbar-scroll {
  white-space: nowrap;
}

.tabbar-list {
  display: inline-flex;
  padding: 0 16px;
}

.tabbar-item {
  position: relative;
  padding: 12px 16px;
  transition: all 0.2s;

  &.active {
    .tabbar-text {
      color: #1E40AF;
      font-weight: 700;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: #F97316;
      border-radius: 1px;
    }
  }
}

.tabbar-text {
  font-size: 14px;
  color: #6B7280;
  white-space: nowrap;
}
</style>
```

### 使用示例

```vue
<!-- pages/safety/index.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import SecondaryTabBar from '@/components/SecondaryTabBar.vue'

const tabs = [
  { label: '安全监测', path: '/pages/safety/monitor' },
  { label: '预警处置', path: '/pages/safety/warning' },
  { label: '风险管控', path: '/pages/safety/risk' },
  { label: '应急通讯录', path: '/pages/safety/contacts' },
  { label: '隐患排查', path: '/pages/safety/hazard' },
  { label: '环保监测', path: '/pages/safety/environmental' },
]

const activeTab = ref('/pages/safety/monitor')
</script>

<template>
  <view class="page">
    <SecondaryTabBar v-model="activeTab" :tabs="tabs" />
    <!-- 页面内容 -->
  </view>
</template>
```

---

## 导航守卫

### 页面权限守卫

```typescript
// router/src/guards.ts
import { useRouter } from '@wot-ui/router'

export function setupPermissionGuard() {
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    // 检查用户登录状态
    const token = uni.getStorageSync('token')

    if (!token && to.path !== '/login') {
      // 未登录，跳转到登录页
      next('/login')
    } else {
      next()
    }
  })
}
```

### 数据预加载守卫

```typescript
// router/src/guards.ts
export function setupDataGuard() {
  const router = useRouter()

  router.beforeEach(async (to, from, next) => {
    // 首页数据预加载
    if (to.path === '/') {
      // 预加载核心数据
      await preloadCoreData()
    }

    next()
  })
}
```

---

## 菜单状态管理

### Pinia Store

```typescript
// src/store/menu.ts
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    activePrimaryTab: '/',      // 一级菜单选中项
    activeSafetyTab: '/pages/safety/monitor',    // 安全环保中心二级菜单
    activeProductionTab: '/production/monitor', // 生产运营二级菜单
  }),

  actions: {
    setActivePrimaryTab(path: string) {
      this.activePrimaryTab = path
    },

    setActiveSafetyTab(path: string) {
      this.activeSafetyTab = path
    },

    setActiveProductionTab(path: string) {
      this.activeProductionTab = path
    },
  },
})
```

---

## 参考资料

- 产品设计文档：@docs/马郎综管平台产品设计文档（移动端）.docx
- Wot Router 文档：@.claude/skills/wot-router-usage/SKILL.md
- 路由配置：@pages.config.ts

---

最后更新：2026-02-27
