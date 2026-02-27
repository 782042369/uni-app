<script setup lang="ts">
import type { Message } from '@/store/messagesStore'

import { useMessagesStore } from '@/store/messagesStore'

definePage({
  name: 'profile-messages',
  layout: 'default',
  style: {
    navigationBarTitleText: '消息通知',
    enablePullDownRefresh: true,
  },
})

const messagesStore = useMessagesStore()

// 状态
const {
  currentFilter,
  filteredMessages,
  unreadCount,
  unreadByType,
} = storeToRefs(messagesStore)

// UI 状态
const refreshing = ref(false)
const loadingMore = ref(false)
const showActionSheet = ref(false)
const selectedMessage = ref<Message | null>(null)
const longPressTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// 消息类型配置
const messageTypeConfig = {
  system: {
    label: '系统',
    icon: 'i-carbon-notification',
    color: 'text-info',
    bgColor: 'bg-info/10',
    iconColor: 'text-info',
  },
  warning: {
    label: '预警',
    icon: 'i-carbon-warning-alt',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  todo: {
    label: '待办',
    icon: 'i-carbon-task',
    color: 'text-caution',
    bgColor: 'bg-caution/10',
    iconColor: 'text-caution',
  },
}

// 分类标签
const filterTabs = computed(() => [
  {
    key: 'all',
    label: '全部',
    icon: 'i-carbon-list-boxes',
    count: unreadCount.value,
  },
  {
    key: 'system',
    label: '系统',
    icon: 'i-carbon-notification',
    count: unreadByType.value.system,
  },
  {
    key: 'warning',
    label: '预警',
    icon: 'i-carbon-warning-alt',
    count: unreadByType.value.warning,
  },
  {
    key: 'todo',
    label: '待办',
    icon: 'i-carbon-task',
    count: unreadByType.value.todo,
  },
])

// 格式化时间
function formatTime(dateString: string): string {
  const now = Date.now()
  const date = new Date(dateString).getTime()
  const diff = now - date

  if (diff < 60 * 1000) {
    return '刚刚'
  }

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000))
    return `${minutes}分钟前`
  }

  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    return `${hours}小时前`
  }

  if (diff < 48 * 60 * 60 * 1000) {
    const dateObj = new Date(dateString)
    return `昨天 ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`
  }

  const dateObj = new Date(dateString)
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

// 切换筛选
function handleFilterChange(key: string) {
  messagesStore.setFilter(key as any)
}

// 点击消息
function handleMessageClick(message: Message) {
  // 取消长按定时器
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }

  // 标记为已读
  if (!message.isRead) {
    messagesStore.markAsRead(message.id)
  }

  // 跳转到详情或链接
  if (message.link) {
    uni.navigateTo({ url: message.link })
  }
  else {
    // TODO: 跳转到消息详情页
    console.log('查看消息详情:', message)
  }
}

// 触摸开始
function handleTouchStart(message: Message) {
  longPressTimer.value = setTimeout(() => {
    selectedMessage.value = message
    showActionSheet.value = true
    // 触觉反馈
    uni.vibrateShort({ type: 'light' })
  }, 500)
}

// 触摸结束
function handleTouchEnd() {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }
}

// 触摸移动
function handleTouchMove() {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value)
    longPressTimer.value = null
  }
}

// 操作菜单选项
const actionSheetOptions = computed(() => {
  if (!selectedMessage.value)
    return []

  const options = []

  if (!selectedMessage.value.isRead) {
    options.push({
      label: '标为已读',
      icon: 'i-carbon-checkmark',
      action: () => {
        messagesStore.markAsRead(selectedMessage.value!.id)
      },
    })
  }

  options.push({
    label: '删除消息',
    icon: 'i-carbon-trash-can',
    action: () => {
      messagesStore.deleteMessage(selectedMessage.value!.id)
    },
  })

  return options
})

// 头部操作按钮
const headerActions = computed(() => [
  {
    label: '全部已读',
    icon: 'i-carbon-checkmark-outline',
    show: filteredMessages.value.some(m => !m.isRead),
    action: () => {
      messagesStore.markAllAsRead()
    },
  },
  {
    label: '清空已读',
    icon: 'i-carbon-clean',
    show: filteredMessages.value.some(m => m.isRead),
    action: () => {
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有已读消息吗？',
        success: (res) => {
          if (res.confirm) {
            messagesStore.deleteReadMessages()
          }
        },
      })
    },
  },
])

