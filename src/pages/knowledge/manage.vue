<script setup lang="ts">
/**
 * 知识库管理页面（管理员）
 *
 * 功能：
 * 1. 添加新资料
 * 2. 编辑已有资料
 * 3. 删除资料
 * 4. 只有管理员可见
 */

import { useRouter } from '@wot-ui/router'
import { computed, onMounted, ref } from 'vue'

import type { KnowledgeCategory } from '@/types/pages'

import { useKnowledgeStore } from '@/store/knowledgeStore'
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'knowledge-manage',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '资料管理',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
  },
})

// ==================== 路由 ====================
const router = useRouter()

// ==================== Store ====================
const knowledgeStore = useKnowledgeStore()
const userStore = useUserStore()

// ==================== 响应式数据 ====================
/** 是否为管理员 */
const isAdmin = computed(() => userStore.userInfo?.role === 'admin')

/** 资料列表 */
const materialList = computed(() => knowledgeStore.itemList)

/** 加载状态 */
const loading = ref(false)

/** 显示编辑弹窗 */
const showEditModal = ref(false)

/** 当前编辑的资料 */
const currentMaterial = ref<any>(null)

/** 编辑模式：add-添加, edit-编辑 */
const editMode = ref<'add' | 'edit'>('add')

// 表单数据
const formData = ref({
  title: '',
  summary: '',
  content: '',
  category: 'safety' as KnowledgeCategory,
  type: 'document' as 'document' | 'video' | 'image' | 'audio',
})

// ==================== 方法 ====================

/**
 * 打开添加资料弹窗
 */
function openAddModal() {
  editMode.value = 'add'
  currentMaterial.value = null
  formData.value = {
    title: '',
    summary: '',
    content: '',
    category: 'safety',
    type: 'document',
  }
  showEditModal.value = true
}

/**
 * 打开编辑资料弹窗
 */
function openEditModal(item: any) {
  editMode.value = 'edit'
  currentMaterial.value = item
  formData.value = {
    title: item.title,
    summary: item.summary,
    content: item.content || '',
    category: item.category,
    type: item.type,
  }
  showEditModal.value = true
}

/**
 * 关闭编辑弹窗
 */
function closeEditModal() {
  showEditModal.value = false
  formData.value = {
    title: '',
    summary: '',
    content: '',
    category: 'safety',
    type: 'document',
  }
}

/**
 * 保存资料
 */
