<script setup lang="ts">
import { ref } from 'vue'

import { useFeedback } from '@/composables/useFeedback'
import { usePageConfig } from '@/composables/usePageConfig'

usePageConfig({
  title: '我的',
  showTabBar: true,
  showBack: false,
  backToHome: false,
  leftIcon: '',
  rightIcon: 'settings',
  backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
  textColor: '#ffffff',
})

const { showToast: showFeedback } = useFeedback()

// 用户信息
const userInfo = ref({
  name: '张三',
  role: '安全管理员',
  department: '安全监察部',
  phone: '138****8888',
  avatar: '',
})

// 菜单列表
const menuItems = [
  {
    id: 'account',
    icon: 'i-carbon-user-settings',
    title: '账号管理',
    desc: '修改个人信息',
    action: () => showFeedback('账号管理'),
  },
  {
    id: 'notification',
    icon: 'i-carbon-settings',
    title: '通知设置',
    desc: '消息推送与提醒',
    action: () => showFeedback('通知设置'),
  },
  {
    id: 'language',
    icon: 'i-carbon-language',
    title: '语言设置',
    desc: '切换应用语言',
    action: () => showFeedback('语言设置'),
  },
  {
    id: 'help',
    icon: 'i-carbon-help',
    title: '帮助与反馈',
    desc: '使用说明与问题反馈',
    action: () => showFeedback('帮助中心'),
  },
  {
    id: 'about',
    icon: 'i-carbon-information',
    title: '关于',
    desc: '版本 1.0.0',
    action: () => showFeedback('关于我们'),
  },
]
</script>

<template>
  <view class="bg-bg-secondary min-h-screen">
    <!-- 内容区域 -->
    <scroll-view scroll-y>
      <!-- 用户信息卡片 -->
      <view class="from-primary-bg mx-4 mt-4 flex items-center gap-4 rounded-xl to-white bg-gradient-to-br p-4 shadow-sm">
        <view class="h-16 w-16 flex items-center justify-center rounded-full bg-white shadow-sm">
          <view class="text-primary i-carbon-user-avatar text-5xl" />
        </view>
        <view class="flex flex-1 flex-col">
          <view class="text-primary text-xl font-bold">
            {{ userInfo.name }}
          </view>
          <view class="text-secondary mt-1 text-sm">
            {{ userInfo.role }}
          </view>
          <view class="text-tertiary mt-0.5 text-xs">
            {{ userInfo.department }}
          </view>
        </view>
      </view>

      <!-- 统计信息 -->
      <view class="grid grid-cols-3 mx-4 mt-4 gap-3">
        <view class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <view class="text-primary text-2xl font-bold">
            128
          </view>
          <view class="text-secondary mt-1 text-xs">
            在线设备
          </view>
        </view>
        <view class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <view class="text-primary text-2xl font-bold">
            12
          </view>
          <view class="text-secondary mt-1 text-xs">
            今日告警
          </view>
        </view>
        <view class="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <view class="text-primary text-2xl font-bold">
            99%
          </view>
          <view class="text-secondary mt-1 text-xs">
            系统可用
          </view>
        </view>
      </view>

      <!-- 功能菜单 -->
      <view class="mx-4 mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
        <view
          v-for="item in menuItems"
          :key="item.id"
          class="active:bg-bg-hover flex items-center justify-between border-b border-light p-4 transition-colors last:border-b-0"
          @click="item.action"
        >
          <view class="flex items-center gap-3">
            <view :class="item.icon" class="text-primary bg-primary-bg h-10 w-10 flex items-center justify-center rounded-lg text-xl" />
            <view class="flex flex-col">
              <view class="text-primary text-base font-medium">
                {{ item.title }}
              </view>
              <view class="text-secondary mt-0.5 text-xs">
                {{ item.desc }}
              </view>
            </view>
          </view>
          <view class="text-tertiary i-carbon-chevron-right text-lg" />
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <view class="mx-4 mt-6">
        <button class="text-danger border-danger w-full border rounded-xl bg-white py-3 font-medium transition-opacity active:opacity-80" @click="showFeedback('退出登录')">
          退出登录
        </button>
      </view>

      <!-- 版本信息 -->
      <view class="mb-4 mt-6 text-center">
        <text class="text-tertiary text-xs">
          矿山安全生产监控系统 v1.0.0
        </text>
      </view>
    </scroll-view>
  </view>
</template>
