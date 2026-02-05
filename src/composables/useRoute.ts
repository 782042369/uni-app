/**
 * 路由工具函数
 * @example
 * ```ts
 * const { getCurrentTabName } = useRoute()
 * const tabName = getCurrentTabName()
 * ```
 */
export function useRoute() {
  /**
   * 获取当前页面对应的 Tab 名称
   */
  function getCurrentTabName() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const route = currentPage.route || ''

    // 根据路径判断当前tab
    if (route.includes('index'))
      return 'home'
    if (route.includes('monitor'))
      return 'monitor'
    if (route.includes('alarm'))
      return 'alarm'
    if (route.includes('profile'))
      return 'profile'

    return 'home'
  }

  /**
   * 判断是否是当前页面
   */
  function isCurrentPage(path: string) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const route = currentPage.route || ''
    return route.includes(path)
  }

  return {
    getCurrentTabName,
    isCurrentPage,
  }
}
