/**
 * 告警相关类型定义
 */

/** 告警级别 */
export type AlarmLevel = 'emergency' | 'warning' | 'info'

/** 告警状态 */
export type AlarmStatus = 'pending' | 'processing' | 'resolved'

/** 告警项 */
export interface AlarmItem {
  /** 告警 ID */
  id: number
  /** 告警级别 */
  level: AlarmLevel
  /** 级别文本 */
  levelText: string
  /** 告警标题 */
  title: string
  /** 告警位置 */
  location: string
  /** 告警时间 */
  time: string
  /** 告警状态 */
  status: AlarmStatus
  /** 状态文本 */
  statusText: string
  /** 当前值 */
  currentValue: string
  /** 限值 */
  limitValue: string
  /** 处理人（已处理才有） */
  handler?: string
  /** 处理时间（已处理才有） */
  handleTime?: string
}

/** 告警过滤条件 */
export type AlarmFilter = '全部' | '待处理' | '已处理' | '已忽略'
