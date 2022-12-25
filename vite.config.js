import { defineConfig } from 'vite'
import * as path from 'path'
import glob from 'fast-glob'
import { pkgRoot, deOutPut, buildOutput } from '@dew-editor/build-utils'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export const excludeFiles = (files) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      external: ['vue', 'element-plus', 'mitt', 'clipboard', 'markdown-it', 'highlight.js', /\.s?css/],
      input: ['./packages/dew-editor/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: path.resolve(deOutPut, 'es'),
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: path.resolve(deOutPut, 'lib'),
        },
      ],
    },
    lib: {
      entry: './packages/dew-editor/index.ts',
    },
  },
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: './tsconfig.json',
      entryRoot: 'packages',
      preserveModules: true,
      cleanVueFileName: true,
      insertTypesEntry: true,
      skipDiagnostics: true,
      outputDir: path.resolve(buildOutput, 'types'),
      beforeWriteFile: (filePath, content) => {
        return {
          filePath,
          content: content.replace(/@dew-editor\//g, 'dew-editor/es/'),
        }
      },
    }),
  ],
})
