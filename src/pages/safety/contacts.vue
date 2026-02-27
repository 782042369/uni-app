<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Contact, ContactGroup } from '@/types/pages'

definePage({
  name: 'safety-contacts',
  layout: 'default',
  style: {
    navigationBarTitleText: '应急通讯录',
    navigationStyle: 'default',
  },
})

// 联系人分组数据
interface ContactGroupItem {
  id: ContactGroup
  name: string
  icon: string
}

const contactGroups = ref<ContactGroupItem[]>([
  { id: 'command', name: '应急指挥组', icon: 'i-carbon-user-multiple' },
  { id: 'safety', name: '安全管理部', icon: 'i-carbon-security' },
  { id: 'medical', name: '医疗急救', icon: 'i-carbon-reminder-medical' },
  { id: 'fire', name: '消防救援', icon: 'i-carbon-fire' },
  { id: 'maintenance', name: '设备维修', icon: 'i-carbon-tools' },
  { id: 'external', name: '外部救援', icon: 'i-carbon-phone-outgoing' },
])

// 联系人数据（Mock 数据，实际应从 API 获取）
const contactsData = ref<Record<string, Contact[]>>({
  command: [
    { id: '1', name: '张总指挥', department: '应急指挥组', position: '总指挥', phone: '13800138001', group: 'command' },
    { id: '2', name: '李副总指挥', department: '应急指挥组', position: '副总指挥', phone: '13800138002', group: 'command' },
    { id: '3', name: '王调度员', department: '应急指挥组', position: '调度员', phone: '13800138003', group: 'command' },
  ],
  safety: [
    { id: '4', name: '赵安全', department: '安全管理部', position: '部长', phone: '13800138004', group: 'safety' },
    { id: '5', name: '钱安检', department: '安全管理部', position: '安全员', phone: '13800138005', group: 'safety' },
  ],
  medical: [
    { id: '6', name: '孙医生', department: '医疗急救', position: '值班医生', phone: '13800138006', group: 'medical' },
    { id: '7', name: '周护士', department: '医疗急救', position: '护士', phone: '13800138007', group: 'medical' },
  ],
  fire: [
    { id: '8', name: '吴队长', department: '消防救援', position: '消防队长', phone: '13800138008', group: 'fire' },
    { id: '9', name: '郑队员', department: '消防救援', position: '消防员', phone: '13800138009', group: 'fire' },
  ],
  maintenance: [
    { id: '10', name: '冯工程师', department: '设备维修', position: '维修工程师', phone: '13800138010', group: 'maintenance' },
    { id: '11', name: '陈技师', department: '设备维修', position: '技师', phone: '13800138011', group: 'maintenance' },
  ],
  external: [
    { id: '12', name: '120急救中心', department: '外部救援', position: '急救中心', phone: '120', group: 'external' },
    { id: '13', name: '119消防中心', department: '外部救援', position: '消防中心', phone: '119', group: 'external' },
    { id: '14', name: '110报警中心', department: '外部救援', position: '报警中心', phone: '110', group: 'external' },
  ],
})

// 当前选中的分组
const activeGroup = ref<ContactGroup>('command')

// 搜索关键词
const searchKeyword = ref('')

// 紧急呼叫电话（应急指挥组总指挥）
const emergencyPhone = computed(() => {
  const commandContacts = contactsData.value.command
  return commandContacts.length > 0 ? commandContacts[0].phone : ''
})

// 过滤后的联系人列表
const filteredContacts = computed(() => {
  let contacts = contactsData.value[activeGroup.value] || []

  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    contacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(keyword)
      || contact.department.toLowerCase().includes(keyword)
      || contact.position.toLowerCase().includes(keyword)
      || contact.phone.includes(keyword),
    )
  }

  return contacts
})

// 选择分组
function handleSelectGroup(groupId: ContactGroup) {
  activeGroup.value = groupId
  searchKeyword.value = '' // 切换分组时清空搜索
}

// 搜索联系人
function handleSearch(e: any) {
  searchKeyword.value = e.detail.value
}

