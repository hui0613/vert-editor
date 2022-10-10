import { deOutPut } from './../../build-utils/src/path'
import path from 'path'
import type { ModuleFormat } from 'rollup'

export const modules = ['esm', 'cjs'] as const

export type Module = typeof modules[number]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    name: string
    path: string
  }
  bundle: {
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(deOutPut, 'es'),
    },
    bundle: {
      path: 'dew-editor/es',
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(deOutPut, 'lib'),
    },
    bundle: {
      path: 'dew-editor/lib',
    },
  },
}

export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries

export type BuildConfigEntries = [Module, BuildInfo][]
