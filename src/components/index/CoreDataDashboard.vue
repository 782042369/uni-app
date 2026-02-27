<script setup lang="ts">
/**
 * 首页核心数据看板组件
 * 展示5类核心数据卡片：生产、安全、设备、环保、产存销
 */
import { computed, toRefs } from 'vue'

// ========== 类型定义 ==========
interface ProductionData {
  coalOutput: number // 今日采煤量（万吨）
  strippingVolume: number // 今日剥离量（万立方米）
  transportVolume: number // 运输量（万吨）
}

interface SafetyData {
  unhandledRisks: number // 未处理风险（项）
  unhandledHazards: number // 未处理隐患（项）
}

interface EquipmentData {
  onlineCount: number // 在线设备（台）
  faultCount: number // 故障设备（台）
}

interface EnvironmentalData {
  waterQuality: 'compliant' | 'abnormal' // 水质：达标/异常
  soilQuality: 'compliant' | 'abnormal' // 土壤：达标/异常
  solidWaste: 'compliant' | 'abnormal' // 固废：合规/异常
  atmosphere: 'compliant' | 'abnormal' // 大气：达标/异常
}

interface SalesData {
  todayOutput: number // 今日产量（万吨）
  currentStock: number // 当前库存（万吨）
  todaySales: number // 今日销量（万吨）
}

interface CoreDataDashboard {
  production: ProductionData
  safety: SafetyData
  equipment: EquipmentData
  environmental: EnvironmentalData
  sales: SalesData
}

// ========== Props ==========
interface Props {
  data: CoreDataDashboard
}

const props = defineProps<Props>()

// 解构 props 以便在模板中直接使用
const { data } = toRefs(props)

// ========== 计算属性 ==========
// 安全数据是否有异常（未处理项）
const hasSafetyAbnormal = computed(() => {
  return props.data.safety.unhandledRisks > 0 || props.data.safety.unhandledHazards > 0
})

// 设备数据是否有异常（故障设备）
const hasEquipmentAbnormal = computed(() => {
  return props.data.equipment.faultCount > 0
})

// 环保数据是否有异常
const hasEnvironmentalAbnormal = computed(() => {
  const env = props.data.environmental
  return env.waterQuality === 'abnormal'
    || env.soilQuality === 'abnormal'
    || env.solidWaste === 'abnormal'
    || env.atmosphere === 'abnormal'
})

// 环保指标状态类名
function getEnvStatusClass(status: 'compliant' | 'abnormal') {
  return status === 'compliant' ? 'text-success' : 'text-error'
}

// 格式化数字（保留1位小数）
function formatNumber(num: number) {
  return num.toFixed(1)
}
</script>

