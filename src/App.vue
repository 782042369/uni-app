<script setup lang="ts">
onLaunch(() => {})
</script>

<style lang="scss">
/* 基础容器 */
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.wot-theme-dark.page-wraper {
  background: #000000;
  color: #e2e8f0;
}

/* Wot-UI 工业风微调 */
:deep(.wd-tabbar) {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.wot-theme-dark :deep(.wd-tabbar) {
  background-color: rgba(11, 15, 26, 0.9) !important;
  border-top: 1px solid rgba(77, 127, 255, 0.2) !important;
}

/* 按钮硬朗化 */
:deep(.wd-button) {
  border-radius: 4px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 消息弹窗科技感 */
:deep(.wd-message-box) {
  border-radius: 8px !important;
  .wd-message-box__title {
    font-weight: 800;
    letter-spacing: -0.5px;
  }
}

/* 全局滚动条美化（针对 H5） */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 102, 255, 0.2);
  border-radius: 10px;
}
</style>
