<script setup lang="ts">
import { useRoute, useRouter } from '@wot-ui/router'
import { computed, onMounted, ref } from 'vue'

definePage({
  name: 'knowledge-detail',
  layout: 'default',
  style: {
    navigationBarTitleText: '资料详情',
    navigationStyle: 'custom',
  },
})

const route = useRoute()
const router = useRouter()

// 资料类型映射
const materialTypeMap: Record<string, string> = {
  safety: '安全技术',
  equipment: '设备操作',
  environmental: '环保规范',
  production: '生产工艺',
  emergency: '应急处置',
}

// 资料详情数据
const material = ref<any>(null)
const loading = ref(true)
const isFavorited = ref(false)

// 资料ID
const materialId = computed(() => route.query.id as string)

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes < 1024)
    return `${bytes}B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

// 获取资料详情
async function fetchDetail() {
  loading.value = true
  try {
    // TODO: 调用API获取详情
    // const response = await knowledgeApi.getDetail(materialId.value)
    // material.value = response.data
    // isFavorited.value = response.data.isFavorited

    // Mock 数据
    material.value = {
      id: materialId.value,
      title: '露天煤矿边坡监测技术规范',
      type: 'safety',
      publishTime: '2024-01-15',
      viewCount: 1234,
      content: '<p>本规范适用于露天煤矿边坡监测工作，规定了边坡监测的基本要求、监测内容、监测方法和监测频率等技术要求。</p><p>监测内容包括：</p><ul><li>边坡位移监测</li><li>边坡沉降监测</li><li>地下水位监测</li></ul>',
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
      ],
      attachments: [
        { name: '边坡监测技术规范.pdf', url: '#', size: 2.3 * 1024 * 1024 },
        { name: '监测设备操作手册.pdf', url: '#', size: 1.5 * 1024 * 1024 },
        { name: '培训视频.mp4', url: '#', size: 85.6 * 1024 * 1024 },
      ],
    }
    isFavorited.value = false
  }
  catch {
    uni.showToast({ title: '加载失败', icon: 'none' })
  }
  finally {
    loading.value = false
  }
}

// 增加浏览量
async function incrementViewCount() {
  try {
    // TODO: 调用API增加浏览量
    // await knowledgeApi.incrementViewCount(materialId.value)
  }
  catch {
    console.error('Failed to increment view count:', error)
  }
}

// 切换收藏状态
async function toggleFavorite() {
  try {
    // TODO: 调用API切换收藏
    // await knowledgeApi.toggleFavorite(materialId.value)
    isFavorited.value = !isFavorited.value
    uni.showToast({
      title: isFavorited.value ? '已收藏' : '已取消收藏',
      icon: 'success',
    })
  }
  catch {
    uni.showToast({ title: '操作失败', icon: 'none' })
  }
}

// 下载附件
async function downloadAttachment(_attachment: any) {
  try {
    uni.showLoading({ title: '下载中...' })
    // TODO: 调用下载API
    // const response = await uni.downloadFile({ url: _attachment.url })
    uni.hideLoading()
    uni.showToast({ title: '下载成功', icon: 'success' })
  }
  catch {
    uni.hideLoading()
    uni.showToast({ title: '下载失败', icon: 'none' })
  }
}

// 分享资料
async function shareMaterial() {
  try {
    await uni.share({
      provider: 'weixin',
      type: 0,
      title: material.value?.title || '技术资料',
      summary: '来自马郎综管平台',
      href: '',
      imageUrl: material.value?.images?.[0] || '',
    })
  }
  catch {
    uni.showToast({ title: '分享失败', icon: 'none' })
  }
}

// 预览图片
function previewImage(index: number) {
  uni.previewImage({
    urls: material.value?.images || [],
    current: index,
  })
}

// 返回上一页
function goBack() {
  router.back()
}

onMounted(async () => {
  await fetchDetail()
  await incrementViewCount()
})
</script>

<template>
  <view class="knowledge-detail min-h-screen bg-bg-secondary">
    <!-- 自定义导航栏 -->
    <view class="nav-bar safe-area-top flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <view class="flex items-center" @tap="goBack">
        <text class="i-carbon-chevron-left text-2xl text-gray-700" />
      </view>
      <text class="text-lg text-gray-900 font-semibold">
        资料详情
      </text>
      <view class="flex items-center" @tap="toggleFavorite">
        <text
          class="text-2xl"
          :class="isFavorited ? 'i-carbon-star-filled text-yellow-500' : 'i-carbon-star text-gray-400'"
        />
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="flex items-center justify-center py-20">
      <wd-loading type="spinner" size="24px" />
    </view>

    <!-- 内容区域 -->
    <view v-else-if="material" class="pb-24">
      <!-- 资料信息 -->
      <view class="mb-2 bg-white p-4">
        <text class="mb-3 block text-xl text-gray-900 font-bold">
          {{ material.title }}
        </text>
        <view class="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <view class="rounded bg-primary/10 px-2 py-1 text-primary">
            {{ materialTypeMap[material.type] || '其他' }}
          </view>
          <text>{{ material.publishTime }}</text>
          <view class="flex items-center gap-1">
            <text class="i-carbon-view text-gray-400" />
            <text>{{ material.viewCount }}</text>
          </view>
        </view>
      </view>

      <!-- 资料内容 -->
      <view class="mb-2 bg-white p-4">
        <div
          v-dompurify-html="material.content"
          class="content-html text-base text-gray-800 leading-relaxed"
        />
      </view>

      <!-- 图片列表 -->
      <view v-if="material.images && material.images.length > 0" class="mb-2 bg-white p-4">
        <text class="mb-3 block text-base text-gray-900 font-semibold">
          相关图片
        </text>
        <view class="grid grid-cols-2 gap-2">
          <view
            v-for="(image, index) in material.images"
            :key="index"
            class="aspect-square overflow-hidden rounded-lg"
            @tap="previewImage(index)"
          >
            <image
              :src="image"
              class="h-full w-full"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>

      <!-- 附件列表 -->
      <view v-if="material.attachments && material.attachments.length > 0" class="mb-2 bg-white p-4">
        <text class="mb-3 block text-base text-gray-900 font-semibold">
          附件下载
        </text>
        <view class="flex flex-col gap-2">
          <view
            v-for="(attachment, index) in material.attachments"
            :key="index"
            class="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            @tap="downloadAttachment(attachment)"
          >
            <view class="min-w-0 flex flex-1 items-center gap-2">
              <text class="i-carbon-document flex-shrink-0 text-xl text-primary" />
              <view class="min-w-0 flex-1">
                <text class="block truncate text-sm text-gray-900">
                  {{ attachment.name }}
                </text>
                <text class="text-xs text-gray-400">
                  {{ formatFileSize(attachment.size) }}
                </text>
              </view>
            </view>
            <text class="i-carbon-download flex-shrink-0 text-xl text-gray-400" />
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view v-if="material && !loading" class="safe-area-bottom fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <view class="flex items-center">
        <view
          class="flex flex-1 flex-col items-center justify-center border-r border-gray-200 py-3"
          @tap="downloadAttachment(material.attachments?.[0])"
        >
          <text class="i-carbon-download text-xl text-primary" />
          <text class="mt-1 text-xs text-gray-600">
            下载
          </text>
        </view>
        <view
          class="flex flex-1 flex-col items-center justify-center border-r border-gray-200 py-3"
          @tap="shareMaterial"
        >
          <text class="i-carbon-share text-xl text-primary" />
          <text class="mt-1 text-xs text-gray-600">
            分享
          </text>
        </view>
        <view
          class="flex flex-1 flex-col items-center justify-center py-3"
          @tap="toggleFavorite"
        >
          <text
            class="text-xl"
            :class="isFavorited ? 'i-carbon-star-filled text-yellow-500' : 'i-carbon-star text-gray-400'"
          />
          <text class="mt-1 text-xs text-gray-600">
            {{ isFavorited ? '已收藏' : '收藏' }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.knowledge-detail {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
