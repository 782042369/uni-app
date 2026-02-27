<script setup lang="ts">
/**
 * 生产运营主页面
 *
 * 路由路径: /production
 * 二级菜单: 生产监控、综合自动化、生产报表、生产视频、产运销
 *
 * 页面结构:
 * - 标题栏: 显示"生产运营"标题
 * - 二级菜单栏: 横向滑动菜单（生产监控、综合自动化、生产报表、生产视频、产运销）
 * - 内容区域: 根据选中菜单显示对应内容
 */

definePage({
  name: 'production',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '生产运营',
  },
})
</script>

<template>
  <view class="grid-bg dark:bg-oled-black min-h-screen bg-bg-secondary">
    <!-- 标题栏 -->
    <view class="glass-effect dark:border-industrial-border/30 sticky top-0 z-50 border-b border-gray-100 px-5 py-4">
      <text class="text-lg text-gray-800 font-bold tracking-widest dark:text-gray-100">
        生产运营
      </text>
    </view>

    <!-- 二级菜单栏 -->
    <!-- 生产监控、综合自动化、生产报表、生产视频、产运销 -->
    <view class="dark:border-industrial-border/20 dark:bg-industrial-card/30 border-b border-gray-100 bg-white px-4 py-3">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view class="inline-flex gap-6">
          <text class="text-industrial-blue text-sm font-bold">
            生产监控
          </text>
          <text class="text-sm text-gray-500 dark:text-gray-400">
            综合自动化
          </text>
          <text class="text-sm text-gray-500 dark:text-gray-400">
            生产报表
          </text>
          <text class="text-sm text-gray-500 dark:text-gray-400">
            生产视频
          </text>
          <text class="text-sm text-gray-500 dark:text-gray-400">
            产运销
          </text>
        </view>
      </scroll-view>
    </view>

    <!-- 内容区域 -->
    <scroll-view scroll-y class="pb-10">
      <view class="p-4">
        <text class="text-sm text-gray-400 dark:text-gray-500">
          内容区域待实现
        </text>
      </view>
    </scroll-view>
  </view>
</template>
