/**
 * 用户相关类型定义
 */

/** 用户信息 */
export interface UserInfo {
  /** 姓名 */
  name: string
  /** 角色 */
  role: string
  /** 部门 */
  department: string
  /** 手机号 */
  phone: string
  /** 头像 URL */
  avatar: string
}

/** 菜单项 */
export interface MenuItem {
  /** 菜单 ID */
  id: string
  /** 图标类名 */
  icon: string
  /** 菜单标题 */
  title: string
  /** 菜单描述 */
  desc: string
  /** 点击操作 */
  action: () => void
}

/** 统计数据 */
export interface StatisticsItem {
  /** 数值 */
  value: string | number
  /** 标签 */
  label: string
}
