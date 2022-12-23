import { runTask, withTaskName } from './src/utils/gulp'
import { parallel, series, TaskFunction } from 'gulp'
import path from 'path'
import { run } from './src/utils/porcess'
import { copyFile } from 'fs/promises'
import { buildOutput, deOutPut, deRoot, projRoot } from '@dew-editor/build-utils'
import { buildConfig, Module } from './src/build-info'
import { copy } from 'fs-extra'

const copyFiles = () =>
  Promise.all([
    copyFile(path.resolve(deRoot, 'package.json'), path.resolve(deOutPut, 'package.json')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(deOutPut, 'global.d.ts')),
  ])

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () => copy(src, buildConfig[module].output.path, { recursive: true }))

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  // buildModules,
  // withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
  // runTask('generateTypes'),
  copyFiles,
  withTaskName('build', ()=> run('vite build'))
  // copyTypesDefinitions
)

export * from './src'
