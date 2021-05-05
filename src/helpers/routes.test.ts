import { createI18n } from 'vue-i18n'
import { localizeUrlPath } from '..'

const urlPath = '/task/add'
const langTag = 'fr'
const msgKey = 'ps' // Stands for: Path Segment.
const messages = {
  'en-US': {
    ps: {
      task: 'task',
      add: 'add',
    },
  },
  fr: {
    ps: {
      task: 'tâche',
      add: 'ajouter',
    },
  },
}

describe('Vue i18n composition mode', () => {
  const { global: i18n } = createI18n({ legacy: false, messages })

  test(`
[localizeUrlPath] Empty langTag.
`, () => {
    expect(localizeUrlPath({ urlPath, langTag: '', i18n, msgKey })).toBe(
      '/task/add'
    )
  })

  test(`
[localizeUrlPath] Empty urlPath.
`, () => {
    expect(localizeUrlPath({ urlPath: '', langTag, i18n, msgKey })).toBe('')
  })

  test(`
[localizeUrlPath] Should localize to the target langTag.
`, () => {
    expect(localizeUrlPath({ urlPath, langTag, i18n, msgKey })).toBe(
      '/t%C3%A2che/ajouter'
    )
  })

  describe('Without msgKey', () => {
    const messages = {
      'en-US': {
        task: 'task',
        add: 'add',
      },
      fr: {
        task: 'tâche',
        add: 'ajouter',
      },
    }
    const { global: i18n } = createI18n({ legacy: false, messages })

    test(`
[localizeUrlPath] Should localize to the target langTag.
`, () => {
      expect(localizeUrlPath({ urlPath: '/task/add', langTag, i18n })).toBe(
        '/t%C3%A2che/ajouter'
      )
    })
  })
})

describe('Vue i18n legacy mode', () => {
  const { global: i18n, mode: i18nMode } = createI18n({
    legacy: true,
    messages,
  })

  test(`
[localizeUrlPath] Empty langTag.
`, () => {
    expect(
      localizeUrlPath({ urlPath, langTag: '', i18n, i18nMode, msgKey })
    ).toBe('/task/add')
  })

  test(`
[localizeUrlPath] No corresponding translation.
`, () => {
    expect(
      localizeUrlPath({ urlPath: '/update', langTag, i18n, i18nMode, msgKey })
    ).toBe('/update')
  })

  test(`
[localizeUrlPath] Should localize to the target langTag.
`, () => {
    expect(localizeUrlPath({ urlPath, langTag, i18n, i18nMode, msgKey })).toBe(
      '/t%C3%A2che/ajouter'
    )
  })
})
