<script setup lang="ts">
definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})

const { show: showToast } = useToast()

// 用户信息
const userInfo = ref({
  name: '张三',
  role: '安全管理员',
  department: '安全监察部',
  phone: '138****8888',
  avatar: '',
})

const {
  theme,
  toggleTheme,
  currentThemeColor,
  showThemeColorSheet,
  themeColorOptions,
  openThemeColorPicker,
  closeThemeColorPicker,
  selectThemeColor,
  setFollowSystem,
  followSystem,
} = useManualTheme()

const isDark = computed({
  get() {
    return theme.value === 'dark'
  },
  set() {
    toggleTheme()
  },
})

// 处理主题色选择
function handleThemeColorSelect(option: any) {
  selectThemeColor(option)
}

// 菜单列表
const menuItems = [
  {
    id: 'account',
    icon: 'i-carbon-user-settings',
    title: '账号管理',
    desc: '修改个人信息',
    action: () => showToast('账号管理'),
  },
  {
    id: 'notification',
    icon: 'i-carbon-settings',
    title: '通知设置',
    desc: '消息推送与提醒',
    action: () => showToast('通知设置'),
  },
  {
    id: 'language',
    icon: 'i-carbon-language',
    title: '语言设置',
    desc: '切换应用语言',
    action: () => showToast('语言设置'),
  },
  {
    id: 'help',
    icon: 'i-carbon-help',
    title: '帮助与反馈',
    desc: '使用说明与问题反馈',
    action: () => showToast('帮助中心'),
  },
  {
    id: 'about',
    icon: 'i-carbon-information',
    title: '关于',
    desc: '版本 1.0.0',
    action: () => showToast('关于我们'),
  },
]
</script>

