import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref({
    id: '',
    avatar: '',
    name: '',
    position: '',
    department: '',
    status: 'offline' as 'online' | 'offline',
  })

  const isLoggedIn = ref(false)
  const token = ref('')

  // 登录
  function login(userData: any, userToken: string) {
    userInfo.value = userData
    token.value = userToken
    isLoggedIn.value = true
    userInfo.value.status = 'online'
    // 持久化
    uni.setStorageSync('token', userToken)
    uni.setStorageSync('userInfo', userData)
  }

  // 登出
  function logout() {
    userInfo.value = {
      id: '',
      avatar: '',
      name: '',
      position: '',
      department: '',
      status: 'offline',
    }
    token.value = ''
    isLoggedIn.value = false
    // 清除存储
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
  }

  // 检查登录状态
  function checkLogin() {
    const savedToken = uni.getStorageSync('token')
    const savedUser = uni.getStorageSync('userInfo')
    if (savedToken && savedUser) {
      token.value = savedToken
      userInfo.value = savedUser
      isLoggedIn.value = true
      userInfo.value.status = 'online'
    }
  }

  return {
    userInfo,
    isLoggedIn,
    token,
    login,
    logout,
    checkLogin,
  }
})
