import { run } from './utils/process'
import { withTaskName } from './utils/pkg'
import { parallel, series, type TaskFunction } from 'gulp'
import { buildModules, buildStyle } from './tasks'
import { copy } from 'fs-extra'
import * as path from 'path'
import { outputDir, PKG_NAME, vertOutput } from '@vert-editor/build-utils'

const copyDeclatation: TaskFunction = (done) => {
  const src = path.resolve(outputDir, 'types')
  const copyFiles = (module: string) =>
    withTaskName(`copy declaration ${module}`, () =>
      copy(src, path.resolve(vertOutput, module), {
        recursive: true,
        filter: (src: string, dest: string) => {
          return !src.includes(`types/${PKG_NAME}`)
        },
      })
    )
  const pkgSrc = path.resolve(src, `${PKG_NAME}`)
  const copyPkgTypes = (module: string) =>
    withTaskName('copy pkg declaration', () => copy(pkgSrc, path.resolve(vertOutput, module), { recursive: true }))

  return parallel(copyFiles('es'), copyFiles('lib'), copyPkgTypes('es'), copyPkgTypes('lib'))(done)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  parallel(
    buildModules,
    withTaskName('generate declaration', () => run('pnpm run generate:types')),
    buildStyle
  ),
  copyDeclatation
)
