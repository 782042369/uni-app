/**
 * 安全环保中心相关类型定义
 *
 * 基于 DATA_MODELS.md 中的安全环保数据模型定义
 */

// ========== 风险管控类型 ==========

/**
 * 风险等级
 */
export type RiskLevel = 'major' | 'large' | 'general' | 'low'

/**
 * 风险状态
 */
export type RiskStatus = 'active' | 'controlled' | 'eliminated'

/**
 * 风险检查记录
 */
export interface RiskCheckRecord {
  /** 检查记录 ID */
  id: string
  /** 检查人 */
  checker: string
  /** 检查时间 */
  checkTime: string
  /** 检查结果 */
  result: string
  /** 现场照片（可选） */
  photos?: string[]
}

/**
 * 风险信息
 */
export interface Risk {
  /** 风险 ID */
  id: string
  /** 风险名称 */
  name: string
  /** 风险等级 */
  level: RiskLevel
  /** 管控责任人 */
  manager: string
  /** 管控措施 */
  measures: string[]
  /** 风险位置 */
  location: string
  /** 风险状态 */
  status: RiskStatus
  /** 检查记录 */
  checkRecords: RiskCheckRecord[]
  /** 更新时间 */
  updateTime: string
}

/**
 * 风险列表
 */
export interface RiskList {
  /** 风险列表 */
  items: Risk[]
  /** 筛选条件 */
  filter: {
    /** 风险等级（可选） */
    level?: RiskLevel
  }
}

// ========== 预警处置类型 ==========

/**
 * 预警级别
 */
export type AlertLevel = 'minor' | 'moderate' | 'major' | 'critical'

/**
 * 预警类型
 */
export type AlertType = 'safety' | 'environmental'

/**
 * 预警处置状态
 */
export type AlertStatus = 'pending' | 'processing' | 'completed'

/**
 * 预警信息
 */
export interface Alert {
  /** 预警 ID */
  id: string
  /** 预警级别 */
  level: AlertLevel
  /** 预警类型 */
  type: AlertType
  /** 预警内容 */
  content: string
  /** 预警时间 */
  time: string
  /** 发生位置 */
  location: string
  /** 处置状态 */
  status: AlertStatus
  /** 处置人（可选） */
  assignee?: string
  /** 截止时间（可选） */
  deadline?: string
  /** 现场照片（可选） */
  photos?: string[]
}

/**
 * 预警列表
 */
export interface AlertList {
  /** 预警列表 */
  items: Alert[]
  /** 筛选条件 */
  filter: {
    /** 预警级别（可选） */
    level?: AlertLevel
    /** 预警类型（可选） */
    type?: AlertType
    /** 处置状态（可选） */
    status?: AlertStatus
  }
}

/**
 * 预警详情
 */
export interface AlertDetail extends Alert {
  /** 预警指标 */
  indicators: Record<string, any>
  /** 异常数据 */
  abnormalData: Record<string, any>
  /** 处置历史 */
  history: Alert[]
}

// ========== 隐患排查类型 ==========

/**
 * 隐患等级
 */
export type HazardLevel = 'major' | 'large' | 'general'

/**
 * 整改状态
 */
export type HazardStatus = 'pending' | 'rectifying' | 'rectified' | 'rejected'

/**
 * 隐患整改信息
 */
export interface HazardRectification {
  /** 整改措施 */
  measures: string
  /** 整改照片（可选） */
  photos?: string[]
  /** 提交时间 */
  submitTime: string
}

/**
 * 隐患验收信息
 */
export interface HazardVerification {
  /** 验收结果 */
  result: 'passed' | 'failed'
  /** 验收意见 */
  comment: string
  /** 验收人 */
  verifier: string
  /** 验收时间 */
  verifyTime: string
}

/**
 * 隐患信息
 */
