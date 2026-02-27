/**
 * 知识库 Store
 *
 * 管理知识库资料状态，包括资料列表、分类筛选、搜索、收藏等功能
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { KnowledgeCategory } from '@/types/pages'

/**
 * 资料项
 */
export interface KnowledgeItem {
  /** 资料唯一标识 */
  id: string
  /** 资料标题 */
  title: string
  /** 资料内容摘要 */
  summary: string
  /** 资料分类 */
  category: KnowledgeCategory
  /** 资料类型（文档、视频、图片等） */
  type: 'document' | 'video' | 'image' | 'audio'
  /** 发布时间 */
  publishTime: string
  /** 浏览量 */
  viewCount: number
  /** 是否已收藏 */
  isFavorite: boolean
  /** 附件列表 */
  attachments: KnowledgeAttachment[]
  /** 创建者 */
  author: {
    id: string
    name: string
    avatar?: string
  }
}

/**
 * 附件信息
 */
export interface KnowledgeAttachment {
  /** 附件 ID */
  id: string
  /** 附件名称 */
  name: string
  /** 文件大小（字节） */
  size: number
  /** 文件类型 */
  mimeType: string
  /** 下载 URL */
  url: string
}

/**
 * 分类统计
 */
export interface CategoryStats {
  /** 分类 */
  category: KnowledgeCategory
  /** 该分类下的资料数量 */
  count: number
}

/**
 * Store 状态
 */
export interface KnowledgeState {
  /** 资料列表 */
  itemList: KnowledgeItem[]
  /** 当前选中的分类 */
  activeCategory: KnowledgeCategory
  /** 分页信息 - 当前页码 */
  currentPage: number
  /** 分页信息 - 每页数量 */
  pageSize: number
  /** 分页信息 - 总数量 */
  total: number
  /** 加载状态 */
  loading: boolean
  /** 搜索关键词 */
  searchKeyword: string
  /** 我的收藏列表 */
  favorites: KnowledgeItem[]
  /** 分类统计 */
  categoryStats: CategoryStats[]
  /** 是否还有更多数据 */
  hasMore: boolean
}

