/**
 * 页面配置 Composable
 * 简化页面配置的设置和自动清理
 */

import type { PageConfig } from '@/stores/pageConfig'

import { usePageConfigStore } from '@/stores/pageConfig'

/**
 * 页面配置 Composable
 * 自动管理页面配置的生命周期
 * @param config - 页面配置对象
 */
export function usePageConfig(config: PageConfig) {
  const pageConfigStore = usePageConfigStore()

  // 组件挂载时设置配置
  onMounted(() => {
    pageConfigStore.setConfig(config)
  })

  // 组件卸载时重置配置
  onUnmounted(() => {
    pageConfigStore.resetConfig()
  })

  return {
    config: pageConfigStore.config,
    setConfig: pageConfigStore.setConfig,
    resetConfig: pageConfigStore.resetConfig,
  }
}
