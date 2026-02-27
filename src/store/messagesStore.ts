/**
 * 消息通知 Store
 *
 * 管理应用内消息通知状态
 */

import { defineStore } from 'pinia'

export type MessageType = 'system' | 'warning' | 'todo'
export type FilterType = 'all' | MessageType

export interface Message {
  id: string
  type: MessageType
  title: string
  content: string
  isRead: boolean
  createdAt: string
  /** 跳转链接（可选） */
  link?: string
  /** 优先级（用于排序） */
  priority?: 'high' | 'normal' | 'low'
}

export interface MessageState {
  messages: Message[]
  currentFilter: FilterType
  loading: boolean
  hasMore: boolean
}

export const useMessagesStore = defineStore('messages', {
  state: (): MessageState => ({
    messages: [],
    currentFilter: 'all',
    loading: false,
    hasMore: true,
  }),

  getters: {
    /**
     * 筛选后的消息列表
     */
    filteredMessages: (state) => {
      if (state.currentFilter === 'all') {
        return state.messages
      }
      return state.messages.filter(msg => msg.type === state.currentFilter)
    },

    /**
     * 未读消息数量
     */
    unreadCount: (state) => {
      return state.messages.filter(msg => !msg.isRead).length
    },

    /**
     * 按类型分组的未读数量
     */
    unreadByType: (state) => {
      const counts = {
        system: 0,
        warning: 0,
        todo: 0,
      }
      state.messages.forEach((msg) => {
        if (!msg.isRead && msg.type in counts) {
          counts[msg.type]++
        }
      })
      return counts
    },

    /**
     * 按优先级排序的消息（高优先在前）
     */
    sortedMessages: (state) => {
      const priorityOrder = { high: 0, normal: 1, low: 2 }
      return [...state.messages].sort((a, b) => {
        // 先按已读状态排序（未读在前）
        if (a.isRead !== b.isRead) {
          return a.isRead ? 1 : -1
        }
        // 再按优先级排序
        const priorityA = priorityOrder[a.priority || 'normal'] || 1
        const priorityB = priorityOrder[b.priority || 'normal'] || 1
        if (priorityA !== priorityB) {
          return priorityA - priorityB
        }
        // 最后按时间排序（最新的在前）
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    },
  },

  actions: {
    /**
     * 设置消息列表
     */
    setMessages(messages: Message[]) {
      this.messages = messages
    },

    /**
     * 添加消息
     */
    addMessage(message: Message) {
      this.messages.unshift(message)
    },

    /**
     * 批量添加消息
     */
    addMessages(messages: Message[]) {
      this.messages = [...messages, ...this.messages]
    },

    /**
     * 标记消息为已读
     */
    markAsRead(messageId: string) {
      const message = this.messages.find(msg => msg.id === messageId)
      if (message) {
        message.isRead = true
        // TODO: 调用 API 同步到服务器
        uni.setStorageSync(`msg_read_${messageId}`, 'true')
      }
    },

    /**
     * 批量标记为已读
     */
    markAllAsRead() {
      this.messages.forEach((msg) => {
        if (!msg.isRead) {
          msg.isRead = true
          uni.setStorageSync(`msg_read_${msg.id}`, 'true')
        }
      })
      // TODO: 调用 API 批量同步
    },

    /**
     * 删除消息
     */
    deleteMessage(messageId: string) {
      const index = this.messages.findIndex(msg => msg.id === messageId)
      if (index !== -1) {
        this.messages.splice(index, 1)
        // TODO: 调用 API 删除
      }
    },

    /**
     * 批量删除已读消息
     */
    deleteReadMessages() {
      this.messages = this.messages.filter(msg => !msg.isRead)
      // TODO: 调用 API 批量删除
    },

    /**
     * 设置筛选类型
     */
    setFilter(filter: FilterType) {
      this.currentFilter = filter
    },

    /**
     * 清空所有消息
     */
    clearAll() {
      this.messages = []
    },

    /**
     * 从本地存储恢复消息状态
     */
    restoreReadStatus() {
      this.messages.forEach((msg) => {
        const readStatus = uni.getStorageSync(`msg_read_${msg.id}`)
        if (readStatus === 'true') {
          msg.isRead = true
        }
      })
    },

    /**
     * 获取消息详情（用于跳转）
     */
    getMessageById(messageId: string) {
      return this.messages.find(msg => msg.id === messageId)
    },

    /**
     * 刷新消息列表（模拟 API 调用）
     */
    async refresh(): Promise<void> {
      // TODO: 调用 API 获取最新消息
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  },
})
