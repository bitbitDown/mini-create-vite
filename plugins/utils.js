import fs from 'fs'
import path from 'path'

/**
 * 获取模板信息
 * @param {string} template - 模板名称，如 'react-ts', 'vue', 'vanilla-ts'
 * @returns {object} 模板的详细信息
 */
export function getTemplateInfo(template) {
  const isTypeScript = template.includes('-ts')
  const isReact = template.includes('react')
  const isVue = template.includes('vue')

  
  return {
    // 基础判断
    isTypeScript,
    isJavaScript: !isTypeScript,
    isReact,
    isVue,

    
    // 框架名称
    framework: isReact ? 'react' : isVue ? 'vue' : 'vanilla',
    
    // 语言名称
    language: isTypeScript ? 'typescript' : 'javascript',
    
    // 组合信息（方便日志输出）
    displayName: `${isReact ? 'React' : isVue ? 'Vue' : 'Vanilla'} + ${isTypeScript ? 'TypeScript' : 'JavaScript'}`
  }
}

/**
 * 安全地写入文件
 * @param {string} filePath - 文件路径
 * @param {string|object} content - 文件内容（如果是对象，自动转为 JSON）
 */
export function writeFile(filePath, content) {
  try {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    // 如果是对象，转为格式化的 JSON
    const fileContent = typeof content === 'object' 
      ? JSON.stringify(content, null, 2) + '\n'
      : content
    
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * 向文件中注入内容（在指定位置插入）
 * @param {string} filePath - 文件路径
 * @param {string} searchString - 搜索字符串
 * @param {string} insertContent - 要插入的内容
 * @param {string} position - 插入位置 'before' | 'after'
 */
export function injectContent(filePath, searchString, insertContent, position = 'before') {
  try {
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'File not found' }
    }
    
    let content = fs.readFileSync(filePath, 'utf-8')
    
    if (!content.includes(searchString)) {
      return { success: false, error: `Search string not found: ${searchString}` }
    }
    
    if (position === 'before') {
      content = content.replace(searchString, insertContent + searchString)
    } else {
      content = content.replace(searchString, searchString + insertContent)
    }
    
    fs.writeFileSync(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * 合并依赖到 package.json
 * @param {object} pkg - package.json 对象
 * @param {object} dependencies - 要添加的依赖
 * @param {string} type - 依赖类型 'dependencies' | 'devDependencies'
 */
export function mergeDependencies(pkg, dependencies, type = 'devDependencies') {
  if (!pkg[type]) {
    pkg[type] = {}
  }
  
  Object.assign(pkg[type], dependencies)
  
  // 按字母顺序排序
  pkg[type] = Object.keys(pkg[type])
    .sort()
    .reduce((acc, key) => {
      acc[key] = pkg[type][key]
      return acc
    }, {})
}

/**
 * 合并脚本到 package.json
 * @param {object} pkg - package.json 对象
 * @param {object} scripts - 要添加的脚本
 */
export function mergeScripts(pkg, scripts) {
  if (!pkg.scripts) {
    pkg.scripts = {}
  }
  
  Object.assign(pkg.scripts, scripts)
}
