import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components'

import { kebabCase } from 'unplugin-vue-components'

export function VertResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('vert-editor')) {
        const partialName = name
        return {
          name: partialName,
          from: `vert-editor`,
          sideEffects: `vert-editor/theme-chalk/${kebabCase(partialName)}/style`,
        }
      }
    },
  }
}
