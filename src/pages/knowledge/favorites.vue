<script setup lang="ts">
// 知识库收藏资料类型定义
interface KnowledgeFavorite {
  /** 资料 ID */
  id: string
  /** 资料标题 */
  title: string
  /** 资料类型标签 */
  type: string
  /** 分类（用于图标和颜色） */
  category: 'safety' | 'equipment' | 'environmental' | 'production' | 'emergency'
  /** 收藏时间 */
  favoriteAt: string
  /** 浏览量 */
  views: number
  /** 是否已选中（批量操作） */
  selected?: boolean
}

definePage({
  name: 'knowledge-favorites',
  layout: 'default',
  style: {
    navigationBarTitleText: '我的收藏',
    navigationStyle: 'default',
  },
})

const router = useRouter()

// 排序选项类型
type SortType = 'time' | 'views'

// 状态管理
const favorites = ref<KnowledgeFavorite[]>([
  {
    id: '1',
    title: '露天煤矿边坡监测技术规范',
    type: '安全技术',
    category: 'safety',
    favoriteAt: '2024-02-20 10:30',
    views: 1256,
  },
  {
    id: '2',
    title: '煤层自燃防治措施手册',
    type: '安全技术',
    category: 'safety',
    favoriteAt: '2024-02-18 14:22',
    views: 892,
  },
  {
    id: '3',
    title: '破碎站设备操作指南',
    type: '设备操作',
    category: 'equipment',
    favoriteAt: '2024-02-15 09:15',
    views: 634,
  },
  {
    id: '4',
    title: '矿山环保排放标准手册',
    type: '环保规范',
    category: 'environmental',
    favoriteAt: '2024-02-12 16:45',
    views: 1087,
  },
  {
    id: '5',
    title: '采掘工艺优化方案',
    type: '生产工艺',
    category: 'production',
    favoriteAt: '2024-02-10 11:20',
    views: 445,
  },
])

// 排序类型
const currentSort = ref<SortType>('time')

// 编辑模式
const isEditMode = ref(false)
const selectedIds = ref<Set<string>>(new Set())

// 刷新状态
const refreshing = ref(false)

// 删除操作状态
const deletingId = ref<string>('')

// 排序后的收藏列表
const sortedFavorites = computed(() => {
  const list = [...favorites.value]
  if (currentSort.value === 'time') {
    return list.sort((a, b) => new Date(b.favoriteAt).getTime() - new Date(a.favoriteAt).getTime())
  }
  else {
    return list.sort((a, b) => b.views - a.views)
  }
})

// 全选状态
const isAllSelected = computed(() => {
  return sortedFavorites.value.length > 0 && selectedIds.value.size === sortedFavorites.value.length
})

// 切换排序
function toggleSort(type: SortType) {
  currentSort.value = type
}

// 进入编辑模式
function enterEditMode() {
  isEditMode.value = true
  selectedIds.value.clear()
}

// 退出编辑模式
function exitEditMode() {
  isEditMode.value = false
  selectedIds.value.clear()
}

// 切换选中状态
function toggleSelect(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  }
  else {
    selectedIds.value.add(id)
  }
}

// 全选/反选
function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value.clear()
  }
  else {
    sortedFavorites.value.forEach(item => selectedIds.value.add(item.id))
  }
}

// 取消单个收藏
function handleCancelFavorite(id: string) {
  deletingId.value = id
  uni.showModal({
    title: '取消收藏',
    content: '确定要取消收藏该资料吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        const index = favorites.value.findIndex(item => item.id === id)
        if (index > -1) {
          favorites.value.splice(index, 1)
          selectedIds.value.delete(id)
          uni.showToast({
            title: '已取消收藏',
            icon: 'success',
          })
        }
      }
      deletingId.value = ''
    },
    fail: () => {
      deletingId.value = ''
    },
  })
}

