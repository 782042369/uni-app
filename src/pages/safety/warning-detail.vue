<script setup lang="ts">
/**
 * 预警详情页面
 *
 * @description
 * 预警处置详情页面,展示预警完整信息和处置流程。
 * 处置流程: 查看预警 → 分配处置 → 现场处置 → 反馈结果
 *
 * @module pages/safety/warning-detail
 */

import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

definePage({
  name: 'safety-warning-detail',
  layout: 'default',
  style: {
    navigationBarTitleText: '预警详情',
    navigationBarBackgroundColor: '#1E40AF',
    navigationBarTextStyle: 'white',
  },
})

/**
 * 预警级别
 */
type AlertLevel = 'minor' | 'moderate' | 'major' | 'critical'

/**
 * 预警类型
 */
type AlertType = 'safety' | 'environmental'

/**
 * 处置状态
 */
type AlertStatus = 'pending' | 'processing' | 'completed'

/**
 * 预警详情接口
 */
interface AlertDetail {
  id: string
  level: AlertLevel
  type: AlertType
  content: string
  time: string
  location: string
  status: AlertStatus
  assignee?: string
  deadline?: string
  description?: string
  indicators?: Record<string, any>
  photos?: string[]
  handleHistory?: HandleRecord[]
}

/**
 * 处置记录
 */
interface HandleRecord {
  id: string
  time: string
  operator: string
  action: string
  content: string
  photos?: string[]
}

/**
 * 预警级别配置
 */
const ALERT_LEVEL_CONFIG = {
  minor: {
    label: '一般',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    textColor: '#1E40AF',
  },
  moderate: {
    label: '较重',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    textColor: '#92400E',
  },
  major: {
    label: '严重',
    color: '#F97316',
    bgColor: '#FED7AA',
    textColor: '#9A3412',
  },
  critical: {
    label: '特别严重',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    textColor: '#991B1B',
  },
} as const

// 预警ID
const alertId = ref('')

// 预警详情数据
const alertDetail = ref<AlertDetail>({
  id: '1',
  level: 'critical',
  type: 'safety',
  content: '瓦斯浓度严重超标,已超过报警阈值',
  time: '2026-02-27 10:30',
  location: '东区采掘面-125水平',
  status: 'pending',
  deadline: '今日12:00前',
  description: '东区采掘面-125水平瓦斯传感器监测到瓦斯浓度达到1.5%,超过安全阈值1.0%,存在严重安全隐患。需立即停止作业,撤离人员,采取通风措施降低瓦斯浓度。',
  indicators: {
    瓦斯浓度: '1.5%',
    报警阈值: '1.0%',
    温度: '26°C',
    风速: '2.3m/s',
  },
  photos: [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
  ],
  handleHistory: [
    {
      id: '1',
      time: '2026-02-27 10:30',
      operator: '系统',
      action: '预警生成',
      content: '系统自动监测到瓦斯浓度超标,生成预警',
    },
    {
      id: '2',
      time: '2026-02-27 10:35',
      operator: '值班员',
      action: '已确认',
      content: '值班员已确认预警信息,正在通知现场负责人',
    },
  ],
})

/**
 * 处置操作选项
 */
const handleActions = [
  { key: 'assign', label: '分配处置', icon: 'i-carbon-user-multiple' },
  { key: 'process', label: '现场处置', icon: 'i-carbon-tool-kit' },
  { key: 'feedback', label: '反馈结果', icon: 'i-carbon-document' },
  { key: 'complete', label: '完成归档', icon: 'i-carbon-checkmark' },
]

/**
 * 获取预警级别配置
 */
const levelConfig = computed(() => ALERT_LEVEL_CONFIG[alertDetail.value.level])

/**
 * 获取预警类型标签
 */
const typeLabel = computed(() =>
  alertDetail.value.type === 'safety' ? '安全预警' : '环保预警',
)

/**
 * 获取处置状态配置
 */
const statusConfig = computed(() => {
  const configs = {
    pending: { label: '待处理', color: '#EF4444', bgColor: '#FEE2E2' },
    processing: { label: '处理中', color: '#F59E0B', bgColor: '#FEF3C7' },
    completed: { label: '已完成', color: '#10B981', bgColor: '#D1FAE5' },
  }
  return configs[alertDetail.value.status]
})

/**
 * 页面加载
 */
