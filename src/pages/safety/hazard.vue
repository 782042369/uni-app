<script setup lang="ts">
definePage({
  name: 'safety-hazard',
  layout: 'default',
  style: {
    navigationBarTitleText: '隐患排查',
    navigationBarBackgroundColor: '#1E40AF',
    navigationBarTextStyle: 'white',
  },
})

// 隐患等级类型
type HazardLevel = 'major' | 'large' | 'general' | 'all'

// 整改状态类型
type HazardStatus = 'pending' | 'rectifying' | 'rectified' | 'rejected' | 'all'

// 排查区域类型
type HazardArea = 'all' | 'mining' | 'dump' | 'transport' | 'office'

// 隐患等级配置
const hazardLevelConfig: Record<string, { label: string, color: string, bgColor: string }> = {
  all: { label: '全部等级', color: '#6B7280', bgColor: '#F3F4F6' },
  major: { label: '重大', color: '#DC2626', bgColor: '#FEE2E2' },
  large: { label: '较大', color: '#EA580C', bgColor: '#FFEDD5' },
  general: { label: '一般', color: '#D97706', bgColor: '#FEF3C7' },
}

// 整改状态配置
const hazardStatusConfig: Record<HazardStatus, { label: string, color: string, bgColor: string }> = {
  pending: { label: '未整改', color: '#EF4444', bgColor: '#FEE2E2' },
  rectifying: { label: '整改中', color: '#F59E0B', bgColor: '#FEF3C7' },
  rectified: { label: '已整改', color: '#10B981', bgColor: '#D1FAE5' },
  rejected: { label: '不合格', color: '#F97316', bgColor: '#FFEDD5' },
  all: { label: '全部', color: '#6B7280', bgColor: '#F3F4F6' },
}

// 区域配置
const areaConfig: Record<HazardArea, string> = {
  all: '全部区域',
  mining: '采矿区',
  dump: '排土场',
  transport: '运输线路',
  office: '办公区',
}

// 筛选状态
const selectedLevel = ref<HazardLevel>('all')
const selectedStatus = ref<HazardStatus>('all')
const selectedArea = ref<HazardArea>('all')

// 隐患列表数据
const hazardList = ref([
  {
    id: '1',
    name: '边坡裂缝隐患',
    level: 'major' as HazardLevel,
    status: 'pending' as HazardStatus,
    description: '东侧边坡出现多条裂缝，最大宽度约10cm，存在坍塌风险',
    location: '采矿区东部边坡',
    reporter: '张三',
    reportTime: '2024-02-27 09:30',
    assignee: '李四',
    deadline: '2024-03-01 18:00',
    photos: ['/static/hazard1.jpg'],
  },
  {
    id: '2',
    name: '运输道路积水',
    level: 'general' as HazardLevel,
    status: 'rectifying' as HazardStatus,
    description: '2号运输道路低洼处积水严重，影响车辆通行',
    location: '2号运输道路K3+200处',
    reporter: '王五',
    reportTime: '2024-02-26 14:20',
    assignee: '赵六',
    deadline: '2024-02-28 18:00',
    photos: [],
  },
  {
    id: '3',
    name: '防尘网破损',
    level: 'general' as HazardLevel,
    status: 'rectified' as HazardStatus,
    description: '排土场南侧防尘网破损约50平方米',
    location: '排土场南侧',
    reporter: '孙七',
    reportTime: '2024-02-25 10:15',
    assignee: '周八',
    deadline: '2024-02-27 18:00',
    photos: ['/static/hazard3.jpg'],
    rectification: {
      measures: '已更换新防尘网，加固周边固定点',
      photos: ['/static/hazard3-fixed.jpg'],
      submitTime: '2024-02-26 15:30',
    },
    verification: {
      result: 'passed' as const,
      comment: '整改符合要求',
      verifier: '吴九',
      verifyTime: '2024-02-27 09:00',
    },
  },
  {
    id: '4',
    name: '照明设施故障',
    level: 'general' as HazardLevel,
    status: 'rejected' as HazardStatus,
    description: '办公区北侧路灯不亮，影响夜间通行安全',
    location: '办公区北侧道路',
    reporter: '郑十',
    reportTime: '2024-02-24 16:45',
    assignee: '刘十一',
    deadline: '2024-02-26 18:00',
    photos: ['/static/hazard4.jpg'],
    rectification: {
      measures: '已更换灯泡',
      photos: ['/static/hazard4-fixed.jpg'],
      submitTime: '2024-02-25 10:00',
    },
    verification: {
      result: 'failed' as const,
      comment: '照明亮度仍不足，需更换更大功率灯具',
      verifier: '陈十二',
      verifyTime: '2024-02-26 11:30',
    },
  },
])

