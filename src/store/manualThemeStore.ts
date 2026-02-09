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

import { DEFAULT_THEME_VARS, getSystemTheme, setNavigationBarColor } from './utils/theme'

export const useManualThemeStore = defineStore('manualTheme', () => {
  // State
  const theme = ref<ThemeMode>('light')
  const followSystem = ref(true)
  const hasUserSet = ref(false)
  const currentThemeColor = ref(themeColorOptions[0])
  const themeVars = ref<ThemeVars>(DEFAULT_THEME_VARS)

  // Getters
  const isDark = computed(() => theme.value === 'dark')

  // Actions
  const updateNavigationBarColor = () => {
    setNavigationBarColor(theme.value)
  }

  const initTheme = () => {
    if (hasUserSet.value && !followSystem.value) {
      console.log('[ManualThemeStore] 使用用户设置的主题:', theme.value)
      updateNavigationBarColor()
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

    updateNavigationBarColor()
  }

  const toggleTheme = (mode?: ThemeMode, isFollow = false) => {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')

    if (!isFollow) {
      hasUserSet.value = true
      followSystem.value = false
    }

    updateNavigationBarColor()
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
    setNavigationBarColor: updateNavigationBarColor,
    setCurrentThemeColor,
    getSystemTheme,
    initTheme,
    resetTheme,
  }
})
