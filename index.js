#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import prompts from 'prompts'
import colors from 'picocolors'
import { getPluginChoices, applyPlugins } from './plugins/index.js'

const { cyan, green, yellow, red, reset, blue } = colors

// 框架配置（支持 Vue 和 React，TypeScript 和 JavaScript）
const FRAMEWORKS = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      { name: 'vue-ts', display: 'TypeScript', color: blue },
      { name: 'vue', display: 'JavaScript', color: yellow }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      { name: 'react-ts', display: 'TypeScript', color: blue },
      { name: 'react', display: 'JavaScript', color: yellow }
    ]
  }
]

const TEMPLATES = FRAMEWORKS.flatMap(f => f.variants.map(v => v.name))

// 工具函数
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) return
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') continue
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

// 主函数
async function init() {
  console.log()
  console.log(`${cyan('Mini Vite')} - A minimal scaffolding tool\n`)

  const args = process.argv.slice(2)
  const argTargetDir = formatTargetDir(args[0])
  const argTemplate = args[1]

  let targetDir = argTargetDir || 'mini-vite-project'

  // 1. 询问项目名称
  const result = {}
  try {
    result.projectName = await prompts({
      type: argTargetDir ? null : 'text',
      name: 'projectName',
      message: reset('Project name:'),
      initial: targetDir,
      onState: (state) => {
        targetDir = formatTargetDir(state.value) || targetDir
      }
    })
  } catch (cancelled) {
    console.log('\n' + red('✖') + ' Operation cancelled')
    return
  }

  // 2. 检查目录是否存在
  const root = path.join(process.cwd(), targetDir)

  if (fs.existsSync(root) && !isEmpty(root)) {
    const response = await prompts({
      type: 'select',
      name: 'overwrite',
      message: `Target directory "${targetDir}" is not empty. Please choose:`,
      choices: [
        { title: 'Cancel', value: 'no' },
        { title: 'Remove existing files', value: 'yes' }
      ]
    })

    if (response.overwrite === 'no') {
      console.log('\n' + red('✖') + ' Operation cancelled')
      return
    } else if (response.overwrite === 'yes') {
      console.log(`\nRemoving existing files in ${targetDir}...`)
      emptyDir(root)
    }
  }

  // 3. 获取包名
  let packageName = path.basename(root)
  if (!isValidPackageName(packageName)) {
    const response = await prompts({
      type: 'text',
      name: 'packageName',
      message: reset('Package name:'),
      initial: toValidPackageName(packageName),
      validate: (name) => isValidPackageName(name) || 'Invalid package name'
    })
    packageName = response.packageName
  }

  // 4. 选择框架
  let template = argTemplate
  if (!template || !TEMPLATES.includes(template)) {
    const frameworkResponse = await prompts({
      type: 'select',
      name: 'framework',
      message: reset('Select a framework:'),
      choices: FRAMEWORKS.map(framework => ({
        title: framework.color(framework.display),
        value: framework
      }))
    })

    const framework = frameworkResponse.framework

    if (!framework) {
      console.log('\n' + red('✖') + ' Operation cancelled')
      return
    }

    const variantResponse = await prompts({
      type: 'select',
      name: 'variant',
      message: reset('Select a variant:'),
      choices: framework.variants.map(variant => ({
        title: variant.color(variant.display),
        value: variant.name
      }))
    })

    template = variantResponse.variant
  }

  // 5. 选择增强功能（可选）
  const featuresResponse = await prompts([
    {
      type: 'multiselect',
      name: 'features',
      message: reset('Select additional features:'),
      choices: getPluginChoices().filter(choice => !['tailwind', 'unocss'].includes(choice.value)),
      hint: '- Space to select. Return to submit',
      instructions: false
    }
  ])

  const selectedFeatures = featuresResponse.features || []

  // 6. 选择 CSS 框架（单选，可选）
  const cssFrameworkResponse = await prompts({
    type: 'select',
    name: 'cssFramework',
    message: reset('Select a CSS framework (optional):'),
    choices: [
      { title: 'None', value: null },
      { title: 'Tailwind CSS v4', value: 'tailwind', description: 'Utility-first CSS framework' },
      { title: 'UnoCSS', value: 'unocss', description: 'Instant on-demand Atomic CSS' }
    ]
  })

  if (cssFrameworkResponse.cssFramework) {
    selectedFeatures.push(cssFrameworkResponse.cssFramework)
  }

  // 7. 复制模板
  console.log(`\n${green('✔')} Scaffolding project in ${root}...\n`)

  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  const templateDir = path.resolve(currentDir, `template-${template}`)

  if (!fs.existsSync(templateDir)) {
    console.log(red(`✖ Template "${template}" not found!`))
    console.log(`Available templates: ${TEMPLATES.join(', ')}`)
    return
  }

  const write = (file, content) => {
    const targetPath = path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  // 创建目标目录
  fs.mkdirSync(root, { recursive: true })

  // 复制模板文件
  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(f => f !== 'package.json')) {
    write(file)
  }

  // 处理 package.json
  const pkgPath = path.join(templateDir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = packageName

  // 7. 应用选中的增强功能
  applyPlugins(selectedFeatures, root, template, pkg)

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  // 重命名 _gitignore 为 .gitignore
  if (fs.existsSync(path.join(root, '_gitignore'))) {
    fs.renameSync(
      path.join(root, '_gitignore'),
      path.join(root, '.gitignore')
    )
  }

  console.log(green('✔') + ' Done!\n')
  console.log('Now run:\n')
  if (root !== process.cwd()) {
    console.log(`  cd ${path.relative(process.cwd(), root)}`)
  }
  console.log('  npm install')
  console.log('  npm run dev\n')
}

init().catch((e) => {
  console.error(red('Error:'), e)
  process.exit(1)
})