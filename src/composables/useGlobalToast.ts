import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'

import { defineStore } from 'pinia'

/**
 * 全局 Toast 状态管理
 */
export const useGlobalToast = defineStore('global-toast', () => {
  const defaultOptions: ToastOptions = {
    duration: 2000,
    show: false,
  }

  const toastOptions = ref<ToastOptions>({ ...defaultOptions })
  const currentPage = ref('')

  /**
   * 标准化选项参数
   */
  function normalizeOptions(option: ToastOptions | string): ToastOptions {
    return typeof option === 'string' ? { msg: option } : option
  }

  /**
   * 显示 Toast 提示
   */
  function show(option: ToastOptions | string) {
    currentPage.value = getCurrentPath()
    const options = normalizeOptions(option)

    toastOptions.value = CommonUtil.deepMerge(
      { ...defaultOptions },
      {
        ...options,
        show: true,
        position: options.position || 'middle',
      },
    ) as ToastOptions
  }

  /**
   * 显示成功提示
   */
  function success(option: ToastOptions | string) {
    show(CommonUtil.deepMerge({
      iconName: 'success',
      duration: 1500,
    }, normalizeOptions(option)) as ToastOptions)
  }

  /**
   * 显示错误提示
   */
  function error(option: ToastOptions | string) {
    show(CommonUtil.deepMerge({
      iconName: 'error',
      direction: 'vertical',
    }, normalizeOptions(option)) as ToastOptions)
  }

  /**
   * 显示信息提示
   */
  function info(option: ToastOptions | string) {
    show(CommonUtil.deepMerge({
      iconName: 'info',
    }, normalizeOptions(option)) as ToastOptions)
  }

  /**
   * 显示警告提示
   */
  function warning(option: ToastOptions | string) {
    show(CommonUtil.deepMerge({
      iconName: 'warning',
    }, normalizeOptions(option)) as ToastOptions)
  }

  /**
   * 关闭 Toast
   */
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
