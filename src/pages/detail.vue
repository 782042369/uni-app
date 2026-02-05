<script setup lang="ts">
const statusBarHeight = ref(0)
const navBarHeight = ref(44)
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})

function showToast(message: string) {
  uni.showToast({ title: message, icon: 'none' })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen">
    <!-- 使用自定义导航栏 -->
    <AppNavBar
      title="详情页面"
      :show-back="true"
    >
      <template #actions>
        <view class="flex items-center gap-3">
          <view class="clickable i-carbon-search text-xl text-white" />
          <view class="clickable i-carbon-overflow-menu-horizontal text-xl text-white" />
        </view>
      </template>
    </AppNavBar>

    <!-- 页面内容 -->
    <view
      class="min-h-screen transition-all duration-300"
      :style="{
        paddingTop: `${statusBarHeight + navBarHeight}px`,
      }"
    >
      <view class="p-4">
        <view class="card">
          <text class="text-primary text-lg font-semibold">
            这是详情页面
          </text>
          <text class="text-secondary mt-2 block text-sm">
            使用自定义导航栏组件，支持返回按钮和自定义操作。
          </text>
        </view>

        <!-- 示例卡片 -->
        <view class="mt-4 flex flex-col gap-3">
          <view class="clickable card" @click="showToast('点击了卡片1')">
            <view class="flex items-center gap-3">
              <view class="text-primary i-carbon-settings text-xl" />
              <text class="text-primary text-base">
                设置
              </text>
            </view>
          </view>

          <view class="clickable card" @click="showToast('点击了卡片2')">
            <view class="flex items-center gap-3">
              <view class="text-primary i-carbon-help text-xl" />
              <text class="text-primary text-base">
                帮助
              </text>
            </view>
          </view>

          <view class="clickable card" @click="showToast('点击了卡片3')">
            <view class="flex items-center gap-3">
              <view class="text-primary i-carbon-information text-xl" />
              <text class="text-primary text-base">
                关于
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
