<script setup lang="ts">
definePage({
  name: 'knowledge-search',
  layout: 'default',
  style: {
    navigationBarTitleText: '搜索资料',
  },
})

/**
 * 知识库数据类型
 */
type MaterialType = 'safety' | 'equipment' | 'environmental' | 'production' | 'emergency'

/**
 * 资料分类映射
 */
const MATERIAL_TYPE_MAP: Record<MaterialType, { label: string, color: string }> = {
  safety: { label: '安全技术', color: '#3B82F6' },
  equipment: { label: '设备操作', color: '#10B981' },
  environmental: { label: '环保规范', color: '#22C55E' },
  production: { label: '生产工艺', color: '#F59E0B' },
  emergency: { label: '应急处置', color: '#EF4444' },
}

/**
 * 搜索结果项
 */
interface SearchResultItem {
  id: string
  title: string
  type: MaterialType
  publishTime: string
  viewCount: number
  content: string
}

// === 状态管理 ===
const router = useRouter()
const globalToast = useGlobalToast()
const globalMessage = useGlobalMessage()

// 搜索关键词
const searchKeyword = ref('')
const isSearching = ref(false)
const searchInputFocused = ref(false)

// 搜索历史
const searchHistory = ref<string[]>([])
const HISTORY_STORAGE_KEY = 'knowledge_search_history'
const MAX_HISTORY_COUNT = 10

// 热门搜索关键词
const hotKeywords = ref<string[]>([
  '破碎机操作',
  '应急演练',
  '边坡监测',
  '防灭火措施',
  '环保排放标准',
  '无人驾驶',
  '隐患排查',
  '风险评估',
])

// 搜索结果
const searchResults = ref<SearchResultItem[]>([])
const resultCount = ref(0)
const selectedCategory = ref<MaterialType | 'all'>('all')

// 分类筛选选项
const categoryOptions = ref<{ value: MaterialType | 'all', label: string }[]>([
  { value: 'all', label: '全部' },
  { value: 'safety', label: '安全技术' },
  { value: 'equipment', label: '设备操作' },
  { value: 'environmental', label: '环保规范' },
  { value: 'production', label: '生产工艺' },
  { value: 'emergency', label: '应急处置' },
])

// === 生命周期 ===
onMounted(() => {
  // 加载搜索历史
  loadSearchHistory()
  // 自动聚焦搜索框
  nextTick(() => {
    searchInputFocused.value = true
  })
})

// === 搜索功能 ===

/**
 * 防抖搜索
 */
const debouncedSearch = useDebounceFn(() => {
  performSearch()
}, 300)

/**
 * 执行搜索
 */
function performSearch() {
  const keyword = searchKeyword.value.trim()

  if (!keyword) {
    searchResults.value = []
    resultCount.value = 0
    return
  }

  isSearching.value = true

  // 模拟搜索数据（实际应调用 API）
  setTimeout(() => {
    const mockResults: SearchResultItem[] = [
      {
        id: '1',
        title: `${keyword}相关操作指南`,
        type: 'equipment',
        publishTime: '2024-01-15',
        viewCount: 1234,
        content: `这是一份关于${keyword}的详细操作指南文档，包含了设备操作步骤、注意事项和常见问题解答...`,
      },
      {
        id: '2',
        title: `${keyword}安全管理规范`,
        type: 'safety',
        publishTime: '2024-01-10',
        viewCount: 856,
        content: `本文档详细说明了${keyword}的安全管理要求，包括操作规范、防护措施和应急处理流程...`,
      },
      {
        id: '3',
        title: `${keyword}技术标准`,
        type: 'production',
        publishTime: '2024-01-08',
        viewCount: 642,
        content: `${keyword}技术标准文件，规定了生产工艺参数、质量检测标准和验收要求...`,
      },
      {
        id: '4',
        title: `${keyword}环保要求`,
        type: 'environmental',
        publishTime: '2024-01-05',
        viewCount: 523,
        content: `根据环保法规要求，${keyword}需要符合以下环保标准和排放限值...`,
      },
      {
        id: '5',
        title: `${keyword}应急预案`,
        type: 'emergency',
        publishTime: '2024-01-03',
        viewCount: 445,
        content: `针对${keyword}可能出现的紧急情况，制定应急预案和处置流程...`,
      },
    ]

    // 按分类筛选
    let filteredResults = mockResults
    if (selectedCategory.value !== 'all') {
      filteredResults = mockResults.filter(item => item.type === selectedCategory.value)
    }

    searchResults.value = filteredResults
    resultCount.value = filteredResults.length
    isSearching.value = false

    // 保存搜索历史
    saveSearchHistory(keyword)
  }, 300)
}

/**
 * 输入框变化处理
 */
