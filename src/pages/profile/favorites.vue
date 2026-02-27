<script setup lang="ts">
// 收藏资料类型定义
interface FavoriteMaterial {
  id: string
  title: string
  type: string
  category: string
  favoriteAt: string
}

definePage({
  name: 'profile-favorites',
  layout: 'default',
  style: {
    navigationBarTitleText: '我的收藏',
  },
})

// 收藏列表数据
const favorites = ref<FavoriteMaterial[]>([
  {
    id: '1',
    title: '露天煤矿边坡监测技术规范',
    type: '安全技术',
    category: 'safety',
    favoriteAt: '2024-02-20 10:30',
  },
  {
    id: '2',
    title: '煤层自燃防治措施手册',
    type: '安全技术',
    category: 'safety',
    favoriteAt: '2024-02-18 14:22',
  },
  {
    id: '3',
    title: '破碎站设备操作指南',
    type: '设备操作',
    category: 'equipment',
    favoriteAt: '2024-02-15 09:15',
  },
])

// 是否正在删除
const deletingId = ref<string>('')

// 删除收藏
function handleDelete(id: string) {
  deletingId.value = id
  uni.showModal({
    title: '确认删除',
    content: '确定要取消收藏该资料吗？',
    success: (res) => {
      if (res.confirm) {
        const index = favorites.value.findIndex(item => item.id === id)
        if (index > -1) {
          favorites.value.splice(index, 1)
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

// 获取类型图标
function getTypeIcon(category: string) {
  const iconMap: Record<string, string> = {
    safety: 'i-carbon-security',
    equipment: 'i-carbon-settings',
    environmental: 'i-carbon-stem-leaf-plot',
    process: 'i-carbon-process',
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
    process: 'text-orange-500',
    emergency: 'text-yellow-500',
  }
  return colorMap[category] || 'text-gray-500'
}

// 点击进入详情
function goToDetail(item: FavoriteMaterial) {
  uni.navigateTo({
    url: `/pages/knowledge/detail?id=${item.id}`,
  })
}

// 前往知识库
function goToKnowledge() {
  uni.switchTab({ url: '/pages/knowledge/index' })
}
</script>

<template>
  <view class="favorites-page min-h-screen bg-gray-50">
    <!-- 收藏列表 -->
    <view v-if="favorites.length > 0" class="favorites-list px-4 py-3">
      <view
        v-for="item in favorites"
        :key="item.id"
        class="favorite-item mb-3 flex items-center gap-3 rounded-xl bg-white p-4 active:opacity-70"
        @tap="goToDetail(item)"
      >
        <!-- 资料图标 -->
        <view
          class="icon-wrapper h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-lg"
          :class="`${getTypeColor(item.category)} bg-opacity-10 bg-current`"
        >
          <text :class="`${getTypeIcon(item.category)} text-2xl`" />
        </view>

        <!-- 资料信息 -->
        <view class="info-wrapper min-w-0 flex-1">
          <view class="title mb-1 truncate text-base text-gray-900 font-medium">
            {{ item.title }}
          </view>
          <view class="meta-info flex items-center gap-2 text-xs text-gray-500">
            <view class="type-badge rounded-full bg-gray-100 px-2 py-0.5">
              {{ item.type }}
            </view>
            <view class="favorite-time">
              收藏于 {{ item.favoriteAt }}
            </view>
          </view>
        </view>

        <!-- 删除按钮 -->
        <view
          class="delete-btn h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-full active:bg-gray-100"
          :class="{ 'opacity-50': deletingId === item.id }"
          @tap.stop="handleDelete(item.id)"
        >
          <text class="i-carbon-trash-can text-xl text-gray-400" />
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state flex flex-col items-center justify-center pt-40">
      <view class="empty-icon mb-4">
        <text class="i-carbon-star text-6xl text-gray-300" />
      </view>
      <view class="empty-text mb-2 text-base text-gray-500">
        暂无收藏
      </view>
      <view class="empty-hint text-sm text-gray-400">
        去知识库发现更多技术资料
      </view>
      <view
        class="goto-knowledge-btn mt-6 rounded-full bg-primary px-6 py-2.5 text-sm text-white active:opacity-80"
        @tap="goToKnowledge"
      >
        前往知识库
      </view>
    </view>
  </view>
</template>

<style scoped>
.favorites-page {
  min-height: 100vh;
}

.favorite-item {
  transition: opacity 0.2s;
}

.delete-btn {
  transition: background-color 0.2s;
}
</style>