// 批量取消收藏
function handleBatchCancel() {
  if (selectedIds.value.size === 0) {
    uni.showToast({
      title: '请先选择要取消的资料',
      icon: 'none',
    })
    return
  }

  uni.showModal({
    title: '批量取消收藏',
    content: `确定要取消收藏 ${selectedIds.value.size} 项资料吗？`,
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        favorites.value = favorites.value.filter(item => !selectedIds.value.has(item.id))
        selectedIds.value.clear()
        isEditMode.value = false
        uni.showToast({
          title: '已取消收藏',
          icon: 'success',
        })
      }
    },
  })
}

// 下拉刷新
async function handleRefresh() {
  refreshing.value = true
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 1000))
  refreshing.value = false
  uni.showToast({
    title: '刷新成功',
    icon: 'success',
  })
}

// 点击进入详情
function goToDetail(item: KnowledgeFavorite) {
  if (isEditMode.value) {
    toggleSelect(item.id)
    return
  }
  router.push(`/pages/knowledge/detail?id=${item.id}`)
}

// 返回
function goBack() {
  uni.navigateBack()
}

// 获取类型图标
function getTypeIcon(category: string) {
  const iconMap: Record<string, string> = {
    safety: 'i-carbon-security',
    equipment: 'i-carbon-settings',
    environmental: 'i-carbon-stem-leaf-plot',
    production: 'i-carbon-process',
    emergency: 'i-carbon-warning-alt',
  }
  return iconMap[category] || 'i-carbon-document'
}

// 获取类型颜色
function getTypeColor(category: string) {
  const colorMap: Record<string, string> = {
    safety: 'text-red-500',
    equipment: 'text-blue-500',
    environmental: 'text-green-500',
    production: 'text-orange-500',
    emergency: 'text-yellow-500',
  }
  return colorMap[category] || 'text-gray-500'
}

// 获取类型背景色（带透明度）
function getTypeBgColor(category: string) {
  const colorMap: Record<string, string> = {
    safety: 'bg-red-50',
    equipment: 'bg-blue-50',
    environmental: 'bg-green-50',
    production: 'bg-orange-50',
    emergency: 'bg-yellow-50',
  }
  return colorMap[category] || 'bg-gray-50'
}
</script>

