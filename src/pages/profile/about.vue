<script setup lang="ts">
interface UpdateLog {
  version: string
  date: string
  features: string[]
}

interface ContactInfo {
  icon: string
  label: string
  value: string
  action?: () => void
}

definePage({
  layout: 'default',
  style: {
    navigationBarTitleText: '关于我们',
  },
})

// 应用信息
const appInfo = {
  name: '马郎综管平台',
  version: 'v1.0.0',
  icon: 'i-carbon-earth',
}

// 更新日志
const updateLogs = ref<UpdateLog[]>([
  {
    version: 'v1.0.0',
    date: '2025-01-15',
    features: [
      '正式版本发布',
      '支持 Android、HarmonyOS 和 H5 三平台',
      '核心功能模块上线：安全环保、生产运营、知识库',
    ],
  },
])

// 联系方式
const contactList = ref<ContactInfo[]>([
  {
    icon: 'i-carbon-phone',
    label: '技术支持',
    value: '400-888-8888',
    action: () => {
      uni.makePhoneCall({
        phoneNumber: '400-888-8888',
      })
    },
  },
  {
    icon: 'i-carbon-email',
    label: '邮箱',
    value: 'support@example.com',
    action: () => {
      uni.setClipboardData({
        data: 'support@example.com',
        success: () => {
          uni.showToast({
            title: '邮箱已复制',
            icon: 'success',
          })
        },
      })
    },
  },
  {
    icon: 'i-carbon-location',
    label: '公司地址',
    value: '北京市朝阳区科技园',
  },
])

// 更新日志展开状态
const expandedLogs = ref<Set<string>>(new Set())

// 切换更新日志展开状态
function toggleLog(version: string) {
  if (expandedLogs.value.has(version)) {
    expandedLogs.value.delete(version)
  }
  else {
    expandedLogs.value.add(version)
  }
}

// 检查更新
function checkUpdate() {
  uni.showLoading({
    title: '检查中...',
  })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'success',
    })
  }, 1000)
}

// 当前年份
const currentYear = new Date().getFullYear()

// 系统平台
const systemPlatform = ref('')

// 获取系统信息
onMounted(() => {
  systemPlatform.value = uni.getSystemInfoSync().platform
})
</script>

<template>
  <view class="about-page">
    <!-- 应用图标和名称 -->
    <view class="app-header">
      <view class="app-icon-wrapper">
        <view class="app-icon i-carbon-earth" />
      </view>
      <text class="app-name">
        {{ appInfo.name }}
      </text>
      <text class="app-version">
        {{ appInfo.version }}
      </text>
    </view>

    <!-- 版本信息 -->
    <view class="section version-section">
      <view class="section-header">
        <view class="section-icon i-carbon-information" />
        <text class="section-title">
          版本信息
        </text>
      </view>
      <view class="version-content">
        <view class="version-item">
          <text class="version-label">
            当前版本
          </text>
          <text class="version-value">
            {{ appInfo.version }}
          </text>
        </view>
        <view class="version-item">
          <text class="version-label">
            系统平台
          </text>
          <text class="version-value">
            {{ systemPlatform }}
          </text>
        </view>
      </view>
      <view class="check-update-btn" @click="checkUpdate">
        <text class="check-update-text">
          检查更新
        </text>
        <view class="check-update-icon i-carbon-arrow-right" />
      </view>
    </view>

    <!-- 更新日志 -->
    <view class="section update-log-section">
      <view class="section-header">
        <view class="section-icon i-carbon-document" />
        <text class="section-title">
          更新日志
        </text>
      </view>
      <view class="update-log-list">
        <view
          v-for="log in updateLogs"
          :key="log.version"
          class="log-item"
          :class="{ 'log-expanded': expandedLogs.has(log.version) }"
        >
          <view class="log-header" @click="toggleLog(log.version)">
            <view class="log-version-info">
              <text class="log-version">
                {{ log.version }}
              </text>
              <text class="log-date">
                {{ log.date }}
              </text>
            </view>
            <view
              class="log-expand-icon i-carbon-chevron-down"
              :class="{ 'icon-expanded': expandedLogs.has(log.version) }"
            />
          </view>
          <view v-if="expandedLogs.has(log.version)" class="log-features">
            <view v-for="(feature, index) in log.features" :key="index" class="log-feature">
              <view class="feature-dot" />
              <text class="feature-text">
                {{ feature }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="section contact-section">
      <view class="section-header">
        <view class="section-icon i-carbon-phone" />
        <text class="section-title">
          联系我们
        </text>
      </view>
      <view class="contact-list">
        <view
          v-for="(contact, index) in contactList"
          :key="index"
          class="contact-item"
          :class="{ 'contact-clickable': contact.action }"
          @click="contact.action?.()"
        >
          <view class="contact-icon-wrapper">
            <view :class="contact.icon" />
          </view>
          <view class="contact-info">
            <text class="contact-label">
              {{ contact.label }}
            </text>
            <text class="contact-value">
              {{ contact.value }}
            </text>
          </view>
          <view v-if="contact.action" class="contact-arrow i-carbon-chevron-right" />
        </view>
      </view>
    </view>

    <!-- 底部版权信息 -->
    <view class="footer">
      <text class="copyright">
        Copyright © {{ currentYear }} 马郎综管平台
      </text>
      <text class="rights">
        All Rights Reserved
      </text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.about-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: calc(env(safe-area-inset-bottom) + 80rpx);
}