async function saveMaterial() {
  if (!formData.value.title) {
    uni.showToast({
      title: '请输入资料标题',
      icon: 'none',
    })
    return
  }

  try {
    loading.value = true

    // TODO: 调用 API 保存资料
    // if (editMode.value === 'add') {
    //   await Apis.knowledge.create(formData.value)
    // } else {
    //   await Apis.knowledge.update(currentMaterial.value.id, formData.value)
    // }

    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000))

    uni.showToast({
      title: editMode.value === 'add' ? '添加成功' : '保存成功',
      icon: 'success',
    })

    closeEditModal()

    // 刷新列表
    await knowledgeStore.fetchList(true)
  }
  catch (error) {
    console.error('[Manage] 保存资料失败:', error)
    uni.showToast({
      title: '保存失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

/**
 * 删除资料
 */
async function deleteMaterial(item: any) {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除资料"${item.title}"吗？`,
    success: async (res) => {
      if (res.confirm) {
        try {
          loading.value = true

          // TODO: 调用 API 删除资料
          // await Apis.knowledge.delete(item.id)

          // 模拟删除
          await new Promise(resolve => setTimeout(resolve, 500))

          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })

          // 刷新列表
          await knowledgeStore.fetchList(true)
        }
        catch (error) {
          console.error('[Manage] 删除资料失败:', error)
          uni.showToast({
            title: '删除失败',
            icon: 'none',
          })
        }
        finally {
          loading.value = false
        }
      }
    },
  })
}

/**
 * 获取分类标签
 */
function getCategoryLabel(category: KnowledgeCategory): string {
  const labels: Record<KnowledgeCategory, string> = {
    safety: '安全技术',
    equipment: '设备操作',
    environmental: '环保规范',
    production: '生产工艺',
    emergency: '应急处置',
  }
  return labels[category] || category
}

/**
 * 获取类型标签
 */
function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    document: '文档',
    video: '视频',
    image: '图片',
    audio: '音频',
  }
  return labels[type] || type
}

// ==================== 生命周期 ====================

onMounted(async () => {
  // 检查管理员权限
  if (!isAdmin.value) {
    uni.showToast({
      title: '无权访问',
      icon: 'none',
      duration: 2000,
    })
    setTimeout(() => {
      router.back()
    }, 2000)
    return
  }

  // 加载资料列表
  await knowledgeStore.fetchList(true)
})
</script>

<template>
  <view class="manage-page min-h-screen bg-gray-50">
    <!-- 顶部操作栏 -->
    <view class="action-bar flex items-center justify-between bg-white px-4 py-3">
      <text class="text-base text-gray-900 font-bold">
        资料管理
      </text>
      <view
        class="add-btn flex items-center rounded-full bg-primary px-4 py-2"
        @tap="openAddModal"
      >
        <text class="i-carbon-add mr-1 text-base text-white" />
        <text class="text-sm text-white font-medium">
          添加资料
        </text>
      </view>
    </view>

    <!-- 资料列表 -->
    <view class="material-list px-4 py-3">
      <!-- 空状态 -->
      <view
        v-if="materialList.length === 0 && !loading"
        class="empty-state flex flex-col items-center justify-center py-16"
      >
        <text class="i-carbon-document mb-4 text-6xl text-gray-300" />
        <text class="text-sm text-gray-500">
          暂无资料
        </text>
      </view>

      <!-- 资料卡片列表 -->
      <view
        v-for="item in materialList"
        :key="item.id"
        class="material-card mb-3 rounded-lg bg-white p-4 shadow-sm"
      >
        <!-- 资料标题 -->
        <view class="mb-2">
          <text class="text-base text-gray-900 font-semibold">
            {{ item.title }}
          </text>
        </view>

        <!-- 资料摘要 -->
        <view v-if="item.summary" class="mb-3">
          <text class="line-clamp-2 text-xs text-gray-500">
            {{ item.summary }}
          </text>
        </view>

        <!-- 资料元信息 -->
        <view class="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <view class="rounded bg-gray-100 px-2 py-1">
            <text>{{ getCategoryLabel(item.category) }}</text>
          </view>
          <view class="rounded bg-gray-100 px-2 py-1">
            <text>{{ getTypeLabel(item.type) }}</text>
          </view>
          <view class="flex items-center">
            <text class="i-carbon-view mr-1" />
            <text>{{ item.viewCount }}</text>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="actions flex gap-2">
          <view
            class="btn-edit flex flex-1 items-center justify-center rounded bg-blue-50 px-4 py-2"
            @tap="openEditModal(item)"
          >
            <text class="i-carbon-edit mr-1 text-sm text-blue-600" />
            <text class="text-sm text-blue-600">
              编辑
            </text>
          </view>
          <view
            class="btn-delete flex flex-1 items-center justify-center rounded bg-red-50 px-4 py-2"
            @tap="deleteMaterial(item)"
          >
            <text class="i-carbon-trash-can mr-1 text-sm text-red-600" />
            <text class="text-sm text-red-600">
              删除
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 编辑弹窗 -->
    <wd-popup
      v-model="showEditModal"
      position="bottom"
      :close-on-click-modal="false"
      custom-style="height: 70vh; border-radius: 16px 16px 0 0;"
    >
      <view class="edit-modal h-full flex flex-col bg-white">
        <!-- 弹窗标题 -->
        <view class="modal-header flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <text class="text-base text-gray-900 font-bold">
            {{ editMode === 'add' ? '添加资料' : '编辑资料' }}
          </text>
          <view class="close-btn" @tap="closeEditModal">
            <text class="i-carbon-close text-lg text-gray-500" />
          </view>
        </view>

        <!-- 弹窗内容 -->
        <view class="modal-content flex-1 overflow-y-auto px-4 py-3">
          <!-- 资料标题 -->
          <view class="form-item mb-4">
            <text class="mb-2 block text-sm text-gray-700 font-medium">
              资料标题 <text class="text-red-500">
                *
              </text>
            </text>
            <input
              v-model="formData.title"
              class="w-full border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-sm"
              placeholder="请输入资料标题"
              placeholder-class="text-gray-400"
            >
          </view>

          <!-- 资料摘要 -->
          <view class="form-item mb-4">
            <text class="mb-2 block text-sm text-gray-700 font-medium">
              资料摘要
            </text>
            <textarea
              v-model="formData.summary"
              class="w-full border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-sm"
              placeholder="请输入资料摘要"
              :maxlength="200"
              placeholder-class="text-gray-400"
            />
          </view>

          <!-- 资料分类 -->
          <view class="form-item mb-4">
            <text class="mb-2 block text-sm text-gray-700 font-medium">
              资料分类
            </text>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="cat in [
                  { value: 'safety', label: '安全技术' },
                  { value: 'equipment', label: '设备操作' },
                  { value: 'environmental', label: '环保规范' },
                  { value: 'production', label: '生产工艺' },
                  { value: 'emergency', label: '应急处置' },
                ]"
                :key="cat.value"
                class="category-tag rounded px-3 py-1.5"
                :class="formData.category === cat.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @tap="formData.category = cat.value as KnowledgeCategory"
              >
                <text class="text-sm">
                  {{ cat.label }}
                </text>
              </view>
            </view>
          </view>

          <!-- 资料类型 -->
          <view class="form-item mb-4">
            <text class="mb-2 block text-sm text-gray-700 font-medium">
              资料类型
            </text>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="type in [
                  { value: 'document', label: '文档' },
                  { value: 'video', label: '视频' },
                  { value: 'image', label: '图片' },
                  { value: 'audio', label: '音频' },
                ]"
                :key="type.value"
                class="type-tag rounded px-3 py-1.5"
                :class="formData.type === type.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                @tap="formData.type = type.value as any"
              >
                <text class="text-sm">
                  {{ type.label }}
                </text>
              </view>
            </view>
          </view>

          <!-- 资料内容 -->
          <view class="form-item mb-4">
            <text class="mb-2 block text-sm text-gray-700 font-medium">
              资料内容
            </text>
            <textarea
              v-model="formData.content"
              class="w-full border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 text-sm"
              placeholder="请输入资料内容（支持富文本）"
              :auto-height="true"
              :maxlength="10000"
              placeholder-class="text-gray-400"
            />
          </view>
        </view>

        <!-- 弹窗底部按钮 -->
        <view class="modal-footer flex gap-3 border-t border-gray-200 px-4 py-3">
          <view
            class="btn-cancel flex flex-1 items-center justify-center rounded-lg bg-gray-100 px-4 py-2"
            @tap="closeEditModal"
          >
            <text class="text-sm text-gray-700 font-medium">
              取消
            </text>
          </view>
          <view
            class="btn-confirm flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2"
            @tap="saveMaterial"
          >
            <text class="text-sm text-white font-medium">
              {{ loading ? '保存中...' : '保存' }}
            </text>
          </view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.manage-page {
  padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
