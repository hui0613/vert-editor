import { pkgRoot, outputDir, vertOutput } from '@vert-editor/build-utils'
import { src, dest } from 'gulp'
import path from 'path'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'

const buildCssModules = async () => {
  const sass = gulpSass(dartSass)

  await new Promise((resolve) => {
    src(`${pkgRoot}/theme-chalk/src/*.scss`)
      .pipe(sass.sync())
      .pipe(cleanCss())
      .pipe(dest(path.resolve(vertOutput, 'theme-chalk')))
      .on('end', resolve)
  })
}

export const buildStyle = async () => {
  await Promise.all([buildCssModules()])
}