// 拨打电话
function handleCall(phone: string, name: string) {
  uni.showModal({
    title: '拨打电话',
    content: `确定要拨打 ${name} 的电话 (${phone}) 吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: phone,
          fail: () => {
            uni.showToast({
              title: '拨打失败',
              icon: 'none',
            })
          },
        })
      }
    },
  })
}

// 紧急呼叫
function handleEmergencyCall() {
  if (!emergencyPhone.value) {
    uni.showToast({
      title: '紧急电话未配置',
      icon: 'none',
    })
    return
  }

  uni.showModal({
    title: '紧急呼叫',
    content: `确定要拨打应急指挥组电话 (${emergencyPhone.value}) 吗？`,
    confirmText: '立即拨打',
    confirmColor: '#EF4444',
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: emergencyPhone.value,
          fail: () => {
            uni.showToast({
              title: '拨打失败',
              icon: 'none',
            })
          },
        })
      }
    },
  })
}

// 保存到通讯录
function handleSaveContact(_contact: Contact) {
  uni.showToast({
    title: '已保存到通讯录',
    icon: 'success',
  })
  // 实际应调用保存到通讯录的 API
}

// 获取当前分组名称
const currentGroupName = computed(() => {
  const group = contactGroups.value.find(g => g.id === activeGroup.value)
  return group?.name || '全部'
})
</script>

<template>
  <view class="min-h-screen bg-bg-secondary pb-32">
    <!-- 联系人数统计 -->
    <view class="border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
      <text class="text-xs text-gray-500 dark:text-gray-400">
        共 {{ filteredContacts.length }} 位联系人
      </text>
    </view>

    <!-- 通讯录分类 - 横向滑动 -->
    <scroll-view
      scroll-x
      :show-scrollbar="false"
      class="sticky top-0 z-50 border-b border-gray-200 bg-white px-2 py-3 dark:border-gray-700 dark:bg-gray-800"
    >
      <view class="flex flex-nowrap gap-2">
        <view
          v-for="group in contactGroups"
          :key="group.id"
          class="flex-shrink-0 rounded-full px-4 py-2 transition-all"
          :class="activeGroup === group.id
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
          @tap="handleSelectGroup(group.id)"
        >
          <view class="flex items-center gap-1.5">
            <text
              class="text-sm"
              :class="group.icon"
            />
            <text class="text-sm font-medium">
              {{ group.name }}
            </text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 搜索框 -->
    <view class="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <view class="flex items-center rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
        <text class="i-carbon-search mr-2 text-gray-500" />
        <input
          class="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100"
          type="text"
          placeholder="搜索联系人姓名、部门、职务或电话"
          :value="searchKeyword"
          placeholder-class="text-gray-400"
          @input="handleSearch"
        >
        <text
          v-if="searchKeyword"
          class="i-carbon-close ml-2 cursor-pointer text-gray-400"
          @tap="searchKeyword = ''"
        />
      </view>
    </view>

    <!-- 联系人列表 -->
    <scroll-view
      scroll-y
      class="h-[calc(100vh-180px)]"
    >
      <!-- 当前分组标题 -->
      <view class="bg-bg-secondary px-4 py-2">
        <text class="text-xs text-gray-500 font-medium dark:text-gray-400">
          {{ currentGroupName }}
        </text>
      </view>

      <!-- 联系人卡片列表 -->
      <view class="px-4">
        <!-- 有数据时显示列表 -->
        <view
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="mb-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
          @longpress="handleSaveContact(contact)"
        >
          <view class="flex items-start justify-between">
            <!-- 左侧：联系人信息 -->
            <view class="flex flex-1 flex-col">
              <!-- 姓名 + 职务 -->
              <view class="mb-2 flex items-center gap-2">
                <text class="text-base text-gray-900 font-semibold dark:text-gray-100">
                  {{ contact.name }}
                </text>
                <view class="rounded bg-primary/10 px-2 py-0.5">
                  <text class="text-xs text-primary font-medium dark:text-blue-400">
                    {{ contact.position }}
                  </text>
                </view>
              </view>

              <!-- 部门 -->
              <view class="mb-3 flex items-center gap-1.5">
                <text class="i-carbon-enterprise text-xs text-gray-400" />
                <text class="text-xs text-gray-600 dark:text-gray-400">
                  {{ contact.department }}
                </text>
              </view>

              <!-- 联系方式 -->
              <view
                class="flex items-center gap-2 rounded bg-gray-50 px-3 py-2 dark:bg-gray-700"
                @tap.stop="handleCall(contact.phone, contact.name)"
              >
                <text class="i-carbon-phone text-success" />
                <text class="text-sm text-success font-medium dark:text-green-400">
                  {{ contact.phone }}
                </text>
                <text class="ml-auto text-xs text-gray-400">
                  点击拨打
                </text>
              </view>
            </view>

            <!-- 右侧：快速拨打按钮 -->
            <view
              class="ml-3 h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-success shadow-md dark:bg-green-600"
              @tap.stop="handleCall(contact.phone, contact.name)"
            >
              <text class="i-carbon-phone-filled text-lg text-white" />
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view
          v-if="filteredContacts.length === 0"
          class="flex flex-col items-center py-16"
        >
          <text class="i-carbon-user-avatar mb-3 text-6xl text-gray-300 dark:text-gray-600" />
          <text class="text-center text-sm text-gray-500 dark:text-gray-400">
            {{ searchKeyword ? '未找到相关联系人' : '暂无联系人' }}
          </text>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="px-4 py-4">
        <text class="text-center text-xs text-gray-400 dark:text-gray-500">
          长按联系人卡片可保存到手机通讯录
        </text>
      </view>
    </scroll-view>

    <!-- 紧急呼叫按钮（固定底部） -->
    <view class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <view
        class="flex items-center justify-center rounded-lg from-red-500 to-red-600 bg-gradient-to-r py-3 shadow-md transition-transform active:scale-95"
        @tap="handleEmergencyCall"
      >
        <text class="i-carbon-phone-filled mr-2 text-xl text-white" />
        <text class="text-base text-white font-semibold">
          紧急呼叫
        </text>
        <text
          v-if="emergencyPhone"
          class="ml-2 text-sm text-red-100 font-medium"
        >
          {{ emergencyPhone }}
        </text>
      </view>
    </view>
  </view>
</template>
