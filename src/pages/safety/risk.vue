<script setup lang="ts">
// 导入类型定义
import type { RiskLevel, RiskStatus } from '@/types'

definePage({
  name: 'safety-risk',
  layout: 'default',
  style: {
    navigationBarTitleText: '风险管控',
    navigationBarBackgroundColor: '#1E40AF',
    navigationBarTextStyle: 'white',
  },
})

// 风险等级配置
const riskLevelConfig: Record<RiskLevel, { label: string, color: string, bg: string }> = {
  major: { label: '重大风险', color: '#EF4444', bg: '#FEE2E2' },
  large: { label: '较大风险', color: '#F97316', bg: '#FFEDD5' },
  general: { label: '一般风险', color: '#F59E0B', bg: '#FEF3C7' },
  low: { label: '低风险', color: '#3B82F6', bg: '#DBEAFE' },
}

// 风险状态配置
const riskStatusConfig: Record<RiskStatus, { label: string, color: string }> = {
  active: { label: '未管控', color: '#EF4444' },
  controlled: { label: '已管控', color: '#10B981' },
  eliminated: { label: '已消除', color: '#6B7280' },
}

// 当前筛选等级
const selectedLevel = ref<RiskLevel | 'all'>('all')

// 风险列表数据
const riskList = ref([
  {
    id: '1',
    name: '边坡失稳风险',
    level: 'major' as RiskLevel,
    manager: '张三',
    measures: ['每日监测', '设置警示标识', '限制作业范围'],
    location: '东采区边坡',
    status: 'active' as RiskStatus,
    updateTime: '2024-01-15 10:30',
  },
  {
    id: '2',
    name: '瓦斯积聚风险',
    level: 'large' as RiskLevel,
    manager: '李四',
    measures: ['加强通风', '实时监测', '定期检查'],
    location: '井下作业面',
    status: 'controlled' as RiskStatus,
    updateTime: '2024-01-14 15:20',
  },
  {
    id: '3',
    name: '运输道路滑坡风险',
    level: 'general' as RiskLevel,
    manager: '王五',
    measures: ['定期巡查', '排水维护'],
    location: '3号运输道路',
    status: 'controlled' as RiskStatus,
    updateTime: '2024-01-13 09:00',
  },
  {
    id: '4',
    name: '设备操作风险',
    level: 'low' as RiskLevel,
    manager: '赵六',
    measures: ['持证上岗', '定期培训'],
    location: '全矿区',
    status: 'active' as RiskStatus,
    updateTime: '2024-01-12 14:45',
  },
  {
    id: '5',
    name: '电气火灾风险',
    level: 'large' as RiskLevel,
    manager: '孙七',
    measures: ['定期检修', '配置灭火设施', '加强巡检'],
    location: '配电室',
    status: 'active' as RiskStatus,
    updateTime: '2024-01-11 16:30',
  },
  {
    id: '6',
    name: '粉尘爆炸风险',
    level: 'major' as RiskLevel,
    manager: '周八',
    measures: ['洒水降尘', '控制火源', '加强监测'],
    location: '破碎站',
    status: 'controlled' as RiskStatus,
    updateTime: '2024-01-10 11:15',
  },
])

// 筛选后的风险列表
const filteredRiskList = computed(() => {
  if (selectedLevel.value === 'all') {
    return riskList.value
  }
  return riskList.value.filter(risk => risk.level === selectedLevel.value)
})

// 选择等级筛选
function selectLevel(level: RiskLevel | 'all') {
  selectedLevel.value = level
}

// 查看风险详情
function viewRiskDetail(riskId: string) {
  uni.navigateTo({
    url: `/safety/risk/detail?id=${riskId}`,
  })
}

// 风险上报
function reportRisk() {
  uni.navigateTo({
    url: '/pages/safety/risk/report',
  })
}

// 下拉刷新（供页面刷新使用）
function _onRefresh() {
  uni.showLoading({ title: '加载中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '刷新成功', icon: 'success' })
  }, 1000)
}
</script>

