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
    'perfectionist/sort-imports': [
      'error',
      {
        partitionByComment: true,
        type: 'natural',
        order: 'asc',
      },
    ],
    'no-console': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
  ignores: [
    '**/node_modules/**',
    'pnpm-lock.yaml',
    '**/*.md',
    'src/uni_modules/**/*',
  ],
  formatters: true,
})
