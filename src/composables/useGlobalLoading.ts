import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'

import { defineStore } from 'pinia'

/**
 * 全局 Loading 状态管理
 */
export const useGlobalLoading = defineStore('global-loading', () => {
  const defaultOptions: ToastOptions = {
    show: false,
  }

  const loadingOptions = ref<ToastOptions>({ ...defaultOptions })
  const currentPage = ref('')

  /**
   * 显示加载提示
   */
  function loading(option: ToastOptions | string) {
    currentPage.value = getCurrentPath()

    const options = typeof option === 'string'
      ? { msg: option }
      : option

    loadingOptions.value = CommonUtil.deepMerge({
      iconName: 'loading',
      duration: 0,
      cover: true,
      position: 'middle',
      show: true,
    }, options) as ToastOptions
  }

  /**
   * 关闭加载提示
   */
  function close() {
    loadingOptions.value = { ...defaultOptions }
    currentPage.value = ''
  }

  return {
    loadingOptions,
    currentPage,
    loading,
    close,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalLoading, import.meta.hot))
}
