<script setup lang="ts">
import { ref } from 'vue'

import type { AlarmFilter, AlarmItem } from '@/types'

definePage({
  name: 'alarm',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '告警中心',
  },
})

// Tab 切换
const filterTabs: AlarmFilter[] = ['全部', '待处理', '已处理', '已忽略']
const currentFilter = ref<AlarmFilter>('全部')

function handleFilterChange(filter: AlarmFilter) {
  currentFilter.value = filter
}

// 告警列表
const alarmList = ref<AlarmItem[]>([
  {
    id: 1,
    level: 'emergency',
    levelText: '紧急',
    title: 'CO浓度超标',
    location: '1号矿井 - 东区采掘面',
    time: '14:25',
    status: 'pending',
    statusText: '待处理',
    currentValue: '0.05%',
    limitValue: '0.0024%',
  },
  {
    id: 2,
    level: 'warning',
    levelText: '警告',
    title: '温度异常升高',
    location: '2号矿井 - 通风机房',
    time: '13:50',
    status: 'processing',
    statusText: '处理中',
    currentValue: '35°C',
    limitValue: '30°C',
  },
  {
    id: 3,
    level: 'info',
    levelText: '提示',
    title: 'CH4浓度预警',
    location: '1号矿井 - 回风巷',
    time: '12:30',
    status: 'resolved',
    statusText: '已处理',
    currentValue: '0.8%',
    limitValue: '1.0%',
    handler: '张三',
    handleTime: '15分钟',
  },
  {
    id: 4,
    level: 'info',
    levelText: '提示',
    title: '设备离线',
    location: '3号矿井 - 水泵房',
    time: '10:15',
    status: 'resolved',
    statusText: '已处理',
    currentValue: '-',
    limitValue: '-',
    handler: '李四',
    handleTime: '30分钟',
  },
])

function handleAlarmDetail(alarm: AlarmItem) {
  uni.showModal({
    title: alarm.title,
    content: `位置：${alarm.location}\n时间：${alarm.time}\n当前值：${alarm.currentValue}\n限值：${alarm.limitValue}`,
    showCancel: true,
    confirmText: '处理',
    cancelText: '关闭',
  })
}

