# GitHub Copilot 指令

## 项目概述

这是一个轻量级的 CLI 脚手架工具，用于创建支持 Vue/React 的 Vite 项目。

## 代码风格

- 使用 ES 模块 (`import/export`)
- 使用 `async/await` 处理异步操作
- 优先使用函数式编程模式
- 使用描述性的变量名

## 文件结构

- `index.js` - 主入口文件
- `plugins/` - 插件系统，包含 ESLint、Tailwind CSS、UnoCSS
- `template-*` - 不同框架的项目模板

## 依赖管理

- **prompts** - 用于交互式命令行提示
- **picocolors** - 用于终端颜色
- 避免添加不必要的依赖

## 测试

- 使用 `npm test` 运行测试
- 测试命令：`node index.js test-app`

## 插件系统

创建新插件时：

- 导出一个接受 `projectName` 和 `projectPath` 参数的函数
- 返回包含 `dependencies`、`devDependencies` 和 `files` 的对象
- 遵循现有插件的模式（eslint.js、tailwind.js、unocss.js）

## 模板规范

- 保持模板简洁干净
- 只包含必要的文件
- 使用 Vite 7.x 作为构建工具
- 同时支持 TypeScript 和 JavaScript 版本

## 命名规范

- 文件名使用 kebab-case（短横线连接）
- 变量和函数使用 camelCase（驼峰命名）
- 组件名使用 PascalCase（帕斯卡命名）

## 文档

- 保持 README.md 更新
- 记录所有配置选项
- 提供清晰的使用示例
- 除了README.md , 不要直接自动生成其他文档