// 下拉刷新
async function handleRefresh() {
  refreshing.value = true
  try {
    await messagesStore.refresh()
  }
  finally {
    refreshing.value = false
    uni.stopPullDownRefresh()
  }
}

// 上拉加载更多
async function handleLoadMore() {
  if (loadingMore.value)
    return

  loadingMore.value = true
  try {
    // TODO: 调用 store 的 loadMore 方法
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  finally {
    loadingMore.value = false
  }
}

// 初始化
onMounted(() => {
  // 初始化模拟数据
  if (filteredMessages.value.length === 0) {
    const mockMessages: Message[] = [
      {
        id: '1',
        type: 'system',
        title: '系统维护通知',
        content: '系统将于今晚22:00-24:00进行维护升级，请提前保存工作内容。',
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        priority: 'high',
      },
      {
        id: '2',
        type: 'warning',
        title: '边坡位移超标预警',
        content: '东区边坡监测点位移超过预警阈值，请及时处置。',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
      },
      {
        id: '3',
        type: 'todo',
        title: '隐患整改待处理',
        content: '您负责的"西区排水沟堵塞"隐患需要在今日18:00前完成整改。',
        isRead: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
      },
      {
        id: '4',
        type: 'system',
        title: '新功能上线通知',
        content: '知识库搜索功能已优化，支持全文检索和标签筛选。',
        isRead: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        priority: 'normal',
      },
      {
        id: '5',
        type: 'warning',
        title: '瓦斯浓度异常',
        content: '采煤工作面瓦斯浓度达到预警值，请立即检查通风系统。',
        isRead: false,
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
      },
      {
        id: '6',
        type: 'todo',
        title: '审批通知',
        content: '您有一条"设备采购申请"待审批，请及时处理。',
        isRead: true,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        priority: 'normal',
      },
      {
        id: '7',
        type: 'warning',
        title: '设备故障预警',
        content: '2号挖掘机液压系统压力异常，建议立即检修。',
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        priority: 'high',
      },
      {
        id: '8',
        type: 'system',
        title: '安全培训提醒',
        content: '本周五14:00将进行安全生产培训，请准时参加。',
        isRead: true,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        priority: 'normal',
      },
    ]
    messagesStore.setMessages(mockMessages)
  }

  // 恢复已读状态
  messagesStore.restoreReadStatus()
})

// 监听下拉刷新
onPullDownRefresh(() => {
  handleRefresh()
})

// 监听页面显示
onShow(() => {
  // 刷新未读数量
  messagesStore.restoreReadStatus()
})
</script>

<template>
  <view class="messages-page">
    <!-- 筛选标签栏 -->
    <view class="filter-bar sticky-top dark-bg-oled-black bg-white">
      <scroll-view scroll-x :show-scrollbar="false" class="filter-scroll">
        <view class="filter-tabs">
          <view
            v-for="tab in filterTabs"
            :key="tab.key"
            class="filter-tab"
            :class="{ 'is-active': currentFilter === tab.key }"
            @tap="handleFilterChange(tab.key)"
          >
            <view class="filter-tab-icon" :class="tab.icon" />
            <text class="filter-tab-label">
              {{ tab.label }}
            </text>
            <view
              v-if="tab.key !== 'all' && tab.count > 0"
              class="filter-tab-badge"
            >
              <text class="filter-tab-badge-text">
                {{ tab.count > 99 ? '99+' : tab.count }}
              </text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 头部操作按钮 -->
    <view v-if="headerActions.some(a => a.show)" class="header-actions bg-bg-secondary">
      <view
        v-for="action in headerActions.filter(a => a.show)"
        :key="action.label"
        class="header-action-item"
        @tap="action.action"
      >
        <view class="header-action-icon" :class="action.icon" />
        <text class="header-action-label">
          {{ action.label }}
        </text>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view
      scroll-y
      class="message-list"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <!-- 空状态 -->
      <view v-if="filteredMessages.length === 0" class="empty-state">
        <view class="empty-icon i-carbon-email" />
        <text class="empty-title">
          暂无消息
        </text>
        <text class="empty-desc">
          当前分类下还没有消息通知
        </text>
      </view>

      <!-- 消息卡片 -->
      <view v-else class="message-cards">
        <view
          v-for="message in filteredMessages"
          :key="message.id"
          class="message-card"
          :class="{ 'is-read': message.isRead }"
          @tap="handleMessageClick(message)"
          @touchstart="handleTouchStart(message, $event)"
          @touchend="handleTouchEnd"
          @touchmove="handleTouchMove"
        >
          <!-- 未读标识 -->
          <view v-if="!message.isRead" class="unread-dot" />

          <!-- 消息类型图标 -->
          <view
            class="message-icon"
            :class="messageTypeConfig[message.type].bgColor"
          >
            <view
              class="message-icon-inner"
              :class="[
                messageTypeConfig[message.type].icon,
                messageTypeConfig[message.type].iconColor,
              ]"
            />
          </view>

          <!-- 消息内容 -->
          <view class="message-content">
            <view class="message-header">
              <text class="message-title">
                {{ message.title }}
              </text>
              <text class="message-time">
                {{ formatTime(message.createdAt) }}
              </text>
            </view>
            <text class="message-desc">
              {{ message.content }}
            </text>

            <!-- 优先级标签 -->
            <view v-if="message.priority === 'high'" class="priority-tag">
              <view class="priority-tag-icon i-carbon-star-filled" />
              <text class="priority-tag-text">
                重要
              </text>
            </view>
          </view>

          <!-- 右箭头 -->
          <view class="message-arrow i-carbon-chevron-right" />
        </view>
      </view>

      <!-- 加载更多 -->
      <view v-if="filteredMessages.length > 0" class="load-more">
        <view v-if="loadingMore" class="loading-spinner">
          <view class="spinner" />
        </view>
        <text v-else class="load-more-text">
          上拉加载更多
        </text>
      </view>
    </scroll-view>

    <!-- 操作菜单 -->
    <view
      v-if="showActionSheet"
      class="action-sheet-overlay"
      @tap="showActionSheet = false"
    >
      <view class="action-sheet" @tap.stop>
        <view class="action-sheet-header">
          <text class="action-sheet-title">
            消息操作
          </text>
          <view
            class="action-sheet-close i-carbon-close"
            @tap="showActionSheet = false"
          />
        </view>
        <view class="action-sheet-body">
          <view
            v-for="option in actionSheetOptions"
            :key="option.label"
            class="action-sheet-item"
            @tap="option.action(); showActionSheet = false"
          >
            <view class="action-sheet-item-icon" :class="option.icon" />
            <text class="action-sheet-item-label">
              {{ option.label }}
            </text>
          </view>
        </view>
        <view class="action-sheet-footer">
          <view class="action-sheet-cancel" @tap="showActionSheet = false">
            <text>取消</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.messages-page {
  min-height: 100vh;
  background-color: #f3f4f6;
}

