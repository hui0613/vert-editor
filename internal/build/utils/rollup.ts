import { vertPackage, getPackageDependencies } from '@vert-editor/build-utils'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(vertPackage)

  return (id: string) => {
    const packages: string[] = peerDependencies

    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}
