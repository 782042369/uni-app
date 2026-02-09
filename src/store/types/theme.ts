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
