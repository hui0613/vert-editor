import { buildConfig, Module } from '../build-info'

export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    id = id.replace(/@dew-editor\//g, 'dew-editor/es/')
    id = id.replace(/@dew-editor\/theme-chalk\/src/, 'dew-editor/theme-chalk')
    return id
  }
}