function handleInputChange(value: string) {
  searchKeyword.value = value
  if (value.trim()) {
    debouncedSearch()
  }
  else {
    searchResults.value = []
    resultCount.value = 0
  }
}

/**
 * 点击搜索按钮
 */
function handleSearch() {
  if (!searchKeyword.value.trim()) {
    globalToast.warning('请输入搜索关键词')
    return
  }
  performSearch()
}

/**
 * 清空搜索
 */
function handleClear() {
  searchKeyword.value = ''
  searchResults.value = []
  resultCount.value = 0
}

/**
 * 点击历史记录或热门关键词
 */
function handleKeywordClick(keyword: string) {
  searchKeyword.value = keyword
  performSearch()
}

// === 搜索历史管理 ===

/**
 * 加载搜索历史
 */
function loadSearchHistory() {
  try {
    const history = uni.getStorageSync(HISTORY_STORAGE_KEY)
    if (Array.isArray(history)) {
      searchHistory.value = history
    }
  }
  catch (error) {
    console.error('加载搜索历史失败:', error)
  }
}

/**
 * 保存搜索历史
 */
function saveSearchHistory(keyword: string) {
  // 去重
  const filteredHistory = searchHistory.value.filter(item => item !== keyword)
  // 添加到开头
  filteredHistory.unshift(keyword)
  // 限制数量
  searchHistory.value = filteredHistory.slice(0, MAX_HISTORY_COUNT)

  try {
    uni.setStorageSync(HISTORY_STORAGE_KEY, searchHistory.value)
  }
  catch (error) {
    console.error('保存搜索历史失败:', error)
  }
}

/**
 * 清空搜索历史
 */
function handleClearHistory() {
  globalMessage.confirm({
    title: '确认清空',
    msg: '确定要清空所有搜索历史吗？',
    success: (res: any) => {
      if (res.action === 'confirm') {
        searchHistory.value = []
        try {
          uni.removeStorageSync(HISTORY_STORAGE_KEY)
          globalToast.success('已清空搜索历史')
        }
        catch (error) {
          console.error('清空搜索历史失败:', error)
        }
      }
    },
  })
}

// === 分类筛选 ===

/**
 * 切换分类
 */
function handleCategoryChange(category: MaterialType | 'all') {
  selectedCategory.value = category
  // 重新执行搜索
  if (searchKeyword.value.trim()) {
    performSearch()
  }
}

// === 高亮关键词 ===

/**
 * 高亮关键词
 */
function highlightKeyword(text: string, keyword: string) {
  if (!keyword.trim()) {
    return text
  }

  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<span class="bg-yellow-200 text-gray-900 px-0.5 rounded">$1</span>')
}

// === 导航 ===

/**
 * 查看资料详情
 */
function goToDetail(item: SearchResultItem) {
  router.push({
    path: '/knowledge/detail',
    query: { id: item.id },
  })
}

// === 语音搜索（可选） ===

/**
 * 开始语音搜索
 */
function handleVoiceSearch() {
  // 语音搜索功能待实现
  globalToast.info('语音搜索功能即将上线')
}
</script>

