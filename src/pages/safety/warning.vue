<script setup lang="ts">
/**
 * 预警处置页面
 *
 * @description
 * 展示安全预警、环保预警列表,支持按级别/类型/状态筛选。
 * 预警级别颜色: 一般蓝#3B82F6 / 较重黄#F59E0B / 严重橙#F97316 / 特别严重红#EF4444
 *
 * @module pages/safety/warning
 */

import { computed, ref } from 'vue'

definePage({
  name: 'safety-warning',
  layout: 'default',
  style: {
    navigationBarTitleText: '预警处置',
    navigationBarBackgroundColor: '#1E40AF',
    navigationBarTextStyle: 'white',
  },
})

/**
 * 预警级别
 */
type AlertLevel = 'minor' | 'moderate' | 'major' | 'critical'

/**
 * 预警类型
 */
type AlertType = 'safety' | 'environmental'

/**
 * 处置状态
 */
type AlertStatus = 'pending' | 'processing' | 'completed'

/**
 * 预警信息接口
 */
interface Alert {
  id: string
  level: AlertLevel
  type: AlertType
  content: string
  time: string
  location: string
  status: AlertStatus
  assignee?: string
  deadline?: string
}

/**
 * 预警级别配置
 */
const ALERT_LEVEL_CONFIG = {
  minor: {
    label: '一般',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    textColor: '#1E40AF',
  },
  moderate: {
    label: '较重',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    textColor: '#92400E',
  },
  major: {
    label: '严重',
    color: '#F97316',
    bgColor: '#FED7AA',
    textColor: '#9A3412',
  },
  critical: {
    label: '特别严重',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    textColor: '#991B1B',
  },
} as const

/**
 * 预警类型配置
 */
const ALERT_TYPE_OPTIONS = [
  { label: '全部', value: '' },
  { label: '安全预警', value: 'safety' },
  { label: '环保预警', value: 'environmental' },
] as const

/**
 * 处置状态配置
 */
const ALERT_STATUS_OPTIONS = [
  { label: '全部', value: '' },
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
] as const

/**
 * 预警级别选项
 */
const ALERT_LEVEL_OPTIONS = [
  { label: '全部', value: '' },
  { label: '一般', value: 'minor' },
  { label: '较重', value: 'moderate' },
  { label: '严重', value: 'major' },
  { label: '特别严重', value: 'critical' },
] as const

// 筛选条件
const selectedLevel = ref<AlertLevel | ''>('')
const selectedType = ref<AlertType | ''>('')
const selectedStatus = ref<AlertStatus | ''>('')

// 模拟预警数据
const mockAlerts: Alert[] = [
  {
    id: '1',
    level: 'critical',
    type: 'safety',
    content: '瓦斯浓度严重超标,已超过报警阈值',
    time: '2026-02-27 10:30',
    location: '东区采掘面-125水平',
    status: 'pending',
    deadline: '今日12:00前',
  },
  {
    id: '2',
    level: 'major',
    type: 'environmental',
    content: 'PM2.5浓度异常升高,可能存在扬尘污染',
    time: '2026-02-27 09:15',
    location: '排土场北侧',
    status: 'processing',
    assignee: '张三',
    deadline: '今日14:00前',
  },
  {
    id: '3',
    level: 'moderate',
    type: 'safety',
    content: '边坡位移监测数据接近预警值',
    time: '2026-02-27 08:45',
    location: '西边坡监测点3#',
    status: 'pending',
    deadline: '今日16:00前',
  },
  {
    id: '4',
    level: 'minor',
    type: 'environmental',
    content: '水质监测pH值轻微偏高',
    time: '2026-02-27 07:20',
    location: '沉淀池出水口',
    status: 'completed',
    assignee: '李四',
  },
  {
    id: '5',
    level: 'major',
    type: 'safety',
    content: '运输车辆超速报警,时速65km/h',
    time: '2026-02-26 18:30',
    location: '运输主干道K2+300',
    status: 'pending',
    deadline: '2月27日12:00前',
  },
  {
    id: '6',
    level: 'critical',
    type: 'environmental',
    content: '废渣堆放高度超标,存在滑坡风险',
    time: '2026-02-26 15:10',
    location: '临时排土场东区',
    status: 'processing',
    assignee: '王五',
    deadline: '2月27日10:00前',
  },
]

const alertList = ref<Alert[]>(mockAlerts)

/**
 * 筛选后的预警列表
 */
const filteredAlerts = computed(() => {
  return alertList.value.filter((alert) => {
    if (selectedLevel.value && alert.level !== selectedLevel.value)
      return false
    if (selectedType.value && alert.type !== selectedType.value)
      return false
    if (selectedStatus.value && alert.status !== selectedStatus.value)
      return false
    return true
  })
})

