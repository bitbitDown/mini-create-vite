import path from 'path'
import colors from 'picocolors'
import { mergeDependencies, mergeScripts, writeFile } from './utils.js'

const { cyan, green } = colors

/**
 * Antfu ESLint 配置插件
 * 基于 @antfu/eslint-config 的现代化 ESLint 配置
 * 支持 TypeScript、React、Vue、Prettier 等开箱即用
 */
export const eslintPlugin = {
  name: 'eslint',
  title: 'ESLint (Antfu)',
  description: 'Code quality and linting with @antfu/eslint-config',
  
  /**
   * 设置 Antfu ESLint 配置
   * @param {string} root - 项目根目录
   * @param {string} template - 模板名称（未使用，antfu 自动检测）
   * @param {object} pkg - package.json 对象
   */
  setup(root, template, pkg) {
    console.log(`${cyan('⚙️  Adding Antfu ESLint config...')}`)

    // 添加依赖（最新版本）
    mergeDependencies(pkg, {
      'eslint': '^9.39.1',
      '@antfu/eslint-config': '^6.2.0'
    })

    // 添加 lint 脚本（简洁版，antfu 会自动处理文件类型）
    mergeScripts(pkg, {
      'lint': 'eslint .',
      'lint:fix': 'eslint . --fix'
    })

    // 创建 eslint.config.mjs（Flat Config 格式）
    const configContent = `import antfu from '@antfu/eslint-config'

export default antfu()
`
    
    const result = writeFile(path.join(root, 'eslint.config.mjs'), configContent)
    
    if (!result.success) {
      throw new Error(`Failed to create eslint.config.mjs: ${result.error}`)
    }

    console.log(`${green('✔')} Antfu ESLint configured successfully!`)
  }
}
