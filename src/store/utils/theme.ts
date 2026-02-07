/**
 * 主题工具函数
 *
 * 提供跨 store 共享的主题相关功能
 */

import { themeColorOptions } from '@/composables/types/theme'

import type { ThemeMode, ThemeVars } from '../types/theme'

/** 默认主题变量 */
export const DEFAULT_THEME_VARS: ThemeVars = {
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

/** 导航栏颜色映射 */
const NAVIGATION_BAR_COLORS = {
  light: { frontColor: '#000000', backgroundColor: '#ffffff' },
  dark: { frontColor: '#ffffff', backgroundColor: '#000000' },
} as const

/**
 * 获取系统主题
 */
export function getSystemTheme(): ThemeMode {
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
    console.warn('[Theme] 获取系统主题失败:', error)
  }

  return 'light'
}

/**
 * 设置导航栏颜色
 */
export function setNavigationBarColor(mode: ThemeMode): void {
  try {
    const colors = NAVIGATION_BAR_COLORS[mode]
    uni.setNavigationBarColor({
      frontColor: colors.frontColor,
      backgroundColor: colors.backgroundColor,
    })
  }
  catch (error) {
    console.warn('[Theme] 设置导航栏颜色失败:', error)
  }
}