<template>
  <view class="core-data-dashboard space-y-2">
    <!-- ========== 生产核心数据卡片 ========== -->
    <view class="data-card card">
      <view class="flex-between">
        <!-- 左侧：今日采煤量 -->
        <view class="flex-1">
          <view class="mb-1 text-caption text-text-secondary">
            今日采煤量
          </view>
          <view class="text-data text-text-primary">
            {{ formatNumber(data.production.coalOutput) }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              万吨
            </text>
          </view>
        </view>

        <!-- 右侧：今日剥离量 -->
        <view class="flex-1 text-right">
          <view class="mb-1 text-caption text-text-secondary">
            今日剥离量
          </view>
          <view class="text-data text-text-primary">
            {{ formatNumber(data.production.strippingVolume) }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              万立方米
            </text>
          </view>
        </view>
      </view>

      <!-- 下方：运输量 -->
      <view class="mt-2 border-t border-bg-tertiary pt-2">
        <view class="text-body-small text-text-secondary">
          运输量：{{ formatNumber(data.production.transportVolume) }}万吨
        </view>
      </view>
    </view>

    <!-- ========== 安全核心数据卡片 ========== -->
    <view
      class="data-card card"
      :class="{ 'blink-border border-warning': hasSafetyAbnormal }"
    >
      <view class="flex-between">
        <!-- 左侧：未处理风险 -->
        <view class="flex-1">
          <view class="mb-1 text-caption text-text-secondary">
            未处理风险
          </view>
          <view
            class="text-data"
            :class="data.safety.unhandledRisks > 0 ? 'text-warning' : 'text-text-primary'"
          >
            {{ data.safety.unhandledRisks }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              项
            </text>
          </view>
        </view>

        <!-- 右侧：未处理隐患 -->
        <view class="flex-1 text-right">
          <view class="mb-1 text-caption text-text-secondary">
            未处理隐患
          </view>
          <view
            class="text-data"
            :class="data.safety.unhandledHazards > 0 ? 'text-warning' : 'text-text-primary'"
          >
            {{ data.safety.unhandledHazards }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              项
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- ========== 设备核心数据卡片 ========== -->
    <view
      class="data-card card"
      :class="{ 'blink-border border-error': hasEquipmentAbnormal }"
    >
      <view class="flex-between">
        <!-- 左侧：在线设备 -->
        <view class="flex-1">
          <view class="mb-1 text-caption text-text-secondary">
            在线设备
          </view>
          <view class="text-data text-success">
            {{ data.equipment.onlineCount }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              台
            </text>
          </view>
        </view>

        <!-- 右侧：故障设备 -->
        <view class="flex-1 text-right">
          <view class="mb-1 text-caption text-text-secondary">
            故障设备
          </view>
          <view
            class="text-data"
            :class="data.equipment.faultCount > 0 ? 'text-error' : 'text-text-primary'"
          >
            {{ data.equipment.faultCount }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              台
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- ========== 环保核心数据卡片 ========== -->
    <view
      class="data-card card"
      :class="{ 'blink-border border-error': hasEnvironmentalAbnormal }"
    >
      <view class="mb-2 text-caption text-text-secondary">
        环保监测
      </view>

      <!-- 2×2 网格 -->
      <view class="grid grid-cols-2 gap-2">
        <!-- 水质 -->
        <view class="flex items-center space-x-1">
          <view class="i-carbon-rain-drop text-body-small" :class="getEnvStatusClass(data.environmental.waterQuality)" />
          <view class="text-body text-text-primary">
            水质
          </view>
          <view class="ml-auto text-body-small" :class="getEnvStatusClass(data.environmental.waterQuality)">
            {{ data.environmental.waterQuality === 'compliant' ? '达标' : '异常' }}
          </view>
        </view>

        <!-- 土壤 -->
        <view class="flex items-center space-x-1">
          <view class="i-carbon-earth-filled text-body-small" :class="getEnvStatusClass(data.environmental.soilQuality)" />
          <view class="text-body text-text-primary">
            土壤
          </view>
          <view class="ml-auto text-body-small" :class="getEnvStatusClass(data.environmental.soilQuality)">
            {{ data.environmental.soilQuality === 'compliant' ? '达标' : '异常' }}
          </view>
        </view>

        <!-- 固废 -->
        <view class="flex items-center space-x-1">
          <view class="i-carbon-trash-can text-body-small" :class="getEnvStatusClass(data.environmental.solidWaste)" />
          <view class="text-body text-text-primary">
            固废
          </view>
          <view class="ml-auto text-body-small" :class="getEnvStatusClass(data.environmental.solidWaste)">
            {{ data.environmental.solidWaste === 'compliant' ? '合规' : '异常' }}
          </view>
        </view>

        <!-- 大气 -->
        <view class="flex items-center space-x-1">
          <view class="i-carbon-cloud text-body-small" :class="getEnvStatusClass(data.environmental.atmosphere)" />
          <view class="text-body text-text-primary">
            大气
          </view>
          <view class="ml-auto text-body-small" :class="getEnvStatusClass(data.environmental.atmosphere)">
            {{ data.environmental.atmosphere === 'compliant' ? '达标' : '异常' }}
          </view>
        </view>
      </view>
    </view>

    <!-- ========== 产存销核心数据卡片 ========== -->
    <view class="data-card card">
      <view class="flex-between">
        <!-- 左侧：今日产量 -->
        <view class="flex-1">
          <view class="mb-1 text-caption text-text-secondary">
            今日产量
          </view>
          <view class="text-data text-text-primary">
            {{ formatNumber(data.sales.todayOutput) }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              万吨
            </text>
          </view>
        </view>

        <!-- 右侧：当前库存 -->
        <view class="flex-1 text-right">
          <view class="mb-1 text-caption text-text-secondary">
            当前库存
          </view>
          <view class="text-data text-text-primary">
            {{ formatNumber(data.sales.currentStock) }}
            <text class="ml-1 text-body-small text-text-secondary font-normal">
              万吨
            </text>
          </view>
        </view>
      </view>

      <!-- 下方：今日销量 -->
      <view class="mt-2 border-t border-bg-tertiary pt-2">
        <view class="text-body-small text-text-secondary">
          今日销量：{{ formatNumber(data.sales.todaySales) }}万吨
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
// 核心数据看板容器
.core-data-dashboard {
  // 数据卡片基础样式
  .data-card {
    // 卡片边框加粗（1.5dp）
    border-width: 1.5dp;
    border-style: solid;
    border-color: #e5e7eb; // var(--bg-tertiary)
    transition: border-color 0.3s;
  }

  // 闪烁边框动画（异常数据提醒）
  .blink-border {
    animation: blink 2s ease-in-out infinite;
  }
}

// 闪烁动画
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
