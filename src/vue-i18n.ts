/**
 * vue-i18n utilities.
 */

import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import type { VintI18n, VintImportVueI18nMsgFn } from '.'

/**
 * Options for `loadVueI18nMsg` function.
 *
 * @beta
 */
export interface LoadVueI18nMsgOptions {
  /** The language tag to load the message for. */
  langTag: string
  /** vue-i18n instance to load the message in. */
  i18n: VintI18n
  /** The function to use for importing the locale message. */
  importMsgFn: VintImportVueI18nMsgFn
}

/**
 * Imports a vue-i18n locale message for a specified language tag and merges it
 * to the messages of a provided vue-i18n instance.
 *
 * @beta
 *
 * @param options - Options object.
 * @returns Promise that is fulfilled with the imported locale message when the
 * operation is successful.
 */
export async function loadVueI18nMsg(
  options: LoadVueI18nMsgOptions
): Promise<LocaleMessageDictionary<VueMessageType> | undefined> {
  const { langTag, i18n, importMsgFn } = options

  // Validate the language tag.
  if (langTag === '') {
    console.error(`
[Vint loadVueI18nMsg] The language tag cannot be empty.
`)
    return
  }

  try {
    // Import the locale message.
    const msg = await importMsgFn(langTag)

    // Merge the locale message.
    i18n.global.mergeLocaleMessage(langTag, msg)

    // If all goes well, return the locale message.
    return msg
  } catch (err) {
    console.error(
      `
[Vint loadVueI18nMsg] Error loading Vue I18n message for the "${langTag}"
language tag, using function "${importMsgFn.name}":
`,
      err
    )
  }
}
