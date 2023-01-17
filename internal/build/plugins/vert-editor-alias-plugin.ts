import { PKG_NAME, PKG_PREFIX } from '@vert-editor/build-utils'

import type { Plugin } from 'rollup'

export function VertEditorPlugin(): Plugin {
  const themeChalk = 'theme-chalk'

  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleTemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'vert-editor-alias-plugin',
    resolveId(id: string) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleTemeChalk),
        external: 'absolute',
      }
    },
  }
}
