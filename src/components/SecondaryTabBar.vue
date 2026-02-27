<script lang="ts" setup>
/**
 * SecondaryTabBar - 二级菜单横向滑动组件
 *
 * @description
 * 用于安全环保中心、生产运营等页面的顶部二级菜单导航。
 * 支持横向滑动、选中状态指示（橙色下划线+加粗）、路由跳转。
 *
 * @example
 * ```vue
 * <SecondaryTabBar v-model="activeKey" :items="items" />
 * ```
 */
import { useRouter } from '@wot-ui/router'
import { computed } from 'vue'

/**
 * 菜单项接口
 */
export interface TabItem {
  /** 唯一标识 */
  key: string
  /** 显示文本 */
  label: string
  /** 图标类名（可选，使用 UnoCSS 图标类） */
  icon?: string
}

/**
 * 组件属性
 */
export interface Props {
  /** 菜单项列表 */
  items?: TabItem[]
  /** 当前选中值（v-model） */
  modelValue?: string
}

/**
 * 组件事件
 */
export interface Emits {
  /** 更新当前选中值（v-model） */
  (e: 'update:modelValue', value: string): void
  /** 菜单项点击事件 */
  (e: 'change', item: TabItem): void
}

const props = withDefaults(
  defineProps<Props>(),
  {
    items: () => [],
    modelValue: '',
  },
)

const emit = defineEmits<Emits>()

const router = useRouter()

/** 当前选中项 */
const activeKey = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

/**
 * 处理菜单项点击
 * 更新选中状态、触发事件、可选路由跳转
 */
function handleTabClick(item: TabItem) {
  activeKey.value = item.key
  emit('change', item)

  // 如果 key 是路由路径格式，则进行导航
  if (item.key.startsWith('/')) {
    router.push(item.key)
  }
}
</script>

<script lang="ts">
export default {
  name: 'SecondaryTabBar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view class="secondary-tabbar sticky top-0 z-100 border-b border-gray-200 bg-white">
    <scroll-view
      scroll-x
      :show-scrollbar="false"
      class="tabbar-scroll"
    >
      <view class="tabbar-list inline-flex px-4">
        <view
          v-for="item in props.items"
          :key="item.key"
          class="tabbar-item relative mr-2 inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-4 py-3 transition-all duration-200"
          :class="{ 'tabbar-item-active': activeKey === item.key }"
          @click="handleTabClick(item)"
        >
          <!-- 可选图标 -->
          <text
            v-if="item.icon"
            class="tabbar-icon mr-1 text-16px"
            :class="[
              item.icon,
              activeKey === item.key ? 'text-[#1E40AF]' : 'text-[#6B7280]',
            ]"
          />
          <text
            class="tabbar-text whitespace-nowrap text-14px"
            :class="activeKey === item.key ? 'text-[#1E40AF] font-bold' : 'text-[#6B7280]'"
          >
            {{ item.label }}
          </text>

          <!-- 选中状态：橙色下划线 -->
          <view
            v-if="activeKey === item.key"
            class="active-indicator absolute bottom-0 left-1/2 h-2px w-20px rounded-1px bg-[#F97316] -translate-x-1/2"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.secondary-tabbar {
  /* 确保在滚动时保持在顶部 */
  position: sticky;
  top: 0;
  z-index: 100;
}

.tabbar-scroll {
  /* 允许横向滚动 */
  white-space: nowrap;
  width: 100%;
}

/* 隐藏滚动条但保持滚动功能 */
.tabbar-scroll ::v-deep ::-webkit-scrollbar {
  display: none;
}

.tabbar-list {
  /* 水平排列菜单项 */
  display: inline-flex;
  align-items: center;
}

.tabbar-item {
  /* 平滑过渡效果 */
  transition: all 0.2s ease;
}

/* 点击反馈 */
.tabbar-item:active {
  opacity: 0.7;
  transform: scale(0.98);
}
</style>
