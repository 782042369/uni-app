<script setup lang="ts">
import { useRouter } from '@wot-ui/router'
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'

definePage({
  name: 'index',
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom', // 隐藏原生标题栏，使用自定义标题栏
  },
})

// 路由
const router = useRouter()

// 获取系统信息，计算状态栏高度和标题栏高度
const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = ref(systemInfo.statusBarHeight || 0) // 状态栏高度
const titleBarHeight = ref(44) // 标题栏高度（默认44px）
const headerHeight = computed(() => statusBarHeight.value + titleBarHeight.value) // 总高度

// 核心数据看板接口
interface ProductionData {
  coalOutput: number
  strippingVolume: number
}

interface SafetyData {
  unhandledRisks: number
  unhandledHazards: number
}

interface EquipmentData {
  onlineCount: number
  faultCount: number
}

interface EnvironmentalData {
  waterQuality: 'compliant' | 'abnormal'
  soilQuality: 'compliant' | 'abnormal'
  solidWaste: 'compliant' | 'abnormal'
  atmosphere: 'compliant' | 'abnormal'
}

interface SalesData {
  todayOutput: number
  currentStock: number
}

interface CoreDataDashboard {
  production: ProductionData
  safety: SafetyData
  equipment: EquipmentData
  environmental: EnvironmentalData
  sales: SalesData
  updateTime: string
}

// 待办事项接口
interface TodoItem {
  id: string
  type: '隐患整改' | '预警处置' | '其他'
  content: string
  deadline: string
  status: 'pending' | 'processing' | 'completed'
  link: string
}

// 常用功能接口
interface QuickAction {
  id: string
  name: string
  icon: string
  path: string
  badge?: number
}

// 响应式数据
const refreshing = ref(false)
const dashboard = ref<CoreDataDashboard>({
  production: { coalOutput: 1.2, strippingVolume: 3.5 },
  safety: { unhandledRisks: 3, unhandledHazards: 5 },
  equipment: { onlineCount: 45, faultCount: 2 },
  environmental: {
    waterQuality: 'compliant',
    soilQuality: 'compliant',
    solidWaste: 'abnormal',
    atmosphere: 'compliant',
  },
  sales: { todayOutput: 1.2, currentStock: 8.5 },
  updateTime: new Date().toISOString(),
})

const todoList = ref<TodoItem[]>([
  {
    id: '1',
    type: '隐患整改',
    content: '边坡隐患需整改',
    deadline: '今日18:00前',
    status: 'pending',
    link: '/pages/safety/hazard',
  },
  {
    id: '2',
    type: '预警处置',
    content: '瓦斯浓度异常',
    deadline: '今日16:00前',
    status: 'pending',
    link: '/pages/safety/warning',
  },
  {
    id: '3',
    type: '隐患整改',
    content: '排水系统故障',
    deadline: '明日10:00前',
    status: 'processing',
    link: '/pages/safety/hazard',
  },
])

const quickActions = ref<QuickAction[]>([
  { id: '1', name: '隐患上报', icon: 'i-carbon-warning', path: '/pages/safety/hazard?action=create' },
  { id: '2', name: '视频监控', icon: 'i-carbon-video', path: '/production/video' },
  { id: '3', name: '风险查看', icon: 'i-carbon-warning-alt', path: '/pages/safety/risk' },
  { id: '4', name: '生产报表', icon: 'i-carbon-chart-bar', path: '/production/report' },
  { id: '5', name: '应急通讯', icon: 'i-carbon-phone', path: '/pages/safety/contacts' },
  { id: '6', name: '设备状态', icon: 'i-carbon-settings', path: '/production/monitor' },
  { id: '7', name: '环保监测', icon: 'i-carbon-earth-filled', path: '/pages/safety/environmental' },
  { id: '8', name: '技术资料', icon: 'i-carbon-document', path: '/knowledge' },
  { id: '9', name: '消息通知', icon: 'i-carbon-notification', path: '/profile/messages', badge: 3 },
])

// 计算属性
const updateTimeFormatted = computed(() => {
  return `数据更新于：${dayjs().format('YYYY-MM-DD HH:mm')}`
})

// 手动刷新数据
async function handleRefresh() {
  refreshing.value = true
  try {
    // TODO: 调用实际 API
    await new Promise(resolve => setTimeout(resolve, 1000))
    dashboard.value.updateTime = new Date().toISOString()
  }
  finally {
    refreshing.value = false
  }
}

// 跳转到详情页
function navigateToDetail(path: string) {
  router.push({ path })
}

// 定时自动刷新（每5分钟）
let refreshTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  refreshTimer = setInterval(() => {
    dashboard.value.updateTime = new Date().toISOString()
  }, 5 * 60 * 1000)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
})
</script>

