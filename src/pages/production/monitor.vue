<script setup lang="ts">
/**
 * 生产监控页面
 *
 * 路由路径: /production/monitor
 *
 * 页面结构:
 * - 监控类型筛选: 横向滑动，包含2类监控类型
 *   1. 作业车辆 - 位置、速度、运行状态
 *   2. 无人驾驶 - 自动驾驶状态、作业任务
 *
 * - 内容区域: 默认地图模式
 *   - 车辆/设备标记按状态区分（正常运行-绿色、故障-红色、闲置-蓝色）
 *
 * - 车辆/设备详情:
 *   - 设备编号
 *   - 运行状态
 *   - 速度
 *   - 作业区域
 *   - 驾驶员信息
 *
 * 功能: 视频联动、设备调度、故障报警
 */

definePage({
  name: 'production-monitor',
  layout: 'default',
  style: {
    navigationBarTitleText: '生产监控',
  },
})
</script>

<template>
  <view class="grid-bg dark:bg-oled-black min-h-screen bg-bg-secondary">
    <!-- 标题栏 -->
    <view class="glass-effect dark:border-industrial-border/30 sticky top-0 z-50 border-b border-gray-100 px-5 py-4">
      <text class="text-center text-lg text-gray-900 font-bold tracking-widest dark:text-gray-50">
        生产监控
      </text>
    </view>

    <!-- 监控类型筛选：横向滑动，包含2类监控类型
         - 作业车辆
         - 无人驾驶
    -->
    <scroll-view scroll-x class="dark:border-industrial-border/30 dark:bg-industrial-card flex whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3">
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          作业车辆
        </text>
      </view>
      <view class="inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          无人驾驶
        </text>
      </view>
    </scroll-view>

    <!-- 内容区域：地图模式
         - 车辆/设备标记按状态区分
         - 正常运行：绿色
         - 故障：红色
         - 闲置：蓝色
    -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <view class="flex-center p-10">
        <text class="text-sm text-gray-400 dark:text-gray-600">
          地图模式开发中...
        </text>
      </view>
    </scroll-view>
  </view>
</template>
