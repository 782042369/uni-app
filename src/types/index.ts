/**
 * 公共类型定义统一导出
 */

// 导出所有类型
export * from './alarm'

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
