import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
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
  theme: {
    colors: {
      industrial: {
        'blue': '#0066FF',
        'cyan': '#00E5FF',
        'green': '#00E676',
        'orange': '#FF9100',
        'red': '#FF5252',
        'bg': '#0B0F1A',
        'card': 'rgba(23, 32, 53, 0.8)',
        'border': 'rgba(77, 127, 255, 0.2)',
        'border-strong': 'rgba(77, 127, 255, 0.5)',
      },
    },
  },
  shortcuts: {
    // 基础布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'abs-center': 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',

    // 科技感卡片
    'tech-card': 'relative rounded-lg bg-white dark:bg-industrial-card border border-gray-100 dark:border-industrial-border shadow-sm p-4 transition-all overflow-hidden',
    'tech-card-active': 'tech-card border-industrial-blue/50 dark:border-industrial-cyan/50 ring-1 ring-industrial-blue/20',

    // 工业文字
    'tech-num': 'font-mono font-600 tracking-tighter',
    'tech-label': 'text-[10px] uppercase tracking-[0.15em] font-bold opacity-60',

    // 装饰元素
    'status-dot': 'w-1.5 h-1.5 rounded-full relative',
    'status-dot-glow': 'status-dot after:content-[""] after:absolute after:inset-0 after:rounded-full after:animate-ping after:bg-inherit after:opacity-50',

    // 背景效果
    'grid-bg': 'bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)]',
    'glass-effect': 'backdrop-blur-lg bg-white/70 dark:bg-industrial-card/90',

    // 边角装饰 (利用伪元素模拟工业切角)
    'tech-corner': 'before:content-[""] before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-industrial-blue/40 after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-industrial-blue/40',
  },
  rules: [
    [/^scan-line$/, () => ({
      'background': 'linear-gradient(to bottom, transparent 0%, rgba(0, 229, 255, 0.05) 50%, transparent 100%)',
      'background-size': '100% 4px',
    })],
  ],
  animations: {
    keyframes: {
      scan: '{ from { transform: translateY(-100%); } to { transform: translateY(100%); } }',
    },
    durations: {
      scan: '3s',
    },
    counts: {
      scan: 'infinite',
    },
    timingFns: {
      scan: 'linear',
    },
  },
})
