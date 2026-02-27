<script lang="ts" setup>
/**
 * TodoReminder - 首页待办提醒组件
 *
 * @description
 * 显示待办事项列表，最多显示3条，点击跳转至处理页面
 *
 * @example
 * ```vue
 * <TodoReminder :todo-list="todoList" />
 * ```
 */
import { useRouter } from '@wot-ui/router'
import { computed } from 'vue'

/**
 * 待办类型
 */
export type TodoType = '隐患整改' | '预警处置' | '其他'

/**
 * 待办状态
 */
export type TodoStatus = 'pending' | 'processing' | 'completed'

/**
 * 待办项接口
 */
export interface TodoItem {
  /** 唯一标识 */
  id: string
  /** 待办类型 */
  type: TodoType
  /** 待办内容 */
  content: string
  /** 截止时间 */
  deadline: string
  /** 状态 */
  status: TodoStatus
  /** 跳转链接 */
  link: string
}

/**
 * 待办列表接口
 */
export interface TodoList {
  /** 待办项列表 */
  items: TodoItem[]
  /** 总数 */
  total: number
  /** 更多待办链接 */
  moreLink: string
}

/**
 * 组件属性
 */
export interface Props {
  /** 待办列表数据 */
  todoList?: TodoList
}

/**
 * 组件事件
 */
export interface Emits {
  /** 待办项点击事件 */
  (e: 'click', item: TodoItem): void
  /** 更多待办点击事件 */
  (e: 'more-click'): void
}

const props = withDefaults(
  defineProps<Props>(),
  {
    todoList: () => ({
      items: [],
      total: 0,
      moreLink: '',
    }),
  },
)

const emit = defineEmits<Emits>()

const router = useRouter()

/** 显示的待办列表（最多3条） */
const displayItems = computed(() => props.todoList.items.slice(0, 3))

/** 是否显示更多待办 */
const showMore = computed(() => props.todoList.total > 3)

/**
 * 处理待办项点击
 * 触发事件并跳转至处理页面
 */
function handleTodoClick(item: TodoItem) {
  emit('click', item)
  if (item.link) {
    router.push(item.link)
  }
}

/**
 * 处理更多待办点击
 * 触发事件并跳转至更多页面
 */
function handleMoreClick() {
  emit('more-click')
  if (props.todoList.moreLink) {
    router.push(props.todoList.moreLink)
  }
}

/**
 * 获取待办类型标签样式
 */
function getTodoTypeClass(type: TodoType): string {
  const typeMap: Record<TodoType, string> = {
    隐患整改: 'text-red-500',
    预警处置: 'text-orange-500',
    其他: 'text-blue-500',
  }
  return typeMap[type] || 'text-gray-500'
}
</script>

<script lang="ts">
export default {
  name: 'TodoReminder',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view class="todo-reminder">
    <!-- 标题 -->
    <view class="todo-header mb-4 flex items-center justify-between">
      <text class="todo-title text-16px text-[#1E40AF] font-bold">
        待办提醒
      </text>
      <text
        v-if="todoList.total > 0"
        class="todo-count text-12px text-gray-400"
      >
        共 {{ todoList.total }} 条
      </text>
    </view>

    <!-- 待办列表 -->
    <view
      v-if="displayItems.length > 0"
      class="todo-list"
    >
      <view
        v-for="item in displayItems"
        :key="item.id"
        class="todo-item mb-3 flex cursor-pointer items-center rounded-lg bg-gray-50 p-3 transition-all duration-200 active:scale-98"
        @click="handleTodoClick(item)"
      >
        <!-- 左侧橙色警示点 -->
        <view class="alert-dot mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />

        <!-- 待办内容 -->
        <view class="todo-content flex-1">
          <!-- 待办类型和内容 -->
          <view class="todo-main mb-1 flex items-center">
            <text
              class="todo-type mr-2 inline-block rounded bg-orange-100 px-2 py-0.5 text-12px"
              :class="getTodoTypeClass(item.type)"
            >
              {{ item.type }}
            </text>
            <text class="todo-text text-14px text-gray-800">
              {{ item.content.length > 15 ? `${item.content.slice(0, 15)}...` : item.content }}
            </text>
          </view>

          <!-- 截止时间 -->
          <view class="todo-deadline flex items-center">
            <text class="i-carbon-time mr-1 text-14px text-gray-400" />
            <text class="text-12px text-gray-400">
              {{ item.deadline }}
            </text>
          </view>
        </view>

        <!-- 右侧箭头 -->
        <view class="arrow-icon ml-2 flex-shrink-0">
          <text class="i-carbon-chevron-right text-18px text-gray-300" />
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view
      v-else
      class="empty-state py-8 text-center"
    >
      <text class="i-carbon-checkmark-filled mb-2 text-48px text-green-400" />
      <text class="empty-text text-14px text-gray-400">
        暂无待办事项
      </text>
    </view>

    <!-- 更多待办 -->
    <view
      v-if="showMore"
      class="more-todos mt-3 cursor-pointer rounded-lg bg-blue-50 py-2 text-center text-14px text-blue-500 transition-all duration-200 active:scale-98"
      @click="handleMoreClick"
    >
      <text>更多待办 ({{ todoList.total - 3 }})</text>
      <text class="i-carbon-chevron-right ml-1 inline-block align-middle text-14px" />
    </view>
  </view>
</template>

<style scoped>
.todo-reminder {
  /* 组件容器 */
}

.todo-item {
  /* 平滑过渡效果 */
  transition: all 0.2s ease;
}

/* 点击反馈 */
.todo-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.more-todos {
  /* 平滑过渡效果 */
  transition: all 0.2s ease;
}

.more-todos:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>
