/**
 * Pinia 状态持久化插件
 *
 * 功能：
 * - 自动持久化 store 状态到本地存储
 * - 支持排除特定 store
 * - 支持自定义序列化/反序列化
 */

import type { PiniaPluginContext } from 'pinia'

import { deepClone } from 'wot-design-uni/components/common/util'

/** 持久化配置 */
interface PersistOptions {
  /** 排除的 store ID 列表 */
  excludedIds: string[]
  /** 存储键前缀 */
  keyPrefix: string
}

/** 默认配置 */
const DEFAULT_OPTIONS: PersistOptions = {
  excludedIds: [],
  keyPrefix: 'pinia:',
}

/**
 * 从本地存储恢复状态
 */
function restoreState<T>(storeId: string, keyPrefix: string): T | null {
  try {
    const key = `${keyPrefix}${storeId}`
    const stored = uni.getStorageSync(key)
    return stored ? deepClone(stored) : null
  }
  catch (error) {
    console.error(`[Persist] 恢复状态失败 [${storeId}]:`, error)
    return null
  }
}

/**
 * 持久化状态到本地存储
 */
function saveState<T>(storeId: string, state: T, keyPrefix: string): void {
  try {
    const key = `${keyPrefix}${storeId}`
    uni.setStorageSync(key, deepClone(state))
  }
  catch (error) {
    console.error(`[Persist] 保存状态失败 [${storeId}]:`, error)
  }
}

/**
 * 创建持久化插件
 */
export function createPersistPlugin(options: Partial<PersistOptions> = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  return function persistPlugin(context: PiniaPluginContext) {
    const { store } = context
    const { excludedIds, keyPrefix } = opts

    // 检查是否在排除列表中
    if (excludedIds.includes(store.$id)) {
      return
    }

    // 从本地存储恢复状态
    const restoredState = restoreState(store.$id, keyPrefix)
    if (restoredState) {
      store.$state = { ...store.$state, ...restoredState }
    }

    // 订阅状态变化并持久化
    store.$subscribe((_mutation, state) => {
      saveState(store.$id, state, keyPrefix)
    }, { detached: true })
  }
}

/** 默认持久化插件实例 */
export const persistPlugin = createPersistPlugin({
  excludedIds: [],
  keyPrefix: 'pinia:',
})
