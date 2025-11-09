import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import { getTemplateInfo, mergeDependencies, writeFile } from './utils.js'

const { cyan, green } = colors

/**
 * Tailwind CSS v4 插件配置（使用 Vite 插件方式）
 * 官方文档：https://tailwindcss.com/docs/installation/using-vite
 */
export const tailwindPlugin = {
  name: 'tailwind',
  title: 'Tailwind CSS',
  description: 'Utility-first CSS framework',

  /**
   * 设置 Tailwind CSS
   * @param {string} root - 项目根目录
   * @param {string} template - 模板名称
   * @param {object} pkg - package.json 对象
   */
  setup(root, template, pkg) {
    console.log(`${cyan('⚙️  Adding Tailwind CSS v4...')}`)

    const { isVue } = getTemplateInfo(template)

    // 1. 添加依赖（Tailwind v4 使用 Vite 插件）
    mergeDependencies(pkg, {
      'tailwindcss': '^4.1.0',
      '@tailwindcss/vite': '^4.1.0'
    })

    // 2. 修改 vite.config.ts，添加 Tailwind 插件
    const viteConfigPath = path.join(root, 'vite.config.ts')
    if (fs.existsSync(viteConfigPath)) {
      let viteConfig = fs.readFileSync(viteConfigPath, 'utf-8')
      
      // 添加 import（在最后一个 import 之后）
      if (!viteConfig.includes('@tailwindcss/vite')) {
        const importStatement = "import tailwindcss from '@tailwindcss/vite'\n"
        // 找到最后一个 import 语句
        const lastImportIndex = viteConfig.lastIndexOf('import')
        const nextLineIndex = viteConfig.indexOf('\n', lastImportIndex)
        viteConfig = viteConfig.slice(0, nextLineIndex + 1) + 
                     importStatement + 
                     viteConfig.slice(nextLineIndex + 1)
      }
      
      // 在 plugins 数组中添加 tailwindcss()
      // 匹配 plugins: [...] 并在数组最后添加
      if (!viteConfig.includes('tailwindcss()')) {
        viteConfig = viteConfig.replace(
          /(plugins:\s*\[)([^\]]+)(\])/,
          '$1$2, tailwindcss()$3'
        )
      }
      
      const result = writeFile(viteConfigPath, viteConfig)
      if (!result.success) {
        throw new Error(`Failed to update vite.config.ts: ${result.error}`)
      }
    }

    // 3. 修改主样式文件，添加 @import "tailwindcss"
    let cssFile = isVue ? 'src/style.css' : 'src/index.css'
    const cssPath = path.join(root, cssFile)
    
    if (fs.existsSync(cssPath)) {
      const tailwindImport = `@import "tailwindcss";\n\n`
      const existingCss = fs.readFileSync(cssPath, 'utf-8')
      
      // 只在文件开头添加一次
      if (!existingCss.includes('@import "tailwindcss"')) {
        const result = writeFile(cssPath, tailwindImport + existingCss)
        if (!result.success) {
          throw new Error(`Failed to update ${cssFile}: ${result.error}`)
        }
      }
    }

    console.log(`${green('✔')} Tailwind CSS v4 configured successfully!`)
    console.log(`   ${cyan('→')} Using @tailwindcss/vite plugin`)
  }
}
