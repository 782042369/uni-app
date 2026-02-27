import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    // uni-app 专用预设
    presetUni({
      attributify: false,
    }),
    // Tailwind CSS 兼容预设
    presetWind(),
    // 图标预设（Carbon Icons）
    presetIcons({
      scale: 1.2,
      warn: true,
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  // 主题配置 - 马郎综管平台设计规范
  theme: {
    // 色彩规范
    colors: {
      // 主色调 - 深蓝色（安全、专业）
      'primary': {
        DEFAULT: '#1E40AF',
        hover: '#1E3A8A',
        active: '#1E40AF80',
      },

      // 辅助色 - 橙色（警示、醒目）
      'warning': {
        DEFAULT: '#F97316',
        hover: '#EA580C',
        active: '#F9731680',
      },

      // 成功色 - 绿色
      'success': {
        DEFAULT: '#10B981',
        bg: '#D1FAE5',
      },

      // 危险色 - 红色
      'error': {
        DEFAULT: '#EF4444',
        bg: '#FEE2E2',
      },

      // 警示色 - 黄色
      'caution': {
        DEFAULT: '#F59E0B',
        bg: '#FEF3C7',
      },

      // 信息色 - 蓝色
      'info': {
        DEFAULT: '#3B82F6',
        bg: '#DBEAFE',
      },

      // 背景色
      'bg': {
        primary: '#FFFFFF',
        secondary: '#F3F4F6',
        tertiary: '#E5E7EB',
      },

      // 文字色
      'text': {
        primary: '#1F2937', // 深灰色，易读
        secondary: '#6B7280', // 次要文字
        tertiary: '#9CA3AF', // 辅助文字
        disabled: '#D1D5DB', // 禁用文字
      },

      // 预警级别色
      'alert-1': '#3B82F6', // 一般 - 蓝色
      'alert-2': '#F59E0B', // 较重 - 黄色
      'alert-3': '#F97316', // 严重 - 橙色
      'alert-4': '#EF4444', // 特别严重 - 红色

      // 风险等级色
      'risk-major': '#EF4444', // 重大风险 - 红色
      'risk-large': '#F97316', // 较大风险 - 橙色
      'risk-general': '#F59E0B', // 一般风险 - 黄色
      'risk-low': '#3B82F6', // 低风险 - 蓝色
    },

    // 间距规范
    spacing: {
      xs: '4dp', // 超小间距
      sm: '8dp', // 小间距
      md: '16dp', // 标准间距
      lg: '24dp', // 大间距
      xl: '32dp', // 超大间距
      touch: '44dp', // 最小触摸区域
    },

    // 字体大小规范
    fontSize: {
      // 标题字体
      'h1': '22sp', // 核心数据、页面主标题
      'h2': '20sp', // 二级标题
      'h3': '18sp', // 三级标题
      'h4': '16sp', // 四级标题

      // 正文字体
      'body-large': '16sp', // 正文大号
      'body': '14sp', // 正文标准
      'body-small': '12sp', // 正文小号

      // 辅助文字
      'caption': '10sp', // 说明文字、单位
    },

    // 图标尺寸规范
    iconSize: {
      xs: '16dp', // 超小图标
      sm: '20dp', // 小图标
      md: '24dp', // 标准图标（默认）
      lg: '32dp', // 大图标
      xl: '48dp', // 超大图标
    },

    // 圆角规范
    borderRadius: {
      sm: '4dp',
      md: '8dp',
      lg: '12dp',
    },

    // 阴影规范
    boxShadow: {
      sm: '0 1dp 3dp rgba(0, 0, 0, 0.1)',
      md: '0 2dp 8dp rgba(0, 0, 0, 0.15)',
      lg: '0 4dp 12dp rgba(0, 0, 0, 0.2)',
    },

    // 动画
    animation: {
      keyframes: {
        spin: '{ from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
        pulse: '{ 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }',
        blink: '{ 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }',
      },
      durations: {
        spin: '0.8s',
        pulse: '2s',
        blink: '2s',
      },
      counts: {
        spin: 'infinite',
        pulse: 'infinite',
        blink: 'infinite',
      },
      timingFns: {
        spin: 'linear',
        pulse: 'ease-in-out',
        blink: 'ease-in-out',
      },
    },
  },

  // 快捷样式类 - 常用组合
  shortcuts: {
    // ========== 基础布局 ==========
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-start': 'flex items-center justify-start',
    'flex-end': 'flex items-center justify-end',
    'flex-col-center': 'flex flex-col items-center justify-center',

    // 绝对定位居中
    'abs-center': 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',

    // ========== 文字样式 ==========
    // 标题（20sp Bold）- 页面主标题
    'text-title-large': 'font-bold text-h2 text-text-primary',

    // 标题（18sp Bold）- 区块标题
    'text-title': 'font-bold text-h3 text-text-primary',

    // 核心数据（22sp Bold）
    'text-data': 'font-bold text-h1 text-text-primary',

    // 正文（14sp Regular）
    'text-body': 'font-normal text-body text-text-primary',

    // 大号正文（16sp Regular）
    'text-body-large': 'font-normal text-body-large text-text-primary',

    // 小号正文（12sp Regular）
    'text-body-small': 'font-normal text-body-small text-text-primary',

    // 正文次要信息
    'text-body-secondary': 'font-normal text-body text-text-secondary',

    // 说明文字（10sp Regular）
    'text-caption': 'font-normal text-caption text-text-tertiary',

    // 警示文字（14sp Bold 橙色）
    'text-warning': 'font-bold text-body text-warning',

    // ========== 卡片样式 ==========
    // 标准卡片
    'card': 'bg-bg-primary rounded-md p-md shadow-sm mb-sm',
    'card-plain': 'bg-bg-primary rounded-md p-md',

    // 警示卡片
    'card-warning': 'bg-bg-primary rounded-md p-md border-l-4 border-warning shadow-sm mb-sm',

    // 成功卡片
    'card-success': 'bg-bg-primary rounded-md p-md border-l-4 border-success shadow-sm mb-sm',

    // 错误卡片
    'card-error': 'bg-bg-primary rounded-md p-md border-l-4 border-error shadow-sm mb-sm',

    // 闪烁卡片（异常提醒）
    'card-blink': 'card animate-blink border-l-4 border-warning',

    // ========== 按钮样式 ==========
    // 主按钮
    'btn': 'inline-flex items-center justify-center px-md py-sm rounded-md font-medium text-body bg-primary text-bg-primary transition-all min-h-11',
    'btn:active': 'btn scale-95 opacity-80',

    // 警示按钮
    'btn-warning': 'inline-flex items-center justify-center px-md py-sm rounded-md font-medium text-body bg-warning text-bg-primary transition-all min-h-11',

    // 次要按钮
    'btn-secondary': 'inline-flex items-center justify-center px-md py-sm rounded-md font-medium text-body bg-bg-secondary text-text-primary transition-all min-h-11 border border-bg-tertiary',

    // 文字按钮
    'btn-text': 'inline-flex items-center justify-center px-sm py-xs text-body text-primary transition-all min-h-11',

    // 图标按钮
    'btn-icon': 'flex items-center justify-center min-w-11 min-h-11 transition-all',

    // ========== 状态指示器 ==========
    // 状态点
    'status-dot': 'w-2 h-2 rounded-full relative',
    'status-dot-success': 'status-dot bg-success',
    'status-dot-error': 'status-dot bg-error',
    'status-dot-warning': 'status-dot bg-warning',
    'status-dot-online': 'status-dot bg-success animate-pulse',
    'status-dot-offline': 'status-dot bg-text-tertiary',

    // 状态角标（橙色、红色、绿色）
    'badge': 'px-2 py-0.5 rounded-full text-caption font-bold text-bg-primary',
    'badge-warning': 'badge bg-warning',
    'badge-error': 'badge bg-error',
    'badge-success': 'badge bg-success',

    // ========== 宫格布局 ==========
    'grid-container': 'grid grid-cols-3 gap-md p-md',
    'grid-item': 'flex flex-col items-center justify-center p-lg rounded-md bg-bg-primary min-h-24',

    // ========== 列表布局 ==========
    'list-item': 'flex items-center p-md bg-bg-primary border-b border-bg-tertiary min-h-18',
    'list-item-content': 'flex-1 mr-sm',
    'list-item-title': 'font-medium text-body text-text-primary mb-1',
    'list-item-desc': 'text-body-small text-text-secondary',

    // ========== 加载状态 ==========
    'loading': 'inline-block w-6 h-6 border-2 border-bg-tertiary border-t-primary rounded-full animate-spin',
    'loading-with-text': 'flex items-center text-body text-text-secondary ml-sm',

    // ========== 闪烁提醒 ==========
    'blink-border': 'animate-blink border-2 border-warning',

    // ========== 触摸反馈 ==========
    'touch-feedback': 'transition-all active:scale-95 active:opacity-80',

    // ========== 图标尺寸快捷类 ==========
    'w-icon-sm': 'w-5',
    'h-icon-sm': 'h-5',
    'w-icon-md': 'w-6',
    'h-icon-md': 'h-6',
    'w-icon-lg': 'w-8',
    'h-icon-lg': 'h-8',
    'w-icon-xl': 'w-12',
    'h-icon-xl': 'h-12',
    'w-icon-xs': 'w-4',
    'h-icon-xs': 'h-4',

    // ========== 图标文本尺寸快捷类 ==========
    'text-icon-sm': 'text-sm',
    'text-icon-md': 'text-md',
    'text-icon-lg': 'text-lg',
  },

  // 安全列表 - 确保这些样式不被清除
  safelist: [
    // 颜色类
    'text-primary',
    'bg-primary',
    'text-warning',
    'bg-warning',
    'text-success',
    'bg-success',
    'text-error',
    'bg-error',
    'text-caution',
    'bg-caution',
    'text-info',
    'bg-info',

    // 文字颜色
    'text-text-primary',
    'text-text-secondary',
    'text-text-tertiary',
    'text-text-disabled',

    // 背景颜色
    'bg-bg-primary',
    'bg-bg-secondary',
    'bg-bg-tertiary',

    // 风险等级颜色
    'text-risk-major',
    'text-risk-large',
    'text-risk-general',
    'text-risk-low',

    // 预警级别颜色
    'text-alert-1',
    'text-alert-2',
    'text-alert-3',
    'text-alert-4',

    // 字体大小
    'text-h1',
    'text-h2',
    'text-h3',
    'text-h4',
    'text-body-large',
    'text-body',
    'text-body-small',
    'text-caption',

    // 图标尺寸快捷类
    'w-icon-xs',
    'h-icon-xs',
    'w-icon-sm',
    'h-icon-sm',
    'w-icon-md',
    'h-icon-md',
    'w-icon-lg',
    'h-icon-lg',
    'w-icon-xl',
    'h-icon-xl',

    // 图标文本尺寸快捷类
    'text-icon-sm',
    'text-icon-md',
    'text-icon-lg',

    // 间距
    'p-xs',
    'p-sm',
    'p-md',
    'p-lg',
    'p-xl',
    'm-xs',
    'm-sm',
    'm-md',
    'm-lg',
    'm-xl',

    // Carbon Icons 常用图标（仅保留存在的图标）
    'i-carbon-home',
    'i-carbon-settings',
    'i-carbon-user',
    'i-carbon-warning',
    'i-carbon-video',
    'i-carbon-chart-bar',
    'i-carbon-phone',
    'i-carbon-document',
    'i-carbon-notification',
    'i-carbon-search',
    'i-carbon-add',
    'i-carbon-edit',
    'i-carbon-trash-can',
    'i-carbon-share',
    'i-carbon-star',
    'i-carbon-star-filled',
    'i-carbon-overflow-menu-horizontal',
    'i-carbon-arrow-left',
    'i-carbon-close',
    'i-carbon-checkmark',
    'i-carbon-rain-drop',
    'i-carbon-agriculture-analytics',
    'i-carbon-filter',
    'i-carbon-delivery',
    'i-carbon-reminder-medical',
    'i-carbon-earth',
    'i-carbon-locked-and-blocked',
    'i-carbon-security',
    'i-carbon-stem-leaf-plot',
    'i-carbon-volume-up',
    'i-carbon-health-cross',
    'i-carbon-circle-solid',
    'i-carbon-circle-dash',
  ],

  // 自定义规则
  rules: [
    // 闪烁边框动画
    [/^blink-border-(.+)$/, ([, color]) => ({
      'animation': 'blink 2s ease-in-out infinite',
      'border-color': color,
    })],
  ],
})
