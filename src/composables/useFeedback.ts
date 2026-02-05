/**
 * 用户反馈 Composable
 * 提供统一的用户反馈方法
 */

/**
 * 用户反馈 Composable
 */
export function useFeedback() {
  /**
   * 显示提示消息
   */
  function showToast(
    title: UniApp.ShowToastOptions['title'],
    icon: UniApp.ShowToastOptions['icon'] = 'none',
    duration: UniApp.ShowToastOptions['duration'] = 2000,
  ) {
    uni.showToast({
      title,
      icon,
      duration,
    })
  }

  /**
   * 显示成功提示
   */
  function showSuccess(title = '操作成功') {
    showToast(title, 'success')
  }

  /**
   * 显示失败提示
   */
  function showError(title = '操作失败') {
    showToast(title, 'none')
  }

  /**
   * 显示加载提示
   */
  function showLoading(title = '加载中...') {
    uni.showLoading({
      title,
      mask: true,
    })
  }

  /**
   * 隐藏加载提示
   */
  function hideLoading() {
    uni.hideLoading()
  }

  /**
   * 显示确认对话框
   */
  function showModal(options: UniApp.ShowModalOptions): Promise<boolean> {
    return new Promise((resolve) => {
      uni.showModal({
        title: options.title || '提示',
        content: options.content,
        confirmText: options.confirmText || '确定',
        cancelText: options.cancelText || '取消',
        showCancel: options.showCancel !== false,
        success: (res) => {
          resolve(res.confirm)
        },
        fail: () => {
          resolve(false)
        },
      })
    })
  }

  /**
   * 显示操作菜单
   */
  function showActionSheet(itemList: string[]): Promise<number | null> {
    return new Promise((resolve) => {
      uni.showActionSheet({
        itemList,
        success: (res) => {
          resolve(res.tapIndex)
        },
        fail: () => {
          resolve(null)
        },
      })
    })
  }

  return {
    showToast,
    showSuccess,
    showError,
    showLoading,
    hideLoading,
    showModal,
    showActionSheet,
  }
}
