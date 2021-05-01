/**
 * Misc types used by Vint.
 */

import type {
  ComposerOptions,
  I18n,
  LocaleMessageDictionary,
  VueI18nOptions,
  VueMessageType,
} from 'vue-i18n'

/**
 * vue-i18n instance.
 *
 * @beta
 */
export type VintI18n = I18n<unknown, unknown, unknown, boolean>

/**
 * A function to use for importing a vue-i18n locale message.
 *
 * @beta
 *
 * @param langTag - The language tag to import the message for.
 * @returns Promise that should resolve to a locale message.
 */
export type VintImportVueI18nMsgFn = (
  langTag: string
) => Promise<LocaleMessageDictionary<VueMessageType>>

/**
 * vue-i18n related configurations.
 *
 * @beta
 */
export interface VintVueI18nConf {
  /**
   * Whether to use a composer (recommended) or a legacy vue-i18n instance
   * (default).
   */
  legacy?: boolean
  /**
   * Options for the composer instance.
   */
  composerOptions?: ComposerOptions
  /**
   * Options for the legacy vue-i18n instance.
   */
  vueI18nOptions?: VueI18nOptions
  /**
   * Function to use for importing general messages.
   */
  importGeneralMsg: VintImportVueI18nMsgFn
}
