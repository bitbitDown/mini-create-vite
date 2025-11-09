import { eslintPlugin } from './eslint.js'
import { tailwindPlugin } from './tailwind.js'
import { unocssPlugin } from './unocss.js'
import colors from 'picocolors'

const { green, red } = colors

/**
 * 所有可用的插件
 */
export const plugins = {
  eslint: eslintPlugin,
  tailwind: tailwindPlugin,
  unocss: unocssPlugin
}

/**
 * 插件执行优先级（数字越小越先执行）
 */
const pluginOrder = {
  eslint: 1,     // ESLint（包含 Prettier）
  tailwind: 2,   // CSS 框架
  unocss: 2      // CSS 框架（与 Tailwind 同级）
}

/**
 * 获取插件选择列表（用于 prompts）
 */
export function getPluginChoices() {
  return Object.values(plugins).map(plugin => ({
    title: plugin.title,
    value: plugin.name,
    description: plugin.description
  }))
}

/**
 * 应用选中的插件（带错误处理和执行顺序控制）
 * @param {string[]} selectedPlugins - 选中的插件名称数组
 * @param {string} root - 项目根目录
 * @param {string} template - 模板名称
 * @param {object} pkg - package.json 对象
 * @returns {object} 执行结果 { success: string[], failed: Array<{name, error}> }
 */
export function applyPlugins(selectedPlugins, root, template, pkg) {
  const results = {
    success: [],
    failed: []
  }
  
  // 按优先级排序
  const sortedPlugins = [...selectedPlugins].sort((a, b) => {
    const orderA = pluginOrder[a] || 999
    const orderB = pluginOrder[b] || 999
    return orderA - orderB
  })
  
  console.log('') // 空行
  
  for (const pluginName of sortedPlugins) {
    const plugin = plugins[pluginName]
    
    if (!plugin) {
      results.failed.push({ 
        name: pluginName, 
        error: 'Plugin not found' 
      })
      console.error(`${red('✖')} Plugin "${pluginName}" not found`)
      continue
    }
    
    if (!plugin.setup) {
      results.failed.push({ 
        name: pluginName, 
        error: 'Plugin missing setup method' 
      })
      console.error(`${red('✖')} Plugin "${plugin.title}" is missing setup method`)
      continue
    }
    
    try {
      plugin.setup(root, template, pkg)
      results.success.push(pluginName)
    } catch (error) {
      results.failed.push({ 
        name: pluginName, 
        error: error.message 
      })
      console.error(`${red('✖')} Failed to configure ${plugin.title}:`)
      console.error(`   ${error.message}`)
    }
  }
  
  // 输出总结
  console.log('')
  if (results.success.length > 0) {
    console.log(`${green('✔')} Successfully configured ${results.success.length} plugin(s)`)
  }
  if (results.failed.length > 0) {
    console.log(`${red('✖')} Failed to configure ${results.failed.length} plugin(s)`)
  }
  
  return results
}
