<script setup lang="ts">
interface TabItem {
  pagePath: string
  text: string
  icon: string
  activeIcon?: string
}

interface Props {
  active?: number
  color?: string
  selectedColor?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: 0,
  color: 'rgba(0, 0, 0, 0.45)',
  selectedColor: '#1890ff',
  backgroundColor: '#ffffff',
})

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

const activeIndex = ref(props.active)
const safeAreaBottom = ref(0)

// 获取底部安全区域高度
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
  updateActiveIndex()
})

// 监听路由变化
onShow(() => {
  updateActiveIndex()
})

// 更新当前激活的 Tab
function updateActiveIndex() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const route = currentPage.route || ''

  const index = tabList.findIndex(tab => tab.pagePath.includes(route))
  if (index !== -1) {
    activeIndex.value = index
  }
}

function switchTab(index: number) {
  if (index === activeIndex.value)
    return

  const url = tabList[index].pagePath

  // 使用 redirectTo 替代 reLaunch，避免清除页面栈导致的状态丢失和重新渲染
  // 这可以显著提升性能并保持页面状态
  uni.redirectTo({
    url,
    fail: (err) => {
      // 如果 redirectTo 失败（如页面栈为空），回退到 reLaunch
      console.error('[CustomTabBar] redirectTo failed:', err)
      uni.reLaunch({ url })
    },
  })
}
</script>

<template>
  <view
    class="fixed bottom-0 left-0 right-0 z-999 h-50px flex items-center justify-around border-t border-op-5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
    :style="{
      backgroundColor,
      paddingBottom: `${safeAreaBottom}px`,
    }"
  >
    <view
      v-for="(tab, index) in tabList"
      :key="tab.pagePath"
      class="flex flex-1 flex-col cursor-pointer items-center justify-center py-1 transition-all duration-300 active:scale-95"
      :class="{ active: activeIndex === index }"
      @click="switchTab(index)"
    >
      <!-- 图标容器 -->
      <view class="relative mb-0.5 h-6 w-6 flex items-center justify-center">
        <view
          class="text-24px leading-1 transition-all duration-300"
          :class="[
            activeIndex === index ? tab.activeIcon : tab.icon,
            activeIndex === index ? 'scale-110' : '',
          ]"
          :style="{
            color: activeIndex === index ? selectedColor : color,
          }"
        />
      </view>

      <!-- 文本 -->
      <text
        class="text-10px leading-1.2 transition-all duration-300"
        :class="{ 'font-600': activeIndex === index }"
        :style="{
          color: activeIndex === index ? selectedColor : color,
        }"
      >
        {{ tab.text }}
      </text>
    </view>
  </view>
</template>

<style scoped>
/* 选中指示器进入动画 */
.tab-indicator {
  animation: tab-indicator-enter 0.3s ease;
}

@keyframes tab-indicator-enter {
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}
</style>
