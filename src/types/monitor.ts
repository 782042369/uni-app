/**
 * 监控相关类型定义
 */

/** 监测数据项 */
export interface MonitorDataItem {
  /** 数据标签 */
  label: string
  /** 当前值 */
  value: string
  /** 趋势变化 */
  trend: string
  /** 趋势是否向上 */
  trendUp: boolean
  /** 状态 */
  status: 'normal' | 'warning' | 'danger'
  /** 颜色类名 */
  color: string
}

/** 环境数据项 */
export interface EnvDataItem {
  /** 数据标签 */
  label: string
  /** 当前值 */
  value: string
  /** 百分比 */
  percentage: number
  /** 颜色类名 */
  color: string
}

/** 关键指标项 */
export interface KeyMetricItem {
  /** 标签 */
  label: string
  /** 数值 */
  value: string
  /** 颜色类名 */
  color: string
}

/** 区域选项 */
export interface AreaOption {
  /** 显示文本 */
  label: string
  /** 选项值 */
  value: string
}
