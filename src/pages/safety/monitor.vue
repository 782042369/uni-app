<script setup lang="ts">
/**
 * 安全监测页面
 *
 * 路由路径: /safety/monitor
 *
 * 页面结构:
 * - 筛选栏: 横向滑动，包含7类监测类型
 *   1. 人员监测 - 位置、在岗状态、防护装备
 *   2. 车辆监测 - 位置、速度、运行状态
 *   3. 边坡监测 - 位移、沉降、裂缝
 *   4. 煤层防自燃 - 温度、瓦斯浓度
 *   5. 防排水 - 水位、排水量
 *   6. 生产系统安全监测 - 运行状态
 *   7. AI视频监测 - 实时视频、智能识别
 *
 * - 视图切换: 地图/列表模式
 *   - 列表模式: 监测点卡片列表
 *   - 地图模式: 矿山地图可视化
 *
 * - 内容区域: 监测点卡片列表
 *   - 卡片包含：状态标识、名称、位置、实时数据
 *   - 状态颜色：正常绿#10B981/预警橙#F97316/异常红#EF4444
 */

// 监测类型定义
interface MonitorType {
  id: string
  name: string
  icon: string
  count: {
    normal: number
    warning: number
    error: number
  }
}

// 监测点状态
type MonitorStatus = 'normal' | 'warning' | 'error'

// 监测点数据
interface MonitorPoint {
  id: string
  name: string
  location: string
  status: MonitorStatus
  data: Record<string, { value: string | number, unit: string, label: string }>
  updateTime: string
  alertMessage?: string
}

// 视图模式
type ViewMode = 'list' | 'map'

definePage({
  name: 'safety-monitor',
  layout: 'default',
  style: {
    navigationBarTitleText: '安全监测',
    navigationBarBackgroundColor: '#1E40AF',
    navigationBarTextStyle: 'white',
  },
})

// 当前选中的监测类型
const activeFilter = ref('person')

// 视图模式
const viewMode = ref<ViewMode>('list')

// 监测类型列表
const monitorTypes: MonitorType[] = [
  {
    id: 'person',
    name: '人员监测',
    icon: 'i-carbon-user',
    count: { normal: 45, warning: 2, error: 1 },
  },
  {
    id: 'vehicle',
    name: '车辆监测',
    icon: 'i-carbon-delivery',
    count: { normal: 28, warning: 1, error: 0 },
  },
  {
    id: 'slope',
    name: '边坡监测',
    icon: 'i-carbon-mountain',
    count: { normal: 12, warning: 3, error: 0 },
  },
  {
    id: 'spontaneous',
    name: '煤层防自燃',
    icon: 'i-carbon-fire',
    count: { normal: 8, warning: 0, error: 0 },
  },
  {
    id: 'drainage',
    name: '防排水',
    icon: 'i-carbon-rain-drop',
    count: { normal: 15, warning: 2, error: 0 },
  },
  {
    id: 'system',
    name: '生产系统',
    icon: 'i-carbon-settings',
    count: { normal: 6, warning: 0, error: 1 },
  },
  {
    id: 'video',
    name: 'AI视频',
    icon: 'i-carbon-video',
    count: { normal: 24, warning: 1, error: 0 },
  },
]