<template>
  <view class="index-page min-h-screen bg-bg-secondary pb-4">
    <!-- 自定义标题栏容器 -->
    <view
      class="custom-header fixed left-0 right-0 top-0 z-50 bg-bg-primary"
      :style="{ paddingTop: `${statusBarHeight}px` }"
    >
      <!-- 标题栏内容 -->
      <view class="flex-between border-b border-bg-tertiary px-4" style="height: 44px;">
        <!-- 左侧无图标 -->
        <view class="w-6" />

        <!-- 中间标题 -->
        <text class="flex-1 text-center text-h4 font-bold">
          马郎综管平台
        </text>

        <!-- 右侧刷新图标 -->
        <view
          class="btn-icon flex touch-feedback items-center justify-center"
          :class="{ 'animate-spin': refreshing }"
          @click="handleRefresh"
        >
          <text class="text-icon-md i-carbon-reset text-text-secondary" />
        </view>
      </view>
    </view>

    <!-- 占位元素，防止内容被固定标题栏遮挡 -->
    <view :style="{ height: `${headerHeight}px` }" />

    <!-- 2. 核心数据看板容器（3.1.2） -->
    <view class="mx-3 mt-3 rounded-md bg-bg-primary p-3 shadow-sm">
      <!-- 生产核心数据 -->
      <view class="grid grid-cols-2 mb-2 gap-2">
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md bg-bg-secondary p-3"
          @click="navigateToDetail('/production/monitor')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            今日采煤量
          </text>
          <text class="text-data">
            {{ dashboard.production.coalOutput }}万吨
          </text>
        </view>
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md bg-bg-secondary p-3"
          @click="navigateToDetail('/production/monitor')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            今日剥离量
          </text>
          <text class="text-data">
            {{ dashboard.production.strippingVolume }}万m³
          </text>
        </view>
      </view>

      <!-- 安全核心数据 -->
      <view class="grid grid-cols-2 mb-2 gap-2">
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center border-2 rounded-md p-3"
          :class="[
            dashboard.safety.unhandledRisks > 0 ? 'bg-warning bg-opacity-10 border-warning animate-blink' : 'bg-bg-secondary border-transparent',
          ]"
          @click="navigateToDetail('/pages/safety/risk')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            未处理风险
          </text>
          <text
            class="text-data"
            :class="dashboard.safety.unhandledRisks > 0 ? 'text-warning' : 'text-text-primary'"
          >
            {{ dashboard.safety.unhandledRisks }}项
          </text>
        </view>
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center border-2 rounded-md p-3"
          :class="[
            dashboard.safety.unhandledHazards > 0 ? 'bg-warning bg-opacity-10 border-warning animate-blink' : 'bg-bg-secondary border-transparent',
          ]"
          @click="navigateToDetail('/pages/safety/hazard')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            未处理隐患
          </text>
          <text
            class="text-data"
            :class="dashboard.safety.unhandledHazards > 0 ? 'text-warning' : 'text-text-primary'"
          >
            {{ dashboard.safety.unhandledHazards }}项
          </text>
        </view>
      </view>

      <!-- 设备核心数据 -->
      <view class="grid grid-cols-2 mb-2 gap-2">
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md bg-bg-secondary p-3"
          @click="navigateToDetail('/production/monitor')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            在线设备
          </text>
          <text class="text-data text-success">
            {{ dashboard.equipment.onlineCount }}台
          </text>
        </view>
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center border-2 rounded-md p-3"
          :class="[
            dashboard.equipment.faultCount > 0 ? 'bg-error bg-opacity-10 border-error animate-blink' : 'bg-bg-secondary border-transparent',
          ]"
          @click="navigateToDetail('/production/monitor')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            故障设备
          </text>
          <text
            class="text-data"
            :class="dashboard.equipment.faultCount > 0 ? 'text-error' : 'text-text-primary'"
          >
            {{ dashboard.equipment.faultCount }}台
          </text>
        </view>
      </view>

      <!-- 环保核心数据 -->
      <view class="grid grid-cols-4 mb-2 gap-1">
        <view
          v-for="(status, key) in dashboard.environmental"
          :key="key"
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md p-2"
          :class="status === 'compliant' ? 'bg-success bg-opacity-10' : 'bg-error bg-opacity-10 animate-blink'"
          @click="navigateToDetail('/pages/safety/environmental')"
        >
          <!-- 环保图标 -->
          <text
            class="mb-1 text-icon-lg"
            :class="[
              key === 'waterQuality' ? 'i-carbon-rain-drop'
              : key === 'soilQuality' ? 'i-carbon-earth-filled'
                : key === 'solidWaste' ? 'i-carbon-trash-can'
                  : 'i-carbon-cloud',
              status === 'compliant' ? 'text-success' : 'text-error',
            ]"
          />
          <text class="text-caption text-text-secondary">
            {{
              key === 'waterQuality' ? '水质'
              : key === 'soilQuality' ? '土壤'
                : key === 'solidWaste' ? '固废' : '大气'
            }}
          </text>
          <text
            class="mt-0.5 text-body-small font-medium"
            :class="status === 'compliant' ? 'text-success' : 'text-error'"
          >
            {{ status === 'compliant' ? '达标' : '异常' }}
          </text>
        </view>
      </view>

      <!-- 产存销核心数据 -->
      <view class="grid grid-cols-2 gap-2">
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md bg-bg-secondary p-3"
          @click="navigateToDetail('/production/sales')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            今日产量
          </text>
          <text class="text-data">
            {{ dashboard.sales.todayOutput }}万吨
          </text>
        </view>
        <view
          class="data-card flex flex-col touch-feedback items-center justify-center rounded-md bg-bg-secondary p-3"
          @click="navigateToDetail('/production/sales')"
        >
          <text class="mb-1 text-caption text-text-secondary">
            当前库存
          </text>
          <text class="text-data">
            {{ dashboard.sales.currentStock }}万吨
          </text>
        </view>
      </view>
    </view>

    <!-- 3. 待办提醒容器（3.1.3） -->
    <view class="mx-3 mt-3 rounded-md bg-bg-primary p-3 shadow-sm">
      <!-- 标题 -->
      <view class="mb-3 flex items-center">
        <text class="text-h4 text-primary font-bold">
          待办提醒
        </text>
        <text v-if="todoList.length > 3" class="ml-auto text-body-small text-text-secondary">
          共{{ todoList.length }}条
        </text>
      </view>

      <!-- 待办列表（最多显示3条） -->
      <view
        v-for="todo in todoList.slice(0, 3)"
        :key="todo.id"
        class="list-item touch-feedback"
        :class="{ 'mb-2': todoList.slice(0, 3).indexOf(todo) < todoList.slice(0, 3).length - 1 }"
        @click="navigateToDetail(todo.link)"
      >
        <!-- 左侧橙色警示点 -->
        <view class="status-dot-warning mr-3" />

        <!-- 内容 -->
        <view class="flex-1">
          <view class="mb-1 flex items-center">
            <text class="mr-2 text-body-small text-text-secondary">
              {{ todo.type }}
            </text>
            <text
              class="rounded px-1 text-caption"
              :class="[
                todo.status === 'pending' ? 'bg-warning text-bg-primary'
                : todo.status === 'processing' ? 'bg-caution text-bg-primary'
                  : 'bg-success text-bg-primary',
              ]"
            >
              {{ todo.status === 'pending' ? '待处理' : todo.status === 'processing' ? '处理中' : '已完成' }}
            </text>
          </view>
          <text class="list-item-title">
            {{ todo.content }}
          </text>
          <text class="list-item-desc">
            {{ todo.deadline }}
          </text>
        </view>

        <!-- 右箭头 -->
        <text class="i-carbon-chevron-right ml-2 text-icon-sm text-text-tertiary" />
      </view>
    </view>

    <!-- 4. 常用功能宫格（3.1.4） -->
    <view class="mx-3 mt-3 rounded-md bg-bg-primary p-3 shadow-sm">
      <view class="grid-container">
        <view
          v-for="action in quickActions"
          :key="action.id"
          class="relative grid-item touch-feedback"
          @click="navigateToDetail(action.path)"
        >
          <!-- 角标 -->
          <view
            v-if="action.badge && action.badge > 0"
            class="absolute right-2 top-2 badge-error"
          >
            {{ action.badge > 99 ? '99+' : action.badge }}
          </view>

          <!-- 图标 -->
          <text class="mb-2 text-icon-lg text-primary" :class="[action.icon]" />

          <!-- 文字 -->
          <text class="text-body text-text-primary">
            {{ action.name }}
          </text>
        </view>
      </view>
    </view>

    <!-- 5. 底部更新时间（3.1.5） -->
    <view class="mt-4 text-center">
      <text class="text-caption text-text-tertiary">
        {{ updateTimeFormatted }}
      </text>
    </view>
  </view>
</template>

<style scoped>
/* 闪烁动画 - 异常数据卡片边框闪烁（每2秒） */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-blink {
  animation: blink 2s ease-in-out infinite;
}

/* 旋转动画 - 刷新图标 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}

/* 禁用默认的高亮背景 */
.data-card,
.list-item,
.grid-item {
  -webkit-tap-highlight-color: transparent;
}
</style>
