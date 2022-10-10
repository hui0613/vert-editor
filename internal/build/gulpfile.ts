import { series } from 'gulp'

import { buildModules } from './src'

export default series(buildModules)
