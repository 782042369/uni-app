/**
 * 系统主题状态管理 Store (Setup 语法)
 *
 * 功能：
 * - 自动跟随系统主题
 * - 简化的主题状态管理
 * - 不提供手动切换功能（使用 manualThemeStore 替代）
 */

import { defineStore } from 'pinia'
import { computed } from 'vue'

import { themeColorOptions } from '@/composables/types/theme'

import type { ThemeMode, ThemeVars } from './types/theme'

/** 默认主题变量 */
const DEFAULT_THEME_VARS: ThemeVars = {
  darkBackground: '#0f0f0f',
  darkBackground2: '#1a1a1a',
  darkBackground3: '#242424',
  darkBackground4: '#2f2f2f',
  darkBackground5: '#3d3d3d',
  darkBackground6: '#4a4a4a',
  darkBackground7: '#606060',
  darkColor: '#ffffff',
  darkColor2: '#e0e0e0',
  darkColor3: '#a0a0a0',
  colorTheme: themeColorOptions[0].primary,
}

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref<ThemeMode>('light')
  const themeVars = ref<ThemeVars>(DEFAULT_THEME_VARS)

  // Getters
  const isDark = computed(() => theme.value === 'dark')

  // Actions
  const getSystemTheme = (): ThemeMode => {
    try {
      // #ifdef MP-WEIXIN
      const appBaseInfo = uni.getAppBaseInfo()
      if (appBaseInfo?.theme) {
        return appBaseInfo.theme as ThemeMode
      }
      // #endif

      // #ifndef MP-WEIXIN
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo?.theme) {
        return systemInfo.theme as ThemeMode
      }
      // #endif
    }
    catch (error) {
      console.warn('[ThemeStore] 获取系统主题失败:', error)
    }

    return 'light'
  }

  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme
  }

  const initSystemTheme = () => {
    const systemTheme = getSystemTheme()
    theme.value = systemTheme
    console.log('[ThemeStore] 初始化系统主题:', theme.value)
  }

  return {
    theme,
    themeVars,
    isDark,
    setTheme,
    getSystemTheme,
    initSystemTheme,
  }
})
