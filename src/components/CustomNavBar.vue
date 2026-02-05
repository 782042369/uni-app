<script setup lang="ts">
interface Props {
  title?: string
  showBack?: boolean
  backgroundColor?: string
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  showBack: false,
  backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
  textColor: '#ffffff',
})

const statusBarHeight = ref(0)
const navBarHeight = ref(44)

// 获取系统状态栏高度
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  // #ifdef APP-PLUS
  navBarHeight.value = 44
  // #endif

  // #ifdef H5
  navBarHeight.value = 44
  // #endif
})

function handleBack() {
  uni.navigateBack({
    delta: 1,
  })
}

defineExpose({
  statusBarHeight,
  navBarHeight,
})
</script>

<template>
  <view
    class="relative z-999 w-full transition-all duration-300"
    :style="{
      height: `${statusBarHeight + navBarHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      background: backgroundColor,
      color: textColor || '#ffffff',
    }"
  >
    <view class="relative h-44px flex items-center justify-center px-4">
      <!-- 返回按钮 -->
      <view
        v-if="showBack"
        class="absolute left-4 top-1/2 h-8 w-8 flex cursor-pointer items-center justify-center transition-all duration-200 -translate-y-1/2 active:scale-95 active:opacity-70"
        @click="handleBack"
      >
        <view class="i-carbon-chevron-left text-xl" />
      </view>

      <!-- 标题 -->
      <view class="max-w-60% truncate text-center">
        <text class="text-lg font-semibold">
          {{ title }}
        </text>
      </view>

      <!-- 右侧操作按钮（插槽） -->
      <view class="absolute right-4 top-1/2 flex items-center gap-2 -translate-y-1/2">
        <slot name="actions" />
      </view>
    </view>
  </view>
</template>
