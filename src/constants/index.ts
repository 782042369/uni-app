/**
 * 应用常量配置
 * 统一管理应用中的常量值，避免魔法数字
 */

/** TabBar 配置 */
export const TAB_BAR = {
  /** TabBar 高度 */
  HEIGHT: 50,
  /** Tab 图标大小 */
  ICON_SIZE: 24,
  /** Tab 文本大小 */
  TEXT_SIZE: 10,
} as const

/** 导航栏配置 */
export const NAV_BAR = {
  /** 导航栏高度 */
  HEIGHT: 44,
  /** 图标大小 */
  ICON_SIZE: 20,
  /** 标题字体大小 */
  TITLE_SIZE: 18,
} as const

/** 间距配置 */
export const SPACING = {
  /** 极小间距 */
  XS: 4,
  /** 小间距 */
  SM: 8,
  /** 默认间距 */
  MD: 16,
  /** 大间距 */
  LG: 24,
  /** 超大间距 */
  XL: 32,
} as const

/** 字体大小配置 */
export const FONT_SIZE = {
  /** 极小 */
  'XS': 10,
  /** 小 */
  'SM': 12,
  /** 默认 */
  'BASE': 14,
  /** 大 */
  'LG': 16,
  /** 超大 */
  'XL': 18,
  /** 特大 */
  '2XL': 20,
  /** 巨大 */
  '3XL': 24,
} as const

/** 动画时长配置 */
export const DURATION = {
  /** 快速 */
  FAST: 200,
  /** 默认 */
  NORMAL: 300,
  /** 慢速 */
  SLOW: 500,
} as const

/** 颜色配置 */
export const COLORS = {
  /** 主色 */
  PRIMARY: '#1890ff',
  /** 主色深色 */
  PRIMARY_DARK: '#096dd9',
  /** 主色浅色 */
  PRIMARY_LIGHT: '#40a9ff',
  /** 主色背景 */
  PRIMARY_BG: '#e6f7ff',

  /** 成功色 */
  SUCCESS: '#52c41a',
  /** 成功背景 */
  SUCCESS_BG: '#f6ffed',

  /** 警告色 */
  WARNING: '#faad14',
  /** 警告背景 */
  WARNING_BG: '#fffbe6',

  /** 危险色 */
  DANGER: '#f5222d',
  /** 危险背景 */
  DANGER_BG: '#fff1f0',

  /** 信息色 */
  INFO: '#1890ff',
  /** 信息背景 */
  INFO_BG: '#e6f7ff',
} as const

/** 告警级别配置 */
export const ALARM_LEVEL = {
  /** 紧急 */
  EMERGENCY: 'emergency',
  /** 警告 */
  WARNING: 'warning',
  /** 提示 */
  INFO: 'info',
} as const

/** 告警状态配置 */
export const ALARM_STATUS = {
  /** 待处理 */
  PENDING: 'pending',
  /** 处理中 */
  PROCESSING: 'processing',
  /** 已处理 */
  RESOLVED: 'resolved',
} as const

/** 分页配置 */
export const PAGINATION = {
  /** 每页数量 */
  PAGE_SIZE: 20,
  /** 最大页数 */
  MAX_PAGES: 10,
} as const

/** Toast 提示配置 */
export const TOAST = {
  /** 默认时长 */
  DURATION: 2000,
  /** 成功提示时长 */
  SUCCESS_DURATION: 2000,
  /** 错误提示时长 */
  ERROR_DURATION: 3000,
} as const
