import type { DefaultThemeOptions } from 'vuepress'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en',
  title: 'Vint',
  description: 'Vint, easy i18n for your Vue app.',

  dest: 'docs/dist',
})
