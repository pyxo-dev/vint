import { watch } from 'vue'
import type { ComposerOptions, I18n } from 'vue-i18n'
import { useI18n } from 'vue-i18n'
import type { VintImportVueI18nMsgFn } from '..'
import { loadVueI18nMsg } from '..'

/**
 * Options for `setupLocalI18n` function.
 *
 * @beta
 */
export interface SetupLocalI18nOptions {
  /** {@inheritDoc VintImportVueI18nMsgFn } */
  importMsg: VintImportVueI18nMsgFn
  /** The vue-i18n composer options. */
  composerOptions?: ComposerOptions
}

/**
 * Creates a local vue-i18n composer instance.
 *
 * @remarks
 *
 * This function will also set up a watch on the locale to load the
 * corresponding message when the locale changes.
 *
 * @beta
 *
 * @param options - Options object.
 * @returns The created composer instance.
 */
export function setupLocalI18n(
  options: SetupLocalI18nOptions
): I18n<unknown, unknown, unknown, false>['global'] {
  const { importMsg, composerOptions = {} } = options

  const i18n = useI18n(
    Object.assign(composerOptions, { useScope: 'local' as const })
  )

  watch(
    i18n.locale,
    (langTag) => {
      loadVueI18nMsg({ langTag, i18n, importMsg }).catch((err) => {
        console.error(err)
      })
    },
    { immediate: true }
  )

  return i18n
}
