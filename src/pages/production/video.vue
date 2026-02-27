<script setup lang="ts">
/**
 * 生产视频页面
 *
 * 路由路径: /production/video
 *
 * 页面结构:
 * - 视频区域筛选: 横向滑动，包含5个区域
 *   1. 作业面 - 采掘作业区域监控
 *   2. 破碎站 - 破碎站作业监控
 *   3. 运输线路 - 运输道路监控
 *   4. 排土场 - 排土作业区域监控
 *   5. 办公区 - 办公区域监控
 *
 * - 视频列表: 显示选中区域的摄像头列表
 *   - 区域名称
 *   - 摄像头编号
 *   - 实时画面缩略图
 *   - 在线状态（在线-绿色、离线-灰色）
 *
 * - 视频播放界面: 全屏播放视频
 *   - 全屏播放
 *   - 倍速播放（0.5x、1x、1.5x、2x）
 *   - 暂停/继续
 *   - 抓拍截图
 *   - 回放（近24小时）
 */

definePage({
  name: 'production-video',
  layout: 'default',
  style: {
    navigationBarTitleText: '生产视频',
  },
})
</script>

<template>
  <view class="grid-bg dark:bg-oled-black min-h-screen bg-bg-secondary">
    <!-- 标题栏 -->
    <view class="glass-effect dark:border-industrial-border/30 sticky top-0 z-50 border-b border-gray-100 px-5 py-4">
      <text class="text-center text-lg text-gray-900 font-bold tracking-widest dark:text-gray-50">
        生产视频
      </text>
    </view>

    <!-- 视频区域筛选：横向滑动，包含5个区域
         - 作业面
         - 破碎站
         - 运输线路
         - 排土场
         - 办公区
    -->
    <scroll-view scroll-x class="dark:border-industrial-border/30 dark:bg-industrial-card flex whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3">
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          作业面
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          破碎站
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          运输线路
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          排土场
        </text>
      </view>
      <view class="inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          办公区
        </text>
      </view>
    </scroll-view>

    <!-- 视频列表：显示选中区域的摄像头列表
         - 区域名称
         - 摄像头编号
         - 实时画面缩略图
         - 在线状态（在线-绿色、离线-灰色）
    -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <view class="flex-center p-10">
        <text class="text-sm text-gray-400 dark:text-gray-600">
          视频列表开发中...
        </text>
      </view>
    </scroll-view>

    <!-- 视频播放界面：全屏播放视频
         - 全屏播放
         - 倍速播放（0.5x、1x、1.5x、2x）
         - 暂停/继续
         - 抓拍截图
         - 回放（近24小时）
    -->
  </view>
</template>
