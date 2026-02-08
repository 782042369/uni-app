<script setup lang="ts">
import { computed, ref } from 'vue'

import type { AlarmFilter, AlarmItem } from '@/types'

definePage({
  name: 'alarm',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '告警调度中心',
    disableScroll: true,
  },
})

const { success } = useGlobalToast()
const { show: showMessage } = useGlobalMessage()

const filterTabs: AlarmFilter[] = ['全部', '待处理', '已处理', '已忽略']
const currentFilter = ref<AlarmFilter>('全部')
const currentIndex = computed(() => filterTabs.indexOf(currentFilter.value))

function handleFilterChange(filter: AlarmFilter) {
  currentFilter.value = filter
}

const alarmList = ref<AlarmItem[]>([
  {
    id: 1,
    level: 'emergency',
    levelText: '特级',
    title: '一氧化碳浓度超标',
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
    levelText: '严重',
    title: '主变压器温度异常',
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
    title: '甲烷传感器通讯预警',
    location: '1号矿井 - 回风巷',
    time: '12:30',
    status: 'resolved',
    statusText: '已处理',
    currentValue: '0.8%',
    limitValue: '1.0%',
    handler: '张三',
    handleTime: '15分钟',
  },
])

function handleAlarmDetail(alarm: AlarmItem) {
  showMessage({
    title: alarm.title,
    msg: `位置：${alarm.location}\n时间：${alarm.time}\n当前值：${alarm.currentValue}\n限值：${alarm.limitValue}`,
    showCancel: true,
    confirmText: '处理',
    cancelText: '关闭',
  })
}

function handleAlarmAction(_alarm: AlarmItem) {
  success({ msg: '启动处理流程' })
}
</script>

