// 用户信息
export interface UserInfo {
  id: string
  avatar: string
  name: string
  position: string
  department: string
  status: 'online' | 'offline'
  phone?: string
  email?: string
}

// 功能项
export interface FunctionItem {
  id: string
  name: string
  icon: string
  path: string
  badge?: number
}

// 账号设置
export interface AccountSettings {
  autoLogin: boolean
  notificationEnabled: boolean
  bindPhone?: string
}
