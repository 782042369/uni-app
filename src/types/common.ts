/**
 * 通用类型定义
 * 遵循 TypeScript 严格类型规范
 */

/**
 * 地理位置信息
 */
export interface Location {
  /** 纬度 */
  latitude: number
  /** 经度 */
  longitude: number
  /** 详细地址（可选） */
  address?: string
}

/**
 * 上传文件信息
 */
export interface UploadFile {
  /** 文件 URL */
  url: string
  /** 文件名 */
  name: string
  /** 文件大小（字节，可选） */
  size?: number
  /** 文件类型（MIME type，可选） */
  type?: string
}

/**
 * 分页响应数据
 */
export interface PageResponse<T> {
  /** 数据列表 */
  list: T[]
  /** 总记录数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}

/**
 * API 统一响应格式
 */
export interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
}

/**
 * 分页请求参数
 */
export interface PageParams {
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
}
