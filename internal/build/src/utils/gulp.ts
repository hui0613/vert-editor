import { buildRoot } from '@dew-editor/build-utils'
import { TaskFunction } from 'gulp'
import { run } from './porcess'

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name })

export const runTask = (name: string) => withTaskName(`shellTask: ${name}`, () => run(`pnpm run build ${name}`, buildRoot))
