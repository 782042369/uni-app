<script setup lang="ts">
/**
 * 综合自动化页面
 *
 * 路由路径: /production/automation
 *
 * 页面结构:
 * - 自动化系统筛选: 横向滑动，包含4类自动化系统
 *   1. 破碎站无人值守 - 运行状态、参数监控
 *   2. 电力系统 - 供电状态、负载情况
 *   3. 运输系统自动化 - 运输状态、效率监控
 *   4. 排土系统自动化 - 排土状态、作业进度
 *
 * - 系统状态列表: 显示各自动化系统的详细信息
 *   - 系统名称
 *   - 运行状态（正常、故障、待机）
 *   - 运行参数
 *   - 责任人
 *
 * 功能:
 * - 远程启停（仅管理员权限）
 * - 异常提醒
 */

definePage({
  name: 'production-automation',
  layout: 'default',
  style: {
    navigationBarTitleText: '综合自动化',
  },
})
</script>

<template>
  <view class="grid-bg dark:bg-oled-black min-h-screen bg-bg-secondary">
    <!-- 标题栏 -->
    <view class="glass-effect dark:border-industrial-border/30 sticky top-0 z-50 border-b border-gray-100 px-5 py-4">
      <text class="text-lg text-gray-800 font-bold tracking-widest dark:text-gray-100">
        综合自动化
      </text>
    </view>

    <!-- 自动化系统筛选栏：横向滑动，包含4类自动化系统
         - 破碎站无人值守
         - 电力系统
         - 运输系统自动化
         - 排土系统自动化
    -->
    <scroll-view scroll-x class="dark:border-industrial-border/30 dark:bg-industrial-card flex whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3">
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          破碎站无人值守
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          电力系统
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          运输系统自动化
        </text>
      </view>
      <view class="inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          排土系统自动化
        </text>
      </view>
    </scroll-view>

    <!-- 系统状态列表：显示各自动化系统的详细信息
         - 系统名称
         - 运行状态（正常、故障、待机）
         - 运行参数
         - 责任人
    -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <view class="flex-center p-10">
        <text class="text-sm text-gray-400 dark:text-gray-600">
          系统状态列表开发中...
        </text>
      </view>
    </scroll-view>
  </view>
</template>