onLoad((options: any) => {
  if (options.id) {
    alertId.value = options.id
    // 根据ID加载预警详情
    loadAlertDetail(options.id)
  }
})

/**
 * 加载预警详情
 */
function loadAlertDetail(id: string) {
  // TODO: 调用API加载详情
  console.log('加载预警详情:', id)
}

/**
 * 处理操作
 */
function handleAction(actionKey: string) {
  switch (actionKey) {
    case 'assign':
      handleAssign()
      break
    case 'process':
      handleProcess()
      break
    case 'feedback':
      handleFeedback()
      break
    case 'complete':
      handleComplete()
      break
  }
}

/**
 * 分配处置
 */
function handleAssign() {
  uni.showModal({
    title: '分配处置',
    content: '请选择处置人',
    editable: true,
    placeholderText: '输入处置人姓名',
    success: (res) => {
      if (res.confirm && res.content) {
        alertDetail.value.assignee = res.content
        alertDetail.value.status = 'processing'
        addHandleRecord('分配处置', `分配给 ${res.content}`)
        uni.showToast({ title: '分配成功', icon: 'success' })
      }
    },
  })
}

/**
 * 现场处置
 */
function handleProcess() {
  uni.showToast({ title: '现场处置功能开发中', icon: 'none' })
}

/**
 * 反馈结果
 */
function handleFeedback() {
  uni.showModal({
    title: '反馈处置结果',
    editable: true,
    placeholderText: '请输入处置结果说明',
    success: (res) => {
      if (res.confirm && res.content) {
        addHandleRecord('反馈结果', res.content)
        uni.showToast({ title: '反馈成功', icon: 'success' })
      }
    },
  })
}

/**
 * 完成归档
 */
function handleComplete() {
  uni.showModal({
    title: '确认完成',
    content: '确认该预警已处置完成并归档?',
    success: (res) => {
      if (res.confirm) {
        alertDetail.value.status = 'completed'
        addHandleRecord('完成归档', '预警处置完成,已归档')
        uni.showToast({ title: '归档成功', icon: 'success' })
      }
    },
  })
}

/**
 * 添加处置记录
 */
function addHandleRecord(action: string, content: string) {
  if (!alertDetail.value.handleHistory) {
    alertDetail.value.handleHistory = []
  }
  alertDetail.value.handleHistory.unshift({
    id: Date.now().toString(),
    time: new Date().toLocaleString('zh-CN'),
    operator: '我',
    action,
    content,
  })
}

/**
 * 查看大图
 */
function previewImage(index: number) {
  uni.previewImage({
    urls: alertDetail.value.photos || [],
    current: index,
  })
}

/**
 * 导航到位置
 */
