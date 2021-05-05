import type { DefaultThemeOptions, ViteBundlerOptions } from 'vuepress-vite'
import { defineUserConfig } from 'vuepress-vite'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  lang: 'en',
  title: 'Vint',
  description: 'Vint, easy i18n for your Vue app.',

  dest: 'docs/dist',

  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      build: {
        emptyOutDir: true,
      },
    },
  },
})
