<script setup lang="ts">
/**
 * 环保监测页面
 *
 * 路由路径: /safety/environmental
 *
 * 页面结构:
 * - 监测类型筛选: 横向滑动，包含5类监测类型
 *   1. 水质监测 - pH值、COD、氨氮
 *   2. 土壤监测 - 重金属含量、pH值
 *   3. 固废监测 - 堆放量、堆放位置
 *   4. 大气监测 - PM2.5、PM10、二氧化硫
 *   5. 噪声监测 - 噪声值
 *
 * - 数据图表区域: 折线图/柱状图展示趋势
 * - 实时监测指标卡片: 当前数值、标准值、达标状态
 */

import { computed, ref } from 'vue'

definePage({
  name: 'safety-environmental',
  layout: 'default',
  style: {
    navigationBarTitleText: '环保监测',
  },
})

/**
 * 监测类型枚举
 */
type MonitorType = 'water' | 'soil' | 'waste' | 'air' | 'noise'

/**
 * 监测类型配置
 */
const monitorTypes = ref([
  { key: 'water', label: '水质监测', icon: 'i-carbon-rain-drop' },
  { key: 'soil', label: '土壤监测', icon: 'i-carbon-agriculture-analytics' },
  { key: 'waste', label: '固废监测', icon: 'i-carbon-trash-can' },
  { key: 'air', label: '大气监测', icon: 'i-carbon-filter' },
  { key: 'noise', label: '噪声监测', icon: 'i-carbon-volume-up' },
])

/**
 * 当前选中的监测类型
 */
const activeType = ref<MonitorType>('water')

/**
 * 监测指标数据结构
 */
interface Indicator {
  name: string
  value: number
  unit: string
  standard: number
  status: 'compliant' | 'abnormal'
}

/**
 * 模拟监测数据
 */
const mockData = ref<Record<MonitorType, {
  indicators: Indicator[]
  updateTime: string
}>>({
  water: {
    indicators: [
      { name: 'pH值', value: 7.2, unit: '', standard: 6.5, status: 'compliant' },
      { name: 'COD', value: 45, unit: 'mg/L', standard: 50, status: 'compliant' },
      { name: '氨氮', value: 8.5, unit: 'mg/L', standard: 10, status: 'compliant' },
    ],
    updateTime: '2026-02-27 14:30',
  },
  soil: {
    indicators: [
      { name: '铅', value: 25, unit: 'mg/kg', standard: 80, status: 'compliant' },
      { name: '镉', value: 0.15, unit: 'mg/kg', standard: 0.3, status: 'compliant' },
      { name: 'pH值', value: 6.8, unit: '', standard: 5.5, status: 'compliant' },
    ],
    updateTime: '2026-02-27 14:25',
  },
  waste: {
    indicators: [
      { name: '堆放量', value: 1250, unit: 'm³', standard: 2000, status: 'compliant' },
      { name: '堆放位置', value: 1, unit: '号场', standard: 1, status: 'compliant' },
    ],
    updateTime: '2026-02-27 14:20',
  },
  air: {
    indicators: [
      { name: 'PM2.5', value: 35, unit: 'μg/m³', standard: 75, status: 'compliant' },
      { name: 'PM10', value: 68, unit: 'μg/m³', standard: 150, status: 'compliant' },
      { name: '二氧化硫', value: 12, unit: 'μg/m³', standard: 50, status: 'compliant' },
    ],
    updateTime: '2026-02-27 14:30',
  },
  noise: {
    indicators: [
      { name: '昼间噪声', value: 58, unit: 'dB', standard: 60, status: 'compliant' },
      { name: '夜间噪声', value: 48, unit: 'dB', standard: 50, status: 'compliant' },
    ],
    updateTime: '2026-02-27 14:30',
  },
})

/**
 * 当前监测数据
 */
const currentData = computed(() => mockData.value[activeType.value])

/**
 * 切换监测类型
 */
function handleTypeChange(type: MonitorType) {
  activeType.value = type
}

/**
 * 获取状态颜色类
 */
function getStatusClass(status: 'compliant' | 'abnormal'): string {
  return status === 'compliant' ? 'text-emerald-500' : 'text-red-500'
}

/**
 * 获取状态背景类
 */
function getStatusBgClass(status: 'compliant' | 'abnormal'): string {
  return status === 'compliant' ? 'bg-emerald-50' : 'bg-red-50'
}

