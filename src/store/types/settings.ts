/**
 * Store 类型定义
 */

export interface SettingState {
  /** 消息提醒开关 */
  messageNotification: boolean
  /** 自动登录开关 */
  autoLogin: boolean
  /** 绑定手机号 */
  boundPhone: string
}
