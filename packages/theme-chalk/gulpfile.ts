import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import path from 'path'
import fse from 'fs-extra'
import autoPrefixer from 'gulp-autoprefixer'
import cssMin from 'gulp-cssmin'
import { deOutPut } from '@dew-editor/build-utils'

import { dest, series, src } from 'gulp'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(deOutPut, 'theme-chalk')

function buildEditorStyle() {
  const sass = gulpSass(dartSass)

  return src(path.resolve(__dirname, 'src/editor/*.scss'))
    .pipe(sass.sync())
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(cssMin())
    .pipe(dest(distFolder))
}

function buildMenuStyle() {
  const sass = gulpSass(dartSass)

  return src(path.resolve(__dirname, 'src/menu/*.scss'))
    .pipe(sass.sync())
    .pipe(autoPrefixer({ cascade: false }))
    .pipe(cssMin())
    .pipe(dest(distFolder))
}

function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export default series(buildEditorStyle, buildMenuStyle, copyThemeChalkBundle) as any
