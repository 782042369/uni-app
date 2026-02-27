<script setup lang="ts">
definePage({
  name: 'feedback',
  layout: 'default',
  style: {
    navigationBarTitleText: '意见反馈',
  },
})

// 反馈类型选项
const feedbackTypes = [
  { label: '功能建议', value: 'suggestion' },
  { label: 'Bug反馈', value: 'bug' },
  { label: '其他', value: 'other' },
]

// 表单数据
const formData = reactive({
  type: 'suggestion',
  content: '',
  images: [] as any[],
})

// 表单引用
const formRef = ref()

// 全局提示
const { success } = useGlobalToast()
const { confirm } = useGlobalMessage()

// 上传配置（实际使用时配置真实地址）
const uploadAction = ref('')

// 处理图片变化
function handleImageChange(event: any) {
  formData.images = event.fileList.filter((file: any) => file.status !== 'fail')
}

// 删除图片前确认
function handleBeforeRemove(option: any) {
  confirm({
    title: '提示',
    msg: '确定删除这张图片吗？',
    success: () => option.resolve(true),
    fail: () => option.resolve(false),
  })
}

// 提交表单
async function handleSubmit() {
  try {
    // 验证表单
    await formRef.value.validate()

    // TODO: 调用 API 提交反馈
    console.log('提交反馈:', formData)

    // 显示成功提示
    success({
      msg: '提交成功，感谢您的反馈！',
    })

    // 清空表单
    formData.type = 'suggestion'
    formData.content = ''
    formData.images = []
    formRef.value.reset()
  }
  catch (error) {
    console.log('表单验证失败:', error)
  }
}

// 验证规则
const rules: any = {
  content: [
    {
      required: true,
      message: '请输入反馈内容',
    },
    {
      validator: (val: string) => {
        if (!val || val.trim().length === 0) {
          return Promise.reject(new Error('请输入反馈内容'))
        }
        if (val.length > 500) {
          return Promise.reject(new Error('反馈内容不能超过500字'))
        }
        return Promise.resolve()
      },
    },
  ],
}
</script>

<template>
  <view class="feedback-page min-h-screen bg-gray-100">
    <wd-form ref="formRef" :model="formData" :rules="rules">
      <wd-cell-group border>
        <!-- 反馈类型 -->
        <wd-cell title="反馈类型" required prop="type" center>
          <template #default>
            <wd-radio-group v-model="formData.type" inline shape="button">
              <wd-radio
                v-for="item in feedbackTypes"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </wd-radio>
            </wd-radio-group>
          </template>
        </wd-cell>

        <!-- 反馈内容 -->
        <wd-textarea
          v-model="formData.content"
          label="反馈内容"
          label-width="100px"
          prop="content"
          placeholder="请详细描述您的意见或建议，最多500字"
          :maxlength="500"
          show-word-limit
          clearable
          :rows="6"
          required
        />

        <!-- 图片上传 -->
        <wd-cell
          title="图片上传"
          label-width="100px"
          center
        >
          <template #default>
            <wd-upload
              :file-list="formData.images"
              :limit="3"
              :action="uploadAction"
              multiple
              @change="handleImageChange"
              @before-remove="handleBeforeRemove"
            />
            <view class="mt-2 text-xs text-gray-400">
              最多上传3张图片
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>

      <!-- 提交按钮 -->
      <view class="p-4">
        <wd-button
          type="primary"
          size="large"
          block
          @click="handleSubmit"
        >
          提交反馈
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped>
.feedback-page {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

:deep(.wd-radio-group) {
  display: flex;
  gap: 12rpx;
}

:deep(.wd-textarea) {
  .wd-textarea__container {
    min-height: 200rpx;
  }
}

:deep(.wd-cell) {
  .wd-cell__body {
    align-items: flex-start;
  }
}

:deep(.wd-upload) {
  margin-top: 16rpx;
}
</style>
