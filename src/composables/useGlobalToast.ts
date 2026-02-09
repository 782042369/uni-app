import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'

import { defineStore } from 'pinia'

/**
 * 全局 Toast 状态管理 (类型安全，无断言)
 */
export const useGlobalToast = defineStore('global-toast', () => {
  const defaultOptions: ToastOptions = {
    duration: 2000,
    show: false,
  }

  const toastOptions = ref<ToastOptions>({ ...defaultOptions })
  const currentPage = ref('')

  function normalizeOptions(option: ToastOptions | string): ToastOptions {
    return typeof option === 'string' ? { msg: option } : option
  }

  function mergeOptions(base: ToastOptions, override: ToastOptions): ToastOptions {
    return {
      ...base,
      ...override,
      msg: override.msg || base.msg,
      position: override.position || base.position || 'middle',
    }
  }

  function show(option: ToastOptions | string) {
    currentPage.value = getCurrentPath()
    const options = normalizeOptions(option)
    toastOptions.value = mergeOptions(defaultOptions, { ...options, show: true })
  }

  function success(option: ToastOptions | string) {
    const options = normalizeOptions(option)
    show(mergeOptions({ iconName: 'success' as const, duration: 1500 }, options))
  }

  function error(option: ToastOptions | string) {
    const options = normalizeOptions(option)
    show(mergeOptions({ iconName: 'error' as const, direction: 'vertical' as const }, options))
  }

  function info(option: ToastOptions | string) {
    const options = normalizeOptions(option)
    show(mergeOptions({ iconName: 'info' as const }, options))
  }

  function warning(option: ToastOptions | string) {
    const options = normalizeOptions(option)
    show(mergeOptions({ iconName: 'warning' as const }, options))
  }

  function close() {
    toastOptions.value = { ...defaultOptions }
    currentPage.value = ''
  }

  return {
    toastOptions,
    currentPage,
    show,
    success,
    error,
    info,
    warning,
    close,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalToast, import.meta.hot))
}
