<script setup lang="ts">
import { ref } from 'vue'

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
  },
})

// 关键指标数据
const keyMetrics = [
  {
    label: '在线设备',
    value: '128',
    color: 'text-industrial-blue',
    icon: 'i-carbon-machine-learning',
  },
  {
    label: '正常状态',
    value: '85',
    color: 'text-industrial-green',
    icon: 'i-carbon-checkmark-outline',
  },
  {
    label: '告警数量',
    value: '12',
    color: 'text-industrial-orange',
    icon: 'i-carbon-notification',
  },
  {
    label: '故障设备',
    value: '3',
    color: 'text-industrial-red',
    icon: 'i-carbon-error',
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
  <view class="bg-bg-secondary min-h-screen grid-bg dark:bg-industrial-bg">
    <!-- 顶部状态条 -->
    <view class="sticky top-0 z-50 flex-between border-b border-gray-100 glass-effect px-5 py-3 dark:border-industrial-border/30">
      <view class="flex items-center gap-2">
        <view class="status-dot-glow bg-industrial-green" />
        <text class="tech-label text-[10px] text-gray-500 dark:text-industrial-cyan">
          系统运行中
        </text>
      </view>
      <view class="flex items-center gap-3">
        <text class="text-[10px] text-gray-400 font-medium tech-num tracking-wider">
          {{ new Date().toLocaleTimeString() }}
        </text>
        <view class="i-carbon-settings text-sm text-gray-400" />
      </view>
    </view>

    <scroll-view scroll-y class="pb-10">
      <!-- 核心指标 -->
      <view class="grid grid-cols-2 gap-3 p-4">
        <view
          v-for="metric in keyMetrics"
          :key="metric.label"
          class="group tech-card tech-corner transition-transform active:scale-95"
          @click="handleCardClick(metric.label)"
        >
          <view class="absolute rotate-12 text-5xl opacity-10 transition-transform -right-3 -top-3 group-hover:scale-110" :class="metric.icon" />
          <view class="relative z-1">
            <view class="flex items-baseline gap-1">
              <text :class="`text-3xl tech-num ${metric.color}`">
                {{ metric.value }}
              </text>
              <text class="text-[10px] font-bold uppercase opacity-40">
                单位
              </text>
            </view>
            <view class="mt-2 flex items-center gap-1.5">
              <view class="h-[1px] w-3 bg-current opacity-30" :class="metric.color" />
              <text class="tech-label text-gray-400 dark:text-gray-500">
                {{ metric.label }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 紧急告警 -->
      <view
        class="tech-card mx-4 mb-4 overflow-hidden border-l-3 border-l-industrial-red from-industrial-red/5 to-transparent bg-gradient-to-r"
        @click="handleCardClick('紧急告警')"
      >
        <view class="animate-scan pointer-events-none absolute inset-0 opacity-20 scan-line" />

        <view class="relative z-1 flex-between">
          <view class="flex items-center gap-2">
            <view class="i-carbon-warning-alt animate-pulse text-lg text-industrial-red" />
            <text class="text-xs text-industrial-red font-bold tracking-tighter uppercase">
              紧急告警
            </text>
          </view>
          <view class="flex items-center gap-1 border border-industrial-red/20 rounded bg-industrial-red/10 px-1.5 py-0.5">
            <text class="text-[9px] text-industrial-red tech-num">
              一级
            </text>
          </view>
        </view>

        <view class="relative z-1 mt-3">
          <view class="text-lg text-gray-800 font-800 leading-tight tracking-tight dark:text-gray-100">
            {{ emergencyAlarm.message }}
          </view>
          <view class="mt-2 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
            <view class="i-carbon-location text-sm" />
            <text class="font-medium">
              {{ emergencyAlarm.location }}
            </text>
            <text class="ml-auto tech-num opacity-60">
              {{ emergencyAlarm.time }}
            </text>
          </view>
        </view>

        <view class="relative z-1 mt-4 flex gap-3">
          <wd-button type="error" size="small" block custom-class="rounded-md! font-bold uppercase tracking-widest text-[10px] h-8" @click.stop="handleCardClick('立即处理')">
            确认并执行处理
          </wd-button>
        </view>
      </view>

      <!-- 环境监控 -->
      <view class="grid grid-cols-2 mx-4 gap-3">
        <view
          v-for="item in envData"
          :key="item.label"
          class="tech-card tech-corner !p-3"
          @click="handleCardClick(item.label)"
        >
          <view class="mb-2 flex-between">
            <text class="tech-label">
              {{ item.label }}
            </text>
            <view class="status-dot" :class="item.percentage > 80 ? 'bg-industrial-orange' : 'bg-industrial-cyan'" />
          </view>
          <view :class="`text-xl tech-num ${item.color}`">
            {{ item.value }}
          </view>
          <view class="relative mt-3 h-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <view
              class="absolute inset-y-0 left-0 bg-industrial-blue shadow-[0_0_8px_rgba(0,102,255,0.5)] transition-all duration-1000"
              :style="{ width: `${item.percentage}%` }"
            />
          </view>
        </view>
      </view>

      <!-- 趋势分析 -->
      <view class="group tech-card tech-corner mx-4 mt-4" @click="handleCardClick('趋势图')">
        <view class="mb-4 flex-between">
          <view class="flex items-center gap-2">
            <view class="i-carbon-analytics text-lg text-industrial-cyan" />
            <text class="text-sm font-bold tracking-widest uppercase dark:text-gray-200">
              实时数据分析
            </text>
          </view>
          <view class="flex items-center gap-1.5">
            <view class="status-dot animate-pulse bg-industrial-cyan" />
            <text class="text-[9px] tech-num uppercase opacity-50">
              数据记录中...
            </text>
          </view>
        </view>

        <view class="relative h-40 flex-center flex-col overflow-hidden border border-gray-100/50 rounded bg-gray-50/50 dark:border-industrial-border/20 dark:bg-industrial-bg/40">
          <view class="absolute inset-0 grid-bg opacity-20" />
          <view class="animate-scan pointer-events-none absolute inset-0 opacity-10 scan-line" />

          <view class="i-carbon-chart-line relative z-1 text-6xl text-gray-200 dark:text-industrial-border/50" />
          <text class="relative z-1 mt-2 tech-label text-gray-400 dark:text-gray-500">
            遥测数据可视化
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
