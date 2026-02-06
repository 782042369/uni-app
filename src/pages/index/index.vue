<script setup lang="ts">
import { ref } from 'vue'

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
  },
})
const {
  theme,
  toggleTheme,
  currentThemeColor,
  showThemeColorSheet,
  themeColorOptions,
  openThemeColorPicker,
  closeThemeColorPicker,
  selectThemeColor,
  setFollowSystem,
} = useManualTheme()

const isDark = computed({
  get() {
    return theme.value === 'dark'
  },
  set() {
    toggleTheme()
  },
})
// 处理主题色选择
function handleThemeColorSelect(option: any) {
  selectThemeColor(option)
}

// 关键指标数据
const keyMetrics = [
  {
    label: '在线设备',
    value: '128',
    color: 'text-primary',
  },
  {
    label: '正常状态',
    value: '85',
    color: 'text-success',
  },
  {
    label: '告警数量',
    value: '12',
    color: 'text-warning',
  },
  {
    label: '故障设备',
    value: '3',
    color: 'text-danger',
  },
]

// 紧急告警
const emergencyAlarm = ref({
  location: '1号矿井 - 东区采掘面',
  message: 'CO浓度超标',
  time: '14:25',
  status: '待处理',
  level: 'emergency',
})

// 环境监测数据
const envData = [
  {
    label: '温度',
    value: '25°C',
    percentage: 50,
    color: 'text-primary',
  },
  {
    label: '湿度',
    value: '65%',
    percentage: 65,
    color: 'text-chart-blue',
  },
  {
    label: 'CH4',
    value: '0.5%',
    percentage: 20,
    color: 'text-chart-orange',
  },
  {
    label: '风速',
    value: '2.3m/s',
    percentage: 46,
    color: 'text-chart-cyan',
  },
]

function handleCardClick(type: string) {
  uni.showToast({
    title: `查看${type}详情`,
    icon: 'none',
  })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen">
    <demo-block title="基础设置" transparent>
      <wd-cell-group border custom-class="rounded-2! overflow-hidden">
        <wd-cell title="暗黑模式">
          <wd-switch v-model="isDark" size="18px" />
        </wd-cell>
        <wd-cell title="跟随系统">
          <wd-button size="small" @click="setFollowSystem">
            跟随系统
          </wd-button>
        </wd-cell>
        <wd-cell title="选择主题色" is-link @click="openThemeColorPicker">
          <view class="flex items-center justify-end gap-2">
            <view
              class="h-4 w-4 rounded-full"
              :style="{ backgroundColor: currentThemeColor.primary }"
            />
            <text>{{ currentThemeColor.name }}</text>
          </view>
        </wd-cell>
      </wd-cell-group>
    </demo-block>

    <!-- 主题色选择 ActionSheet -->
    <wd-action-sheet
      v-model="showThemeColorSheet"
      title="选择主题色"
      :close-on-click-action="true"
      @cancel="closeThemeColorPicker"
    >
      <view class="px-4 pb-4">
        <view
          v-for="option in themeColorOptions"
          :key="option.value"
          class="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0 dark:border-gray-700"
          @click="handleThemeColorSelect(option)"
        >
          <view class="flex items-center gap-3">
            <view
              class="h-6 w-6 border-2 border-gray-200 rounded-full dark:border-gray-600"
              :style="{ backgroundColor: option.primary }"
            />
            <text class="text-4 text-gray-800 dark:text-gray-200">
              {{ option.name }}
            </text>
          </view>
          <wd-icon
            v-if="currentThemeColor.value === option.value"
            name="check"
            :color="option.primary"
            size="20px"
          />
        </view>
      </view>
      <wd-gap :height="50" />
    </wd-action-sheet>
    <!-- 内容区域 -->
    <scroll-view scroll-y>
      <!-- 关键指标卡片 -->
      <view class="grid grid-cols-2 gap-3 p-4">
        <view
          v-for="metric in keyMetrics"
          :key="metric.label"
          class="rounded-xl bg-white p-4 shadow-sm transition-transform active:scale-95"
          @click="handleCardClick(metric.label)"
        >
          <view :class="`text-3xl font-bold ${metric.color}`">
            {{ metric.value }}
          </view>
          <view class="text-secondary mt-1 text-sm">
            {{ metric.label }}
          </view>
        </view>
      </view>

      <!-- 紧急告警卡片 -->
      <view
        class="from-danger-bg border-danger mx-4 mt-2 border-l-4 rounded-xl to-white bg-gradient-to-r p-4 shadow-sm transition-transform active:scale-[0.98]"
        @click="handleCardClick('紧急告警')"
      >
        <view class="flex items-start justify-between">
          <view class="flex items-center gap-2">
            <view class="text-danger i-carbon-warning-alt text-xl" />
            <text class="text-danger text-sm font-medium">
              紧急告警
            </text>
          </view>
          <text class="text-tertiary text-xs">
            {{ emergencyAlarm.time }}
          </text>
        </view>

        <view class="mt-3">
          <text class="text-primary text-base font-semibold">
            {{ emergencyAlarm.message }}
          </text>
        </view>

        <view class="text-secondary mt-2 text-sm">
          <text>📍 {{ emergencyAlarm.location }}</text>
        </view>

        <view class="mt-3 flex items-center justify-between">
          <view class="text-tertiary text-xs">
            状态：<text class="text-danger font-medium">
              {{ emergencyAlarm.status }}
            </text>
          </view>
          <view class="text-danger bg-danger-bg rounded px-2 py-1 text-xs">
            立即处理
          </view>
        </view>
      </view>

      <!-- 环境监测卡片 -->
      <view class="grid grid-cols-2 mx-4 mt-4 gap-3">
        <view
          v-for="item in envData"
          :key="item.label"
          class="h-30 flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm transition-transform active:scale-95"
          @click="handleCardClick(item.label)"
        >
          <view class="text-secondary text-sm">
            {{ item.label }}
          </view>
          <view :class="`text-xl font-bold ${item.color}`">
            {{ item.value }}
          </view>
          <view class="bg-bg-tertiary h-1.5 w-full overflow-hidden rounded-full">
            <view
              class="bg-primary h-full rounded-full transition-all duration-300"
              :style="{ width: `${item.percentage}%` }"
            />
          </view>
        </view>
      </view>

      <!-- 实时数据趋势图占位 -->
      <view class="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm transition-transform active:scale-[0.98]" @click="handleCardClick('趋势图')">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-primary text-base font-semibold">
            📊 实时数据趋势
          </text>
          <text class="text-secondary text-xs">
            最近24小时
          </text>
        </view>
        <view class="bg-bg-secondary h-40 flex flex-col items-center justify-center rounded-lg">
          <view class="text-tertiary i-carbon-chart-line-smooth text-6xl" />
          <text class="text-secondary mt-2 text-sm">
            折线图区域
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
