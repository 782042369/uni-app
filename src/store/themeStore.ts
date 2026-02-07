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

import type { ThemeMode, ThemeVars } from './types/theme'

import { DEFAULT_THEME_VARS, getSystemTheme } from './utils/theme'

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref<ThemeMode>('light')
  const themeVars = ref<ThemeVars>(DEFAULT_THEME_VARS)

  // Getters
  const isDark = computed(() => theme.value === 'dark')

  // Actions
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
