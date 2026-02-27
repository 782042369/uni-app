<script setup lang="ts">
/**
 * 安全环保中心首页
 *
 * @description
 * 安全环保中心主页面，包含6个二级菜单的横向导航栏。
 * 使用 uni-app 自带导航栏，SecondaryTabBar 组件实现二级菜单。
 *
 * @features
 * - 横向滑动二级菜单（6个菜单项）
 * - 选中状态：主色调#1E40AF + 橙色下划线#F97316
 * - 自动路由跳转
 * - 平滑过渡动画
 */

import { ref } from 'vue'

import type { TabItem } from '@/components/SecondaryTabBar.vue'

import SecondaryTabBar from '@/components/SecondaryTabBar.vue'

definePage({
  name: 'safety',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '安全环保中心',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
  },
})

/**
 * 二级菜单配置
 * 根据 @docs/frontend/MENU_STRUCTURE.md 定义
 */
const secondaryTabs: TabItem[] = [
  {
    key: '/pages/safety/monitor',
    label: '安全监测',
    icon: 'i-carbon-security',
  },
  {
    key: '/pages/safety/warning',
    label: '预警处置',
    icon: 'i-carbon-warning-alt',
  },
  {
    key: '/pages/safety/risk',
    label: '风险管控',
    icon: 'i-carbon-rule',
  },
  {
    key: '/pages/safety/contacts',
    label: '应急通讯录',
    icon: 'i-carbon-phone',
  },
  {
    key: '/pages/safety/hazard',
    label: '隐患排查',
    icon: 'i-carbon-report',
  },
  {
    key: '/pages/safety/environmental',
    label: '环保监测',
    icon: 'i-carbon-stem-leaf-plot',
  },
]

/**
 * 当前激活的二级菜单
 * 默认选中：安全监测
 */
const activeSecondaryTab = ref('/pages/safety/monitor')

/**
 * 处理二级菜单切换
 * @param item - 被点击的菜单项
 */
function handleSecondaryTabChange(item: TabItem) {
  console.log('切换二级菜单:', item.label, item.key)
  // 路由跳转由 SecondaryTabBar 组件内部处理
}
</script>

<template>
  <view class="safety-page min-h-screen bg-[#F3F4F6]">
    <!-- 二级菜单栏 -->
    <SecondaryTabBar
      v-model="activeSecondaryTab"
      :items="secondaryTabs"
      @change="handleSecondaryTabChange"
    />

    <!-- 页面内容区域 -->
    <scroll-view
      scroll-y
      class="safety-content"
      :style="{ height: 'calc(100vh - 48px - var(--window-bottom))' }"
    >
      <!-- 内容占位 -->
      <view class="flex-center flex-col p-8">
        <!-- 空状态图标 -->
        <view class="mb-4 text-64px text-[#9CA3AF]">
          <text class="i-carbon-security" />
        </view>

        <!-- 空状态文字 -->
        <text class="mb-2 text-18px text-[#1F2937] font-bold">
          请选择二级菜单
        </text>
        <text class="mb-8 text-center text-14px text-[#6B7280]">
          点击上方菜单查看详细信息
        </text>

        <!-- 快速入口卡片 -->
        <view class="w-full rounded-8px bg-white p-4 shadow-sm">
          <text class="mb-3 block text-16px text-[#1E40AF] font-bold">
            快速入口
          </text>
          <view class="grid grid-cols-2 gap-3">
            <view
              class="flex cursor-pointer items-center rounded-6px bg-[#EFF6FF] p-3 transition-all active:scale-95 active:opacity-80"
              @click="activeSecondaryTab = '/pages/safety/monitor'"
            >
              <view class="mr-2 text-24px text-[#1E40AF]">
                <text class="i-carbon-security" />
              </view>
              <text class="text-14px text-[#1E40AF] font-medium">
                安全监测
              </text>
            </view>
            <view
              class="flex cursor-pointer items-center rounded-6px bg-[#FFF7ED] p-3 transition-all active:scale-95 active:opacity-80"
              @click="activeSecondaryTab = '/pages/safety/warning'"
            >
              <view class="mr-2 text-24px text-[#F97316]">
                <text class="i-carbon-warning-alt" />
              </view>
              <text class="text-14px text-[#F97316] font-medium">
                预警处置
              </text>
            </view>
            <view
              class="flex cursor-pointer items-center rounded-6px bg-[#FEF3C7] p-3 transition-all active:scale-95 active:opacity-80"
              @click="activeSecondaryTab = '/pages/safety/risk'"
            >
              <view class="mr-2 text-24px text-[#F59E0B]">
                <text class="i-carbon-rule" />
              </view>
              <text class="text-14px text-[#F59E0B] font-medium">
                风险管控
              </text>
            </view>
            <view
              class="flex cursor-pointer items-center rounded-6px bg-[#DBEAFE] p-3 transition-all active:scale-95 active:opacity-80"
              @click="activeSecondaryTab = '/pages/safety/contacts'"
            >
              <view class="mr-2 text-24px text-[#3B82F6]">
                <text class="i-carbon-phone" />
              </view>
              <text class="text-14px text-[#3B82F6] font-medium">
                应急通讯录
              </text>
            </view>
          </view>
        </view>

        <!-- 统计数据占位 -->
        <view class="mt-6 w-full rounded-8px bg-white p-4 shadow-sm">
          <text class="mb-3 block text-16px text-[#1E40AF] font-bold">
            安全概况
          </text>
          <view class="grid grid-cols-2 gap-4">
            <view class="text-center">
              <text class="text-24px text-[#10B981] font-bold">
                0
              </text>
              <text class="ml-1 text-12px text-[#6B7280]">
                项
              </text>
              <view class="mt-1 text-12px text-[#6B7280]">
                未处理风险
              </view>
            </view>
            <view class="text-center">
              <text class="text-24px text-[#10B981] font-bold">
                0
              </text>
              <text class="ml-1 text-12px text-[#6B7280]">
                项
              </text>
              <view class="mt-1 text-12px text-[#6B7280]">
                未处理隐患
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.safety-page {
  /* 使用 uni-app 默认导航栏 */
}

.safety-content {
  /* 内容区域可滚动 */
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
