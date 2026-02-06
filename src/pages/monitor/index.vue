<script setup lang="ts">
import { ref } from 'vue'

definePage({
  name: 'monitor',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '实时监控',
  },
})
// 区域选择
const areas = ref([
  { label: '全部矿井', value: 'all' },
  { label: '1号矿井', value: 'mine1' },
  { label: '2号矿井', value: 'mine2' },
  { label: '3号矿井', value: 'mine3' },
])

const selectedArea = ref('all')

// 监测数据
const monitorData = [
  {
    label: '温度',
    value: '25.5°C',
    trend: '+0.3°C',
    trendUp: true,
    status: 'normal',
    color: 'text-primary',
  },
  {
    label: '湿度',
    value: '68%',
    trend: '+2%',
    trendUp: true,
    status: 'normal',
    color: 'text-chart-blue',
  },
  {
    label: 'CH4',
    value: '0.45%',
    trend: '-0.05%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-orange',
  },
  {
    label: 'CO',
    value: '0.002%',
    trend: '0%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-red',
  },
  {
    label: 'CO2',
    value: '0.08%',
    trend: '-0.01%',
    trendUp: false,
    status: 'normal',
    color: 'text-chart-purple',
  },
  {
    label: '风速',
    value: '2.5m/s',
    trend: '+0.2m/s',
    trendUp: true,
    status: 'normal',
    color: 'text-chart-cyan',
  },
]

function handleAreaChange(e: any) {
  selectedArea.value = e.detail.value
  uni.showToast({
    title: `切换到${areas.value[e.detail.value].label}`,
    icon: 'none',
  })
}
</script>

