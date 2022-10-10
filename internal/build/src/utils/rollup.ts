import type { RollupBuild, OutputOptions } from 'rollup'

export function writeBundle(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option: OutputOptions) => bundle.write(option)))
}