// 筛选后的列表
const filteredList = computed(() => {
  return hazardList.value.filter((item) => {
    if (selectedLevel.value !== 'all' && item.level !== selectedLevel.value)
      return false
    if (selectedStatus.value !== 'all' && item.status !== selectedStatus.value)
      return false
    return true
  })
})

// 统计数据
const statistics = computed(() => {
  const byStatus = {
    pending: hazardList.value.filter(i => i.status === 'pending').length,
    rectifying: hazardList.value.filter(i => i.status === 'rectifying').length,
    rectified: hazardList.value.filter(i => i.status === 'rectified').length,
    rejected: hazardList.value.filter(i => i.status === 'rejected').length,
  }
  const byLevel = {
    major: hazardList.value.filter(i => i.level === 'major').length,
    large: hazardList.value.filter(i => i.level === 'large').length,
    general: hazardList.value.filter(i => i.level === 'general').length,
  }
  return { byStatus, byLevel }
})

// 加载状态
const loading = ref(false)
const hasMore = ref(true)

// 下拉刷新
async function onRefresh() {
  loading.value = true
  // 模拟API请求
  setTimeout(() => {
    loading.value = false
    uni.showToast({ title: '刷新成功', icon: 'success' })
  }, 1000)
}

// 加载更多
async function onLoadMore() {
  if (loading.value || !hasMore.value)
    return
  loading.value = true
  // 模拟API请求
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 1000)
}

// 点击卡片查看详情
function viewDetail(id: string) {
  uni.navigateTo({
    url: `/safety/hazard/detail?id=${id}`,
  })
}

// 隐患上报
function goReport() {
  uni.navigateTo({
    url: '/pages/safety/hazard/report',
  })
}

// 格式化时间
function formatTime(time: string) {
  const date = new Date(time)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}
</script>

