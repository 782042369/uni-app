import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PageConfig {
  /** 页面标题 */
  title: string
  /** 是否显示 TabBar */
  showTabBar?: boolean
  /** 是否显示返回按钮 */
  showBack?: boolean
  /** 返回首页 */
  backToHome?: boolean
  /** 左侧icon */
  leftIcon?: string
  /** 右侧icon */
  rightIcon?: string
  /** 背景色 */
  backgroundColor?: string
  /** 文字颜色 */
  textColor?: string
  /** 左侧按钮点击事件 */
  onLeftClick?: () => void
  /** 右侧按钮点击事件 */
  onRightClick?: () => void
}

export const usePageConfigStore = defineStore('pageConfig', () => {
  // 当前页面配置
  const config = ref<PageConfig>({
    title: '矿山监控',
    showTabBar: true,
    showBack: false,
    backToHome: false,
    leftIcon: '',
    rightIcon: 'notification',
    backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
    textColor: '#ffffff',
  })

  /**
   * 设置页面配置
   */
  function setConfig(newConfig: Partial<PageConfig>) {
    config.value = { ...config.value, ...newConfig }
  }

  /**
   * 重置页面配置为默认值
   */
  function resetConfig() {
    config.value = {
      title: '矿山监控',
      showTabBar: true,
      showBack: false,
      backToHome: false,
      leftIcon: '',
      rightIcon: 'notification',
      backgroundColor: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      textColor: '#ffffff',
    }
  }

  return {
    config,
    setConfig,
    resetConfig,
  }
})