export const useKnowledgeStore = defineStore('knowledge', () => {
  // ==================== 状态定义 ====================

  /** 资料列表 */
  const itemList = ref<KnowledgeItem[]>([])

  /** 当前选中的分类 */
  const activeCategory = ref<KnowledgeCategory>('safety')

  /** 分页信息 */
  const currentPage = ref(1)
  const pageSize = ref(20)
  const total = ref(0)

  /** 加载状态 */
  const loading = ref(false)

  /** 搜索关键词 */
  const searchKeyword = ref('')

  /** 我的收藏列表 */
  const favorites = ref<KnowledgeItem[]>([])

  /** 分类统计 */
  const categoryStats = ref<CategoryStats[]>([])

  /** 是否还有更多数据 */
  const hasMore = ref(true)

  /** 上次访问时间 */
  const lastVisitTime = ref<string>(uni.getStorageSync('knowledge_last_visit_time') || new Date(0).toISOString())

  /** 新资料数量 */
  const newMaterialsCount = ref(0)

  // ==================== 计算属性 ====================

  /**
   * 是否在搜索状态
   */
  const isSearching = computed(() => searchKeyword.value.length > 0)

  /**
   * 是否有更多收藏
   */
  const hasMoreFavorites = computed(() => favorites.value.length < total.value)

  /**
   * 当前分类的资料数量
   */
  const currentCategoryCount = computed(() => {
    const stats = categoryStats.value.find(s => s.category === activeCategory.value)
    return stats?.count ?? 0
  })

  /**
   * 收藏的资料 ID 列表
   */
  const favoriteIds = computed(() => favorites.value.map(f => f.id))

  /**
   * 是否有新资料
   */
  const hasNewMaterial = computed(() => newMaterialsCount.value > 0)

  // ==================== Actions ====================

  /**
   * 获取资料列表
   * @param refresh 是否刷新列表（重置页码）
   */
  async function fetchList(refresh = false): Promise<void> {
    if (loading.value)
      return

    try {
      loading.value = true

      if (refresh) {
        currentPage.value = 1
        itemList.value = []
      }

      // TODO: 调用 API 获取资料列表
      // const response = await Apis.knowledge.getList({
      //   category: activeCategory.value,
      //   page: currentPage.value,
      //   pageSize: pageSize.value,
      //   keyword: searchKeyword.value,
      // })

      // 模拟 API 响应
      await new Promise(resolve => setTimeout(resolve, 500))

      // 更新列表数据
      // itemList.value = response.data.list
      // total.value = response.data.total
      // hasMore.value = itemList.value.length < total.value

      // 模拟数据
      const mockItems: KnowledgeItem[] = Array.from({ length: 10 }, (_, i) => ({
        id: `knowledge_${currentPage.value}_${i}`,
        title: `资料标题 ${currentPage.value}-${i}`,
        summary: `这是资料内容的摘要描述...`,
        category: activeCategory.value,
        type: ['document', 'video', 'image', 'audio'][i % 4] as KnowledgeItem['type'],
        publishTime: new Date().toISOString(),
        viewCount: Math.floor(Math.random() * 1000),
        isFavorite: favoriteIds.value.includes(`knowledge_${currentPage.value}_${i}`),
        attachments: [],
        author: {
          id: 'author_1',
          name: '张三',
          avatar: '',
        },
      }))

      if (refresh) {
        itemList.value = mockItems
      }
      else {
        itemList.value = [...itemList.value, ...mockItems]
      }

      total.value = 50
      hasMore.value = itemList.value.length < total.value
    }
    catch (error) {
      console.error('[KnowledgeStore] 获取资料列表失败:', error)
      uni.showToast({
        title: '获取资料列表失败',
        icon: 'none',
      })
      throw error
    }
    finally {
      loading.value = false
    }
  }

  /**
   * 加载更多资料
   */
  async function loadMore(): Promise<void> {
    if (loading.value || !hasMore.value)
      return

    currentPage.value++
    await fetchList(false)
  }

  /**
   * 根据关键词搜索资料
   * @param keyword 搜索关键词
   */
  async function searchByKeyword(keyword: string): Promise<void> {
    searchKeyword.value = keyword
    await fetchList(true)
  }

  /**
   * 切换分类
   * @param category 目标分类
   */
  async function setCategory(category: KnowledgeCategory): Promise<void> {
    if (activeCategory.value === category)
      return

    activeCategory.value = category
    await fetchList(true)
  }

  /**
   * 切换收藏状态
   * @param id 资料 ID
   */
  function toggleFavorite(id: string): void {
    const index = favorites.value.findIndex(f => f.id === id)

    if (index !== -1) {
      // 取消收藏
      favorites.value.splice(index, 1)
      uni.setStorageSync(`fav_knowledge_${id}`, 'false')
    }
    else {
      // 添加收藏 - 需要从列表中找到该资料
      const item = itemList.value.find(i => i.id === id)
      if (item) {
        favorites.value.unshift({ ...item, isFavorite: true })
        uni.setStorageSync(`fav_knowledge_${id}`, 'true')
      }
    }

    // 更新列表中的收藏状态
    const listItem = itemList.value.find(i => i.id === id)
    if (listItem) {
      listItem.isFavorite = !listItem.isFavorite
    }

    // TODO: 调用 API 同步收藏状态到服务器
  }

  /**
   * 获取收藏列表
   * @param refresh 是否刷新
   */
  async function fetchFavorites(refresh = false): Promise<void> {
    try {
      loading.value = true

      if (refresh) {
        favorites.value = []
      }

      // TODO: 调用 API 获取收藏列表
      // const response = await Apis.knowledge.getFavorites()

      // 模拟 API 响应
      await new Promise(resolve => setTimeout(resolve, 300))

      // 从本地存储恢复收藏状态
      const storageKeys = uni.getStorageInfoSync().keys.filter(k => k.startsWith('fav_knowledge_'))
      const favoriteItems: KnowledgeItem[] = []

      for (const key of storageKeys) {
        const status = uni.getStorageSync(key)
        if (status === 'true') {
          const id = key.replace('fav_knowledge_', '')
          const item = itemList.value.find(i => i.id === id)
          if (item) {
            favoriteItems.push({ ...item, isFavorite: true })
          }
        }
      }

      favorites.value = favoriteItems
    }
    catch (error) {
      console.error('[KnowledgeStore] 获取收藏列表失败:', error)
      uni.showToast({
        title: '获取收藏列表失败',
        icon: 'none',
      })
      throw error
    }
    finally {
      loading.value = false
    }
  }

  /**
   * 获取资料详情
   * @param id 资料 ID
   */
  async function fetchDetail(id: string): Promise<KnowledgeItem | null> {
    try {
      // TODO: 调用 API 获取资料详情
      // const response = await Apis.knowledge.getDetail({ id })
      // return response.data

      // 先从本地列表查找
      let item = itemList.value.find(i => i.id === id)
      if (!item) {
        item = favorites.value.find(f => f.id === id)
      }

      return item || null
    }
    catch (error) {
      console.error('[KnowledgeStore] 获取资料详情失败:', error)
      uni.showToast({
        title: '获取资料详情失败',
        icon: 'none',
      })
      return null
    }
  }

  /**
   * 增加浏览量
   * @param id 资料 ID
   */
  async function incrementViewCount(id: string): Promise<void> {
    try {
      // TODO: 调用 API 增加浏览量
      // await Apis.knowledge.incrementView({ id })

      // 更新本地数据
      const item = itemList.value.find(i => i.id === id)
      if (item) {
        item.viewCount++
      }

      const favoriteItem = favorites.value.find(f => f.id === id)
      if (favoriteItem) {
        favoriteItem.viewCount++
      }
    }
    catch (error) {
      console.error('[KnowledgeStore] 增加浏览量失败:', error)
    }
  }

  /**
   * 下载附件
   * @param _id 附件 ID
   */
  async function downloadAttachment(_id: string): Promise<void> {
    try {
      // TODO: 调用 API 获取下载链接并下载
      // const response = await Apis.knowledge.downloadAttachment({ id })

      uni.showLoading({
        title: '下载中...',
      })

      // 模拟下载
      await new Promise(resolve => setTimeout(resolve, 1000))

      uni.hideLoading()
      uni.showToast({
        title: '下载成功',
        icon: 'success',
      })
    }
    catch (error) {
      uni.hideLoading()
      console.error('[KnowledgeStore] 下载附件失败:', error)
      uni.showToast({
        title: '下载失败',
        icon: 'none',
      })
      throw error
    }
  }

  /**
   * 获取分类统计
   */
  async function fetchCategoryStats(): Promise<void> {
    try {
      // TODO: 调用 API 获取分类统计
      // const response = await Apis.knowledge.getCategoryStats()
      // categoryStats.value = response.data

      // 模拟数据
      categoryStats.value = [
        { category: 'safety', count: 12 },
        { category: 'equipment', count: 8 },
        { category: 'environmental', count: 15 },
        { category: 'production', count: 10 },
        { category: 'emergency', count: 5 },
      ]
    }
    catch (error) {
      console.error('[KnowledgeStore] 获取分类统计失败:', error)
    }
  }

  /**
   * 清空搜索
   */
  function clearSearch(): void {
    searchKeyword.value = ''
    fetchList(true)
  }

  /**
   * 从本地存储恢复收藏状态
   */
  function restoreFavorites(): void {
    itemList.value.forEach((item) => {
      const favStatus = uni.getStorageSync(`fav_knowledge_${item.id}`)
      item.isFavorite = favStatus === 'true'
    })
  }

  /**
   * 检查是否有新资料
   */
  async function checkNewMaterials(): Promise<void> {
    try {
      // TODO: 调用 API 检查新资料数量
      // const response = await Apis.knowledge.checkNew({
      //   lastVisitTime: lastVisitTime.value,
      // })
      // newMaterialsCount.value = response.data.count

      // 模拟：检查资料列表中是否有 7 天内发布的资料
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const newItems = itemList.value.filter((item) => {
        const publishDate = new Date(item.publishTime)
        return publishDate > sevenDaysAgo && publishDate > new Date(lastVisitTime.value)
      })

      newMaterialsCount.value = newItems.length
    }
    catch (error) {
      console.error('[KnowledgeStore] 检查新资料失败:', error)
    }
  }

  /**
   * 标记为已读（清除新资料角标）
   */
  function markAsRead(): void {
    const now = new Date().toISOString()
    lastVisitTime.value = now
    uni.setStorageSync('knowledge_last_visit_time', now)
    newMaterialsCount.value = 0
  }

  /**
   * 重置状态
   */
  function reset(): void {
    itemList.value = []
    activeCategory.value = 'safety'
    currentPage.value = 1
    total.value = 0
    loading.value = false
    searchKeyword.value = ''
    hasMore.value = true
  }

  // ==================== 初始化 ====================

  // 从本地存储恢复收藏状态
  restoreFavorites()

  // ==================== 返回 ====================

  return {
    // State
    itemList,
    activeCategory,
    currentPage,
    pageSize,
    total,
    loading,
    searchKeyword,
    favorites,
    categoryStats,
    hasMore,
    lastVisitTime,
    newMaterialsCount,

    // Computed
    isSearching,
    hasMoreFavorites,
    currentCategoryCount,
    favoriteIds,
    hasNewMaterial,

    // Actions
    fetchList,
    loadMore,
    searchByKeyword,
    setCategory,
    toggleFavorite,
    fetchFavorites,
    fetchDetail,
    incrementViewCount,
    downloadAttachment,
    fetchCategoryStats,
    clearSearch,
    restoreFavorites,
    checkNewMaterials,
    markAsRead,
    reset,
  }
})