// 暗色模式支持
@media (prefers-color-scheme: dark) {
  .messages-page {
    background-color: #000000;
  }
}

// 筛选标签栏
.filter-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .filter-bar {
    border-bottom-color: #374151;
  }
}

.filter-scroll {
  width: 100%;
  white-space: nowrap;
}

.filter-tabs {
  display: inline-flex;
  gap: 8px;
  padding: 12px 16px;
}

.filter-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #e5e7eb;
  border-radius: 20px;
  transition: all 0.2s ease;
}

@media (prefers-color-scheme: dark) {
  .filter-tab {
    background-color: #374151;
  }
}

.filter-tab.is-active {
  background-color: #1e40af;
}

.filter-tab.is-active .filter-tab-label,
.filter-tab.is-active .filter-tab-icon {
  color: #ffffff;
}

.filter-tab-icon {
  font-size: 16px;
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .filter-tab-icon {
    color: #9ca3af;
  }
}

.filter-tab-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  .filter-tab-label {
    color: #9ca3af;
  }
}

.filter-tab-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background-color: #ef4444;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-tab-badge-text {
  font-size: 10px;
  color: #ffffff;
  font-weight: 600;
  line-height: 1;
}

// 头部操作按钮
.header-actions {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .header-actions {
    border-bottom-color: #374151;
  }
}