<template>
  <view
    class="bg-bg-secondary flex flex-col overflow-hidden grid-bg dark:bg-industrial-bg"
    style="height: calc(100vh - var(--window-top, 0px) - var(--wot-tabbar-height, 50px) - env(safe-area-inset-bottom));"
  >
    <!-- Tab 切换 -->
    <view class="relative h-12 flex flex-shrink-0 border-b border-gray-100 glass-effect dark:border-industrial-border/30">
      <view
        v-for="tab in filterTabs"
        :key="tab"
        class="relative z-10 flex flex-1 cursor-pointer items-center justify-center transition-all duration-300 active:bg-gray-50/50 dark:active:bg-white/5"
        @click="handleFilterChange(tab)"
      >
        <text
          class="text-xs font-bold tracking-widest transition-colors"
          :class="currentFilter === tab ? 'text-industrial-blue dark:text-industrial-cyan' : 'text-gray-400 dark:text-gray-500'"
        >
          {{ tab }}
        </text>
      </view>
      <!-- 滑动指示器 -->
      <view
        class="absolute bottom-0 h-0.5 transition-transform duration-300 ease-out"
        :style="{
          width: `${100 / filterTabs.length}%`,
          transform: `translateX(${currentIndex * 100}%)`,
        }"
      >
        <view class="mx-auto h-full w-1/2 bg-industrial-blue shadow-[0_-2px_6px_rgba(0,102,255,0.5)] dark:bg-industrial-cyan" />
      </view>
    </view>

    <!-- 内容滚动区域 -->
    <scroll-view class="min-h-0 flex-1" scroll-y :show-scrollbar="false">
      <view class="flex flex-col gap-4 px-4 py-4 pb-10">
        <!-- 统计概览 -->
        <view class="mb-1 flex gap-3">
          <view
            v-for="(stat, idx) in [
              { label: '待办事项', count: 42, color: 'text-industrial-blue' },
              { label: '特级风险', count: '03', color: 'text-industrial-red' },
              { label: '异常提醒', count: 12, color: 'text-industrial-orange' },
            ]" :key="idx" class="tech-card tech-corner flex flex-1 flex-col items-center shadow-sm !p-3.5"
          >
            <text class="mb-1 tech-label !tracking-normal">
              {{ stat.label }}
            </text>
            <text class="text-2xl tech-num" :class="stat.color">
              {{ stat.count }}
            </text>
          </view>
        </view>

        <!-- 告警卡片 -->
        <view
          v-for="alarm in alarmList"
          :key="alarm.id"
          class="group tech-card tech-corner cursor-pointer overflow-hidden transition-all active:scale-[0.98] !p-0 active:shadow-inner"
          :class="{
            'border-l-4 border-l-industrial-red shadow-[inset_12px_0_24px_-12px_rgba(255,82,82,0.15)]': alarm.level === 'emergency',
            'border-l-4 border-l-industrial-orange': alarm.level === 'warning',
            'border-l-4 border-l-industrial-blue': alarm.level === 'info',
          }"
          @click="handleAlarmDetail(alarm)"
        >
          <!-- 扫光动画（仅紧急告警） -->
          <view v-if="alarm.level === 'emergency'" class="pointer-events-none absolute inset-0 animate-scan opacity-15 scan-line" />

          <!-- 卡片头部 -->
          <view class="flex-between border-b border-gray-100/50 bg-gray-50/50 px-4 py-3 dark:border-industrial-border/20 dark:bg-white/5">
            <view class="flex items-center gap-2.5">
              <view
                :class="{
                  'i-carbon-warning-alt text-industrial-red animate-pulse': alarm.level === 'emergency',
                  'i-carbon-warning text-industrial-orange': alarm.level === 'warning',
                  'i-carbon-information text-industrial-blue': alarm.level === 'info',
                }"
                class="text-sm"
              />
              <text
                class="text-[10px] font-bold tracking-wider" :class="{
                  'text-industrial-red': alarm.level === 'emergency',
                  'text-industrial-orange': alarm.level === 'warning',
                  'text-industrial-blue': alarm.level === 'info',
                }"
              >
                {{ alarm.levelText }}级别风险监测
              </text>
            </view>
            <view class="flex items-center gap-1.5 opacity-40">
              <view class="i-carbon-time text-[10px]" />
              <text class="text-[10px] tech-num">
                {{ alarm.time }}
              </text>
            </view>
          </view>

          <!-- 卡片内容 -->
          <view class="relative z-1 p-4">
            <view class="mb-3.5 flex items-start justify-between gap-4">
              <text class="flex-1 text-base text-gray-900 font-bold leading-snug dark:text-gray-100">
                {{ alarm.title }}
              </text>
              <view
                class="flex-shrink-0 border rounded-md px-2 py-0.5 text-[9px] font-bold tracking-wider"
                :class="alarm.status === 'resolved'
                  ? 'bg-industrial-green/5 text-industrial-green border-industrial-green/20'
                  : 'bg-industrial-red/5 text-industrial-red border-industrial-red/20'"
              >
                {{ alarm.statusText }}
              </view>
            </view>

            <view class="mb-4 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
              <view class="i-carbon-location opacity-60" />
              <text class="truncate">
                监测位置：{{ alarm.location }}
              </text>
            </view>

            <!-- 数据监测值 -->
            <view
              v-if="alarm.status !== 'resolved'"
              class="flex gap-0 overflow-hidden border border-gray-100 rounded-lg dark:border-industrial-border/20"
            >
              <view class="flex flex-1 flex-col items-center border-r border-gray-100 bg-gray-50/80 p-2.5 dark:border-industrial-border/20 dark:bg-white/5">
                <text class="mb-0.5 tech-label !tracking-normal">
                  当前监测数值
                </text>
                <text class="text-xl tech-num" :class="alarm.level === 'emergency' ? 'text-industrial-red' : 'text-gray-900 dark:text-gray-100'">
                  {{ alarm.currentValue }}
                </text>
              </view>
              <view class="flex flex-1 flex-col items-center bg-gray-50/40 p-2.5 dark:bg-white/[0.02]">
                <text class="mb-0.5 tech-label !tracking-normal">
                  安全预警阈值
                </text>
                <text class="text-xl text-gray-400 tech-num dark:text-gray-500">
                  {{ alarm.limitValue }}
                </text>
              </view>
            </view>

            <!-- 操作按钮组 -->
            <view class="mt-5 flex gap-3">
              <wd-button plain type="info" size="small" custom-class="rounded-lg! font-bold tracking-widest text-[11px] flex-1 border-gray-200! dark:border-industrial-border!">
                查阅详情
              </wd-button>
              <wd-button
                v-if="alarm.status !== 'resolved'"
                size="small"
                :type="alarm.level === 'emergency' ? 'error' : (alarm.level === 'warning' ? 'warning' : 'primary')"
                custom-class="rounded-lg! font-bold tracking-widest text-[11px] flex-[2] shadow-sm"
                @click.stop="handleAlarmAction(alarm)"
              >
                {{ alarm.status === 'processing' ? '继续执行' : '立即响应' }}
              </wd-button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
