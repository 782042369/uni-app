/**
 * 页面相关类型定义
 * 遵循 TypeScript 严格类型规范
 */

/**
 * 一级菜单键
 */
export type MainTabKey = 'index' | 'safety' | 'production' | 'knowledge' | 'profile'

/**
 * 一级菜单项
 */
export interface MainTabItem {
  /** 菜单唯一标识 */
  key: MainTabKey
  /** 菜单显示文本 */
  label: string
  /** 图标名称（UnoCSS 图标类名） */
  icon: string
  /** 路由路径 */
  path: string
}

/**
 * 安全环保中心二级菜单键
 */
export type SafetySubTabKey = 'monitor' | 'warning' | 'risk' | 'contacts' | 'hazard' | 'environmental'

/**
 * 生产运营二级菜单键
 */
export type ProductionSubTabKey = 'monitor' | 'automation' | 'report' | 'video' | 'sales'

/**
 * 知识库分类
 */
export type KnowledgeCategory = 'safety' | 'equipment' | 'environmental' | 'production' | 'emergency'

/**
 * 个人中心功能
 */
export type ProfileFeature = 'messages' | 'tasks' | 'favorites' | 'settings' | 'feedback' | 'about'

/**
 * 联系人分组
 */
export type ContactGroup
  = | 'command' // 应急指挥组
    | 'safety' // 安全管理部
    | 'medical' // 医疗急救
    | 'fire' // 消防救援
    | 'maintenance' // 设备维修
    | 'external' // 外部救援

/**
 * 联系人信息
 */
export interface Contact {
  /** 联系人 ID */
  id: string
  /** 姓名 */
  name: string
  /** 部门 */
  department: string
  /** 职务 */
  position: string
  /** 联系电话 */
  phone: string
  /** 所属分组 */
  group: ContactGroup
  /** 头像（可选） */
  avatar?: string
}
