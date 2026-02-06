/**
 * 主题状态类型定义
 */

/** 主题模式 */
export type ThemeMode = 'light' | 'dark'

/** 主题颜色选项 */
export interface ThemeColorOption {
  name: string
  value: string
  primary: string
}

/** 简化版系统主题状态 */
export interface SystemThemeState {
  theme: ThemeMode
  themeVars: ThemeVars
}

/** 完整版主题状态 */
export interface ThemeState {
  theme: ThemeMode
  followSystem: boolean
  hasUserSet: boolean
  currentThemeColor: ThemeColorOption
  themeVars: ThemeVars
}

/** 主题变量 */
export interface ThemeVars {
  darkBackground: string
  darkBackground2: string
  darkBackground3: string
  darkBackground4: string
  darkBackground5: string
  darkBackground6: string
  darkBackground7: string
  darkColor: string
  darkColor2: string
  darkColor3: string
  colorTheme: string
}