/* 应用头部 */
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 32rpx 40rpx;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
}

.app-icon-wrapper {
  width: 128rpx;
  height: 128rpx;
  border-radius: 24rpx;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.app-icon {
  width: 64rpx;
  height: 64rpx;
  color: #fff;
}

.app-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12rpx;
  text-align: center;
}

.app-version {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 通用区块 */
.section {
  margin: 24rpx 32rpx;
  padding: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.section-icon {
  width: 32rpx;
  height: 32rpx;
  color: #1e40af;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

/* 版本信息区块 */
.version-content {
  margin-bottom: 24rpx;
}

.version-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
}

.version-label {
  font-size: 28rpx;
  color: #6b7280;
}

.version-value {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 500;
}

.check-update-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 20rpx;
  background-color: #f3f4f6;
  border-radius: 8rpx;
}

.check-update-text {
  font-size: 28rpx;
  color: #1e40af;
}

.check-update-icon {
  width: 24rpx;
  height: 24rpx;
  color: #1e40af;
}

/* 更新日志区块 */
.update-log-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.log-item {
  border-radius: 8rpx;
  background-color: #f9fafb;
  overflow: hidden;
  transition: all 0.3s;
}

.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx;
  cursor: pointer;
}

.log-version-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.log-version {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.log-date {
  font-size: 24rpx;
  color: #9ca3af;
}

.log-expand-icon {
  width: 28rpx;
  height: 28rpx;
  color: #9ca3af;
  transition: transform 0.3s;

  &.icon-expanded {
    transform: rotate(180deg);
  }
}

.log-features {
  padding: 0 24rpx 20rpx;
}

.log-feature {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  margin-bottom: 12rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.feature-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background-color: #1e40af;
  margin-top: 10rpx;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
  font-size: 26rpx;
  color: #4b5563;
  line-height: 1.6;
}

/* 联系方式区块 */
.contact-list {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &.contact-clickable {
    cursor: pointer;
    transition: background-color 0.2s;

    &:active {
      background-color: #f9fafb;
    }
  }
}

.contact-icon-wrapper {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  background-color: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;

  > view {
    width: 32rpx;
    height: 32rpx;
    color: #1e40af;
  }
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.contact-label {
  font-size: 24rpx;
  color: #6b7280;
}

.contact-value {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 500;
}

.contact-arrow {
  width: 24rpx;
  height: 24rpx;
  color: #d1d5db;
}

/* 底部版权 */
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 32rpx;
  gap: 8rpx;
}

.copyright {
  font-size: 24rpx;
  color: #9ca3af;
}

.rights {
  font-size: 22rpx;
  color: #d1d5db;
}
</style>
