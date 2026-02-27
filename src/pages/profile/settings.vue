<script setup lang="ts">
import { useSettingsStore } from '@/store'

definePage({
  name: 'settings',
  layout: 'default',
  style: {
    navigationBarTitleText: '账号设置',
  },
})

const settingsStore = useSettingsStore()

// 弹窗状态
const showPasswordPopup = ref(false)
const showPhonePopup = ref(false)

// 表单数据
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const phoneForm = reactive({
  phone: '',
  code: '',
})

// 获取绑定手机号显示（脱敏）
const maskedPhone = computed(() => {
  const phone = settingsStore.boundPhone
  if (!phone)
    return '未绑定'
  if (phone.length === 11)
    return `${phone.slice(0, 3)}****${phone.slice(7)}`
  return phone
})

// 全局消息提示
const { success, error, info } = useGlobalToast()

/**
 * 打开修改密码弹窗
 */
function openChangePassword() {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  showPasswordPopup.value = true
}

/**
 * 确认修改密码
 */
async function handleConfirmPassword() {
  // 验证表单
  if (!passwordForm.oldPassword) {
    error('请输入旧密码')
    return
  }
  if (!passwordForm.newPassword) {
    error('请输入新密码')
    return
  }
  if (passwordForm.newPassword.length < 6) {
    error('新密码至少6位')
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    error('两次密码不一致')
    return
  }

  try {
    await settingsStore.changePassword(passwordForm.oldPassword, passwordForm.newPassword)
    success('密码修改成功')
    showPasswordPopup.value = false
  }
  catch (e: any) {
    error(e.message || '密码修改失败')
  }
}

/**
 * 打开绑定手机弹窗
 */
function openBindPhone() {
  phoneForm.phone = settingsStore.boundPhone || ''
  phoneForm.code = ''
  showPhonePopup.value = true
}

/**
 * 发送验证码（模拟）
 */
function sendVerifyCode() {
  if (!phoneForm.phone) {
    error('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
    error('手机号格式不正确')
    return
  }
  info('验证码已发送')
  // TODO: 实际项目中需要调用 API 发送验证码
}

/**
 * 确认绑定手机
 */
async function handleConfirmPhone() {
  if (!phoneForm.phone) {
    error('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
    error('手机号格式不正确')
    return
  }
  if (!phoneForm.code) {
    error('请输入验证码')
    return
  }

  try {
    await settingsStore.bindPhone(phoneForm.phone, phoneForm.code)
    success('手机绑定成功')
    showPhonePopup.value = false
  }
  catch (e: any) {
    error(e.message || '手机绑定失败')
  }
}

/**
 * 消息提醒开关变化
 */
function handleMessageNotificationChange(value: boolean) {
  settingsStore.setMessageNotification(value)
  success(value ? '已开启消息提醒' : '已关闭消息提醒')
}

/**
 * 自动登录开关变化
 */
function handleAutoLoginChange(value: boolean) {
  settingsStore.setAutoLogin(value)
  success(value ? '已开启自动登录' : '已关闭自动登录')
}
</script>

<template>
  <view class="settings-page min-h-screen bg-bg-secondary">
    <!-- 安全设置 -->
    <wd-cell-group title="安全设置" border>
      <wd-cell
        title="修改密码"
        is-link
        center
        @click="openChangePassword"
      >
        <template #icon>
          <view class="i-carbon-password text-4.5 text-primary" />
        </template>
      </wd-cell>
      <wd-cell
        title="绑定手机"
        :value="maskedPhone"
        is-link
        center
        @click="openBindPhone"
      >
        <template #icon>
          <view class="i-carbon-phone text-4.5 text-primary" />
        </template>
      </wd-cell>
    </wd-cell-group>

    <!-- 通知设置 -->
    <wd-cell-group title="通知设置" border>
      <wd-cell title="消息提醒" center>
        <template #icon>
          <view class="i-carbon-notification text-4.5 text-primary" />
        </template>
        <wd-switch
          v-model="settingsStore.messageNotification"
          @change="handleMessageNotificationChange"
        />
      </wd-cell>
    </wd-cell-group>

    <!-- 其他设置 -->
    <wd-cell-group title="其他设置" border>
      <wd-cell title="自动登录" center>
        <template #icon>
          <view class="i-carbon-login text-4.5 text-primary" />
        </template>
        <wd-switch
          v-model="settingsStore.autoLogin"
          @change="handleAutoLoginChange"
        />
      </wd-cell>
    </wd-cell-group>

    <!-- 修改密码弹窗 -->
    <wd-popup v-model="showPasswordPopup" position="bottom" :safe-area-inset-bottom="true" custom-style="border-radius: 16rpx 16rpx 0 0;">
      <view class="popup-content p-4">
        <view class="mb-4 text-center text-base font-bold">
          修改密码
        </view>
        <wd-input
          v-model="passwordForm.oldPassword"
          type="safe-password"
          label="旧密码"
          placeholder="请输入旧密码"
          clearable
          class="mb-3"
        />
        <wd-input
          v-model="passwordForm.newPassword"
          type="safe-password"
          label="新密码"
          placeholder="请输入新密码（至少6位）"
          clearable
          class="mb-3"
        />
        <wd-input
          v-model="passwordForm.confirmPassword"
          type="safe-password"
          label="确认密码"
          placeholder="请再次输入新密码"
          clearable
          class="mb-4"
        />
        <view class="flex gap-3">
          <wd-button block type="default" @click="showPasswordPopup = false">
            取消
          </wd-button>
          <wd-button block type="primary" @click="handleConfirmPassword">
            确认
          </wd-button>
        </view>
      </view>
    </wd-popup>

    <!-- 绑定手机弹窗 -->
    <wd-popup v-model="showPhonePopup" position="bottom" :safe-area-inset-bottom="true" custom-style="border-radius: 16rpx 16rpx 0 0;">
      <view class="popup-content p-4">
        <view class="mb-4 text-center text-base font-bold">
          {{ settingsStore.boundPhone ? '更换绑定手机' : '绑定手机' }}
        </view>
        <wd-input
          v-model="phoneForm.phone"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          clearable
          class="mb-3"
        />
        <wd-input
          v-model="phoneForm.code"
          type="text"
          label="验证码"
          placeholder="请输入验证码"
          clearable
          class="mb-4"
        >
          <template #suffix>
            <wd-button size="small" type="primary" @click="sendVerifyCode">
              发送验证码
            </wd-button>
          </template>
        </wd-input>
        <view class="flex gap-3">
          <wd-button block type="default" @click="showPhonePopup = false">
            取消
          </wd-button>
          <wd-button block type="primary" @click="handleConfirmPhone">
            确认
          </wd-button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.settings-page {
  padding: 16rpx 0;
}

.popup-content {
  background-color: #fff;
}
</style>