/**
 * 获取预警级别配置
 */
function getLevelConfig(level: AlertLevel) {
  return ALERT_LEVEL_CONFIG[level]
}

/**
 * 获取预警类型标签
 */
function getTypeLabel(type: AlertType) {
  return type === 'safety' ? '安全预警' : '环保预警'
}

/**
 * 获取处置状态配置
 */
function getStatusConfig(status: AlertStatus) {
  const configs = {
    pending: { label: '待处理', color: '#EF4444', bgColor: '#FEE2E2' },
    processing: { label: '处理中', color: '#F59E0B', bgColor: '#FEF3C7' },
    completed: { label: '已完成', color: '#10B981', bgColor: '#D1FAE5' },
  }
  return configs[status]
}

/**
 * 处理预警卡片点击
 */
function handleAlertClick(alert: Alert) {
  uni.navigateTo({
    url: `/safety/warning/detail?id=${alert.id}`,
  })
}

/**
 * 处理级别筛选
 */
function handleLevelFilter(value: AlertLevel | '') {
  selectedLevel.value = value
}

/**
 * 处理类型筛选
 */
function handleTypeFilter(value: AlertType | '') {
  selectedType.value = value
}

/**
 * 处理状态筛选
 */
function handleStatusFilter(value: AlertStatus | '') {
  selectedStatus.value = value
}

/**
 * 处置预警（预留功能，待实现长按分配功能）
 */
function _handleAssignAlert(alert: Alert) {
  uni.showActionSheet({
    itemList: ['分配给他人', '我来处理'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 分配给他人
        uni.showToast({ title: '分配功能开发中', icon: 'none' })
      }
      else if (res.tapIndex === 1) {
        // 我来处理
        alert.status = 'processing'
        alert.assignee = '我'
        uni.showToast({ title: '已认领该预警', icon: 'success' })
      }
    },
  })
}

/**
 * 批量处理预警
 */
function handleBatchProcess() {
  uni.showToast({ title: '批量处理功能开发中', icon: 'none' })
}

/**
 * 格式化时间显示
 */
