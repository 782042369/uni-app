<script setup lang="ts">
interface TabItem {
  pagePath: string
  text: string
  icon: string
  activeIcon?: string
}

const active = ref(0)
const safeAreaBottom = ref(0)

const tabList: TabItem[] = [
  {
    pagePath: '/pages/index',
    text: '首页',
    icon: 'i-carbon-home',
    activeIcon: 'i-carbon-home',
  },
  {
    pagePath: '/pages/monitor',
    text: '监控',
    icon: 'i-carbon-video',
    activeIcon: 'i-carbon-video',
  },
  {
    pagePath: '/pages/alarm',
    text: '告警',
    icon: 'i-carbon-warning-alt',
    activeIcon: 'i-carbon-warning-alt',
  },
  {
    pagePath: '/pages/profile',
    text: '我的',
    icon: 'i-carbon-user',
    activeIcon: 'i-carbon-user',
  },
]

// 获取底部安全区域高度
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0

  // 初始化选中状态
  updateActiveTab()
})

// 监听页面显示
onShow(() => {
  updateActiveTab()
})

// 更新选中的 Tab
function updateActiveTab() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const route = currentPage.route || ''

  const index = tabList.findIndex(tab => tab.pagePath.includes(route))
  if (index !== -1) {
    active.value = index
  }
}

// 切换 Tab
function switchTab(index: number) {
  // 如果点击的是当前 Tab，不做处理
  if (active.value === index)
    return

  // 立即更新选中状态（提升响应速度）
  active.value = index

  const url = tabList[index].pagePath

  // 使用 reLaunch 跳转（清除页面栈并加载新页面）
  uni.reLaunch({
    url,
    fail: (err) => {
      console.error('跳转失败:', err)
      // 跳转失败时恢复选中状态
      active.value = tabList.findIndex((tab) => {
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 1]
        const route = currentPage.route || ''
        return tab.pagePath.includes(route)
      }) || 0
    },
  })
}
</script>

<template>
  <view
    class="fixed bottom-0 left-0 right-0 z-999 h-50px flex items-center justify-around border-t border-light bg-white shadow-md transition-all duration-300"
    :style="{
      paddingBottom: `${safeAreaBottom}px`,
    }"
  >
    <view
      v-for="(tab, index) in tabList"
      :key="tab.pagePath"
      class="clickable flex flex-1 flex-col cursor-pointer items-center justify-center py-4px transition-all duration-300"
      :class="active === index ? 'text-primary' : 'text-rgba(0-0-0-0.45)'"
      @click="switchTab(index)"
    >
      <!-- 图标容器 -->
      <view class="relative mb-2 h-24px w-24px flex items-center justify-center">
        <view
          class="text-24px leading-1 transition-all duration-300"
          :class="[
            active === index ? tab.activeIcon : tab.icon,
            active === index ? 'scale-110' : '',
          ]"
        />

        <!-- 选中指示器 -->
        <view
          v-if="active === index"
          class="animate-tabbar-indicator-enter absolute bottom--4px left-1/2 h-4px w-4px rounded-full bg-current -translate-x-1/2"
        />
      </view>

      <!-- 文本 -->
      <text
        class="text-10px leading-1.2 transition-all duration-300"
        :class="active === index ? 'font-semibold' : ''"
      >
        {{ tab.text }}
      </text>
    </view>
  </view>
</template>

<style scoped>
@keyframes tabbar-indicator-enter {
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.animate-tabbar-indicator-enter {
  animation: tabbar-indicator-enter 0.3s ease;
}
</style>
