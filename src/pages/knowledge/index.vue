<script setup lang="ts">
/**
 * 知识库主页面
 *
 * 功能：
 * 1. 搜索栏 - 支持按资料标题、内容搜索
 * 2. 资料分类 - 横向滑动分类筛选
 * 3. 资料列表 - 展示技术资料列表
 * 4. 下拉刷新 - 支持下拉刷新数据
 * 5. 上拉加载 - 支持上拉加载更多
 */

import { useRouter } from '@wot-ui/router'
import { computed, onMounted, ref } from 'vue'

import type { KnowledgeCategory } from '@/types/pages'

import { useKnowledgeStore } from '@/store/knowledgeStore'
import { useUserStore } from '@/store/userStore'
import { getMaterialTypeColor, getMaterialTypeLabel } from '@/types/knowledge'

definePage({
  name: 'knowledge',
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    enablePullDownRefresh: true,
  },
})

// ==================== 路由 ====================
const router = useRouter()

// ==================== Store ====================
const knowledgeStore = useKnowledgeStore()
const userStore = useUserStore()

// ==================== 响应式数据 ====================
/** 状态栏高度 */
const statusBarHeight = ref(0)

/** 自定义导航栏高度 */
const navBarHeight = computed(() => 44) // uni-app 默认导航栏高度

/** 分类标签列表 */
const categoryTabs = computed(() => {
  return [
    { value: 'all' as KnowledgeCategory | 'all', label: '全部资料' },
    { value: 'safety' as KnowledgeCategory, label: '安全技术' },
    { value: 'equipment' as KnowledgeCategory, label: '设备操作' },
    { value: 'environmental' as KnowledgeCategory, label: '环保规范' },
    { value: 'production' as KnowledgeCategory, label: '生产工艺' },
    { value: 'emergency' as KnowledgeCategory, label: '应急处置' },
  ]
})

/** 当前选中的分类 */
const activeCategory = ref<KnowledgeCategory | 'all'>('all')

/** 资料列表 */
const materialList = computed(() => knowledgeStore.itemList)

/** 加载状态 */
const loading = computed(() => knowledgeStore.loading)

/** 是否还有更多 */
const hasMore = computed(() => knowledgeStore.hasMore)

/** 是否为空列表 */
const isEmpty = computed(() => materialList.value.length === 0 && !loading.value)

/** 是否为管理员 */
const isAdmin = computed(() => userStore.userInfo?.role === 'admin')

// ==================== 方法 ====================

/**
 * 跳转到管理页面
 */
function goToManage() {
  router.push('/pages/knowledge/manage')
}

/**
 * 跳转到搜索页面
 */
function goToSearch() {
  router.push('/pages/knowledge/search')
}

/**
 * 切换分类
 */
async function handleCategoryChange(category: KnowledgeCategory | 'all') {
  if (activeCategory.value === category)
    return

  activeCategory.value = category

  // 转换分类类型
  const targetCategory = category === 'all' ? 'safety' : category
  await knowledgeStore.setCategory(targetCategory)
}

/**
 * 跳转到资料详情
 */
function goToDetail(id: string) {
  router.push({
    path: '/knowledge/detail',
    query: { id },
  })
}

/**
 * 格式化浏览量
 */
function formatViewCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return String(count)
}

/**
 * 判断是否为新资料（7天内）
 */
function isNewMaterial(publishTime: string): boolean {
  const publishDate = new Date(publishTime)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff <= 7
}

/**
 * 下拉刷新
 */
async function onRefresh() {
  try {
    await knowledgeStore.fetchList(true)
    uni.stopPullDownRefresh()
    uni.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500,
    })
  }
  catch {
    uni.stopPullDownRefresh()
    uni.showToast({
      title: '刷新失败',
      icon: 'none',
    })
  }
}

/**
 * 上拉加载更多
 */
async function onLoadMore() {
  if (hasMore.value && !loading.value) {
    await knowledgeStore.loadMore()
  }
}

/**
 * 格式化日期显示
 */
function formatDate(publishTime: string): string {
  const date = new Date(publishTime)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff === 0) {
    return '今天'
  }
  if (daysDiff === 1) {
    return '昨天'
  }
  if (daysDiff < 7) {
    return `${daysDiff}天前`
  }

  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// ==================== 生命周期 ====================

onMounted(async () => {
  // 获取状态栏高度
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0

  await knowledgeStore.fetchList(true)

  // 检查是否有新资料
  await knowledgeStore.checkNewMaterials()

  // 如果有新资料，用户查看后自动标记为已读
  if (knowledgeStore.hasNewMaterial) {
    setTimeout(() => {
      knowledgeStore.markAsRead()
    }, 2000)
  }
})

// ==================== 监听下拉刷新事件 ====================
onPullDownRefresh(async () => {
  await onRefresh()
})

// ==================== 监听上拉加载事件 ====================
onReachBottom(() => {
  onLoadMore()
})
</script>

