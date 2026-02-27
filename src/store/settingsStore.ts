/**
 * 账号设置 Store
 *
 * 管理用户账号相关设置
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 状态
  const messageNotification = ref(true)
  const autoLogin = ref(true)
  const boundPhone = ref('')

  // 计算属性
  const hasNotificationEnabled = computed(() => messageNotification.value)
  const isPhoneBound = computed(() => boundPhone.value.length > 0)

  // Actions
  function setMessageNotification(enabled: boolean) {
    messageNotification.value = enabled
    uni.setStorageSync('setting_message_notification', enabled)
  }

  function setAutoLogin(enabled: boolean) {
    autoLogin.value = enabled
    uni.setStorageSync('setting_auto_login', enabled)
  }

  function setBoundPhone(phone: string) {
    boundPhone.value = phone
    uni.setStorageSync('setting_bound_phone', phone)
  }

  /**
   * 修改密码（示例，实际需要调用 API）
   */
  function changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    // TODO: 调用 API 修改密码
    return new Promise((resolve, reject) => {
      // 模拟 API 调用
      setTimeout(() => {
        if (oldPassword && newPassword && newPassword.length >= 6) {
          resolve(true)
        }
        else {
          reject(new Error('密码格式不正确'))
        }
      }, 500)
    })
  }

  /**
   * 绑定手机（示例，实际需要调用 API）
   */
  function bindPhone(phone: string, code: string): Promise<boolean> {
    // TODO: 调用 API 绑定手机
    return new Promise((resolve, reject) => {
      // 模拟 API 调用
      setTimeout(() => {
        if (phone && code) {
          boundPhone.value = phone
          resolve(true)
        }
        else {
          reject(new Error('手机号或验证码不能为空'))
        }
      }, 500)
    })
  }

  /**
   * 从本地存储恢复设置
   */
  function restoreSettings() {
    const notification = uni.getStorageSync('setting_message_notification')
    const autoLoginStorage = uni.getStorageSync('setting_auto_login')
    const phone = uni.getStorageSync('setting_bound_phone')

    if (notification !== null)
      messageNotification.value = notification
    if (autoLoginStorage !== null)
      autoLogin.value = autoLoginStorage
    if (phone)
      boundPhone.value = phone
  }

  return {
    // State
    messageNotification,
    autoLogin,
    boundPhone,

    // Computed
    hasNotificationEnabled,
    isPhoneBound,

    // Actions
    setMessageNotification,
    setAutoLogin,
    setBoundPhone,
    changePassword,
    bindPhone,
    restoreSettings,
  }
})
