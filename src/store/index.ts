/**
 * Pinia Store 统一导出入口
 *
 * 使用示例：
 * ```ts
 * import { useManualThemeStore, useThemeStore, useUserStore } from '@/store'
 *
 * const manualThemeStore = useManualThemeStore()
 * const themeStore = useThemeStore()
 * const userStore = useUserStore()
 * ```
 */

export { useKnowledgeStore } from './knowledgeStore'
export { useManualThemeStore } from './manualThemeStore'
export { useMessagesStore } from './messagesStore'
export { createPersistPlugin, persistPlugin } from './persist'
export { useSettingsStore } from './settingsStore'
export { useThemeStore } from './themeStore'
export * from './types'
export { useUserStore } from './userStore'