<template>
  <view class="bg-bg-secondary min-h-screen grid-bg dark:bg-industrial-bg">
    <!-- 内容区域 -->
    <scroll-view scroll-y class="pb-12">
      <!-- 用户信息卡片：工业极简风格 -->
      <view class="relative overflow-hidden px-5 pb-16 pt-12">
        <!-- 动态光晕效果 -->
        <view class="pointer-events-none absolute h-64 w-64 animate-pulse rounded-full bg-industrial-blue/10 blur-3xl -right-24 -top-24" />
        <view class="pointer-events-none absolute top-12 h-48 w-48 rounded-full bg-industrial-cyan/5 blur-2xl -left-12" />

        <view class="relative z-1 flex items-center gap-5">
          <view class="relative h-20 w-20 flex-center overflow-hidden border border-white/80 rounded-2xl bg-white shadow-xl dark:border-industrial-border/30 dark:bg-industrial-card">
            <!-- 模拟点阵底纹 -->
            <view class="absolute inset-0 bg-[length:6px_6px] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08)_1px,transparent_1px)]" />
            <view class="i-carbon-user-avatar-filled z-1 text-4xl text-industrial-blue dark:text-industrial-cyan" />
          </view>

          <view class="flex flex-col justify-center">
            <view class="flex items-center gap-2">
              <text class="text-2xl text-gray-900 font-bold tracking-tight dark:text-gray-50">
                {{ userInfo.name }}
              </text>
              <view class="flex items-center border border-industrial-blue/20 rounded bg-industrial-blue/5 px-1.5 py-0.5">
                <text class="text-[10px] text-industrial-blue font-bold">
                  管理员
                </text>
              </view>
            </view>
            <text class="mt-1 text-sm text-gray-500 font-medium dark:text-gray-400">
              {{ userInfo.role }}
            </text>
            <view class="mt-2.5 w-fit flex items-center gap-1.5 border border-gray-200/40 rounded-lg bg-white/40 px-2.5 py-1 backdrop-blur-sm dark:border-industrial-border/10 dark:bg-white/5">
              <view class="i-carbon-deployment-unit text-xs text-industrial-cyan" />
              <text class="text-[11px] text-gray-600 font-semibold dark:text-gray-400">
                {{ userInfo.department }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 核心统计看板：紧凑仪表盘 -->
      <view class="relative z-10 grid grid-cols-3 mx-5 gap-3.5 -mt-10">
        <view
          v-for="stat in [
            { label: '监测设备', value: 128, unit: '台', color: 'text-industrial-blue' },
            { label: '今日告警', value: 12, unit: '条', color: 'text-industrial-red' },
            { label: '安全指数', value: '99%', unit: '', color: 'text-industrial-green' },
          ]" :key="stat.label" class="tech-card tech-corner flex flex-col items-center glass-effect !p-4"
        >
          <view class="flex items-baseline gap-0.5">
            <text class="text-xl font-bold tech-num" :class="stat.color">
              {{ stat.value }}
            </text>
            <text v-if="stat.unit" class="text-[9px] font-bold opacity-40">
              {{ stat.unit }}
            </text>
          </view>
          <text class="mt-1 tech-label !tracking-normal !opacity-50">
            {{ stat.label }}
          </text>
        </view>
      </view>

      <!-- 界面设置 -->
      <view class="mx-5 mt-8">
        <view class="mb-3 pl-1">
          <text class="text-[11px] text-gray-400 font-bold tracking-wider">
            个性化配置
          </text>
        </view>
        <view class="tech-card tech-corner overflow-hidden divide-y divide-gray-100/50 !p-0 dark:divide-industrial-border/10">
          <view class="group flex items-center justify-between p-4.5 transition-colors active:bg-gray-50 dark:active:bg-white/5">
            <view class="flex items-center gap-4">
              <view class="h-10 w-10 flex-center border border-gray-100 rounded-xl bg-gray-50/80 text-industrial-blue dark:border-industrial-border/20 dark:bg-white/5">
                <view class="i-carbon-asleep h-5 w-5" />
              </view>
              <text class="text-[14px] text-gray-800 font-bold dark:text-gray-200">
                深色模式
              </text>
            </view>
            <wd-switch v-model="isDark" size="20px" />
          </view>

          <view class="flex items-center justify-between p-4.5 active:bg-gray-50 dark:active:bg-white/5" @click="setFollowSystem(!followSystem)">
            <view class="flex items-center gap-4">
              <view class="h-10 w-10 flex-center border border-gray-100 rounded-xl bg-gray-50/80 text-industrial-blue dark:border-industrial-border/20 dark:bg-white/5">
                <view class="i-carbon-settings-adjust h-5 w-5" />
              </view>
              <text class="text-[14px] text-gray-800 font-bold dark:text-gray-200">
                跟随系统
              </text>
            </view>
            <wd-button size="small" plain :type="followSystem ? 'primary' : 'info'" custom-class="rounded-md! font-bold text-[10px]" @click.stop="setFollowSystem(!followSystem)">
              {{ followSystem ? '已开启' : '已关闭' }}
            </wd-button>
          </view>

          <view class="flex items-center justify-between p-4.5 active:bg-gray-50 dark:active:bg-white/5" @click="openThemeColorPicker">
            <view class="flex items-center gap-4">
              <view class="h-10 w-10 flex-center border border-gray-100 rounded-xl bg-gray-50/80 text-industrial-blue dark:border-industrial-border/20 dark:bg-white/5">
                <view class="i-carbon-color-palette h-5 w-5" />
              </view>
              <text class="text-[14px] text-gray-800 font-bold dark:text-gray-200">
                主题配色
              </text>
            </view>
            <view class="flex items-center gap-2">
              <view
                class="h-4 w-4 rounded-full shadow-sm ring-2 ring-offset-2 ring-gray-100 dark:ring-industrial-border/30 dark:ring-offset-industrial-bg"
                :style="{ backgroundColor: currentThemeColor.primary }"
              />
              <view class="i-carbon-chevron-right text-xs text-gray-300 dark:text-gray-600" />
            </view>
          </view>
        </view>
      </view>

      <!-- 系统功能菜单 -->
      <view class="mx-5 mt-8">
        <view class="mb-3 pl-1">
          <text class="text-[11px] text-gray-400 font-bold tracking-wider">
            系统管理
          </text>
        </view>
        <view class="tech-card tech-corner overflow-hidden divide-y divide-gray-100/50 !p-0 dark:divide-industrial-border/10">
          <view
            v-for="item in menuItems"
            :key="item.id"
            class="group flex items-center justify-between p-4.5 transition-colors active:bg-gray-50 dark:active:bg-white/5"
            @click="item.action"
          >
            <view class="flex items-center gap-4">
              <view class="h-10 w-10 flex-center border border-gray-100 rounded-xl bg-gray-50/80 text-industrial-blue dark:border-industrial-border/20 dark:bg-white/5">
                <view :class="item.icon" class="h-5 w-5" />
              </view>
              <view class="flex flex-col">
                <text class="text-[14px] text-gray-900 font-bold dark:text-gray-100">
                  {{ item.title }}
                </text>
                <text class="mt-1 text-[11px] text-gray-400 font-medium dark:text-gray-500">
                  {{ item.desc }}
                </text>
              </view>
            </view>
            <view class="i-carbon-chevron-right text-lg text-gray-300/40 dark:text-gray-600/40" />
          </view>
        </view>
      </view>

      <!-- 安全退出 -->
      <view class="mx-5 mt-10 pb-10">
        <view
          class="tech-card tech-corner flex-center gap-3 p-4.5 transition-all active:scale-[0.98] border-red-100! bg-red-50/30! dark:border-red-900/20! active:bg-red-100! dark:bg-red-900/10!"
          @click="showToast('退出登录')"
        >
          <view class="i-carbon-logout scale-95 text-red-500" />
          <text class="text-[13px] text-red-500 font-bold tracking-widest">
            退出管理系统
          </text>
        </view>
      </view>

      <!-- 系统页脚 -->
      <view class="mt-4 flex flex-col items-center opacity-30">
        <view class="mb-2 flex items-center gap-2 text-gray-400">
          <view class="h-[1px] w-6 bg-current" />
          <view class="i-carbon-iot-connect text-sm" />
          <view class="h-[1px] w-6 bg-current" />
        </view>
        <text class="text-[10px] tech-num tracking-[0.2em]">
          工业管理系统 v1.0.0
        </text>
      </view>
    </scroll-view>

    <!-- 主题色选择 ActionSheet -->
    <wd-action-sheet
      v-model="showThemeColorSheet"
      title="选择主题颜色"
      :close-on-click-action="true"
      @cancel="closeThemeColorPicker"
    >
      <view class="px-5 pb-8 pt-2">
        <view
          v-for="option in themeColorOptions"
          :key="option.value"
          class="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0 dark:border-industrial-border/10"
          @click="handleThemeColorSelect(option)"
        >
          <view class="flex items-center gap-4">
            <view
              class="relative h-9 w-9 flex-center border border-gray-100 rounded-xl bg-gray-50/50 dark:border-industrial-border/20 dark:bg-white/5"
            >
              <view
                class="h-5 w-5 rounded-full shadow-sm"
                :style="{ backgroundColor: option.primary }"
              />
              <view class="i-carbon-color-palette absolute h-3 w-3 opacity-30 -right-1 -top-1" />
            </view>
            <view class="flex flex-col">
              <text class="text-[14px] text-gray-900 font-bold tracking-tight dark:text-gray-200">
                {{ option.name }}
              </text>
            </view>
          </view>
          <view v-if="currentThemeColor.value === option.value" class="h-6 w-6 flex-center rounded-full bg-industrial-blue/10 text-industrial-blue">
            <wd-icon name="check" size="14px" />
          </view>
        </view>
      </view>
      <wd-gap :height="20" />
    </wd-action-sheet>
  </view>
</template>
