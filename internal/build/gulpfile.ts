import { withTaskName } from './src/utils/gulp'
import { parallel, series, TaskFunction } from 'gulp'

import { buildModules } from './src'
import { run } from './src/utils/porcess'
import path from 'path'
import { buildRoot } from '@dew-editor/build-utils'
import { buildConfig, Module } from './src/build-info'
import { copy, remove } from 'fs-extra'

const copyTypesFile: TaskFunction = (done) => {
  const src = path.resolve(buildRoot, 'types')
  const copyFile = (module: Module) => {
    return withTaskName(`copyTypes:${module}`, () => {
      return copy(src, buildConfig[module].output.path, { recursive: true })
    })
  }

  const moveEntryType = (module: Module) => {
    return withTaskName(`moveTypes:${module}`, () => {
      return copy(`${buildConfig[module].output.path}/dew-editor/`, buildConfig[module].output.path, { overwrite: true })
    })
  }

  const deleteEntryType = (module: Module) => {
    return withTaskName(`deleteTypes:${module}`, () => {
      return remove(`${buildConfig[module].output.path}/dew-editor/`)
    })
  }

  return series(
    parallel(copyFile('esm'), copyFile('cjs')),
    moveEntryType('esm'),
    moveEntryType('cjs'),
    parallel(deleteEntryType('esm'), deleteEntryType('cjs'))
  )(done)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  buildModules,
  withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
  withTaskName('generateTypes', () => run('pnpm run build:types')),
  copyTypesFile
)
