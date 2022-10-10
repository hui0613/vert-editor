import glob from 'fast-glob'
import { OutputOptions, rollup } from 'rollup'
import vuePlugin from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from 'rollup-plugin-node-resolve'
import loadJSON from '@rollup/plugin-json'
import { buildConfigEntries } from '../build-info'
import { writeBundle } from '../utils/rollup'
import { excludeFiles, deRoot, pkgRoot } from '@dew-editor/build-utils'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!.d.ts'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      vuePlugin(),
      commonjs(),
      loadJSON(),
      nodeResolve({
        extensions: ['.js', '.ts', '.json'],
      }),
      esbuild({
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: ['vue', 'clipboard', 'markdown-it'],
    treeshake: false,
  })

  await writeBundle(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: deRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}