.header-action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .header-action-item {
    background-color: #1f2937;
  }
}

.header-action-icon {
  font-size: 16px;
  color: #1e40af;
}

.header-action-label {
  font-size: 13px;
  color: #1e40af;
  font-weight: 500;
}

// 消息列表
.message-list {
  height: calc(100vh - 120px);
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  color: #d1d5db;
  margin-bottom: 16px;
}

@media (prefers-color-scheme: dark) {
  .empty-icon {
    color: #4b5563;
  }
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 8px;
}

@media (prefers-color-scheme: dark) {
  .empty-title {
    color: #9ca3af;
  }
}

.empty-desc {
  font-size: 13px;
  color: #9ca3af;
}

@media (prefers-color-scheme: dark) {
  .empty-desc {
    color: #6b7280;
  }
}

// 消息卡片容器
.message-cards {
  padding: 12px;
}

// 消息卡片
.message-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

@media (prefers-color-scheme: dark) {
  .message-card {
    background-color: #1f2937;
  }
}

.message-card:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.message-card.is-read {
  opacity: 0.6;
}

// 未读红点
.unread-dot {
  position: absolute;
  top: 16px;
  left: 12px;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #ffffff;
}

@media (prefers-color-scheme: dark) {
  .unread-dot {
    box-shadow: 0 0 0 2px #1f2937;
  }
}

// 消息图标
.message-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.message-icon-inner {
  font-size: 20px;
}

// 消息内容
.message-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.message-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  .message-title {
    color: #f9fafb;
  }
}

.message-time {
  flex-shrink: 0;
  font-size: 12px;
  color: #9ca3af;
  margin-left: 8px;
}

.message-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (prefers-color-scheme: dark) {
  .message-desc {
    color: #9ca3af;
  }
}

// 优先级标签
.priority-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding: 4px 8px;
  background-color: #fef3c7;
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .priority-tag {
    background-color: rgba(251, 191, 36, 0.2);
  }
}

.priority-tag-icon {
  font-size: 12px;
  color: #f59e0b;
}

.priority-tag-text {
  font-size: 11px;
  color: #f59e0b;
  font-weight: 600;
}

// 右箭头
.message-arrow {
  flex-shrink: 0;
  font-size: 16px;
  color: #d1d5db;
  align-self: center;
}

@media (prefers-color-scheme: dark) {
  .message-arrow {
    color: #4b5563;
  }
}

// 加载更多
.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: #1e40af;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (prefers-color-scheme: dark) {
  .spinner {
    border-color: #374151;
    border-top-color: #3b82f6;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.load-more-text {
  font-size: 13px;
  color: #9ca3af;
}

@media (prefers-color-scheme: dark) {
  .load-more-text {
    color: #6b7280;
  }
}

// 操作菜单遮罩
.action-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 操作菜单
.action-sheet {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px 16px 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  animation: slideUp 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .action-sheet {
    background-color: #1f2937;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.action-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-header {
    border-bottom-color: #374151;
  }
}

.action-sheet-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-title {
    color: #f9fafb;
  }
}

.action-sheet-close {
  font-size: 20px;
  color: #9ca3af;
  padding: 4px;
}

.action-sheet-body {
  padding: 8px 0;
}

.action-sheet-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  transition: background-color 0.2s ease;
}

.action-sheet-item:active {
  background-color: #f3f4f6;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-item:active {
    background-color: #374151;
  }
}

.action-sheet-item-icon {
  font-size: 20px;
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-item-icon {
    color: #9ca3af;
  }
}

.action-sheet-item-label {
  font-size: 15px;
  color: #1f2937;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-item-label {
    color: #f9fafb;
  }
}

.action-sheet-footer {
  padding: 8px 16px 16px;
}

.action-sheet-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background-color: #f3f4f6;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

@media (prefers-color-scheme: dark) {
  .action-sheet-cancel {
    background-color: #374151;
    color: #f9fafb;
  }
}

.action-sheet-cancel:active {
  opacity: 0.8;
}
</style>
