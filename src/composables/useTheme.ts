import type { ThemeMode } from '@/composables/types/theme'

/**
 * 简化版系统主题管理
 *
 * 功能：仅跟随系统主题变化，不支持手动切换
 *
 * @example
 * ```vue
 * <script setup>
 * const { theme, isDark, themeVars } = useTheme()
 * </script>
 * ```
 */
export function useTheme() {
  const store = useThemeStore()

  onBeforeMount(() => {
    store.initSystemTheme()

    if (typeof uni !== 'undefined' && uni.onThemeChange) {
      const themeChangeHandler = (res: { theme: ThemeMode }) => {
        store.setTheme(res.theme)
        console.log('系统主题已切换至:', res.theme)
      }
      uni.onThemeChange(themeChangeHandler)

      onUnmounted(() => {
        if (typeof uni !== 'undefined' && uni.offThemeChange) {
          uni.offThemeChange(themeChangeHandler)
        }
      })
    }
  })

  return {
    theme: computed(() => store.theme),
    isDark: computed(() => store.isDark),
    themeVars: computed(() => store.themeVars),
  }
}
