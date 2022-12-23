import { defineConfig } from 'vite'
import * as path from 'path'
import { pkgRoot } from '@dew-editor/build-utils'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

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
          dir: 'dist/es',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'dist/lib',
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
      exclude: ['node_modules'],
      include: ['shims-vue.d.ts'],
      entryRoot: 'packages',
      compilerOptions: {
        emitDeclarationOnly: true
      },
      outputDir: "dist/types",
      noEmitOnError: true,
      logDiagnostics: true
    }),
  ],
})
