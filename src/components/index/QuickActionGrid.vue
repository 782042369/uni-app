<script setup lang="ts">
interface QuickAction {
  id: string
  name: string
  icon: string
  path: string
  badge?: number
}

const quickActions: QuickAction[] = [
  {
    id: 'hazard',
    name: '隐患上报',
    icon: 'i-carbon-warning-alt',
    path: '/pages/safety/hazard',
  },
  {
    id: 'video',
    name: '视频监控',
    icon: 'i-carbon-video',
    path: '/production/video',
  },
  {
    id: 'risk',
    name: '风险查看',
    icon: 'i-carbon-warning',
    path: '/pages/safety/risk',
  },
  {
    id: 'report',
    name: '生产报表',
    icon: 'i-carbon-chart-bar',
    path: '/production/report',
  },
  {
    id: 'contacts',
    name: '应急通讯录',
    icon: 'i-carbon-phone',
    path: '/pages/safety/contacts',
  },
  {
    id: 'monitor',
    name: '设备状态',
    icon: 'i-carbon-settings',
    path: '/production/monitor',
  },
  {
    id: 'environmental',
    name: '环保监测',
    icon: 'i-carbon-stem-leaf-plot',
    path: '/pages/safety/environmental',
  },
  {
    id: 'knowledge',
    name: '技术资料',
    icon: 'i-carbon-document',
    path: '/knowledge',
  },
  {
    id: 'messages',
    name: '消息通知',
    icon: 'i-carbon-notification',
    path: '/profile/messages',
    badge: 0, // 可从 store 获取实际未读数量
  },
]

function handleNavigate(item: QuickAction) {
  uni.navigateTo({
    url: item.path,
    fail: () => {
      uni.switchTab({
        url: item.path,
      })
    },
  })
}
</script>

<template>
  <view class="grid grid-cols-3 mb-md gap-md rounded-lg bg-white p-md">
    <view
      v-for="item in quickActions"
      :key="item.id"
      class="flex flex-col items-center justify-center py-sm transition-transform active:scale-95"
      style="min-height: 44px; min-width: 44px;"
      @tap="handleNavigate(item)"
    >
      <view class="relative mb-2">
        <view class="text-24px text-primary" :class="[item.icon]" />
        <view
          v-if="item.badge && item.badge > 0"
          class="absolute h-16px min-w-16px flex items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white -right-1 -top-1"
        >
          {{ item.badge > 99 ? '99+' : item.badge }}
        </view>
      </view>
      <text class="text-center text-14px text-gray-700">
        {{ item.name }}
      </text>
    </view>
  </view>
</template>
