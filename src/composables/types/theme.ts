import type { ConfigProviderThemeVars } from 'wot-design-uni'

/**
 * 主题色选项接口
 */
export interface ThemeColorOption {
  name: string
  value: string
  primary: string
}

/**
 * 主题类型
 */
export type ThemeMode = 'light' | 'dark'

/**
 * 主题状态接口
 */
export interface ThemeState {
  theme: ThemeMode
  followSystem: boolean
  hasUserSet: boolean
  currentThemeColor: ThemeColorOption
  themeVars: ConfigProviderThemeVars
}

/**
 * 系统主题状态接口（简化版）
 */
export interface SystemThemeState {
  theme: ThemeMode
  themeVars: ConfigProviderThemeVars
}

/**
 * 预定义的主题色选项
 */
export const themeColorOptions: ThemeColorOption[] = [
  { name: '默认蓝', value: 'blue', primary: '#4D7FFF' },
  { name: '活力橙', value: 'orange', primary: '#FF7D00' },
  { name: '薄荷绿', value: 'green', primary: '#07C160' },
  { name: '樱花粉', value: 'pink', primary: '#FF69B4' },
  { name: '紫罗兰', value: 'purple', primary: '#8A2BE2' },
  { name: '朱砂红', value: 'red', primary: '#FF4757' },
]

/**
 * 导航栏颜色配置（工业移动端风格）
 * 浅色模式：浅灰白背景（减少刺眼，更具工业质感），深色文字
 * 深色模式：深炭灰背景（工业质感），纯白文字
 */
export const NAVIGATION_BAR_COLORS = {
  light: {
    frontColor: '#000000',
    backgroundColor: '#F5F5F5',
  },
  dark: {
    frontColor: '#ffffff',
    backgroundColor: '#1A1A1A',
  },
} as const