<template>
  <view class="bg-bg-secondary min-h-screen grid-bg dark:bg-industrial-bg">
    <scroll-view scroll-y class="pb-6">
      <!-- 区域选择器 -->
      <view class="px-4 pt-4">
        <picker
          mode="selector"
          :range="areas"
          range-key="label"
          :value="0"
          @change="handleAreaChange"
        >
          <view class="tech-card tech-corner flex-between bg-white/50 glass-effect dark:bg-industrial-card/50 !py-3">
            <view class="flex items-center gap-2">
              <view class="i-carbon-layers text-industrial-blue" />
              <text class="tech-label text-gray-400 dark:text-industrial-cyan/60">
                目标监测区域
              </text>
            </view>
            <view class="flex items-center gap-1">
              <text class="text-sm font-800 tracking-tight uppercase dark:text-gray-100">
                {{ areas.find(a => a.value === selectedArea)?.label }}
              </text>
              <view class="i-carbon-chevron-down text-xs text-gray-400" />
            </view>
          </view>
        </picker>
      </view>

      <!-- 实时监控状态简报 -->
      <view class="tech-card tech-corner mx-4 mt-4 border-l-3 border-l-industrial-green !py-3">
        <view class="flex-between">
          <view class="flex flex-col">
            <text class="text-sm font-800 tracking-tight dark:text-gray-100">
              1号矿井 - 东区采掘面
            </text>
            <view class="mt-1 flex items-center gap-2">
              <text class="tech-label opacity-40">
                运行时间:
              </text>
              <text class="text-[10px] tech-num dark:text-industrial-cyan">
                1,420时 32分
              </text>
            </view>
          </view>
          <view class="flex items-center gap-2 border border-industrial-green/20 rounded-full bg-industrial-green/10 px-3 py-1">
            <view class="scale-75 status-dot-glow bg-industrial-green" />
            <text class="text-[9px] text-industrial-green font-900 tracking-tighter uppercase">
              安全
            </text>
          </view>
        </view>
      </view>

      <!-- 监测数据网格 -->
      <view class="grid grid-cols-2 mx-4 mt-4 gap-3">
        <view
          v-for="item in monitorData"
          :key="item.label"
          class="group tech-card tech-corner h-28 flex flex-col justify-between transition-colors active:bg-industrial-blue/5 !p-3"
        >
          <view class="flex-between">
            <text class="tech-label">
              {{ item.label }}
            </text>
            <view :class="item.trendUp ? 'text-industrial-red' : 'text-industrial-green'" class="flex items-center gap-0.5">
              <view :class="item.trendUp ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down'" class="text-[10px]" />
              <text class="text-[10px] tech-num">
                {{ item.trend }}
              </text>
            </view>
          </view>

          <view :class="`text-2xl tech-num ${item.color} tracking-tighter`">
            {{ item.value }}
          </view>

          <view class="mt-2 flex-between border-t border-gray-100/50 pt-2 dark:border-industrial-border/20">
            <view class="flex items-center gap-1">
              <view class="status-dot scale-75 bg-industrial-green" />
              <text class="tech-label text-[9px] opacity-40">
                状态正常
              </text>
            </view>
            <view class="i-carbon-chart-line text-xs text-gray-200 dark:text-industrial-border/40" />
          </view>
        </view>
      </view>

      <!-- 视频监控 -->
      <view class="tech-card tech-corner mx-4 mt-4 overflow-hidden border-industrial-blue/20 !p-0">
        <view class="flex-between border-b border-gray-100/50 glass-effect px-4 py-3 dark:border-industrial-border/30">
          <view class="flex items-center gap-2">
            <view class="i-carbon-video animate-pulse text-industrial-red" />
            <text class="text-xs font-bold tracking-widest uppercase dark:text-gray-200">
              实时遥测视频
            </text>
          </view>
          <view class="flex items-center gap-1.5 rounded bg-industrial-red/10 px-2 py-0.5">
            <view class="h-1.5 w-1.5 rounded-full bg-industrial-red shadow-[0_0_4px_rgba(255,82,82,0.8)]" />
            <text class="text-[8px] text-industrial-red font-900 tracking-tighter uppercase">
              正在录制
            </text>
          </view>
        </view>

        <view class="group relative h-52 flex-center bg-black">
          <!-- 视频信息图层 -->
          <view class="absolute left-3 top-3 z-10 space-y-1">
            <view class="rounded glass-effect px-1.5 py-0.5 text-[8px] text-white/60 tracking-widest font-mono uppercase !bg-black/20">
              1号摄像头 / A区
            </view>
            <view class="text-[8px] text-industrial-cyan/60 font-mono">
              北纬 39.0243°, 东经 117.2134°
            </view>
          </view>

          <!-- 装饰性 UI 元素 -->
          <view class="pointer-events-none absolute inset-0 border-[20px] border-transparent">
            <view class="absolute left-0 top-0 h-4 w-4 border-l border-t border-white/20" />
            <view class="absolute right-0 top-0 h-4 w-4 border-r border-t border-white/20" />
            <view class="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20" />
            <view class="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
          </view>

          <view class="animate-scan pointer-events-none absolute inset-0 opacity-20 scan-line" />

          <view class="i-carbon-video-filled text-6xl text-white/5 transition-colors group-hover:text-white/10" />
        </view>
      </view>

      <!-- 趋势统计 -->
      <view class="tech-card tech-corner mx-4 mt-4">
        <view class="mb-3 flex-between">
          <view class="flex items-center gap-2">
            <view class="i-carbon-chart-multitype text-industrial-blue" />
            <text class="tech-label text-[10px] dark:text-gray-300">
              终端设备空间分布
            </text>
          </view>
          <text class="text-[9px] text-gray-400 tech-num">
            节点总数: 128
          </text>
        </view>
        <view class="relative h-32 flex-center flex-col overflow-hidden border border-gray-100/50 rounded bg-gray-50/50 dark:border-industrial-border/20 dark:bg-industrial-bg/30">
          <view class="absolute inset-0 grid-bg opacity-10" />
          <view class="i-carbon-ibm-z-cloud-mod-stack text-5xl text-gray-200 dark:text-industrial-border/30" />
          <text class="mt-2 animate-pulse tech-label text-[9px] text-gray-400">
            正在初始化拓扑图...
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
