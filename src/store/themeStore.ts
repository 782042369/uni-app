/**
 * 系统主题状态管理 Store
 * 自动跟随系统主题，不提供手动切换
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ThemeMode, ThemeVars } from './types/theme'

import { DEFAULT_THEME_VARS, getSystemTheme } from './utils/theme'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeMode>('light')
  const themeVars = ref<ThemeVars>(DEFAULT_THEME_VARS)

  const isDark = computed(() => theme.value === 'dark')

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
    initSystemTheme,
  }
})
