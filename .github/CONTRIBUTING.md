# 贡献指南

感谢你有兴趣为 mini-create-vite 做贡献！

## 🚀 快速开始

### 开发环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 本地开发

1. **Fork 并克隆仓库**

```bash
git clone https://github.com/你的用户名/mini-create-vite.git
cd mini-create-vite
```

2. **安装依赖**

```bash
npm install
```

3. **本地测试**

```bash
npm link
npm run test
```

4. **测试命令**

```bash
mini-vite my-test-app
cd my-test-app
npm install
npm run dev
```

## 📝 提交规范

我们使用语义化的提交信息，格式如下：

```
<type>(<scope>): <subject>
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

### 示例

```
feat(plugins): add prettier plugin
fix(template): fix vue template import error
docs(readme): update installation guide
```

## 🔀 Pull Request 流程

1. **创建分支**

```bash
git checkout -b feat/your-feature
# 或
git checkout -b fix/your-bugfix
```

2. **开发并提交**

```bash
git add .
git commit -m "feat: add new feature"
```

3. **推送到 Fork**

```bash
git push origin feat/your-feature
```

4. **创建 Pull Request**

- 填写 PR 模板
- 关联相关 Issue
- 等待审查

## 🧪 测试

在提交 PR 之前，请确保：

- [ ] 代码能够正常运行
- [ ] 所有模板都能正常创建
- [ ] 插件功能正常
- [ ] 没有破坏现有功能

## 📁 项目结构

```
mini-create-vite/
├── index.js              # 主入口
├── plugins/              # 插件系统
│   ├── index.js         # 插件管理器
│   ├── eslint.js        # ESLint 插件
│   ├── tailwind.js      # Tailwind 插件
│   └── unocss.js        # UnoCSS 插件
├── template-vue/        # Vue JS 模板
├── template-vue-ts/     # Vue TS 模板
├── template-react/      # React JS 模板
└── template-react-ts/   # React TS 模板
```

## 💡 添加新功能

### 添加新的插件

1. 在 `plugins/` 目录创建新文件，例如 `plugins/prettier.js`
2. 导出插件对象：

```js
export const prettierPlugin = {
  name: 'prettier',
  title: 'Prettier',
  description: 'Code formatter',
  
  setup(root, template, pkg) {
    // 添加依赖
    pkg.devDependencies['prettier'] = '^3.0.0'
    
    // 创建配置文件
    const configContent = `{
  "semi": false,
  "singleQuote": true
}`
    fs.writeFileSync(
      path.join(root, '.prettierrc'),
      configContent
    )
    
    console.log('✔ Prettier configured')
  }
}
```

3. 在 `plugins/index.js` 中注册：

```js
import { prettierPlugin } from './prettier.js'

export const plugins = {
  eslint: eslintPlugin,
  prettier: prettierPlugin, // 新增
  tailwind: tailwindPlugin,
  unocss: unocssPlugin
}
```

### 添加新的模板

1. 创建模板目录，例如 `template-svelte/`
2. 添加完整的项目文件
3. 在 `index.js` 的 `FRAMEWORKS` 数组中添加配置

## 🐛 报告 Bug

发现 Bug？请：

1. 搜索现有的 Issue，避免重复
2. 使用 Bug Report 模板创建新 Issue
3. 提供清晰的重现步骤
4. 包含系统信息和错误日志

## 💬 讨论

有问题或想法？欢迎在 [Discussions](https://github.com/bitbitdown/mini-create-vite/discussions) 中讨论！

## 📄 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下授权。
