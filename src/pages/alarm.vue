<script setup lang="ts">
import type { AlarmFilter, AlarmItem } from '@/types'

import { ref } from 'vue'

import { usePageConfig } from '@/composables/usePageConfig'

usePageConfig({
  title: '告警中心',
  showTabBar: true,
  showBack: false,
  backToHome: false,
  leftIcon: '',
  rightIcon: 'notification',
  backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
  textColor: '#ffffff',
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
  <view class="bg-bg-secondary min-h-screen">
    <!-- Tab 切换 -->
    <view class="h-11 flex border-b border-light bg-white">
      <view
        v-for="tab in filterTabs"
        :key="tab"
        class="text-secondary relative flex flex-1 items-center justify-center text-sm transition-colors duration-200"
        :class="{ 'text-primary font-medium': currentFilter === tab }"
        @click="handleFilterChange(tab)"
      >
        {{ tab }}
        <view
          v-if="currentFilter === tab"
          class="bg-primary absolute bottom-0 left-0 right-0 h-0.5"
        />
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="flex-1 overflow-y-auto" scroll-y>
      <view class="flex flex-col gap-3 px-4 py-4">
        <!-- 告警卡片 -->
        <view
          v-for="alarm in alarmList"
          :key="alarm.id"
          class="border-l-4 rounded-xl bg-white p-4 shadow-sm transition-transform active:scale-[0.98]"
          :class="{
            'border-danger': alarm.level === 'emergency',
            'border-warning': alarm.level === 'warning',
            'border-info': alarm.level === 'info',
          }"
          @click="handleAlarmDetail(alarm)"
        >
          <!-- 头部 -->
          <view class="flex items-start justify-between">
            <view class="flex items-center gap-2">
              <view
                class="i-carbon-warning-alt text-xl"
                :class="{
                  'text-danger': alarm.level === 'emergency',
                  'text-warning': alarm.level === 'warning',
                  'text-info': alarm.level === 'info',
                }"
              />
              <text
                class="text-sm font-medium"
                :class="{
                  'text-danger': alarm.level === 'emergency',
                  'text-warning': alarm.level === 'warning',
                  'text-info': alarm.level === 'info',
                }"
              >
                {{ alarm.levelText }}
              </text>
            </view>
            <text class="text-tertiary text-xs">
              {{ alarm.time }}
            </text>
          </view>

          <!-- 内容 -->
          <view class="mt-3">
            <text class="text-primary text-base font-semibold">
              {{ alarm.title }}
            </text>
          </view>

          <view class="text-secondary mt-2 text-sm">
            <text>📍 {{ alarm.location }}</text>
          </view>

          <!-- 数据 -->
          <view
            v-if="alarm.status !== 'resolved'"
            class="mt-3 text-sm"
          >
            <text class="text-secondary">
              当前值：
            </text>
            <text
              class="font-semibold"
              :class="alarm.level === 'emergency' ? 'text-danger' : 'text-primary'"
            >
              {{ alarm.currentValue }}
            </text>
            <text class="text-secondary ml-2">
              限值：
            </text>
            <text class="text-secondary">
              {{ alarm.limitValue }}
            </text>
          </view>

          <!-- 处理信息 -->
          <view
            v-if="alarm.status === 'resolved'"
            class="text-secondary mt-3 text-sm"
          >
            <text>处理人：{{ alarm.handler }}</text>
            <text class="ml-3">
              处理时间：{{ alarm.handleTime }}
            </text>
          </view>

          <!-- 底部操作 -->
          <view class="mt-4 flex gap-2">
            <button class="text-primary border-primary flex-1 border rounded-lg py-2 text-sm">
              查看详情
            </button>
            <button
              v-if="alarm.status !== 'resolved'"
              class="flex-1 rounded-lg py-2 text-sm text-white"
              :class="{
                'bg-danger': alarm.level === 'emergency',
                'bg-warning': alarm.level === 'warning',
                'bg-info': alarm.level === 'info',
              }"
              @click.stop="handleAlarmAction(alarm)"
            >
              {{ alarm.status === 'processing' ? '继续处理' : '立即处理' }}
            </button>
            <button
              v-else
              class="border-success text-success flex-1 border rounded-lg py-2 text-sm"
            >
              查看记录
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