function handleAlarmAction(_alarm: AlarmItem) {
  uni.showToast({
    title: '开始处理告警',
    icon: 'success',
  })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen grid-bg dark:bg-industrial-bg">
    <!-- Tab 切换：工业风边框 -->
    <view class="sticky top-0 z-50 h-12 flex border-b border-gray-100 glass-effect dark:border-industrial-border/30">
      <view
        v-for="tab in filterTabs"
        :key="tab"
        class="relative flex flex-1 items-center justify-center transition-all duration-300"
        @click="handleFilterChange(tab)"
      >
        <text
          class="text-xs font-bold tracking-widest uppercase transition-colors"
          :class="currentFilter === tab ? 'text-industrial-blue dark:text-industrial-cyan' : 'text-gray-400 dark:text-gray-500'"
        >
          {{ tab }}
        </text>
        <view
          v-if="currentFilter === tab"
          class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-industrial-blue shadow-[0_-2px_6px_rgba(0,229,255,0.5)] dark:bg-industrial-cyan"
        />
      </view>
    </view>

    <scroll-view class="flex-1" scroll-y>
      <view class="flex flex-col gap-4 px-4 py-4 pb-10">
        <!-- 统计概览：数据化仪表盘 -->
        <view class="mb-1 flex gap-3">
          <view
            v-for="(stat, idx) in [
              { label: '告警总数', count: 42, color: 'text-gray-400' },
              { label: '紧急', count: '03', color: 'text-industrial-red' },
              { label: '警告', count: 12, color: 'text-industrial-orange' },
            ]" :key="idx" class="tech-card tech-corner flex flex-1 flex-col items-center !p-3"
          >
            <text class="tech-label opacity-40">
              {{ stat.label }}
            </text>
            <text class="mt-1 text-xl tech-num" :class="stat.color">
              {{ stat.count }}
            </text>
          </view>
        </view>

        <!-- 告警卡片：动态视觉强化 -->
        <view
          v-for="alarm in alarmList"
          :key="alarm.id"
          class="group tech-card tech-corner overflow-hidden active:scale-[0.98] !p-0"
          :class="{
            'border-l-3 border-l-industrial-red shadow-[inset_10px_0_20px_-10px_rgba(255,82,82,0.1)]': alarm.level === 'emergency',
            'border-l-3 border-l-industrial-orange': alarm.level === 'warning',
            'border-l-3 border-l-industrial-blue': alarm.level === 'info',
          }"
          @click="handleAlarmDetail(alarm)"
        >
          <!-- 扫光动画（仅紧急告警） -->
          <view v-if="alarm.level === 'emergency'" class="animate-scan pointer-events-none absolute inset-0 opacity-10 scan-line" />

          <!-- 卡片头部 -->
          <view class="flex-between border-b border-gray-100/50 bg-gray-50/30 px-4 py-2.5 dark:border-industrial-border/20 dark:bg-white/5">
            <view class="flex items-center gap-2">
              <view
                :class="{
                  'i-carbon-warning-alt text-industrial-red animate-pulse': alarm.level === 'emergency',
                  'i-carbon-warning text-industrial-orange': alarm.level === 'warning',
                  'i-carbon-information text-industrial-blue': alarm.level === 'info',
                }"
                class="text-sm"
              />
              <text
                class="text-[9px] font-900 tracking-[0.2em] uppercase" :class="{
                  'text-industrial-red': alarm.level === 'emergency',
                  'text-industrial-orange': alarm.level === 'warning',
                  'text-industrial-blue': alarm.level === 'info',
                }"
              >
                {{ alarm.levelText }} 严重程度
              </text>
            </view>
            <text class="text-[10px] tech-num opacity-40">
              {{ alarm.time }}
            </text>
          </view>

          <!-- 卡片内容 -->
          <view class="relative z-1 p-4">
            <view class="mb-3 flex items-start justify-between">
              <text class="text-base text-gray-800 font-800 leading-tight tracking-tight dark:text-gray-100">
                {{ alarm.title }}
              </text>
              <view
                class="border rounded px-1.5 py-0.5 text-[8px] font-900 tracking-tighter uppercase"
                :class="alarm.status === 'resolved'
                  ? 'bg-industrial-green/5 text-industrial-green border-industrial-green/20'
                  : 'bg-industrial-red/5 text-industrial-red border-industrial-red/20'"
              >
                {{ alarm.statusText }}
              </view>
            </view>

            <view class="mb-4 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
              <view class="i-carbon-location opacity-50" />
              <text class="truncate font-medium">
                {{ alarm.location }}
              </text>
            </view>

            <!-- 数据监测值：工业对比风格 -->
            <view
              v-if="alarm.status !== 'resolved'"
              class="flex gap-0 overflow-hidden border border-gray-100 rounded dark:border-industrial-border/20"
            >
              <view class="flex flex-1 flex-col items-center border-r border-gray-100 bg-gray-50 p-2 dark:border-industrial-border/20 dark:bg-white/5">
                <text class="scale-75 tech-label !opacity-30">
                  当前值
                </text>
                <text class="text-lg tech-num" :class="alarm.level === 'emergency' ? 'text-industrial-red' : 'text-gray-800 dark:text-gray-100'">
                  {{ alarm.currentValue }}
                </text>
              </view>
              <view class="flex flex-1 flex-col items-center bg-gray-50/50 p-2 dark:bg-white/[0.02]">
                <text class="scale-75 tech-label !opacity-30">
                  阈值
                </text>
                <text class="text-lg text-gray-400 tech-num dark:text-gray-500">
                  {{ alarm.limitValue }}
                </text>
              </view>
            </view>

            <!-- 操作按钮组 -->
            <view class="mt-5 flex gap-2.5">
              <wd-button plain type="info" size="small" custom-class="rounded-md! font-bold uppercase tracking-widest text-[10px] flex-1 border-gray-200! dark:border-industrial-border!">
                详情
              </wd-button>
              <wd-button
                v-if="alarm.status !== 'resolved'"
                size="small"
                :type="alarm.level === 'emergency' ? 'error' : (alarm.level === 'warning' ? 'warning' : 'primary')"
                custom-class="rounded-md! font-bold uppercase tracking-widest text-[10px] flex-[2] shadow-sm"
                @click.stop="handleAlarmAction(alarm)"
              >
                {{ alarm.status === 'processing' ? '继续处理' : '立即处理' }}
              </wd-button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
