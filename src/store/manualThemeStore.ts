/**
 * 手动主题状态管理 Store (Setup 语法)
 *
 * 功能：
 * - 手动切换亮色/暗色主题
 * - 跟随系统主题开关
 * - 自定义主题色选择
 * - 导航栏颜色自动适配
 */

import { defineStore } from 'pinia'
import { computed } from 'vue'

import { themeColorOptions } from '@/composables/types/theme'

import type { ThemeColorOption, ThemeMode, ThemeVars } from './types/theme'

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

export const useManualThemeStore = defineStore('manualTheme', () => {
  // State
  const theme = ref<ThemeMode>('light')
  const followSystem = ref(true)
  const hasUserSet = ref(false)
  const currentThemeColor = ref(themeColorOptions[0])
  const themeVars = ref<ThemeVars>(DEFAULT_THEME_VARS)

  // Getters
  const isDark = computed(() => theme.value === 'dark')

  // Actions (先定义所有函数，避免使用前未定义的问题)
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
      console.warn('[ManualThemeStore] 获取系统主题失败:', error)
    }

    return 'light'
  }

  const setNavigationBarColor = () => {
    try {
      uni.setNavigationBarColor({
        frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
        backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
      })
    }
    catch (error) {
      console.warn('[ManualThemeStore] 设置导航栏颜色失败:', error)
    }
  }

  const initTheme = () => {
    if (hasUserSet.value && !followSystem.value) {
      console.log('[ManualThemeStore] 使用用户设置的主题:', theme.value)
      setNavigationBarColor()
      return
    }

    const systemTheme = getSystemTheme()

    if (!hasUserSet.value || followSystem.value) {
      theme.value = systemTheme

      if (!hasUserSet.value) {
        followSystem.value = true
        console.log('[ManualThemeStore] 首次启动，使用系统主题:', theme.value)
      }
      else {
        console.log('[ManualThemeStore] 跟随系统主题:', theme.value)
      }
    }

    setNavigationBarColor()
  }

  const toggleTheme = (mode?: ThemeMode, isFollow = false) => {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')

    if (!isFollow) {
      hasUserSet.value = true
      followSystem.value = false
    }

    setNavigationBarColor()
  }

  const setFollowSystem = (follow: boolean) => {
    followSystem.value = follow

    if (follow) {
      hasUserSet.value = false
      initTheme()
    }
  }

  const setCurrentThemeColor = (color: ThemeColorOption) => {
    currentThemeColor.value = color
    themeVars.value.colorTheme = color.primary
  }

  const resetTheme = () => {
    followSystem.value = true
    hasUserSet.value = false
    initTheme()
  }

  return {
    theme,
    followSystem,
    hasUserSet,
    currentThemeColor,
    themeVars,
    isDark,
    toggleTheme,
    setFollowSystem,
    setNavigationBarColor,
    setCurrentThemeColor,
    getSystemTheme,
    initTheme,
    resetTheme,
  }
})
