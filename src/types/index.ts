/**
 * 公共类型定义统一导出
 * 遵循 TypeScript 严格类型规范
 */

// 导出告警类型
export * from './alarm'

// 导出通用类型
export * from './common'

// 导出首页类型
export * from './home'

// 导出知识库类型
export * from './knowledge'

// 导出页面相关类型
export * from './pages'

// 导出个人中心类型
export * from './profile'

// 导出安全环保中心类型
export * from './safety'

// ========== 页面组件类型 ==========

/**
 * 关键指标数据
 */
export interface KeyMetric {
  label: string
  value: string
  unit: string
  color: string
  icon: string
}

/**
 * 环境监测数据
 */
export interface EnvData {
  label: string
  value: string
  percentage: number
  color: string
}

/**
 * 紧急告警
 */
export interface EmergencyAlarm {
  location: string
  message: string
  time: string
  status: string
  level: 'emergency' | 'warning' | 'info'
}

/**
 * 用户信息
 */
export interface UserInfo {
  name: string
  role: string
  department: string
  phone: string
  avatar: string
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: string
  icon: string
  title: string
  desc: string
  action: () => void
}

/**
 * 主题颜色选项
 */
export interface ThemeColorOption {
  name: string
  value: string
  primary: string
  [key: string]: string
}