function navigateToLocation() {
  uni.openLocation({
    latitude: 26.578,
    longitude: 106.717,
    name: alertDetail.value.location,
    address: alertDetail.value.location,
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 dark:bg-black">
    <scroll-view
      scroll-y
      class="h-screen"
    >
      <!-- 级别和状态卡片 -->
      <view
        class="mx-4 mt-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
        :style="{ borderLeft: `4px solid ${levelConfig.color}` }"
      >
        <view class="flex items-center justify-between">
          <view class="flex items-center">
            <view
              class="rounded-full px-3 py-1"
              :style="{
                backgroundColor: levelConfig.bgColor,
                color: levelConfig.textColor,
              }"
            >
              <text class="text-sm font-medium">
                {{ levelConfig.label }}
              </text>
            </view>
            <view
              class="ml-2 rounded-full px-3 py-1"
              :style="{
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.color,
              }"
            >
              <text class="text-sm font-medium">
                {{ statusConfig.label }}
              </text>
            </view>
          </view>
          <text class="text-xs text-gray-500">
            {{ alertDetail.time }}
          </text>
        </view>
      </view>

      <!-- 预警基本信息 -->
      <view
        class="mx-4 mt-3 border border-gray-200 rounded-lg bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <view class="mb-3 flex items-center">
          <text
            class="text-sm"
            :class="alertDetail.type === 'safety' ? 'i-carbon-security text-blue-500' : 'i-carbon-stem-leaf-plot text-green-500'"
          />
          <text class="ml-2 text-sm text-gray-700 font-medium dark:text-gray-300">
            {{ typeLabel }}
          </text>
        </view>

        <text class="block text-base text-gray-900 font-bold leading-relaxed dark:text-white">
          {{ alertDetail.content }}
        </text>

        <view class="mt-3 flex items-start">
          <text class="i-carbon-location mt-0.5 text-base text-gray-400" />
          <text class="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {{ alertDetail.location }}
          </text>
        </view>

        <!-- 导航按钮 -->
        <view
          class="mt-2 flex items-center"
          @click="navigateToLocation"
        >
          <text class="text-xs text-blue-600">
            导航到此位置
          </text>
          <text class="i-carbon-chevron-right ml-1 text-xs text-blue-600" />
        </view>
      </view>

      <!-- 详细描述 -->
      <view
        v-if="alertDetail.description"
        class="mx-4 mt-3 border border-gray-200 rounded-lg bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <text class="text-base text-gray-900 font-bold dark:text-white">
          详细描述
        </text>
        <text class="mt-2 block text-sm text-gray-600 leading-loose dark:text-gray-400">
          {{ alertDetail.description }}
        </text>
      </view>

      <!-- 监测指标 -->
      <view
        v-if="alertDetail.indicators"
        class="mx-4 mt-3 border border-gray-200 rounded-lg bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <text class="text-base text-gray-900 font-bold dark:text-white">
          监测指标
        </text>
        <view class="grid grid-cols-2 mt-3 gap-3">
          <view
            v-for="(value, key) in alertDetail.indicators"
            :key="key"
            class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
          >
            <text class="text-xs text-gray-500 dark:text-gray-400">
              {{ key }}
            </text>
            <text class="mt-1 block text-base text-gray-900 font-bold font-mono dark:text-white">
              {{ value }}
            </text>
          </view>
        </view>
      </view>

      <!-- 现场照片 -->
      <view
        v-if="alertDetail.photos && alertDetail.photos.length > 0"
        class="mx-4 mt-3 border border-gray-200 rounded-lg bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <text class="text-base text-gray-900 font-bold dark:text-white">
          现场照片
        </text>
        <view class="grid grid-cols-3 mt-3 gap-2">
          <view
            v-for="(photo, _index) in alertDetail.photos"
            :key="_index"
            class="aspect-square overflow-hidden rounded-lg"
            @click="previewImage(_index)"
          >
            <image
              :src="photo"
              mode="aspectFill"
              class="h-full w-full"
            />
          </view>
        </view>
      </view>

      <!-- 处置记录 -->
      <view
        v-if="alertDetail.handleHistory && alertDetail.handleHistory.length > 0"
        class="mx-4 mb-4 mt-3 border border-gray-200 rounded-lg bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <text class="text-base text-gray-900 font-bold dark:text-white">
          处置记录
        </text>
        <view class="mt-3">
          <view
            v-for="record in alertDetail.handleHistory"
            :key="record.id"
            class="relative border-l-2 border-gray-200 pb-4 pl-6 last:border-0 dark:border-gray-600 last:pb-0"
          >
            <!-- 圆点 -->
            <view class="absolute left-[-5px] top-2 h-2.5 w-2.5 border-2 border-white rounded-full bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.5)] dark:border-gray-800" />

            <!-- 内容 -->
            <view>
              <view class="flex items-center justify-between">
                <text class="text-sm text-gray-900 font-medium dark:text-white">
                  {{ record.action }}
                </text>
                <text class="text-xs text-gray-500 dark:text-gray-400">
                  {{ record.time }}
                </text>
              </view>
              <view class="mt-1 flex items-center">
                <text class="i-carbon-user text-xs text-gray-400" />
                <text class="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  {{ record.operator }}
                </text>
              </view>
              <text class="mt-2 block text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                {{ record.content }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部占位 -->
      <view class="h-24" />
    </scroll-view>

    <!-- 底部操作栏 -->
    <view
      class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
    >
      <view class="grid grid-cols-4 gap-2">
        <button
          v-for="action in handleActions"
          :key="action.key"
          class="flex flex-col items-center rounded-lg bg-gray-50 p-3 active:scale-95 active:bg-gray-100 dark:bg-gray-700 dark:active:bg-gray-600"
          @click="handleAction(action.key)"
        >
          <text
            class="text-xl text-blue-700"
            :class="action.icon"
          />
          <text class="mt-1 text-xs text-gray-700 dark:text-gray-300">
            {{ action.label }}
          </text>
        </button>
      </view>
    </view>
  </view>
</template>
