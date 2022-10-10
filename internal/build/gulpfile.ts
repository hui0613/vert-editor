import { withTaskName } from './src/utils/gulp'
import { parallel, series, TaskFunction } from 'gulp'

import { buildModules } from './src'
import { run } from './src/utils/porcess'
import { generateTypes } from './src/tasks/types-definitions'

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  // buildModules,
  // withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
  generateTypes
)
