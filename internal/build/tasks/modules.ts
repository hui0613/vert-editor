import { generateExternal } from './../utils/rollup'
import { excludeFiles } from '../utils/pkg'
import path from 'path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { pkgRoot, vertOutput, vertRoot } from '@vert-editor/build-utils'
import { VertEditorPlugin } from '../plugins/vert-editor-alias-plugin'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const bundle = await rollup({
    input: input,
    plugins: [
      VertEditorPlugin(),
      vueDefineOptions(),
      vue(),
      vueJSX(),
      nodeResolve(),
      esbuild({
        target: 'es2022',
        sourceMap: true,
      }),
    ],
    treeshake: false,
    external: await generateExternal({ full: false }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: path.resolve(vertOutput, 'es'),
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: vertRoot,
      sourcemap: true,
      entryFileNames: '[name].js',
    }),
    bundle.write({
      format: 'cjs',
      dir: path.resolve(vertOutput, 'lib'),
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: vertRoot,
      sourcemap: true,
      entryFileNames: '[name].js',
    }),
  ])
}
