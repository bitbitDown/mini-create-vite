import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import { getTemplateInfo, mergeDependencies, writeFile, injectContent } from './utils.js'

const { cyan, green } = colors

/**
 * UnoCSS 插件配置
 */
export const unocssPlugin = {
  name: 'unocss',
  title: 'UnoCSS',
  description: 'Instant on-demand atomic CSS engine',

  /**
   * 设置 UnoCSS
   * @param {string} root - 项目根目录
   * @param {string} template - 模板名称
   * @param {object} pkg - package.json 对象
   */
  setup(root, template, pkg) {
    console.log(`${cyan('Adding UnoCSS...')}`)

    const { isReact, isVue } = getTemplateInfo(template)

    // 添加依赖
    const dependencies = {
      'unocss': '^0.64.6'
    }

    if (isReact) {
      dependencies['@unocss/preset-react'] = '^0.64.6'
    }
    
    mergeDependencies(pkg, dependencies, 'devDependencies')

    // 创建 uno.config.js
    const unoConfig = `import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
})
`

    let result = writeFile(path.join(root, 'uno.config.js'), unoConfig)
    if (!result.success) {
      throw new Error(`Failed to create uno.config.js: ${result.error}`)
    }

    // 修改 vite.config 文件
    const viteConfigFile = template.includes('-ts') ? 'vite.config.ts' : 'vite.config.js'
    const viteConfigPath = path.join(root, viteConfigFile)

    if (fs.existsSync(viteConfigPath)) {
      let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8')
      
      // 添加 UnoCSS 导入
      if (viteConfig.includes("from 'vite'")) {
        viteConfig = viteConfig.replace(
          "from 'vite'",
          "from 'vite'\nimport UnoCSS from 'unocss/vite'"
        )
      }

      // 添加到 plugins 数组
      if (viteConfig.includes('plugins: [')) {
        viteConfig = viteConfig.replace(
          'plugins: [',
          'plugins: [\n    UnoCSS(),'
        )
      }

      result = writeFile(viteConfigPath, viteConfig)
      if (!result.success) {
        throw new Error(`Failed to update ${viteConfigFile}: ${result.error}`)
      }
    }

    // 修改主入口文件，导入 UnoCSS
    let mainFile = 'src/main.ts'
    if (template.includes('react')) mainFile = 'src/main.tsx'
    if (!template.includes('-ts')) mainFile = mainFile.replace('.ts', '.js')

    const mainPath = path.join(root, mainFile)
    if (fs.existsSync(mainPath)) {
      let mainContent = fs.readFileSync(mainPath, 'utf-8')
      // 在第一行添加 UnoCSS 导入
      mainContent = `import 'virtual:uno.css'\n${mainContent}`
      result = writeFile(mainPath, mainContent)
      if (!result.success) {
        throw new Error(`Failed to update ${mainFile}: ${result.error}`)
      }
    }

    console.log(`${green('✔')} UnoCSS configured!`)
  }
}