export interface Hazard {
  /** 隐患 ID */
  id: string
  /** 隐患名称 */
  name: string
  /** 隐患等级 */
  level: HazardLevel
  /** 排查人 */
  reporter: string
  /** 排查时间 */
  reportTime: string
  /** 隐患描述 */
  description: string
  /** 隐患位置 */
  location: string
  /** 现场照片（可选） */
  photos?: string[]
  /** 整改状态 */
  status: HazardStatus
  /** 整改责任人（可选） */
  assignee?: string
  /** 整改截止时间（可选） */
  deadline?: string
  /** 整改信息（可选） */
  rectification?: HazardRectification
  /** 验收信息（可选） */
  verification?: HazardVerification
}

/**
 * 隐患列表
 */
export interface HazardList {
  /** 隐患列表 */
  items: Hazard[]
  /** 筛选条件 */
  filter: {
    /** 隐患等级（可选） */
    level?: HazardLevel
    /** 整改状态（可选） */
    status?: HazardStatus
    /** 排查区域（可选） */
    area?: string
  }
  /** 统计信息 */
  statistics: {
    /** 按等级统计 */
    byLevel: Record<HazardLevel, number>
    /** 按状态统计 */
    byStatus: Record<HazardStatus, number>
  }
}

// ========== 环保监测类型 ==========

/**
 * 环保监测类型
 */
export type EnvironmentalType = 'water' | 'soil' | 'waste' | 'air' | 'noise'

/**
 * 环保监测指标
 */
export interface EnvironmentalIndicator {
  /** 指标名称 */
  name: string
  /** 当前数值 */
  value: number
  /** 单位 */
  unit: string
  /** 标准值 */
  standard: number
  /** 状态 */
  status: 'compliant' | 'abnormal'
  /** 趋势数据（可选） */
  trend?: number[]
}

/**
 * 监测点信息
 */
export interface MonitorPoint {
  /** 监测点 ID */
  id: string
  /** 监测点名称 */
  name: string
  /** 监测点位置 */
  position: {
    /** 纬度 */
    lat: number
    /** 经度 */
    lng: number
  }
}

/**
 * 环保监测数据
 */
export interface EnvironmentalData {
  /** 监测类型 */
  type: EnvironmentalType
  /** 监测指标 */
  indicators: EnvironmentalIndicator[]
  /** 监测点列表 */
  monitorPoints: MonitorPoint[]
  /** 更新时间 */
  updateTime: string
}

/**
 * 环保监测汇总
 */
export interface EnvironmentalSummary {
  /** 水质监测 */
  water: EnvironmentalData
  /** 土壤监测 */
  soil: EnvironmentalData
  /** 固废监测 */
  waste: EnvironmentalData
  /** 大气监测 */
  air: EnvironmentalData
  /** 噪声监测 */
  noise: EnvironmentalData
}

// ========== 安全监测类型 ==========

/**
 * 监测类型
 */
export type MonitorType
  = | 'person' // 人员监测
    | 'vehicle' // 车辆监测
    | 'slope' // 边坡监测
    | 'spontaneous' // 煤层防自燃
    | 'drainage' // 防排水
    | 'system' // 生产系统安全监测
    | 'video' // AI视频监测

/**
 * 监测点状态
 */
export type MonitorStatus = 'normal' | 'warning' | 'error'

/**
 * 监测点信息
 */
export interface MonitorPoint {
  /** 监测点 ID */
  id: string
  /** 监测点名称 */
  name: string
  /** 监测类型 */
  type: MonitorType
  /** 监测状态 */
  status: MonitorStatus
  /** 监测位置 */
  position: {
    /** 纬度 */
    lat: number
    /** 经度 */
    lng: number
  }
  /** 监测数据 */
  data: Record<string, any>
  /** 异常说明（可选） */
  alertMessage?: string
}

/**
 * 监测列表
 */
export interface MonitorList {
  /** 监测点列表 */
  points: MonitorPoint[]
  /** 异常数量 */
  abnormalCount: number
  /** 当前筛选类型 */
  filterType: MonitorType
}
