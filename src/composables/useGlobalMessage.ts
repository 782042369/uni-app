import type { MessageOptions, MessageResult } from 'wot-design-uni/components/wd-message-box/types'

import { defineStore } from 'pinia'

/**
 * 全局消息扩展选项
 */
export type GlobalMessageOptions = MessageOptions & {
  success?: (res: MessageResult) => void
  fail?: (res: MessageResult) => void
}

/**
 * 全局 Message 状态管理
 */
export const useGlobalMessage = defineStore('global-message', () => {
  const messageOptions = ref<GlobalMessageOptions | null>(null)
  const currentPage = ref('')

  /**
   * 标准化选项参数
   */
  function normalizeOptions(option: GlobalMessageOptions | string): GlobalMessageOptions {
    return CommonUtil.isString(option) ? { title: option } : option
  }

  /**
   * 显示消息框
   */
  function show(option: GlobalMessageOptions | string) {
    currentPage.value = getCurrentPath()

    messageOptions.value = {
      ...normalizeOptions(option),
      cancelButtonProps: {
        round: false,
      },
      confirmButtonProps: {
        round: false,
      },
    }
  }

  /**
   * 显示警告框（只有确认按钮）
   */
  function alert(option: GlobalMessageOptions | string) {
    const options = normalizeOptions(option)
    show(CommonUtil.deepMerge(
      { type: 'alert', showCancelButton: false },
      options,
    ) as MessageOptions)
  }

  /**
   * 显示确认框（有确认和取消按钮）
   */
  function confirm(option: GlobalMessageOptions | string) {
    const options = normalizeOptions(option)
    show(CommonUtil.deepMerge(
      { type: 'confirm', showCancelButton: true },
      options,
    ) as MessageOptions)
  }

  /**
   * 显示输入框（带文本输入）
   */
  function prompt(option: GlobalMessageOptions | string) {
    const options = normalizeOptions(option)
    show(CommonUtil.deepMerge(
      { type: 'prompt', showCancelButton: true },
      options,
    ) as MessageOptions)
  }

  /**
   * 关闭消息框
   */
  function close() {
    messageOptions.value = null
    currentPage.value = ''
  }

  return {
    messageOptions,
    currentPage,
    show,
    alert,
    confirm,
    prompt,
    close,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalMessage, import.meta.hot))
}
