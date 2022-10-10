import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const editorRoot = resolve(pkgRoot, 'editor')
export const deRoot = resolve(pkgRoot, 'dew-editor')

/** output */

export const buildRoot = resolve(projRoot, 'dist')

export const deOutPut = resolve(buildRoot, 'dew-editor')
