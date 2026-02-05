import uni from '@uni-helper/eslint-config'

export default uni({
  unocss: true,
  typescript: true,
  stylistic: {
    indent: 2, // 缩进
    semi: false, // 语句分号
    quotes: 'single', // 单引号
  },
  rules: {
    // 代码风格 相关规则
    'perfectionist/sort-imports': [
      'error',
      {
        partitionByComment: true,
        type: 'natural',
        order: 'asc',
      },
    ],
    'node/prefer-global/process': 'off',
  },
  ignores: [
    '**/node_modules/**',
    'pnpm-lock.yaml',
    '**/*.md',
  ],
  formatters: true,
})
