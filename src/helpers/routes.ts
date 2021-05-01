/**
 * Route helpers.
 */

import type { VintI18n } from '..'

/**
 * Options for `localizeUrlPath` function.
 *
 * @beta
 */
export interface LocalizeUrlPathOptions {
  /**
   * The URL path to localize.
   *
   * @example
   * ```ts
   * urlPath: '/blog/recent'
   * ```
   */
  urlPath: string
  /** vue-i18n instance to use for the localization. */
  i18n: VintI18n
  /** The target language tag. */
  langTag?: string
  /**
   * The key (if any) under which the localization strings are defined in the
   * locale message.
   *
   * @example
   *
   * In the following example the `msgKey` is "ps" (stands for path segment).
   * ```ts
   * const messages = {
   *   'en-US': {
   *     ps: {
   *       blog: 'blog',
   *       recent: 'recent',
   *     },
   *   },
   * }
   * ```
   */
  msgKey?: string
}

/**
 * Localizes a URL path.
 *
 * @beta
 *
 * @param options - Options object.
 * @returns The localized URL path.
 */
export function localizeUrlPath(options: LocalizeUrlPathOptions): string {
  const { urlPath, i18n, langTag, msgKey } = options

  const l = i18n.global.locale
  // If no language tag is provided, use the current Vue i18n instance locale.
  const locale = langTag || (typeof l === 'string' ? l : l.value)

  // Empty input gives empty output.
  if (urlPath === '') return ''

  // Encode the result.
  return encodeURI(
    urlPath
      .split('/')
      .map((segment) => {
        // Empty input gives empty output.
        if (segment === '') return ''

        const subject = msgKey ? `${msgKey}.${segment}` : segment

        // Legacy mode.
        if (i18n.mode === 'legacy') {
          const lcPath = i18n.global.t(subject, locale)

          // When no corresponding translation exists, the result will include
          // the `msgKey`. We need to remove it.
          return msgKey && lcPath.startsWith(`${msgKey}.`)
            ? lcPath.replace(`${msgKey}.`, '')
            : lcPath
        }

        // Composititon mode.
        return i18n.global.t(subject, segment, { locale })
      })
      .join('/')
  )
}