<template>
  <view class="knowledge-favorites-page min-h-screen bg-gray-50">
    <!-- 下拉刷新容器 -->
    <scroll-view
      scroll-y
      class="h-screen"
      refresher-enabled
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
    >
      <!-- 顶部工具栏 -->
      <view class="toolbar sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <view class="flex items-center justify-between">
          <!-- 左侧：返回 + 标题 -->
          <view class="flex items-center">
            <view
              class="mr-3 h-8 w-8 flex items-center justify-center rounded-full active:bg-gray-100"
              @tap="goBack"
            >
              <text class="i-carbon-chevron-left text-xl text-gray-700" />
            </view>
            <text class="text-base text-gray-900 font-semibold">
              我的收藏
            </text>
            <text class="ml-2 text-sm text-gray-500">
              ({{ favorites.length }})
            </text>
          </view>

          <!-- 右侧：排序 / 编辑 -->
          <view class="flex items-center gap-3">
            <!-- 排序选择器 -->
            <view
              v-if="!isEditMode"
              class="flex items-center rounded-full bg-gray-100 px-3 py-1.5 active:bg-gray-200"
              @tap="toggleSort(currentSort === 'time' ? 'views' : 'time')"
            >
              <text class="i-carbon-sort-ascending mr-1 text-base text-gray-600" />
              <text class="text-sm text-gray-600">
                {{ currentSort === 'time' ? '按时间' : '按浏览' }}
              </text>
            </view>

            <!-- 编辑 / 完成 -->
            <view
              class="rounded-full px-3 py-1.5 active:opacity-70"
              :class="isEditMode ? 'bg-gray-200 text-gray-700' : 'text-primary'"
              @tap="isEditMode ? exitEditMode() : enterEditMode()"
            >
              <text class="text-sm font-medium">
                {{ isEditMode ? '完成' : '编辑' }}
              </text>
            </view>
          </view>
        </view>

        <!-- 编辑模式底部操作栏 -->
        <view v-if="isEditMode" class="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <view
            class="flex items-center active:opacity-70"
            @tap="toggleSelectAll"
          >
            <view
              class="mr-2 h-5 w-5 flex items-center justify-center border-2 rounded"
              :class="isAllSelected ? 'border-primary bg-primary' : 'border-gray-300'"
            >
              <text
                v-if="isAllSelected"
                class="i-carbon-checkmark text-sm text-white"
              />
            </view>
            <text class="text-sm text-gray-600">
              {{ isAllSelected ? '取消全选' : '全选' }}
            </text>
          </view>

          <view
            class="rounded-full bg-red-500 px-4 py-1.5 active:opacity-80"
            @tap="handleBatchCancel"
          >
            <text class="text-sm text-white font-medium">
              取消收藏 ({{ selectedIds.size }})
            </text>
          </view>
        </view>
      </view>

      <!-- 收藏列表 -->
      <view v-if="sortedFavorites.length > 0" class="favorites-list px-4 py-3">
        <view
          v-for="item in sortedFavorites"
          :key="item.id"
          class="favorite-item mb-3 overflow-hidden rounded-xl bg-white shadow-sm transition-all active:scale-[0.98]"
          @tap="goToDetail(item)"
        >
          <view class="flex items-center gap-3 p-4">
            <!-- 编辑模式：复选框 -->
            <view
              v-if="isEditMode"
              class="mr-1 h-5 w-5 flex flex-shrink-0 items-center justify-center border-2 rounded"
              :class="selectedIds.has(item.id) ? 'border-primary bg-primary' : 'border-gray-300'"
              @tap.stop="toggleSelect(item.id)"
            >
              <text
                v-if="selectedIds.has(item.id)"
                class="i-carbon-checkmark text-sm text-white"
              />
            </view>

            <!-- 资料图标 -->
            <view
              class="icon-wrapper h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-lg"
              :class="getTypeBgColor(item.category)"
            >
              <text :class="`${getTypeIcon(item.category)} text-2xl ${getTypeColor(item.category)}`" />
            </view>

            <!-- 资料信息 -->
            <view class="info-wrapper min-w-0 flex-1">
              <view class="title mb-1.5 truncate text-base text-gray-900 font-medium">
                {{ item.title }}
              </view>
              <view class="meta-info flex items-center gap-2 text-xs text-gray-500">
                <view class="type-badge rounded-full px-2 py-0.5" :class="getTypeBgColor(item.category)">
                  <text :class="getTypeColor(item.category)">
                    {{ item.type }}
                  </text>
                </view>
                <view class="flex items-center gap-1">
                  <text class="i-carbon-time text-xs" />
                  <text>{{ item.favoriteAt }}</text>
                </view>
                <view class="flex items-center gap-1">
                  <text class="i-carbon-view text-xs" />
                  <text>{{ item.views }}</text>
                </view>
              </view>
            </view>

            <!-- 取消收藏按钮（非编辑模式） -->
            <view
              v-if="!isEditMode"
              class="delete-btn h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-full active:bg-gray-100"
              :class="{ 'opacity-50': deletingId === item.id }"
              @tap.stop="handleCancelFavorite(item.id)"
            >
              <text class="i-carbon-star-filled text-xl text-red-500" />
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="empty-state flex flex-col items-center justify-center px-4 pt-40">
        <view class="empty-icon mb-4">
          <text class="i-carbon-star text-6xl text-gray-300" />
        </view>
        <view class="empty-text mb-2 text-base text-gray-500">
          暂无收藏资料
        </view>
        <view class="empty-hint mb-6 text-sm text-gray-400">
          收藏感兴趣的资料，方便随时查看
        </view>
        <view
          class="goto-knowledge-btn rounded-full bg-primary px-6 py-2.5 text-sm text-white active:opacity-80"
          @tap="router.push('/pages/knowledge/index')"
        >
          前往知识库
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.knowledge-favorites-page {
  min-height: 100vh;
}

.favorite-item {
  transition: transform 0.2s;
}

.delete-btn {
  transition: background-color 0.2s;
}
</style>