<template>
  <view class="knowledge-page min-h-screen bg-gray-50">
    <!-- 自定义标题栏 -->
    <view
      class="custom-navbar bg-white"
      :style="{ paddingTop: `${statusBarHeight}px` }"
    >
      <view class="navbar-content flex items-center justify-between px-4" :style="{ height: `${navBarHeight}px` }">
        <!-- 左侧标题 -->
        <view class="navbar-title">
          <text class="text-lg text-gray-900 font-bold">
            知识库
          </text>
        </view>

        <!-- 右侧按钮组 -->
        <view class="navbar-actions flex items-center gap-3">
          <!-- 管理按钮（仅管理员可见） -->
          <view
            v-if="isAdmin"
            class="manage-btn h-8 w-8 flex items-center justify-center rounded-full active:bg-gray-100"
            @tap="goToManage"
          >
            <text class="i-carbon-settings-adjust text-lg text-gray-700" />
          </view>

          <!-- 搜索按钮 -->
          <view class="navbar-action relative" @tap="goToSearch">
            <view class="search-btn h-8 w-8 flex items-center justify-center rounded-full active:bg-gray-100">
              <text class="i-carbon-search text-lg text-gray-700" />
            </view>
            <!-- 新资料角标 -->
            <view
              v-if="knowledgeStore.hasNewMaterial && knowledgeStore.newMaterialsCount > 0"
              class="absolute h-4 min-w-4 flex items-center justify-center badge rounded-full bg-red-500 px-1 -right-1 -top-1"
            >
              <text class="text-xs text-white font-medium">
                {{ knowledgeStore.newMaterialsCount > 99 ? '99+' : knowledgeStore.newMaterialsCount }}
              </text>
            </view>
            <view
              v-else-if="knowledgeStore.hasNewMaterial"
              class="absolute right-0 top-0 h-2 w-2 badge rounded-full bg-red-500"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 资料分类 -->
    <view class="category-tabs border-b border-gray-200 bg-white">
      <scroll-view
        scroll-x
        :show-scrollbar="false"
        class="tabs-scroll"
      >
        <view class="tabs-list flex items-center px-4">
          <view
            v-for="tab in categoryTabs"
            :key="tab.value"
            class="tab-item relative flex-shrink-0 px-4 py-3"
            :class="{ active: activeCategory === tab.value }"
            @click="handleCategoryChange(tab.value as KnowledgeCategory | 'all')"
          >
            <text
              class="tab-text text-sm font-medium"
              :class="activeCategory === tab.value ? 'text-primary' : 'text-gray-600'"
            >
              {{ tab.label }}
            </text>
            <view
              v-if="activeCategory === tab.value"
              class="tab-indicator absolute bottom-0 left-1/2 h-0.5 w-4 rounded-full -translate-x-1/2"
            />
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 资料列表 -->
    <view class="material-list px-4 py-3">
      <!-- 空状态 -->
      <view
        v-if="isEmpty"
        class="empty-state flex flex-col items-center justify-center py-16"
      >
        <text class="i-carbon-document mb-4 text-6xl text-gray-300" />
        <text class="text-sm text-gray-500">
          暂无资料
        </text>
      </view>

      <!-- 资料卡片列表 -->
      <view
        v-for="item in materialList"
        :key="item.id"
        class="material-card mb-3 rounded-lg bg-white p-4 shadow-sm"
        @click="goToDetail(item.id)"
      >
        <!-- 资料标题 -->
        <view class="mb-2 flex items-start justify-between">
          <view class="flex flex-1 items-center">
            <!-- 新资料角标 -->
            <view
              v-if="isNewMaterial(item.publishTime)"
              class="new-badge mr-2 flex-shrink-0 rounded bg-red-500 px-1.5 py-0.5 text-xs text-white"
            >
              新
            </view>
            <text class="material-title line-clamp-2 flex-1 text-base text-gray-900 font-semibold">
              {{ item.title }}
            </text>
          </view>
        </view>

        <!-- 资料摘要 -->
        <view v-if="item.summary" class="mb-3">
          <text class="line-clamp-2 text-xs text-gray-500">
            {{ item.summary }}
          </text>
        </view>

        <!-- 资料元信息 -->
        <view class="flex items-center justify-between text-xs text-gray-400">
          <!-- 资料类型标签 -->
          <view
            class="type-badge rounded px-2 py-1"
            :style="{ backgroundColor: `${getMaterialTypeColor(item.category as any)}20`, color: getMaterialTypeColor(item.category as any) }"
          >
            <text>{{ getMaterialTypeLabel(item.category as any) }}</text>
          </view>

          <!-- 发布时间和浏览量 -->
          <view class="flex items-center space-x-3">
            <view class="flex items-center">
              <text class="i-carbon-time mr-1" />
              <text>{{ formatDate(item.publishTime) }}</text>
            </view>
            <view class="flex items-center">
              <text class="i-carbon-view mr-1" />
              <text>{{ formatViewCount(item.viewCount) }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多提示 -->
      <view
        v-if="hasMore && !loading"
        class="load-more-tip py-4 text-center text-xs text-gray-400"
        @click="onLoadMore"
      >
        <text>点击加载更多</text>
      </view>

      <!-- 加载中状态 -->
      <view
        v-if="loading && materialList.length > 0"
        class="loading-state py-4 text-center"
      >
        <wd-loading size="16px" />
        <text class="ml-2 text-xs text-gray-400">
          加载中...
        </text>
      </view>

      <!-- 没有更多了 -->
      <view
        v-if="!hasMore && materialList.length > 0"
        class="no-more-tip py-4 text-center text-xs text-gray-400"
      >
        <text>没有更多了</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.knowledge-page {
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
}

.custom-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #f3f4f6;

  .navbar-content {
    .search-btn {
      transition: all 0.2s;
    }
  }
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-bar {
  .search-input-wrapper {
    transition: all 0.2s;

    &:active {
      background-color: #f3f4f6;
    }
  }

  .search-placeholder {
    flex: 1;
  }
}

.category-tabs {
  .tabs-scroll {
    white-space: nowrap;
  }

  .tab-item {
    transition: all 0.2s;

    &.active {
      .tab-text {
        font-weight: 600;
      }
    }
  }

  .tab-indicator {
    background-color: #1e40af;
  }
}

.material-list {
  .material-card {
    transition: all 0.2s;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }

  .material-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.space-x-3 > * + * {
  margin-left: 12rpx;
}
</style>