// 模拟监测点数据
const mockMonitorPoints: Record<string, MonitorPoint[]> = {
  person: [
    {
      id: 'p001',
      name: '张三',
      location: '东采区-作业面A',
      status: 'normal',
      data: {
        position: { value: '在线', unit: '', label: '状态' },
        equipment: { value: '正常', unit: '', label: '防护装备' },
      },
      updateTime: '1分钟前',
    },
    {
      id: 'p002',
      name: '李四',
      location: '西排土场-作业区B',
      status: 'warning',
      data: {
        position: { value: '离岗', unit: '', label: '状态' },
        equipment: { value: '缺失', unit: '', label: '防护装备' },
      },
      updateTime: '5分钟前',
      alertMessage: '人员离岗超过规定时间',
    },
    {
      id: 'p003',
      name: '王五',
      location: '破碎站-卸料平台',
      status: 'error',
      data: {
        position: { value: '离线', unit: '', label: '状态' },
        equipment: { value: '未知', unit: '', label: '防护装备' },
      },
      updateTime: '15分钟前',
      alertMessage: '人员定位信号丢失',
    },
    {
      id: 'p004',
      name: '赵六',
      location: '运输道路- K2+300',
      status: 'normal',
      data: {
        position: { value: '在线', unit: '', label: '状态' },
        equipment: { value: '正常', unit: '', label: '防护装备' },
      },
      updateTime: '2分钟前',
    },
  ],
  vehicle: [
    {
      id: 'v001',
      name: '自卸车-001',
      location: '东采区-装载点',
      status: 'normal',
      data: {
        speed: { value: 0, unit: 'km/h', label: '速度' },
        status: { value: '作业中', unit: '', label: '状态' },
      },
      updateTime: '30秒前',
    },
    {
      id: 'v002',
      name: '挖掘机-005',
      location: '西采区-作业面',
      status: 'warning',
      data: {
        speed: { value: 0, unit: 'km/h', label: '速度' },
        status: { value: '怠速', unit: '', label: '状态' },
      },
      updateTime: '3分钟前',
      alertMessage: '设备长时间怠速',
    },
  ],
  slope: [
    {
      id: 's001',
      name: '东边坡-监测点1',
      location: '东采区-边坡监测站A',
      status: 'normal',
      data: {
        displacement: { value: 2.3, unit: 'mm', label: '位移' },
        settlement: { value: 1.5, unit: 'mm', label: '沉降' },
      },
      updateTime: '10分钟前',
    },
    {
      id: 's002',
      name: '西边坡-监测点2',
      location: '西采区-边坡监测站B',
      status: 'warning',
      data: {
        displacement: { value: 15.8, unit: 'mm', label: '位移' },
        settlement: { value: 8.2, unit: 'mm', label: '沉降' },
      },
      updateTime: '5分钟前',
      alertMessage: '位移接近预警阈值',
    },
  ],
  spontaneous: [
    {
      id: 'f001',
      name: '煤层温度-测点1',
      location: '东采区-煤场',
      status: 'normal',
      data: {
        temperature: { value: 28, unit: '°C', label: '温度' },
        gas: { value: 0.12, unit: '%', label: '瓦斯浓度' },
      },
      updateTime: '5分钟前',
    },
  ],
  drainage: [
    {
      id: 'd001',
      name: '排水泵站-1号',
      location: '坑底-泵房A',
      status: 'normal',
      data: {
        waterLevel: { value: 2.5, unit: 'm', label: '水位' },
        flow: { value: 120, unit: 'm³/h', label: '排水量' },
      },
      updateTime: '2分钟前',
    },
    {
      id: 'd002',
      name: '排水泵站-2号',
      location: '坑底-泵房B',
      status: 'warning',
      data: {
        waterLevel: { value: 4.8, unit: 'm', label: '水位' },
        flow: { value: 0, unit: 'm³/h', label: '排水量' },
      },
      updateTime: '8分钟前',
      alertMessage: '排水泵故障，水位上升',
    },
  ],
  system: [
    {
      id: 'sys001',
      name: '破碎站系统',
      location: '破碎站-控制室',
      status: 'normal',
      data: {
        status: { value: '运行中', unit: '', label: '状态' },
        efficiency: { value: 95, unit: '%', label: '运行效率' },
      },
      updateTime: '1分钟前',
    },
    {
      id: 'sys002',
      name: '电力系统',
      location: '配电室-总控',
      status: 'error',
      data: {
        status: { value: '故障', unit: '', label: '状态' },
        efficiency: { value: 0, unit: '%', label: '运行效率' },
      },
      updateTime: '20分钟前',
      alertMessage: '主供电线路跳闸',
    },
  ],
  video: [
    {
      id: 'vid001',
      name: '作业面摄像头-01',
      location: '东采区-作业面A',
      status: 'normal',
      data: {
        status: { value: '在线', unit: '', label: '状态' },
        alert: { value: '无', unit: '', label: '异常识别' },
      },
      updateTime: '实时',
    },
    {
      id: 'vid002',
      name: '运输道路摄像头-03',
      location: '运输道路-K2+300',
      status: 'warning',
      data: {
        status: { value: '在线', unit: '', label: '状态' },
        alert: { value: '人员聚集', unit: '', label: '异常识别' },
      },
      updateTime: '2分钟前',
      alertMessage: '检测到人员异常聚集',
    },
  ],
}

// 当前监测点列表
const currentPoints = computed(() => {
  return mockMonitorPoints[activeFilter.value] || []
})

// 异常数量统计
const abnormalCount = computed(() => {
  const type = monitorTypes.find(t => t.id === activeFilter.value)
  return type ? type.count.warning + type.count.error : 0
})

// 状态颜色映射
const statusColors: Record<MonitorStatus, string> = {
  normal: '#10B981',
  warning: '#F97316',
  error: '#EF4444',
}

