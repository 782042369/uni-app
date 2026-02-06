<script setup lang="ts">
import { ref } from 'vue'

definePage({
  name: 'monitor',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '实时监控',
  },
})
// 区域选择
const areas = ref([
  { label: '全部矿井', value: 'all' },
  { label: '1号矿井', value: 'mine1' },
  { label: '2号矿井', value: 'mine2' },
  { label: '3号矿井', value: 'mine3' },
])

const selectedArea = ref('all')

// 监测数据
const monitorData = [
  {
    label: '温度',
    value: '25.5°C',
    trend: '+0.3°C',
    trendUp: true,
    status: 'normal',
    color: 'text-primary',
  },
  {
    label: '湿度',
    value: '68%',
    trend: '+2%',
    trendUp: true,
    status: 'normal',
    color: 'text-chart-blue',
  },
  {
    label: 'CH4',
    value: '0.45%',
    trend: '-0.05%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-orange',
  },
  {
    label: 'CO',
    value: '0.002%',
    trend: '0%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-red',
  },
  {
    label: 'CO2',
    value: '0.08%',
    trend: '-0.01%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-purple',
  },
  {
    label: '风速',
    value: '2.5m/s',
    trend: '+0.2m/s',
    trendUp: true,
    status: 'normal',
    color: 'text-chart-cyan',
  },
]

function handleAreaChange(e: any) {
  selectedArea.value = e.detail.value
  uni.showToast({
    title: `切换到${areas.value[e.detail.value].label}`,
    icon: 'none',
  })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen">
    <!-- 内容区域 -->
    <scroll-view scroll-y>
      <!-- 区域选择器 -->
      <view class="px-4 pt-4">
        <picker
          mode="selector"
          :range="areas"
          range-key="label"
          :value="0"
          @change="handleAreaChange"
        >
          <view class="border-base h-10 flex items-center justify-between border rounded-lg bg-white px-3">
            <text class="text-secondary text-sm">
              监测区域
            </text>
            <view class="flex items-center gap-1">
              <text>{{ areas.find(a => a.value === selectedArea)?.label }}</text>
              <view class="text-tertiary i-carbon-chevron-down" />
            </view>
          </view>
        </picker>
      </view>

      <!-- 矿井状态卡片 -->
      <view class="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <view class="flex items-center justify-between">
          <view>
            <text class="text-primary text-base font-semibold">
              1号矿井 - 东区采掘面
            </text>
          </view>
          <view class="flex items-center gap-1">
            <view class="bg-success h-2 w-2 rounded-full" />
            <text class="text-success text-sm">
              正常
            </text>
          </view>
        </view>
      </view>

      <!-- 监测数据卡片 -->
      <view class="grid grid-cols-2 mx-4 mt-4 gap-3">
        <view
          v-for="item in monitorData"
          :key="item.label"
          class="h-36 flex flex-col justify-between rounded-xl bg-white p-4 shadow-sm"
        >
          <view class="text-secondary text-sm">
            {{ item.label }}
          </view>
          <view :class="`text-xl font-bold ${item.color}`">
            {{ item.value }}
          </view>
          <view class="mt-1 flex items-center gap-0.5" :class="item.trendUp ? 'text-success' : 'text-danger'">
            <view :class="item.trendUp ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down'" />
            <text class="text-xs">
              {{ item.trend }}
            </text>
          </view>
          <view class="mt-2 flex items-center gap-1">
            <view class="text-success i-carbon-checkmark-filled text-sm" />
            <text class="text-secondary text-xs">
              正常
            </text>
          </view>
        </view>
      </view>

      <!-- 温度趋势图 -->
      <view class="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-primary text-base font-semibold">
            📈 温度趋势图
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

      <!-- 视频监控 -->
      <view class="mx-4 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-primary text-base font-semibold">
            📹 实时视频监控
          </text>
          <view class="flex items-center gap-1">
            <view class="bg-danger h-2 w-2 animate-pulse rounded-full" />
            <text class="text-danger text-xs">
              直播中
            </text>
          </view>
        </view>
        <view class="h-60 flex flex-col items-center justify-center rounded-lg bg-black">
          <view class="i-carbon-video text-6xl text-white" />
          <text class="mt-2 text-sm text-white">
            1号井摄像头
          </text>
        </view>
      </view>

      <!-- 设备分布图 -->
      <view class="mx-4 mb-4 mt-4 rounded-xl bg-white p-4 shadow-sm">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-primary text-base font-semibold">
            📍 设备分布图
          </text>
        </view>
        <view class="bg-bg-secondary h-75 flex flex-col items-center justify-center rounded-lg">
          <view class="text-tertiary i-carbon-map text-6xl" />
          <text class="text-secondary mt-2 text-sm">
            矿井平面图
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