<template>
  <view class="risk-page min-h-screen bg-[#F3F4F6] pb-[140rpx]">
    <!-- 风险等级筛选栏 -->
    <view class="filter-section sticky top-0 z-10 bg-white px-[32rpx] py-[24rpx]">
      <scroll-view
        scroll-x
        :show-scrollbar="false"
        class="filter-scroll"
      >
        <view class="filter-container flex items-center gap-[16rpx]">
          <view
            class="filter-item flex items-center gap-[8rpx] rounded-[8rpx] px-[24rpx] py-[12rpx] transition-all duration-200"
            :class="selectedLevel === 'all' ? 'bg-[#1E40AF] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'"
            @tap="selectLevel('all')"
          >
            <text class="text-[28rpx] font-medium">
              全部
            </text>
            <view class="count-badge rounded-[4rpx] px-[8rpx] py-[2rpx] text-[20rpx]" :class="selectedLevel === 'all' ? 'bg-white/20' : 'bg-[#E5E7EB]'">
              {{ riskList.length }}
            </view>
          </view>

          <view
            v-for="(config, level) in riskLevelConfig"
            :key="level"
            class="filter-item flex items-center gap-[8rpx] rounded-[8rpx] px-[24rpx] py-[12rpx] transition-all duration-200"
            :class="selectedLevel === level ? 'bg-[#1E40AF] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'"
            @tap="selectLevel(level as RiskLevel)"
          >
            <view class="h-[16rpx] w-[16rpx] rounded-full" :style="{ backgroundColor: config.color }" />
            <text class="text-[28rpx] font-medium">
              {{ config.label }}
            </text>
            <view
              class="count-badge rounded-[4rpx] px-[8rpx] py-[2rpx] text-[20rpx]"
              :class="selectedLevel === level ? 'bg-white/20' : 'bg-[#E5E7EB]'"
            >
              {{ riskList.filter(r => r.level === level).length }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 风险列表 -->
    <view class="risk-list px-[32rpx] py-[24rpx]">
      <!-- 空状态 -->
      <view v-if="filteredRiskList.length === 0" class="empty-state flex flex-col items-center justify-center py-[120rpx]">
        <view class="mb-[32rpx] h-[240rpx] w-[240rpx] opacity-30">
          <text class="text-[200rpx] text-[#9CA3AF]">
            📋
          </text>
        </view>
        <text class="text-[28rpx] text-[#9CA3AF]">
          暂无风险数据
        </text>
      </view>

      <!-- 风险卡片列表 -->
      <view v-else class="risk-cards flex flex-col gap-[16rpx]">
        <view
          v-for="risk in filteredRiskList"
          :key="risk.id"
          class="risk-card rounded-[16rpx] bg-white p-[24rpx] shadow-sm transition-transform duration-200 active:scale-[0.98]"
          @tap="viewRiskDetail(risk.id)"
        >
          <!-- 卡片头部 -->
          <view class="card-header mb-[16rpx] flex items-center justify-between">
            <view class="flex flex-1 items-center gap-[12rpx]">
              <view
                class="level-badge rounded-[4rpx] px-[12rpx] py-[6rpx]"
                :style="{ backgroundColor: riskLevelConfig[risk.level].bg }"
              >
                <text class="text-[24rpx] font-medium" :style="{ color: riskLevelConfig[risk.level].color }">
                  {{ riskLevelConfig[risk.level].label }}
                </text>
              </view>
              <view
                class="status-badge rounded-[4rpx] px-[12rpx] py-[6rpx]"
                :style="{ backgroundColor: `${riskStatusConfig[risk.status].color}20` }"
              >
                <text class="text-[24rpx] font-medium" :style="{ color: riskStatusConfig[risk.status].color }">
                  {{ riskStatusConfig[risk.status].label }}
                </text>
              </view>
            </view>
            <view class="i-carbon-chevron-right text-[32rpx] text-[#9CA3AF]" />
          </view>

          <!-- 风险名称 -->
          <view class="risk-name mb-[16rpx]">
            <text class="text-[32rpx] text-[#1F2937] font-bold">
              {{ risk.name }}
            </text>
          </view>

          <!-- 风险信息 -->
          <view class="risk-info flex flex-col gap-[12rpx]">
            <!-- 管控责任人 -->
            <view class="info-row flex items-center gap-[8rpx]">
              <view class="i-carbon-user text-[28rpx] text-[#6B7280]" />
              <text class="text-[26rpx] text-[#6B7280]">
                管控责任人：
              </text>
              <text class="text-[26rpx] text-[#1F2937] font-medium">
                {{ risk.manager }}
              </text>
            </view>

            <!-- 风险位置 -->
            <view class="info-row flex items-center gap-[8rpx]">
              <view class="i-carbon-location text-[28rpx] text-[#6B7280]" />
              <text class="text-[26rpx] text-[#6B7280]">
                风险位置：
              </text>
              <text class="text-[26rpx] text-[#1F2937] font-medium">
                {{ risk.location }}
              </text>
            </view>

            <!-- 管控措施 -->
            <view class="info-row flex flex-col gap-[8rpx]">
              <view class="flex items-center gap-[8rpx]">
                <view class="i-carbon-task text-[28rpx] text-[#6B7280]" />
                <text class="text-[26rpx] text-[#6B7280]">
                  管控措施：
                </text>
              </view>
              <view class="measures-list flex flex-wrap gap-[8rpx] pl-[36rpx]">
                <view
                  v-for="(measure, index) in risk.measures.slice(0, 3)"
                  :key="index"
                  class="measure-item rounded-[4rpx] bg-[#F3F4F6] px-[12rpx] py-[6rpx]"
                >
                  <text class="text-[24rpx] text-[#4B5563]">
                    {{ measure }}
                  </text>
                </view>
                <text v-if="risk.measures.length > 3" class="text-[24rpx] text-[#3B82F6]">
                  +{{ risk.measures.length - 3 }}
                </text>
              </view>
            </view>
          </view>

          <!-- 更新时间 -->
          <view class="update-time mt-[16rpx] border-t border-[#E5E7EB] pt-[16rpx]">
            <text class="text-[22rpx] text-[#9CA3AF]">
              更新时间：{{ risk.updateTime }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 风险上报按钮 -->
    <view
      class="report-button fixed bottom-[140rpx] right-[32rpx] z-20 h-[112rpx] w-[112rpx] flex items-center justify-center rounded-full bg-[#1E40AF] shadow-lg transition-transform duration-200 active:scale-95"
      @tap="reportRisk"
    >
      <view class="i-carbon-add text-[48rpx] text-white" />
    </view>
  </view>
</template>
