import { pathRewriter } from './../utils/pkg'
import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import { Project } from 'ts-morph'
import { parse, compileScript } from '@vue/compiler-sfc'
import { projRoot, buildOutput, pkgRoot, deRoot, excludeFiles } from '@dew-editor/build-utils'

const index = 1

export async function generateTypes() {
  // 这部分内容具体可以查阅 ts-morph 的文档
  // 这里仅需要知道这是用来处理 ts 文件并生成类型声明文件即可
  const project = new Project({
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      baseUrl: projRoot,
      noEmitOnError: false,
      noImplicitAny: false,
      outDir: path.resolve(buildOutput, 'types'), // 可以设置自定义的打包文件夹，如 'types'
    },
    tsConfigFilePath: path.resolve(projRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  })

  // 获取 src 下的 .vue 和 .ts 文件
  const files = excludeFiles(
    await glob(['**/*.{js?(x),ts?(x),vue}', '!dew-editor/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const dewFiles = excludeFiles(
    await glob('**/*.{js?(x),ts?(x),vue}', {
      cwd: deRoot,
      onlyFiles: true,
    })
  )
  const sourceFiles = []

  await Promise.all([
    ...files.map(async (file) => {
      if (/\.vue$/.test(file)) {
        const content = await fs.readFileSync(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(`${path.relative(process.cwd(), file)}.${lang}`, content)
          sourceFiles.push(sourceFile)
        }
      } else {
        // 如果是 ts 文件则直接添加即可
        sourceFiles.push(project.addSourceFileAtPath(file))
      }
    }),
    ...dewFiles.map((file) => {
      const content = fs.readFileSync(path.resolve(deRoot, file)).toString()
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content))
    }),
  ])

  const diagnostics = project.getPreEmitDiagnostics()

  // 输出解析过程中的错误信息
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  project.emitToMemory()

  // 随后将解析完的文件写道打包路径
  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()

    for (const outputFile of emitOutput.getOutputFiles()) {
      const filePath = outputFile.getFilePath()

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, pathRewriter('esm')(outputFile.getText()), 'utf8')
    }
  }
}