// 状态背景色映射
const statusBgColors: Record<MonitorStatus, string> = {
  normal: '#D1FAE5',
  warning: '#FFEDD5',
  error: '#FEE2E2',
}

// 状态文本映射
const statusText: Record<MonitorStatus, string> = {
  normal: '正常',
  warning: '预警',
  error: '异常',
}

// 切换监测类型
function handleFilterChange(id: string) {
  activeFilter.value = id
}

// 切换视图模式
function toggleViewMode() {
  viewMode.value = viewMode.value === 'list' ? 'map' : 'list'
}

// 查看详情
function viewDetail(point: MonitorPoint) {
  uni.navigateTo({
    url: `/safety/monitor/detail?id=${point.id}&type=${activeFilter.value}`,
  })
}

// 下拉刷新
const refreshing = ref(false)
function onRefresh() {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
    uni.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500,
    })
  }, 1000)
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 筛选栏：横向滑动 -->
    <view class="sticky top-0 z-100 border-b border-gray-200 bg-white shadow-sm">
      <scroll-view scroll-x :show-scrollbar="false" class="whitespace-nowrap">
        <view class="inline-flex gap-3 p-3">
          <view
            v-for="type in monitorTypes"
            :key="type.id"
            class="relative min-w-20 inline-flex flex-col items-center rounded-lg bg-gray-50 p-2.5 px-4 transition-all duration-200"
            :class="activeFilter === type.id ? 'bg-blue-800 scale-105' : ''"
            @tap="handleFilterChange(type.id)"
          >
            <view
              class="relative mb-1.5 h-6 w-6 text-xl text-gray-500"
              :class="[type.icon, activeFilter === type.id ? 'text-white' : '']"
            >
              <text
                v-if="type.count.error > 0"
                class="absolute h-4 min-w-4 flex items-center justify-center border-2 border-white rounded-lg bg-red-500 px-1 text-xs text-white font-bold -right-1.5 -top-1.5"
              >
                {{ type.count.error }}
              </text>
            </view>
            <text
              class="mb-1 text-sm text-gray-700"
              :class="activeFilter === type.id ? 'text-white font-bold' : ''"
            >
              {{ type.name }}
            </text>
            <view
              class="flex items-center gap-0.5 text-xs"
              :class="activeFilter === type.id ? 'text-white/90' : 'text-gray-500'"
            >
              <text class="text-emerald-500">
                {{ type.count.normal }}
              </text>
              <text v-if="type.count.warning > 0" class="text-orange-500">
                /{{ type.count.warning }}
              </text>
              <text v-if="type.count.error > 0" class="text-red-500">
                /{{ type.count.error }}
              </text>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 视图切换按钮 -->
      <view class="flex justify-end px-3 pb-3">
        <view
          class="flex items-center gap-1 border border-gray-300 rounded bg-white px-3 py-1"
          @tap="toggleViewMode"
        >
          <view
            class="text-lg"
            :class="viewMode === 'list' ? 'i-carbon-list-boxes text-blue-600' : 'i-carbon-map text-gray-400'"
          />
          <view
            class="text-lg"
            :class="viewMode === 'map' ? 'i-carbon-map text-blue-600' : 'i-carbon-map text-gray-400'"
          />
        </view>
      </view>
    </view>

    <!-- 异常提示 -->
    <view
      v-if="abnormalCount > 0"
      class="mx-4 mt-3 flex items-center border-l-4 border-orange-500 rounded-lg from-orange-50 to-orange-100 bg-gradient-to-r p-3"
    >
      <view class="i-carbon-warning-alt mr-2.5 flex-shrink-0 text-xl text-orange-500" />
      <text class="flex-1 text-sm text-orange-800 leading-relaxed">
        当前有 {{ abnormalCount }} 个监测点存在异常或预警，请及时处理
      </text>
    </view>

    <!-- 内容区域 -->
    <scroll-view
      scroll-y
      class="h-[calc(100vh-180px)] px-4 pb-5"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 列表模式 -->
      <view v-if="viewMode === 'list'">
        <!-- 空状态 -->
        <view
          v-if="currentPoints.length === 0"
          class="flex flex-col items-center justify-center py-20"
        >
          <view class="i-carbon-locked-and-blocked mb-4 text-6xl text-gray-300" />
          <text class="text-sm text-gray-400">
            暂无监测数据
          </text>
        </view>

        <!-- 监测点卡片列表 -->
        <view v-else class="flex flex-col gap-3">
          <view
            v-for="point in currentPoints"
            :key="point.id"
            class="relative rounded-xl bg-white p-4 shadow-sm transition-all duration-200 active:scale-95 active:shadow-md"
            :class="[
              point.status === 'normal' ? 'border-l-4 border-emerald-500' : '',
              point.status === 'warning' ? 'border-l-4 border-orange-500 bg-gradient-to-br from-white to-orange-50' : '',
              point.status === 'error' ? 'border-l-4 border-red-500 bg-gradient-to-br from-white to-red-50 animate-pulse' : '',
            ]"
            @tap="viewDetail(point)"
          >
            <!-- 卡片头部 -->
            <view class="mb-3 flex items-center justify-between">
              <view class="min-w-0 flex flex-1 items-center">
                <view
                  class="mr-2.5 h-2 w-2 flex-shrink-0 rounded-full"
                  :style="{ backgroundColor: statusColors[point.status] }"
                />
                <text class="overflow-hidden text-ellipsis whitespace-nowrap text-base text-gray-800 font-bold">
                  {{ point.name }}
                </text>
              </view>
              <view class="ml-2.5 flex flex-shrink-0 items-center">
                <text class="mr-1 text-xs text-gray-400">
                  {{ point.updateTime }}
                </text>
                <view class="i-carbon-chevron-right text-base text-gray-300" />
              </view>
            </view>

            <!-- 位置信息 -->
            <view class="mb-3 flex items-center">
              <view class="i-carbon-location mr-1.5 flex-shrink-0 text-sm text-gray-500" />
              <text class="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
                {{ point.location }}
              </text>
            </view>

            <!-- 数据展示 -->
            <view class="mb-2 flex flex-wrap gap-4">
              <view
                v-for="(item, key) in point.data"
                :key="key"
                class="flex flex-col gap-1"
              >
                <text class="text-xs text-gray-400">
                  {{ item.label }}
                </text>
                <text class="text-base text-gray-800 font-bold">
                  {{ item.value }}{{ item.unit }}
                </text>
              </view>
            </view>

            <!-- 异常提示 -->
            <view
              v-if="point.alertMessage"
              class="mt-2 flex items-center rounded-md bg-red-50 p-2"
            >
              <view class="i-carbon-warning-alt mr-2 flex-shrink-0 text-sm text-red-500" />
              <text class="flex-1 text-xs text-red-600 leading-relaxed">
                {{ point.alertMessage }}
              </text>
            </view>

            <!-- 状态标签 -->
            <view
              class="absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold"
              :style="{
                backgroundColor: statusBgColors[point.status],
                color: statusColors[point.status],
              }"
            >
              {{ statusText[point.status] }}
            </view>
          </view>
        </view>

        <!-- 底部提示 -->
        <view class="flex justify-center py-5">
          <text class="text-xs text-gray-400">
            数据更新于：{{ new Date().toLocaleString('zh-CN', { hour12: false }) }}
          </text>
        </view>
      </view>

      <!-- 地图模式 -->
      <view v-else>
        <view class="h-96 flex items-center justify-center rounded-lg bg-gray-100">
          <view class="flex flex-col items-center">
            <view class="i-carbon-map mb-4 text-6xl text-gray-300" />
            <text class="text-sm text-gray-400">
              矿山地图可视化（占位）
            </text>
            <text class="mt-2 text-xs text-gray-400">
              监测点数量：{{ currentPoints.length }}
            </text>
          </view>
        </view>

        <!-- 地图模式下的监测点统计 -->
        <view class="mt-4 rounded-lg bg-white p-4">
          <text class="mb-3 block text-sm text-gray-800 font-bold">
            监测点分布统计
          </text>
          <view class="flex gap-4">
            <view class="flex items-center gap-1">
              <view class="h-2 w-2 rounded-full bg-emerald-500" />
              <text class="text-xs text-gray-600">
                正常 {{ monitorTypes.find(t => t.id === activeFilter)?.count.normal || 0 }}
              </text>
            </view>
            <view class="flex items-center gap-1">
              <view class="h-2 w-2 rounded-full bg-orange-500" />
              <text class="text-xs text-gray-600">
                预警 {{ monitorTypes.find(t => t.id === activeFilter)?.count.warning || 0 }}
              </text>
            </view>
            <view class="flex items-center gap-1">
              <view class="h-2 w-2 rounded-full bg-red-500" />
              <text class="text-xs text-gray-600">
                异常 {{ monitorTypes.find(t => t.id === activeFilter)?.count.error || 0 }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
