<script setup lang="ts">
/**
 * 我的待办页面
 *
 * 路由路径: /profile/tasks
 *
 * 页面结构:
 * - 标题栏: 显示"我的待办"标题
 * - 分类筛选: 全部、隐患整改、预警处置、其他
 * - 待办列表: 每条显示待办类型、内容、截止时间、状态标签
 * - 点击待办进入处理页面
 */

definePage({
  name: 'profile-tasks',
  layout: 'default',
  style: {
    navigationBarTitleText: '我的待办',
  },
})

// 待办类型
type TodoType = 'all' | 'hazard' | 'warning' | 'other'

// 待办状态
type TodoStatus = 'pending' | 'processing' | 'completed'

// 待办事项接口
interface TodoItem {
  id: string
  type: '隐患整改' | '预警处置' | '其他'
  content: string
  deadline: string
  status: TodoStatus
  link: string
}

// 当前选中的分类
const activeType = ref<TodoType>('all')

// 分类列表
const typeTabs = ref([
  { key: 'all' as TodoType, label: '全部' },
  { key: 'hazard' as TodoType, label: '隐患整改' },
  { key: 'warning' as TodoType, label: '预警处置' },
  { key: 'other' as TodoType, label: '其他' },
])

// 模拟待办数据
const mockTodos: TodoItem[] = [
  {
    id: '1',
    type: '隐患整改',
    content: '边坡位移超标需立即整改',
    deadline: '今日18:00前',
    status: 'pending',
    link: '/pages/safety/hazard',
  },
  {
    id: '2',
    type: '预警处置',
    content: '瓦斯浓度异常处置',
    deadline: '今日16:00前',
    status: 'processing',
    link: '/pages/safety/warning',
  },
  {
    id: '3',
    type: '隐患整改',
    content: '排水设施故障整改',
    deadline: '明日12:00前',
    status: 'pending',
    link: '/pages/safety/hazard',
  },
  {
    id: '4',
    type: '其他',
    content: '生产报表审批',
    deadline: '本周五前',
    status: 'completed',
    link: '/production/report',
  },
  {
    id: '5',
    type: '预警处置',
    content: '设备温度预警处理',
    deadline: '今日20:00前',
    status: 'pending',
    link: '/pages/safety/warning',
  },
  {
    id: '6',
    type: '隐患整改',
    content: '防护设施缺失整改',
    deadline: '已完成',
    status: 'completed',
    link: '/pages/safety/hazard',
  },
]

// 过滤后的待办列表
const filteredTodos = computed(() => {
  if (activeType.value === 'all') {
    return mockTodos
  }
  const typeMap: Record<TodoType, string> = {
    all: '',
    hazard: '隐患整改',
    warning: '预警处置',
    other: '其他',
  }
  return mockTodos.filter(todo => todo.type === typeMap[activeType.value])
})

// 切换分类
function switchType(type: TodoType) {
  activeType.value = type
}

// 获取状态配置
function getStatusConfig(status: TodoStatus) {
  const config = {
    pending: { text: '未处理', color: '#F97316', bgColor: '#FFF7ED' },
    processing: { text: '处理中', color: '#3B82F6', bgColor: '#EFF6FF' },
    completed: { text: '已完成', color: '#10B981', bgColor: '#ECFDF5' },
  }
  return config[status]
}

// 获取类型图标
function getTypeIcon(type: string) {
  const iconMap: Record<string, string> = {
    隐患整改: 'i-carbon-warning-alt',
    预警处置: 'i-carbon-alarm',
    其他: 'i-carbon-task',
  }
  return iconMap[type] || 'i-carbon-task'
}

// 点击待办项
function handleTodoClick(todo: TodoItem) {
  uni.navigateTo({
    url: todo.link,
  })
}
</script>

<template>
  <view class="min-h-screen bg-bg-secondary">
    <!-- 分类筛选栏 -->
    <scroll-view scroll-x class="dark:border-industrial-border/30 dark:bg-industrial-card flex whitespace-nowrap border-b border-gray-100 bg-white px-4 py-3">
      <view
        v-for="tab in typeTabs"
        :key="tab.key"
        class="mr-6 inline-block"
        @tap="switchType(tab.key)"
      >
        <text
          class="text-sm font-medium"
          :class="activeType === tab.key ? 'text-primary' : 'text-gray-600 dark:text-gray-300'"
        >
          {{ tab.label }}
        </text>
        <view
          v-if="activeType === tab.key"
          class="mt-1 h-1 w-full rounded-full bg-primary"
        />
      </view>
    </scroll-view>

    <!-- 待办列表 -->
    <scroll-view scroll-y class="h-[calc(100vh-120px)]">
      <!-- 空状态 -->
      <view
        v-if="filteredTodos.length === 0"
        class="flex-center p-10"
      >
        <view class="text-center">
          <view class="i-carbon-task text-4xl text-gray-300 dark:text-gray-600" />
          <text class="mt-3 block text-sm text-gray-400 dark:text-gray-600">
            暂无待办事项
          </text>
        </view>
      </view>

      <!-- 待办列表项 -->
      <view
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="dark:border-industrial-border/20 dark:bg-industrial-card dark:active:bg-industrial-border/10 mx-4 mt-3 rounded-lg bg-white p-4 shadow-sm active:bg-gray-50"
        @tap="handleTodoClick(todo)"
      >
        <!-- 待办头部：类型和状态 -->
        <view class="mb-2 flex-between">
          <view class="flex items-center gap-2">
            <view class="text-lg" :class="[getTypeIcon(todo.type)]" />
            <text class="text-sm text-gray-600 font-medium dark:text-gray-300">
              {{ todo.type }}
            </text>
          </view>
          <view
            class="rounded-full px-2 py-0.5"
            :style="{
              backgroundColor: getStatusConfig(todo.status).bgColor,
            }"
          >
            <text
              class="text-xs font-medium"
              :style="{
                color: getStatusConfig(todo.status).color,
              }"
            >
              {{ getStatusConfig(todo.status).text }}
            </text>
          </view>
        </view>

        <!-- 待办内容 -->
        <text class="mb-2 block text-base text-gray-900 font-medium dark:text-gray-100">
          {{ todo.content }}
        </text>

        <!-- 截止时间 -->
        <view class="flex items-center gap-1">
          <view class="i-carbon-time text-sm text-gray-400" />
          <text class="text-sm text-gray-500 dark:text-gray-400">
            {{ todo.deadline }}
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