<template>
  <view class="knowledge-search-page min-h-screen bg-bg-secondary">
    <!-- 搜索输入框 -->
    <view class="search-input-container bg-white p-4">
      <view class="flex items-center gap-2">
        <!-- 搜索图标 -->
        <view class="i-carbon-search text-xl text-gray-400" />

        <!-- 输入框 -->
        <view class="flex-1">
          <wd-search
            v-model="searchKeyword"
            placeholder="输入关键词搜索资料"
            :hide-cancel="true"
            :focus="searchInputFocused"
            @change="handleInputChange"
            @search="handleSearch"
            @clear="handleClear"
          />
        </view>

        <!-- 语音搜索按钮 -->
        <view
          class="voice-btn h-10 w-10 flex items-center justify-center rounded-full bg-gray-100"
          @click="handleVoiceSearch"
        >
          <view class="i-carbon-microphone text-lg text-gray-600" />
        </view>
      </view>
    </view>

    <!-- 搜索结果区域 -->
    <view class="search-content">
      <!-- 搜索中状态 -->
      <view v-if="isSearching" class="flex flex-col items-center justify-center py-12">
        <view class="i-carbon-circle-dash animate-spin text-4xl text-primary" />
        <view class="mt-4 text-sm text-gray-500">
          搜索中...
        </view>
      </view>

      <!-- 有搜索结果 -->
      <view v-else-if="searchResults.length > 0">
        <!-- 结果统计和筛选 -->
        <view class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <view class="text-sm text-gray-600">
            找到 <text class="text-primary font-bold">
              {{ resultCount }}
            </text> 条结果
          </view>

          <!-- 分类筛选 -->
          <scroll-view scroll-x class="category-filter ml-4 flex-1" :show-scrollbar="false">
            <view class="flex gap-2 whitespace-nowrap">
              <view
                v-for="category in categoryOptions"
                :key="category.value"
                class="category-tag rounded-full px-3 py-1 text-sm transition-all"
                :class="selectedCategory === category.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'"
                @click="handleCategoryChange(category.value as MaterialType | 'all')"
              >
                {{ category.label }}
              </view>
            </view>
          </scroll-view>
        </view>

        <!-- 搜索结果列表 -->
        <view class="search-results-list">
          <view
            v-for="item in searchResults"
            :key="item.id"
            class="result-item border-b border-gray-100 bg-white p-4 active:bg-gray-50"
            @click="goToDetail(item)"
          >
            <!-- 资料标题 -->
            <view class="flex items-start gap-3">
              <view class="min-w-0 flex-1">
                <!-- 标题（高亮关键词） -->
                <view
                  v-dompurify-html="highlightKeyword(item.title, searchKeyword)"
                  class="result-title line-clamp-2 mb-2 text-base text-gray-900 font-medium"
                />

                <!-- 分类标签 -->
                <view class="mb-2 flex items-center gap-2">
                  <view
                    class="type-tag rounded px-2 py-0.5 text-xs text-white"
                    :style="{ backgroundColor: MATERIAL_TYPE_MAP[item.type].color }"
                  >
                    {{ MATERIAL_TYPE_MAP[item.type].label }}
                  </view>
                  <view class="text-xs text-gray-400">
                    {{ item.publishTime }}
                  </view>
                  <view class="flex items-center gap-1 text-xs text-gray-400">
                    <view class="i-carbon-view text-xs" />
                    <text>{{ item.viewCount }}</text>
                  </view>
                </view>

                <!-- 内容摘要（高亮关键词） -->
                <view
                  v-dompurify-html="highlightKeyword(item.content, searchKeyword)"
                  class="result-snippet line-clamp-2 text-sm text-gray-600"
                />
              </view>

              <!-- 箭头 -->
              <view class="i-carbon-chevron-right mt-1 text-xl text-gray-300" />
            </view>
          </view>
        </view>
      </view>

      <!-- 无搜索结果 -->
      <view v-else-if="searchKeyword.trim()" class="flex flex-col items-center justify-center py-16">
        <view class="i-carbon-search mb-4 text-6xl text-gray-300" />
        <view class="mb-2 text-base text-gray-500">
          未找到相关资料
        </view>
        <view class="text-sm text-gray-400">
          试试其他关键词或查看热门搜索
        </view>
      </view>

      <!-- 默认显示搜索历史和热门搜索 -->
      <view v-else class="default-content">
        <!-- 搜索历史 -->
        <view v-if="searchHistory.length > 0" class="mb-6">
          <view class="mb-3 flex items-center justify-between px-4">
            <view class="text-base text-gray-900 font-medium">
              搜索历史
            </view>
            <view
              class="flex items-center gap-1 text-sm text-gray-500"
              @click="handleClearHistory"
            >
              <view class="i-carbon-trash-can text-base" />
              <text>清空</text>
            </view>
          </view>

          <!-- 历史标签 -->
          <view class="flex flex-wrap gap-2 px-4">
            <view
              v-for="(keyword, index) in searchHistory"
              :key="index"
              class="history-tag rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              @click="handleKeywordClick(keyword)"
            >
              {{ keyword }}
            </view>
          </view>
        </view>

        <!-- 热门搜索 -->
        <view>
          <view class="mb-3 px-4">
            <view class="text-base text-gray-900 font-medium">
              热门搜索
            </view>
          </view>

          <!-- 热门标签 -->
          <view class="flex flex-wrap gap-2 px-4">
            <view
              v-for="(keyword, index) in hotKeywords"
              :key="index"
              class="hot-tag flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 text-sm text-orange-600"
              @click="handleKeywordClick(keyword)"
            >
              <view class="i-carbon-fire text-orange-500" />
              <text>{{ keyword }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.knowledge-search-page {
  min-height: 100vh;
}

.search-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-input-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-content {
  min-height: calc(100vh - 120px);
}

.category-filter {
  :deep(.scroll-view-content) {
    display: flex;
  }
}

.result-item {
  transition: background-color 0.2s;

  &:active {
    background-color: #f9fafb;
  }
}

.result-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-snippet {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

.history-tag {
  transition: all 0.2s;

  &:active {
    background-color: #e5e7eb;
  }
}

.hot-tag {
  transition: all 0.2s;

  &:active {
    background-color: #fed7aa;
  }
}

// 旋转动画
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

// 行数限制
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
