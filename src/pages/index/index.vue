<script setup lang="ts">
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

import type { EmergencyAlarm, EnvData, KeyMetric } from '@/types'

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '系统概览',
  },
})

const { show: showToast } = useGlobalToast()

// 实时时间
const now = useNow()
const currentTime = computed(() => dayjs(now.value).format('HH:mm:ss'))

const keyMetrics: KeyMetric[] = [
  { label: '在线设备', value: '128', unit: '台', color: 'text-industrial-blue', icon: 'i-carbon-machine-learning' },
  { label: '运行正常', value: '85', unit: '台', color: 'text-industrial-green', icon: 'i-carbon-checkmark-outline' },
  { label: '当前告警', value: '12', unit: '条', color: 'text-industrial-orange', icon: 'i-carbon-notification' },
  { label: '故障维修', value: '03', unit: '台', color: 'text-industrial-red', icon: 'i-carbon-error' },
]

const emergencyAlarm = ref<EmergencyAlarm>({
  location: '1号矿井 - 东区采掘面',
  message: '一氧化碳浓度超标',
  time: '14:25',
  status: '待处理',
  level: 'emergency',
})

const envData: EnvData[] = [
  { label: '温度', value: '25°C', percentage: 50, color: 'text-industrial-blue' },
  { label: '湿度', value: '65%', percentage: 65, color: 'text-industrial-cyan' },
  { label: '甲烷浓度', value: '0.5%', percentage: 20, color: 'text-industrial-orange' },
  { label: '风速', value: '2.3m/s', percentage: 46, color: 'text-industrial-green' },
]

function handleCardClick(type: string) {
  showToast({ msg: `查看${type}详情`, iconName: 'info' })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen grid-bg dark:bg-oled-black">
    <!-- 顶部状态条 -->
    <view class="sticky top-0 z-50 flex-between border-b border-gray-100 glass-effect px-5 py-3 dark:border-industrial-border/30">
      <view class="flex items-center gap-2">
        <view class="status-dot-glow bg-industrial-green" />
        <text class="tech-label text-gray-500 dark:text-industrial-cyan">
          系统运行状态：正常
        </text>
      </view>
      <view class="flex items-center gap-3">
        <text class="text-[10px] text-gray-400 font-medium tech-num tracking-wider">
          {{ currentTime }}
        </text>
        <view class="i-carbon-settings cursor-pointer text-sm text-gray-400 active:text-industrial-blue" />
      </view>
    </view>

    <scroll-view scroll-y class="pb-10">
      <!-- 紧急告警通知栏 -->
      <view v-if="emergencyAlarm" class="px-4 pt-4">
        <wd-notice-bar
          :text="`紧急告警：${emergencyAlarm.location} - ${emergencyAlarm.message}`"
          prefix="i-carbon-warning-alt"
          type="danger"
          custom-class="rd-8px! shadow-sm shadow-red-500/10"
          :scrollable="true"
        />
      </view>

      <!-- 核心指标网格 -->
      <view class="grid grid-cols-2 gap-3 p-4">
        <view
          v-for="metric in keyMetrics"
          :key="metric.label"
          class="group tech-card tech-corner cursor-pointer transition-all active:scale-98 active:bg-gray-50 dark:active:bg-white/5"
          @click="handleCardClick(metric.label)"
        >
          <view class="absolute rotate-12 text-5xl opacity-10 transition-transform -right-3 -top-3 group-hover:scale-110" :class="metric.icon" />
          <view class="relative z-1">
            <view class="flex items-baseline gap-1">
              <text class="text-3xl tech-num" :class="metric.color">
                {{ metric.value }}
              </text>
              <text class="text-[10px] font-bold opacity-40">
                {{ metric.unit }}
              </text>
            </view>
            <view class="mt-2 flex items-center gap-1.5">
              <view class="h-[1px] w-3 bg-current opacity-30" :class="metric.color" />
              <text class="tech-label !tracking-normal">
                {{ metric.label }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 环境监控 -->
      <view class="grid grid-cols-2 mx-4 mt-2 gap-3">
        <view
          v-for="item in envData"
          :key="item.label"
          class="tech-card tech-corner cursor-pointer transition-all !mb-0 active:border-industrial-blue/50 !p-3.5"
          @click="handleCardClick(item.label)"
        >
          <view class="mb-2 flex-between">
            <text class="tech-label !tracking-normal">
              {{ item.label }}
            </text>
            <view class="status-dot" :class="item.percentage > 80 ? 'bg-industrial-orange' : 'bg-industrial-cyan'" />
          </view>
          <view class="text-xl tech-num tracking-tighter" :class="item.color">
            {{ item.value }}
          </view>
          <view class="relative mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-industrial-bg">
            <view
              class="absolute inset-y-0 left-0 particle-bar bg-industrial-blue shadow-[0_0_12px_rgba(0,102,255,0.4)] transition-all duration-1000"
              :style="{ width: `${item.percentage}%` }"
            />
          </view>
        </view>
      </view>

      <!-- 趋势分析 -->
      <view class="mx-4 mt-4">
        <view
          class="tech-card tech-corner cursor-pointer transition-all active:bg-gray-50 dark:active:bg-white/5"
          @click="handleCardClick('趋势图')"
        >
          <view class="mb-4 flex-between">
            <view class="flex items-center gap-2">
              <view class="i-carbon-analytics text-lg text-industrial-cyan" />
              <text class="text-sm text-gray-800 font-bold tracking-widest dark:text-gray-200">
                实时数据趋势分析
              </text>
            </view>
            <view class="flex items-center gap-1.5">
              <view class="status-dot-glow bg-industrial-cyan" />
              <text class="text-[9px] text-gray-500 tech-num opacity-50 dark:text-gray-400">
                数据链路：已加密
              </text>
            </view>
          </view>

          <view class="relative h-44 flex-center flex-col overflow-hidden border border-gray-100 rounded bg-gray-50/50 dark:border-industrial-border/20 dark:bg-industrial-bg/40">
            <view class="absolute inset-0 grid-bg opacity-20" />
            <view class="pointer-events-none absolute inset-0 animate-scan opacity-10 scan-line" />

            <view class="i-carbon-chart-line relative z-1 text-4xl text-gray-200 dark:text-industrial-border/30" />
            <text class="relative z-1 mt-3 tech-label !tracking-normal">
              多维度环境参数波动监测
            </text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
