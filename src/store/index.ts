/**
 * Pinia Store 统一导出入口
 *
 * 使用示例：
 * ```ts
 * import { useManualThemeStore, useThemeStore } from '@/store'
 *
 * const manualThemeStore = useManualThemeStore()
 * const themeStore = useThemeStore()
 * ```
 */

export { useManualThemeStore } from './manualThemeStore'
export { createPersistPlugin, persistPlugin } from './persist'
export { useThemeStore } from './themeStore'

export * from './types'
