<script setup lang="ts">
interface Props {
  title?: string
  showBack?: boolean
  backgroundColor?: string
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  showBack: true,
  backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
  textColor: '#ffffff',
})

const emit = defineEmits<{
  (e: 'back'): void
}>()

const statusBarHeight = ref(0)

// 获取系统状态栏高度
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})

function handleBack() {
  emit('back')
  uni.navigateBack({
    delta: 1,
  })
}
</script>

<template>
  <view
    class="relative z-999 w-full transition-all duration-300"
    :style="{
      paddingTop: `${statusBarHeight}px`,
      background: backgroundColor,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }"
  >
    <view class="relative h-44px flex items-center justify-center px-16px">
      <!-- 返回按钮 -->
      <view
        v-if="showBack"
        class="clickable absolute left-16px top-1/2 flex cursor-pointer items-center gap-12px transition-all duration-200 -translate-y-1/2"
        @click="handleBack"
      >
        <view class="i-carbon-chevron-left text-xl" :style="{ color: textColor }" />
      </view>

      <!-- 标题 -->
      <view class="text-overflow-ellipsis max-w-60% overflow-hidden whitespace-nowrap text-center">
        <text class="text-lg font-semibold" :style="{ color: textColor }">
          {{ title }}
        </text>
      </view>

      <!-- 右侧操作按钮（插槽） -->
      <view class="absolute right-16px top-1/2 flex items-center gap-8px -translate-y-1/2">
        <slot name="actions" />
      </view>
    </view>
  </view>
</template>
