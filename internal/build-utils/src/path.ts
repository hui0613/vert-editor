import * as path from 'path'

export const projRoot = path.resolve(__dirname, '../../../')
export const pkgRoot = path.resolve(projRoot, 'packages')
export const vertRoot = path.resolve(pkgRoot, 'vert-editor')

export const outputDir = path.resolve(projRoot, 'dist')
export const vertOutput = path.resolve(outputDir, 'vert-editor')

export const vertPackage = path.resolve(vertRoot, 'package.json')