<template>
  <view class="hazard-page min-h-screen bg-gray-100 pb-20">
    <!-- 三级筛选栏 -->
    <view class="filter-bar sticky top-0 z-40 border-b border-gray-200 bg-white">
      <!-- 隐患等级筛选 -->
      <view class="filter-row border-b border-gray-100">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="filter-list flex px-4 py-3">
            <view
              v-for="(config, key) in { all: { label: '全部等级', color: '#6B7280', bgColor: '#F3F4F6' }, ...hazardLevelConfig }"
              :key="key"
              class="filter-item mr-3 flex-shrink-0 rounded-full px-4 py-1.5 text-sm transition-all"
              :class="selectedLevel === key ? 'text-white' : 'text-gray-600'"
              :style="{
                backgroundColor: selectedLevel === key ? config.color : config.bgColor,
              }"
              @tap="selectedLevel = key as HazardLevel"
            >
              {{ config.label }}
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 整改状态筛选 -->
      <view class="filter-row border-b border-gray-100">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="filter-list flex px-4 py-3">
            <view
              v-for="(config, key) in hazardStatusConfig"
              :key="key"
              class="filter-item mr-3 flex-shrink-0 rounded-full px-4 py-1.5 text-sm transition-all"
              :class="selectedStatus === key ? 'text-white' : 'text-gray-600'"
              :style="{
                backgroundColor: selectedStatus === key ? config.color : config.bgColor,
              }"
              @tap="selectedStatus = key as HazardStatus"
            >
              {{ config.label }}
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 排查区域筛选 -->
      <view class="filter-row">
        <scroll-view scroll-x class="whitespace-nowrap" :show-scrollbar="false">
          <view class="filter-list flex px-4 py-3">
            <view
              v-for="(label, key) in areaConfig"
              :key="key"
              class="filter-item mr-3 flex-shrink-0 rounded-full px-4 py-1.5 text-sm transition-all"
              :class="selectedArea === key ? 'text-white bg-blue-700' : 'text-gray-600 bg-gray-100'"
              @tap="selectedArea = key as HazardArea"
            >
              {{ label }}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 统计概览 -->
    <view class="statistics-bar mb-2 flex items-center justify-between bg-white px-4 py-3">
      <view class="stat-item flex items-center">
        <view class="stat-dot mr-1.5 h-2 w-2 rounded-full" style="background-color: #EF4444;" />
        <text class="text-xs text-gray-600">
          未整改 {{ statistics.byStatus.pending }}
        </text>
      </view>
      <view class="stat-item flex items-center">
        <view class="stat-dot mr-1.5 h-2 w-2 rounded-full" style="background-color: #F59E0B;" />
        <text class="text-xs text-gray-600">
          整改中 {{ statistics.byStatus.rectifying }}
        </text>
      </view>
      <view class="stat-item flex items-center">
        <view class="stat-dot mr-1.5 h-2 w-2 rounded-full" style="background-color: #10B981;" />
        <text class="text-xs text-gray-600">
          已整改 {{ statistics.byStatus.rectified }}
        </text>
      </view>
      <view class="stat-item flex items-center">
        <view class="stat-dot mr-1.5 h-2 w-2 rounded-full" style="background-color: #F97316;" />
        <text class="text-xs text-gray-600">
          不合格 {{ statistics.byStatus.rejected }}
        </text>
      </view>
    </view>

    <!-- 隐患列表 -->
    <view class="hazard-list px-3">
      <scroll-view
        scroll-y
        class="h-list"
        refresher-enabled
        :refresher-triggered="loading"
        @refresherrefresh="onRefresh"
        @scrolltolower="onLoadMore"
      >
        <!-- 空状态 -->
        <view v-if="filteredList.length === 0" class="empty-state flex flex-col items-center justify-center py-20">
          <view class="empty-icon mb-4 text-6xl text-gray-300">
            📋
          </view>
          <text class="text-sm text-gray-500">
            暂无隐患数据
          </text>
        </view>

        <!-- 隐患卡片 -->
        <view
          v-for="hazard in filteredList"
          :key="hazard.id"
          class="hazard-card mb-3 overflow-hidden rounded-lg bg-white shadow-sm transition-transform active:scale-98"
          @tap="viewDetail(hazard.id)"
        >
          <!-- 卡片头部 -->
          <view class="card-header flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <view class="flex items-center">
              <!-- 隐患等级标签 -->
              <view
                class="level-badge mr-2 rounded px-2 py-0.5 text-xs font-medium"
                :style="{
                  backgroundColor: hazardLevelConfig[hazard.level].bgColor,
                  color: hazardLevelConfig[hazard.level].color,
                }"
              >
                {{ hazardLevelConfig[hazard.level].label }}
              </view>
              <!-- 隐患名称 -->
              <text class="text-base text-gray-900 font-medium">
                {{ hazard.name }}
              </text>
            </view>
            <!-- 状态标签 -->
            <view
              class="status-badge rounded px-2 py-0.5 text-xs font-medium"
              :style="{
                backgroundColor: hazardStatusConfig[hazard.status].bgColor,
                color: hazardStatusConfig[hazard.status].color,
              }"
            >
              {{ hazardStatusConfig[hazard.status].label }}
            </view>
          </view>

          <!-- 卡片内容 -->
          <view class="card-content px-4 py-3">
            <!-- 隐患描述 -->
            <view class="desc-row mb-3">
              <text class="line-clamp-2 overflow-hidden text-sm text-gray-700">
                {{ hazard.description }}
              </text>
            </view>

            <!-- 位置信息 -->
            <view class="info-row mb-2 flex items-center">
              <view class="icon-box mr-2 text-gray-400">
                📍
              </view>
              <text class="text-xs text-gray-500">
                {{ hazard.location }}
              </text>
            </view>

            <!-- 排查人信息 -->
            <view class="info-row mb-2 flex items-center">
              <view class="icon-box mr-2 text-gray-400">
                👤
              </view>
              <text class="text-xs text-gray-500">
                {{ hazard.reporter }} · {{ formatTime(hazard.reportTime) }}
              </text>
            </view>

            <!-- 整改责任人 -->
            <view v-if="hazard.assignee" class="info-row mb-2 flex items-center">
              <view class="icon-box mr-2 text-gray-400">
                🔧
              </view>
              <text class="text-xs text-gray-500">
                责任人: {{ hazard.assignee }}
              </text>
            </view>

            <!-- 截止时间 -->
            <view v-if="hazard.deadline && hazard.status !== 'rectified'" class="info-row flex items-center">
              <view class="icon-box mr-2" :class="hazard.status === 'pending' ? 'text-red-500' : 'text-gray-400'">
                ⏰
              </view>
              <text
                class="text-xs"
                :class="hazard.status === 'pending' ? 'text-red-500 font-medium' : 'text-gray-500'"
              >
                截止: {{ hazard.deadline }}
              </text>
            </view>

            <!-- 已整改信息 -->
            <view v-if="hazard.status === 'rectified' && hazard.verification" class="verified-info mt-3 border-t border-gray-100 pt-3">
              <view class="flex items-center text-green-600">
                <view class="icon-box mr-1">
                  ✅
                </view>
                <text class="text-xs font-medium">
                  已验收通过
                </text>
                <text class="ml-auto text-xs text-gray-500">
                  {{ hazard.verification.verifier }}
                </text>
              </view>
            </view>

            <!-- 验收不合格信息 -->
            <view v-if="hazard.status === 'rejected' && hazard.verification" class="rejected-info mt-3 border-t border-orange-100 bg-orange-50 px-4 pt-3 -mx-4 -mb-3">
              <view class="flex items-start text-orange-600">
                <view class="icon-box mr-1 mt-0.5">
                  ❌
                </view>
                <view class="flex-1">
                  <text class="text-xs font-medium">
                    验收未通过
                  </text>
                  <text class="mt-1 block text-xs text-orange-700">
                    {{ hazard.verification.comment }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <!-- 卡片底部 -->
          <view v-if="hazard.photos && hazard.photos.length > 0" class="card-footer flex items-center border-t border-gray-100 px-4 py-2">
            <view class="icon-box mr-1 text-gray-400">
              📷
            </view>
            <text class="text-xs text-gray-500">
              {{ hazard.photos.length }}张照片
            </text>
            <view class="ml-auto text-gray-400">
              ›
            </view>
          </view>
        </view>

        <!-- 加载更多 -->
        <view v-if="hasMore && filteredList.length > 0" class="load-more py-4 text-center">
          <view v-if="loading" class="flex items-center justify-center">
            <view class="mr-2 h-4 w-4 animate-spin border-2 border-gray-300 border-t-blue-600 rounded-full" style="animation: spin 0.8s linear infinite;" />
            <text class="text-xs text-gray-500">
              加载中...
            </text>
          </view>
          <text v-else class="text-xs text-gray-400">
            上拉加载更多
          </text>
        </view>

        <!-- 没有更多 -->
        <view v-if="!hasMore && filteredList.length > 0" class="no-more py-4 text-center">
          <text class="text-xs text-gray-400">
            没有更多数据了
          </text>
        </view>
      </scroll-view>
    </view>

    <!-- 隐患上报按钮 (固定右下角) -->
    <view class="report-btn-fixed fixed bottom-24 right-4 z-50">
      <view
        class="report-btn flex items-center justify-center rounded-full bg-blue-700 text-white shadow-lg transition-transform active:scale-95"
        style="width: 56px; height: 56px;"
        @tap="goReport"
      >
        <view class="icon-box text-2xl">
          ➕
        </view>
      </view>
    </view>
  </view>
</template>
