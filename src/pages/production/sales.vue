<script setup lang="ts">
/**
 * 产运销页面
 *
 * 路由路径: /production/sales
 *
 * 页面结构:
 * - 标题栏: 显示"产运销"标题
 * - 数据类型筛选栏: 横向滑动菜单（产量、销售、库存）
 * - 数据详情/图表区域: 图表（柱状图）+ 表格结合方式展示数据
 *
 * 功能:
 * - 数据导出
 * - 库存预警设置
 * - 销售明细查询
 */

definePage({
  name: 'production-sales',
  layout: 'default',
  style: {
    navigationBarTitleText: '产运销',
  },
})
</script>

<template>
  <view class="grid-bg dark:bg-oled-black min-h-screen bg-bg-secondary">
    <!-- 标题栏 -->
    <view class="glass-effect dark:border-industrial-border/30 sticky top-0 z-50 border-b border-gray-100 px-5 py-4">
      <text class="text-center text-lg text-gray-900 font-bold tracking-widest dark:text-gray-50">
        产运销
      </text>
    </view>

    <!-- 数据类型筛选栏：横向滑动菜单（产量、销售、库存） -->
    <scroll-view scroll-x class="dark:border-industrial-border/30 dark:bg-industrial-card flex whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3">
      <view class="mr-6 inline-block">
        <text class="text-industrial-blue text-sm font-bold">
          产量
        </text>
      </view>
      <view class="mr-6 inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          销售
        </text>
      </view>
      <view class="inline-block">
        <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
          库存
        </text>
      </view>
    </scroll-view>

    <!-- 数据详情/图表区域
         - 图表：柱状图展示数据趋势
         - 表格：详细数据列表
         - 功能按钮：数据导出、库存预警设置、销售明细查询
    -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <view class="flex-center p-10">
        <text class="text-sm text-gray-400 dark:text-gray-600">
          数据图表区域开发中...
        </text>
      </view>
    </scroll-view>
  </view>
</template>