/**
 * 获取状态文本
 */
function getStatusText(status: 'compliant' | 'abnormal'): string {
  return status === 'compliant' ? '达标' : '异常'
}
</script>

<template>
  <view class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 监测类型筛选栏 -->
    <scroll-view scroll-x :show-scrollbar="false" class="bg-white px-4 py-3">
      <view class="inline-flex">
        <view
          v-for="type in monitorTypes"
          :key="type.key"
          class="mr-3 flex-shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full px-4 py-2 transition-colors"
          :class="activeType === type.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
          @click="handleTypeChange(type.key as MonitorType)"
        >
          <text class="mr-1.5 text-base" :class="[type.icon, activeType === type.key ? 'text-white' : 'text-gray-600']" />
          <text class="text-sm font-medium" :class="activeType === type.key ? 'text-white' : 'text-gray-700'">
            {{ type.label }}
          </text>
        </view>
      </view>
    </scroll-view>

    <!-- 内容区域 -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <view class="p-4">
        <!-- 数据图表区域（预留） -->
        <view class="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <view class="mb-3 flex items-center justify-between">
            <text class="text-base text-gray-900 font-bold dark:text-gray-50">
              数据趋势
            </text>
            <text class="text-xs text-gray-400">
              近7天
            </text>
          </view>
          <!-- 图表占位区域 -->
          <view class="h-96 flex-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <view class="text-center">
              <text class="i-carbon-chart-line-smooth text-48px text-gray-300" />
              <text class="mt-2 block text-sm text-gray-400">
                图表功能开发中...
              </text>
            </view>
          </view>
        </view>

        <!-- 实时监测指标卡片 -->
        <view class="mb-3 flex items-center justify-between">
          <text class="text-base text-gray-900 font-bold dark:text-gray-50">
            实时监测数据
          </text>
          <text class="text-xs text-gray-400">
            更新时间: {{ currentData.updateTime }}
          </text>
        </view>

        <!-- 指标卡片列表 -->
        <view
          v-for="(indicator, index) in currentData.indicators"
          :key="index"
          class="mb-3 rounded-lg bg-white p-4 shadow-sm transition-all duration-200 active:scale-98 dark:bg-gray-800"
        >
          <view class="flex items-center justify-between">
            <!-- 指标名称和数值 -->
            <view class="flex-1">
              <text class="mb-1 block text-sm text-gray-600 font-medium dark:text-gray-300">
                {{ indicator.name }}
              </text>
              <view class="flex items-baseline">
                <text class="text-2xl text-gray-900 font-bold dark:text-gray-50">
                  {{ indicator.value }}
                </text>
                <text class="ml-1 text-sm text-gray-400">
                  {{ indicator.unit }}
                </text>
              </view>
            </view>

            <!-- 状态标签 -->
            <view
              class="animate-fade-in rounded-full px-3 py-1"
              :class="getStatusBgClass(indicator.status)"
            >
              <text
                class="text-xs font-medium"
                :class="getStatusClass(indicator.status)"
              >
                {{ getStatusText(indicator.status) }}
              </text>
            </view>
          </view>

          <!-- 标准值参考 -->
          <view class="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700">
            <text class="text-xs text-gray-400">
              标准值: {{ indicator.standard }}{{ indicator.unit }}
            </text>
          </view>
        </view>

        <!-- 功能按钮区域 -->
        <view class="grid grid-cols-2 mt-6 gap-3">
          <view class="h-12 flex-center cursor-pointer rounded-lg bg-blue-600 active:scale-95" @click="() => {}">
            <text class="i-carbon-download mr-1 text-lg text-white" />
            <text class="text-sm text-white font-medium">
              数据导出
            </text>
          </view>
          <view class="h-12 flex-center cursor-pointer border border-blue-600 rounded-lg active:scale-95" @click="() => {}">
            <text class="i-carbon-settings mr-1 text-lg text-blue-600" />
            <text class="text-sm text-blue-600 font-medium">
              异常提醒设置
            </text>
          </view>
        </view>

        <!-- 底部提示 -->
        <view class="mt-6 text-center">
          <text class="text-xs text-gray-400">
            数据每5分钟自动刷新 · 支持离线缓存
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style>
/* 淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease;
}
</style>
