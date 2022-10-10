import { withTaskName } from './src/utils/gulp'
import { series } from 'gulp'

import { buildModules } from './src'
import { run } from './src/utils/porcess'

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  buildModules,
  withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build'))
)
