# 插件系统架构说明

## 📁 目录结构

```
mini-vite/
├── index.js                 # CLI 主入口
├── plugins/                 # 插件目录 ✨
│   ├── index.js            # 插件管理器（导出所有插件）
│   ├── eslint.js           # ESLint 插件
│   ├── prettier.js         # Prettier 插件
│   ├── tailwind.js         # Tailwind CSS 插件
│   └── unocss.js           # UnoCSS 插件
└── templates/              # 项目模板
    ├── template-react/
    ├── template-react-ts/
    ├── template-vue/
    └── template-vue-ts/
```

## 🎯 设计原则

### 1. 插件独立性
每个插件都是独立的模块，包含自己的配置逻辑。

### 2. 统一接口
所有插件遵循相同的接口规范：

```javascript
export const xxxPlugin = {
  name: 'plugin-name',        // 插件名称（唯一标识）
  title: 'Display Name',      // 显示名称
  description: 'Description', // 插件描述
  
  setup(root, template, pkg) {
    // 插件配置逻辑
  }
}
```

### 3. 可扩展性
添加新插件只需 3 步：

1. 在 `plugins/` 目录创建新的插件文件
2. 导出符合规范的插件对象
3. 在 `plugins/index.js` 中注册

## 📝 插件接口规范

### 必需属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | string | 插件唯一标识符 |
| `title` | string | 在 UI 中显示的名称 |
| `description` | string | 插件功能描述 |

### 必需方法

#### `setup(root, template, pkg)`

插件的核心方法，负责配置和文件生成。

**参数：**
- `root` (string): 项目根目录绝对路径
- `template` (string): 当前模板名称（如 `'react-ts'`, `'vue'`）
- `pkg` (object): `package.json` 对象引用

**职责：**
1. 修改 `pkg` 对象（添加依赖、脚本等）
2. 创建配置文件
3. 修改已存在的文件（如添加导入语句）
4. 输出状态信息

## 🔧 创建新插件

### 示例：创建一个 Vitest 插件

```javascript
// plugins/vitest.js
import fs from 'fs'
import path from 'path'
import colors from 'picocolors'

const { cyan, green } = colors

export const vitestPlugin = {
  name: 'vitest',
  title: 'Vitest',
  description: 'Unit testing with Vitest',

  setup(root, template, pkg) {
    console.log(`${cyan('Adding Vitest...')}`)

    // 1. 添加依赖
    pkg.devDependencies = pkg.devDependencies || {}
    pkg.devDependencies['vitest'] = '^2.1.8'
    
    const isReact = template.includes('react')
    if (isReact) {
      pkg.devDependencies['@testing-library/react'] = '^16.1.0'
      pkg.devDependencies['@testing-library/jest-dom'] = '^6.6.3'
      pkg.devDependencies['jsdom'] = '^25.0.1'
    }

    // 2. 添加测试脚本
    pkg.scripts = pkg.scripts || {}
    pkg.scripts['test'] = 'vitest'
    pkg.scripts['test:ui'] = 'vitest --ui'
    pkg.scripts['test:coverage'] = 'vitest --coverage'

    // 3. 创建配置文件
    const vitestConfig = `import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: '${isReact ? 'jsdom' : 'node'}',
  },
})
`
    fs.writeFileSync(path.join(root, 'vitest.config.js'), vitestConfig)

    // 4. 创建示例测试文件
    const testExample = `import { describe, it, expect } from 'vitest'

describe('Example Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2)
  })
})
`
    fs.mkdirSync(path.join(root, 'src/__tests__'), { recursive: true })
    fs.writeFileSync(
      path.join(root, 'src/__tests__/example.test.js'),
      testExample
    )

    console.log(`${green('✔')} Vitest configured!`)
  }
}
```

### 注册插件

在 `plugins/index.js` 中添加：

