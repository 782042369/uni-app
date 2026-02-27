<script setup lang="ts">
import { ref } from 'vue'

definePage({
  name: 'profile',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})

const router = useRouter()

// 用户信息类型
interface UserInfo {
  avatar: string
  name: string
  position: string
  department: string
  status: 'online' | 'offline'
}

// 功能项类型
interface FunctionItem {
  id: string
  name: string
  icon: string
  path: string
  badge?: number
}

// 用户信息
const userInfo = ref<UserInfo>({
  name: '张三',
  avatar: '',
  position: '安全员',
  department: '安全管理部',
  status: 'online',
})

// 功能列表（按使用频率排序）
const menuItems = ref<FunctionItem[]>([
  {
    id: 'messages',
    name: '消息通知',
    icon: 'i-carbon-notification',
    path: '/pages/profile/messages',
    badge: 3,
  },
  {
    id: 'tasks',
    name: '我的待办',
    icon: 'i-carbon-task',
    path: '/pages/profile/tasks',
  },
  {
    id: 'favorites',
    name: '我的收藏',
    icon: 'i-carbon-star',
    path: '/pages/profile/favorites',
  },
  {
    id: 'settings',
    name: '账号设置',
    icon: 'i-carbon-settings',
    path: '/pages/profile/settings',
  },
  {
    id: 'feedback',
    name: '意见反馈',
    icon: 'i-carbon-chat',
    path: '/pages/profile/feedback',
  },
  {
    id: 'about',
    name: '关于我们',
    icon: 'i-carbon-information',
    path: '/pages/profile/about',
  },
])

// 点击个人信息卡片
function handleProfileClick() {
  router.push('/pages/profile/settings')
}

// 点击功能项
function handleMenuClick(item: FunctionItem) {
  router.push(item.path)
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')

        // 跳转到登录页
        uni.reLaunch({
          url: '/pages/login/index',
        })
      }
    },
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <scroll-view scroll-y class="h-screen">
      <!-- 个人信息卡片 -->
      <view
        class="mx-4 mb-3 mt-4 flex items-center rounded-lg bg-white p-4 transition-transform active:scale-95"
        @click="handleProfileClick"
      >
        <!-- 头像 -->
        <view class="mr-4">
          <image
            v-if="userInfo.avatar"
            class="h-12 w-12 rounded-full bg-gray-200"
            :src="userInfo.avatar"
            mode="aspectFill"
          />
          <view
            v-else
            class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200"
          >
            <view class="i-carbon-user text-2xl text-gray-400" />
          </view>
        </view>

        <!-- 用户信息 -->
        <view class="flex-1">
          <view class="mb-1 text-lg text-gray-800 font-bold">
            {{ userInfo.name }}
          </view>
          <view class="flex items-center text-sm text-gray-500">
            <text>{{ userInfo.position }}</text>
            <text class="mx-1">
              ·
            </text>
            <text>{{ userInfo.department }}</text>
          </view>
        </view>

        <!-- 在线状态 -->
        <view
          class="flex items-center rounded-full bg-gray-100 px-3 py-1"
        >
          <view
            class="mr-1 h-2 w-2 rounded-full"
            :class="userInfo.status === 'online' ? 'bg-green-500' : 'bg-gray-400'"
          />
          <text class="text-xs text-gray-500">
            {{ userInfo.status === 'online' ? '在线' : '离线' }}
          </text>
        </view>
      </view>

      <!-- 功能列表 -->
      <view class="mx-4 mb-3 overflow-hidden rounded-lg bg-white">
        <view
          v-for="(item, index) in menuItems"
          :key="item.id"
          class="flex items-center justify-between px-4 py-3 transition-transform active:scale-95"
          :class="{ 'border-b border-gray-100': index < menuItems.length - 1 }"
          @click="handleMenuClick(item)"
        >
          <!-- 左侧：图标+文字 -->
          <view class="flex items-center">
            <view class="mr-3 h-6 w-6 flex items-center justify-center">
              <view :class="item.icon" class="text-xl text-gray-600" />
            </view>
            <text class="text-base text-gray-800">
              {{ item.name }}
            </text>
          </view>

          <!-- 右侧：角标+箭头 -->
          <view class="flex items-center">
            <!-- 消息角标（仅消息通知显示） -->
            <view
              v-if="item.badge && item.badge > 0"
              class="mr-3 rounded-full bg-red-500 px-2 py-0.5"
            >
              <text class="text-xs text-white font-bold">
                {{ item.badge > 99 ? '99+' : item.badge }}
              </text>
            </view>
            <view class="i-carbon-chevron-right text-lg text-gray-400" />
          </view>
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <view class="px-4 pb-6">
        <view
          class="h-11 flex items-center justify-center rounded-lg bg-white transition-transform active:scale-95"
          @click="handleLogout"
        >
          <text class="text-base text-red-500 font-medium">
            退出登录
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
