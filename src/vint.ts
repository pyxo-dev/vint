import type { Wint, WintServerContext } from '@pyxo/wint'
import { createWint } from '@pyxo/wint'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import type {
  LoadVueI18nMsgOptions,
  LocalizeUrlPathOptions,
  SetupLocalI18nOptions,
  VintConf,
  VintI18n,
} from '.'
import { loadVueI18nMsg, localizeUrlPath, setupLocalI18n } from '.'

/**
 * Vint instance.
 *
 * @beta
 */
export interface Vint extends Wint {
  /** The configuration used when creating the Vint instance. */
  conf: VintConf

  /**
   * The vue-i18n plugin instance created using the Vint instance configuration.
   */
  i18nPlugin: I18n<unknown, unknown, unknown, boolean>

  /**
   * The vue-i18n composer or legacy instance created using the Vint instance
   * configuration.
   */
  i18n: VintI18n

  /** {@inheritDoc loadVueI18nMsg} */
  loadVueI18nMsg: (
    options: Partial<LoadVueI18nMsgOptions> &
      Pick<LoadVueI18nMsgOptions, 'langTag'>
  ) => ReturnType<typeof loadVueI18nMsg>

  /** {@inheritDoc setupLocalI18n} */
  setupLocalI18n: typeof setupLocalI18n

  /** {@inheritDoc localizeUrlPath} */
  localizeUrlPath: (
    options: Partial<LocalizeUrlPathOptions> &
      Pick<LocalizeUrlPathOptions, 'urlPath'>
  ) => ReturnType<typeof localizeUrlPath>
}

/**
 * Creates a Vint instance.
 *
 * @beta
 *
 * @param conf - Configuration object.
 * @returns Vint instance.
 */
export function createVint(
  conf: VintConf,
  serverContext?: WintServerContext
): Vint {
  // Destructure the configuration.
  const {
    vueI18nConf: { legacy, vueI18nOptions, composerOptions, importGeneralMsg },
  } = conf

  // Create vue-i18n plugin instance.
  const i18nPlugin = createI18n(
    legacy ? vueI18nOptions : Object.assign(composerOptions, { legacy: false })
  )
  // Get vue-i18n composer or legacy instance.
  const i18n = i18nPlugin.global

  // Create a Wint instance.
  const wint = createWint(conf, serverContext)

  // The following will make the standalone functions available in the Vint
  // instance. These functions can then be used in a much easier way, as there
  // will be no need to provide the options that are already present in the
  // instance configuration.

  const loadVueI18nMsgFn = (
    options: Partial<LoadVueI18nMsgOptions> &
      Pick<LoadVueI18nMsgOptions, 'langTag'>
  ) => {
    const fallbackOpts: Omit<LoadVueI18nMsgOptions, 'langTag'> = {
      i18n,
      importMsg: importGeneralMsg,
    }
    return loadVueI18nMsg(Object.assign({}, fallbackOpts, options))
  }

  const setupLocalI18nFn = (options: SetupLocalI18nOptions) => {
    const fallbackOpts: Partial<SetupLocalI18nOptions> = { composerOptions }
    return setupLocalI18n(Object.assign({}, fallbackOpts, options))
  }

  const localizeUrlPathFn = (
    options: Partial<LocalizeUrlPathOptions> &
      Pick<LocalizeUrlPathOptions, 'urlPath'>
  ) => {
    const fallbackOpts: Omit<LocalizeUrlPathOptions, 'urlPath'> = {
      i18n,
      i18nMode: i18nPlugin.mode,
    }
    return localizeUrlPath(Object.assign({}, fallbackOpts, options))
  }

  // Build and return the Vint instance.
  return Object.assign({}, wint, {
    conf,
    i18nPlugin,
    i18n,
    loadVueI18nMsg: loadVueI18nMsgFn,
    setupLocalI18n: setupLocalI18nFn,
    localizeUrlPath: localizeUrlPathFn,
  })
}