```javascript
import { vitestPlugin } from './vitest.js'

export const plugins = {
  eslint: eslintPlugin,
  prettier: prettierPlugin,
  tailwind: tailwindPlugin,
  unocss: unocssPlugin,
  vitest: vitestPlugin,  // ← 新增
}
```

完成！用户现在可以在创建项目时选择 Vitest 了。

## 🎨 插件管理器 API

### `getPluginChoices()`

获取所有插件的选择列表，用于 `prompts`。

**返回：**
```javascript
[
  { title: 'ESLint', value: 'eslint', description: 'Code quality...' },
  { title: 'Prettier', value: 'prettier', description: 'Code formatting' },
  ...
]
```

### `applyPlugins(selectedPlugins, root, template, pkg)`

应用选中的插件。

**参数：**
- `selectedPlugins` (string[]): 选中的插件名称数组
- `root` (string): 项目根目录
- `template` (string): 模板名称
- `pkg` (object): package.json 对象

**示例：**
```javascript
applyPlugins(['eslint', 'prettier'], '/path/to/project', 'react-ts', pkg)
```

### `checkPluginConflicts(selectedPlugins)`

检查插件之间的冲突。

**参数：**
- `selectedPlugins` (string[]): 选中的插件名称数组

**返回：**
```javascript
[
  '⚠ Warning: Tailwind CSS and UnoCSS are both selected...'
]
```

## 🔍 插件最佳实践

### 1. 错误处理

```javascript
setup(root, template, pkg) {
  try {
    // 配置逻辑
  } catch (error) {
    console.error(`${red('✖')} Failed to configure ${this.title}:`, error.message)
  }
}
```

### 2. 文件存在性检查

```javascript
const configPath = path.join(root, 'vite.config.js')
if (fs.existsSync(configPath)) {
  // 修改已存在的文件
} else {
  console.warn(`${yellow('⚠')} vite.config.js not found, skipping...`)
}
```

### 3. 模板适配

```javascript
const isTypeScript = template.includes('-ts')
const isReact = template.includes('react')
const isVue = template.includes('vue')

// 根据不同模板采取不同策略
if (isReact) {
  // React 特定配置
} else if (isVue) {
  // Vue 特定配置
}
```

### 4. 清晰的日志输出

```javascript
console.log(`${cyan('Adding MyPlugin...')}`)
// ... 配置过程
console.log(`${green('✔')} MyPlugin configured!`)
```

## 🚀 优势总结

### 代码组织
- ✅ 每个插件独立文件，职责清晰
- ✅ 主入口文件简洁，只负责流程控制
- ✅ 易于查找和修改特定插件

### 可维护性
- ✅ 修改单个插件不影响其他功能
- ✅ 测试更容易（可以单独测试每个插件）
- ✅ 代码复用性高

### 可扩展性
- ✅ 添加新插件只需 3 步
- ✅ 不需要修改核心逻辑
- ✅ 支持社区贡献自定义插件

### 用户体验
- ✅ 统一的选择界面
- ✅ 一致的配置体验
- ✅ 灵活的功能组合

## 📦 未来扩展方向

1. **插件市场**：支持从 npm 安装第三方插件
2. **插件配置**：允许用户自定义插件选项
3. **插件依赖**：支持插件间的依赖关系
4. **插件优先级**：控制插件执行顺序
5. **插件钩子**：提供生命周期钩子函数

## 🎯 与其他工具对比

| 特性 | Mini Vite CLI | create-vue | create-t3-app |
|------|---------------|-----------|---------------|
| 插件化设计 | ✅ | ✅ | ✅ |
| 独立插件文件 | ✅ | ❌ | ❌ |
| 统一接口规范 | ✅ | ✅ | ✅ |
| 冲突检测 | ✅ | ❌ | ✅ |
| 易于扩展 | ✅ | ⚠️ | ⚠️ |

我们的插件系统借鉴了优秀工具的设计，同时更加模块化和易于扩展！
