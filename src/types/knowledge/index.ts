/**
 * 知识库类型定义
 * 基于「马郎综管平台产品设计文档（移动端）」
 */

/**
 * 资料类型
 */
export type MaterialType
  = | 'all' // 全部资料
    | 'safety' // 安全技术
    | 'equipment' // 设备操作
    | 'environmental' // 环保规范
    | 'process' // 生产工艺
    | 'emergency' // 应急处置

/**
 * 资料信息
 */
export interface Material {
  /** 资料ID */
  id: string
  /** 资料标题 */
  title: string
  /** 资料类型 */
  type: MaterialType
  /** 发布时间 */
  publishTime: string
  /** 浏览量 */
  viewCount: number
  /** 是否为新资料（发布7天内） */
  isNew?: boolean
  /** 资料摘要 */
  summary?: string
  /** 资料内容 */
  content?: string
  /** 资料图片 */
  images?: string[]
  /** 附件列表 */
  attachments?: {
    name: string
    url: string
    size?: number
  }[]
}

/**
 * 资料列表参数
 */
export interface MaterialListParams {
  /** 资料类型筛选 */
  type?: MaterialType
  /** 页码 */
  page?: number
  /** 每页大小 */
  pageSize?: number
}

/**
 * 资料列表响应
 */
export interface MaterialListResponse {
  /** 资料列表 */
  items: Material[]
  /** 总数 */
  total: number
  /** 当前页 */
  page: number
  /** 每页大小 */
  pageSize: number
  /** 是否最后一页 */
  isLastPage: boolean
}

/**
 * 搜索结果
 */
export interface SearchResult {
  /** 资料ID */
  id: string
  /** 资料标题 */
  title: string
  /** 资料类型 */
  type: MaterialType
  /** 高亮片段 */
  highlight: string
  /** 匹配得分 */
  score?: number
}

/**
 * 搜索参数
 */
export interface SearchParams {
  /** 搜索关键词 */
  keyword: string
  /** 资料类型筛选 */
  type?: MaterialType
  /** 页码 */
  page?: number
  /** 每页大小 */
  pageSize?: number
}

/**
 * 搜索响应
 */
export interface SearchResponse {
  /** 搜索结果 */
  results: SearchResult[]
  /** 总数 */
  total: number
  /** 搜索关键词 */
  keyword: string
}

/**
 * 资料详情（扩展）
 */
export interface MaterialDetail extends Material {
  /** 是否已收藏 */
  isFavorited: boolean
  /** 相关资料 */
  relatedMaterials?: Material[]
}

/**
 * 资料分类标签
 */
export interface MaterialCategory {
  /** 类型值 */
  value: MaterialType
  /** 显示名称 */
  label: string
  /** 图标 */
  icon: string
}

/**
 * 资料分类配置
 */
export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  { value: 'all', label: '全部资料', icon: 'i-carbon-document' },
  { value: 'safety', label: '安全技术', icon: 'i-carbon-security' },
  { value: 'equipment', label: '设备操作', icon: 'i-carbon-settings' },
  { value: 'environmental', label: '环保规范', icon: 'i-carbon-stem-leaf-plot' },
  { value: 'process', label: '生产工艺', icon: 'i-carbon-cylinder' },
  { value: 'emergency', label: '应急处置', icon: 'i-carbon-warning' },
]

/**
 * 获取资料类型显示名称
 */
export function getMaterialTypeLabel(type: MaterialType): string {
  const category = MATERIAL_CATEGORIES.find(c => c.value === type)
  return category?.label || '未知类型'
}

/**
 * 获取资料类型颜色
 */
export function getMaterialTypeColor(type: MaterialType): string {
  const colorMap: Record<MaterialType, string> = {
    all: '#6B7280',
    safety: '#1E40AF',
    equipment: '#10B981',
    environmental: '#059669',
    process: '#F59E0B',
    emergency: '#EF4444',
  }
  return colorMap[type] || '#6B7280'
}
