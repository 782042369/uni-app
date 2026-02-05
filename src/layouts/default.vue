<script setup lang="ts">
import { inject } from 'vue'
import { pageConfigContextKey } from '@/config'

const emit = defineEmits<{
  (e: 'leftClick'): void
  (e: 'rightClick'): void
}>()

const statusBarHeight = ref(0)
const safeAreaBottom = ref(0)

// 从页面注入配置，或使用默认值
const pageConfig = inject(pageConfigContextKey, {
  title: '矿山监控',
  showBack: false,
  backToHome: false,
  leftIcon: '',
  rightIcon: 'notification',
  showTabBar: true,
  backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
  textColor: '#ffffff',
})

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
})

// 处理左侧按钮点击
function handleLeftClick() {
  if (pageConfig.onLeftClick) {
    pageConfig.onLeftClick()
    emit('leftClick')
  }
  else if (pageConfig.showBack) {
    if (pageConfig.backToHome) {
      // 返回首页
      uni.reLaunch({
        url: '/pages/index',
      })
    }
    else {
      // 返回上一页
      uni.navigateBack({
        delta: 1,
      })
    }
  }
}

// 处理右侧按钮点击
function handleRightClick() {
  if (pageConfig.onRightClick) {
    pageConfig.onRightClick()
    emit('rightClick')
  }
  else if (pageConfig.rightIcon === 'notification') {
    // 默认行为：显示通知
    uni.showToast({
      title: '暂无新通知',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen">
    <!-- 自定义顶部导航栏 -->
    <view
      class="fixed left-0 right-0 top-0 z-999 overflow-hidden"
      :style="{
        paddingTop: `${statusBarHeight}px`,
        background: pageConfig.backgroundColor,
        boxShadow: '0 2px 10px rgba(24, 144, 255, 0.2)',
      }"
    >
      <view class="relative z-1 h-44px flex items-center justify-center px-16px">
        <!-- 左侧按钮 -->
        <view
          v-if="pageConfig.leftIcon || pageConfig.showBack"
          class="clickable absolute left-16px top-1/2 flex items-center gap-12px -translate-y-1/2"
          @click="handleLeftClick"
        >
          <view
            class="text-xl"
            :style="{ color: pageConfig.textColor }"
            :class="pageConfig.leftIcon || (pageConfig.showBack ? 'i-carbon-chevron-left' : 'i-carbon-home')"
          />
        </view>

        <!-- 标题 -->
        <view class="text-overflow-ellipsis max-w-60% overflow-hidden whitespace-nowrap text-center">
          <text
            class="text-lg font-semibold"
            :style="{ color: pageConfig.textColor }"
          >
            {{ pageConfig.title }}
          </text>
        </view>

        <!-- 右侧按钮 -->
        <view
          v-if="pageConfig.rightIcon"
          class="clickable absolute right-16px top-1/2 flex items-center gap-12px -translate-y-1/2"
          @click="handleRightClick"
        >
          <view
            class="text-xl"
            :style="{ color: pageConfig.textColor }"
            :class="pageConfig.rightIcon === 'notification' ? 'i-carbon-notification' : `i-carbon-${pageConfig.rightIcon}`"
          />
        </view>
      </view>

      <!-- 装饰性渐变 -->
      <view
        class="pointer-events-none absolute bottom--20px left-0 right-0 h-40px"
        :style="{
          background: 'linear-gradient(to bottom, rgba(24, 144, 255, 0.1), transparent)',
        }"
      />
    </view>

    <!-- 页面内容 -->
    <view
      class="layout-content"
      :style="{
        paddingTop: `${statusBarHeight + 44}px`,
        paddingBottom: pageConfig.showTabBar ? `${50 + safeAreaBottom}px` : '0',
      }"
    >
      <slot />
    </view>

    <!-- 自定义底部导航栏（手动引入，H5端兼容性更好） -->
    <CustomTabBar v-if="pageConfig.showTabBar" />
  </view>
</template>