function formatTime(time: string) {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1)
    return '刚刚'
  if (hours < 24)
    return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 pb-20 dark:bg-black">
    <!-- 预警筛选栏 -->
    <view class="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
      <!-- 预警级别筛选 -->
      <scroll-view
        scroll-x
        :show-scrollbar="false"
        class="mb-3"
      >
        <view class="inline-flex whitespace-nowrap">
          <view
            v-for="option in ALERT_LEVEL_OPTIONS"
            :key="option.value"
            class="mr-2 inline-flex items-center border rounded-full px-3 py-1.5 text-[13px] transition-all active:scale-95"
            :class="
              selectedLevel === option.value
                ? 'border-blue-800 bg-blue-800 text-white'
                : 'border-gray-300 bg-white text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
            "
            @click="handleLevelFilter(option.value as AlertLevel | '')"
          >
            <text>{{ option.label }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 预警类型和处置状态筛选 -->
      <view class="flex items-center justify-between gap-2">
        <scroll-view
          scroll-x
          :show-scrollbar="false"
          class="flex-1"
        >
          <view class="inline-flex whitespace-nowrap">
            <view
              v-for="option in ALERT_TYPE_OPTIONS"
              :key="option.value"
              class="mr-2 inline-flex items-center border rounded-full px-3 py-1.5 text-[13px] transition-all active:scale-95"
              :class="
                selectedType === option.value
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-300 bg-white text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
              "
              @click="handleTypeFilter(option.value as AlertType | '')"
            >
              <text>{{ option.label }}</text>
            </view>
          </view>
        </scroll-view>

        <scroll-view
          scroll-x
          :show-scrollbar="false"
          class="flex-1"
        >
          <view class="inline-flex whitespace-nowrap">
            <view
              v-for="option in ALERT_STATUS_OPTIONS"
              :key="option.value"
              class="mr-2 inline-flex items-center border rounded-full px-3 py-1.5 text-[13px] transition-all active:scale-95"
              :class="
                selectedStatus === option.value
                  ? 'border-blue-800 bg-blue-800 text-white'
                  : 'border-gray-300 bg-white text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
              "
              @click="handleStatusFilter(option.value as AlertStatus | '')"
            >
              <text>{{ option.label }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 预警列表 -->
    <scroll-view
      scroll-y
      class="h-[calc(100vh-180px)]"
    >
      <!-- 空状态 -->
      <view
        v-if="filteredAlerts.length === 0"
        class="flex flex-col items-center py-20"
      >
        <text class="mb-2 text-[40px] text-gray-300">
          📋
        </text>
        <text class="text-sm text-gray-400">
          暂无预警数据
        </text>
      </view>

      <!-- 预警卡片列表 -->
      <view
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="group relative mx-4 mb-3 overflow-hidden border border-gray-200 rounded-lg bg-white p-4 shadow-sm transition-all active:scale-[0.98] dark:border-gray-800 dark:bg-gray-900"
        @click="handleAlertClick(alert)"
      >
        <!-- 左侧级别指示条 -->
        <view
          class="absolute left-0 top-0 h-full w-1"
          :style="{ backgroundColor: getLevelConfig(alert.level).color }"
        />

        <!-- 级别标签 -->
        <view
          class="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[12px] font-medium"
          :style="{
            backgroundColor: getLevelConfig(alert.level).bgColor,
            color: getLevelConfig(alert.level).textColor,
          }"
        >
          {{ getLevelConfig(alert.level).label }}
        </view>

        <!-- 卡片内容 -->
        <view class="pl-3">
          <!-- 预警类型 -->
          <view class="mb-2 flex items-center">
            <text
              class="mr-1 text-[12px] text-gray-400"
              :class="alert.type === 'safety' ? 'i-carbon-security' : 'i-carbon-stem-leaf-plot'"
            />
            <text class="text-[12px] text-gray-500 dark:text-gray-400">
              {{ getTypeLabel(alert.type) }}
            </text>
            <text class="mx-2 text-gray-300">
              |
            </text>
            <text class="text-[12px] text-gray-400">
              {{ formatTime(alert.time) }}
            </text>
          </view>

          <!-- 预警内容 -->
          <text class="mb-2 block text-[15px] text-gray-900 font-medium leading-relaxed dark:text-gray-100">
            {{ alert.content }}
          </text>

          <!-- 发生位置 -->
          <view class="mb-3 flex items-start">
            <text class="i-carbon-location mt-0.5 text-[14px] text-gray-400" />
            <text class="ml-1 text-[13px] text-gray-600 dark:text-gray-400">
              {{ alert.location }}
            </text>
          </view>

          <!-- 处置信息区域 -->
          <view class="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
            <view class="flex items-center">
              <!-- 处置状态 -->
              <view
                class="mr-3 rounded-full px-2 py-0.5 text-[12px]"
                :style="{
                  backgroundColor: getStatusConfig(alert.status).bgColor,
                  color: getStatusConfig(alert.status).color,
                }"
              >
                {{ getStatusConfig(alert.status).label }}
              </view>

              <!-- 处置人 -->
              <view
                v-if="alert.assignee"
                class="flex items-center"
              >
                <text class="i-carbon-user text-[14px] text-gray-400" />
                <text class="ml-1 text-[13px] text-gray-500 dark:text-gray-400">
                  {{ alert.assignee }}
                </text>
              </view>
            </view>

            <!-- 截止时间 -->
            <view
              v-if="alert.deadline"
              class="flex items-center"
            >
              <text class="i-carbon-time text-[14px] text-orange-500" />
              <text class="ml-1 text-[13px] text-orange-600 font-medium">
                {{ alert.deadline }}
              </text>
            </view>
          </view>
        </view>

        <!-- 紧急预警闪烁效果 -->
        <view
          v-if="alert.level === 'critical' && alert.status === 'pending'"
          class="pointer-events-none absolute inset-0 rounded-lg"
          style="animation: pulse 2s ease-in-out infinite;"
          :style="{ boxShadow: `0 0 0 0 rgba(239, 68, 68, 0.4)` }"
        />
      </view>

      <!-- 加载更多 -->
      <view class="py-4 text-center">
        <text class="text-sm text-gray-400">
          已显示全部预警
        </text>
      </view>
    </scroll-view>

    <!-- 底部操作按钮 -->
    <view
      v-if="filteredAlerts.some(a => a.status === 'pending')"
      class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
    >
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <text class="text-[13px] text-gray-600 dark:text-gray-400">
            待处理预警
          </text>
          <text class="ml-1 text-[15px] text-red-500 font-bold">
            {{ filteredAlerts.filter(a => a.status === 'pending').length }}
          </text>
          <text class="ml-1 text-[13px] text-gray-600 dark:text-gray-400">
            项
          </text>
        </view>
        <button
          class="rounded-full bg-blue-800 px-6 py-2 text-[14px] text-white font-medium"
          @click="handleBatchProcess"
        >
          批量处理
        </button>
      </view>
    </view>
  </view>
</template>

<style>
/* 脉冲动画 - 紧急预警闪烁 */
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
  }
}
</style>
