import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import type { VintImportVueI18nMsgFn } from '.'
import { loadVueI18nMsg } from '.'

const langTag = 'es'
const i18n = createI18n({ legacy: false }).global

const importMsg: VintImportVueI18nMsgFn = async (langTag) =>
  (<{ default: LocaleMessageDictionary<VueMessageType> }>(
    await import(`./vue-i18n-test-msgs/${langTag}`)
  )).default

test(`
[loadVueI18nMsg] Invalid input, empty langTag.
`, async () => {
  const msg = await loadVueI18nMsg({ langTag: '', i18n, importMsg })
  expect(msg).toBeUndefined()
})

test(`
[loadVueI18nMsg] Invalid input, langTag without msg file.
`, async () => {
  const msg = await loadVueI18nMsg({ langTag: 'invalid', i18n, importMsg })
  expect(msg).toBeUndefined()
})

test(`
[loadVueI18nMsg] Valid input.
`, async () => {
  const msg = await loadVueI18nMsg({ langTag, i18n, importMsg })
  expect(msg).toStrictEqual({ test: 'test' })
  expect(i18n.getLocaleMessage('es')).toStrictEqual({ test: 'test' })
})
