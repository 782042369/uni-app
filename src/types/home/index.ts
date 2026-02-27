/**
 * 首页数据类型定义
 *
 * 基于 DATA_MODELS.md 中的首页数据模型定义
 */

// ========== 核心数据看板类型 ==========

/**
 * 生产核心数据
 */
export interface ProductionData {
  /** 今日采煤量（万吨） */
  coalOutput: number
  /** 今日剥离量（万立方米） */
  strippingVolume: number
  /** 运输量（万吨） */
  transportVolume: number
}

/**
 * 安全核心数据
 */
export interface SafetyData {
  /** 未处理风险（项） */
  unhandledRisks: number
  /** 未处理隐患（项） */
  unhandledHazards: number
}

/**
 * 设备核心数据
 */
export interface EquipmentData {
  /** 在线设备（台） */
  onlineCount: number
  /** 故障设备（台） */
  faultCount: number
}

/**
 * 环保核心数据（首页）
 */
export interface HomeEnvironmentalData {
  /** 水质：达标/异常 */
  waterQuality: 'compliant' | 'abnormal'
  /** 土壤：达标/异常 */
  soilQuality: 'compliant' | 'abnormal'
  /** 固废：合规/异常 */
  solidWaste: 'compliant' | 'abnormal'
  /** 大气：达标/异常 */
  atmosphere: 'compliant' | 'abnormal'
}

/**
 * 产存销核心数据
 */
export interface SalesData {
  /** 今日产量（万吨） */
  todayOutput: number
  /** 当前库存（万吨） */
  currentStock: number
  /** 今日销量（万吨） */
  todaySales: number
}

/**
 * 核心数据看板
 */
export interface CoreDataDashboard {
  /** 生产核心数据 */
  production: ProductionData
  /** 安全核心数据 */
  safety: SafetyData
  /** 设备核心数据 */
  equipment: EquipmentData
  /** 环保核心数据 */
  environmental: HomeEnvironmentalData
  /** 产存销核心数据 */
  sales: SalesData
  /** 数据更新时间 */
  updateTime: string
}

// ========== 待办提醒类型 ==========

/**
 * 待办类型
 */
export type TodoType = '隐患整改' | '预警处置' | '其他'

/**
 * 待办状态
 */
export type TodoStatus = 'pending' | 'processing' | 'completed'

/**
 * 待办事项
 */
export interface TodoItem {
  /** 唯一标识 */
  id: string
  /** 待办类型 */
  type: TodoType
  /** 待办内容（不超过15字） */
  content: string
  /** 截止时间（如"今日18:00前"） */
  deadline: string
  /** 状态 */
  status: TodoStatus
  /** 跳转链接 */
  link: string
}

/**
 * 待办列表
 */
export interface TodoList {
  /** 待办项列表 */
  items: TodoItem[]
  /** 总数量 */
  total: number
  /** "更多待办"链接 */
  moreLink: string
}

// ========== 常用功能类型 ==========

/**
 * 功能项
 */
export interface QuickAction {
  /** 唯一标识 */
  id: string
  /** 功能名称（不超过6字） */
  name: string
  /** 图标类名 */
  icon: string
  /** 跳转路径 */
  path: string
  /** 角标数量（可选） */
  badge?: number
}

/**
 * 常用功能列表
 */
export interface QuickActionList {
  /** 9个常用功能 */
  items: QuickAction[]
}
