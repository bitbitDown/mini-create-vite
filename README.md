# Mini Create Vite

中文 | [English](./README.en.md)

> 一个轻量级的 Vite 项目脚手架工具

快速创建 Vue/React 项目，支持 TypeScript，内置可选插件（ESLint、Tailwind CSS、UnoCSS）。

## 快速开始

```bash
# 运行脚手架
node index.js

# 或指定项目名
node index.js my-app
```

按提示选择：

1. 框架（Vue / React）
2. 语言（TypeScript / JavaScript）
3. 插件（ESLint / Tailwind CSS / UnoCSS）

## 支持的模板

- **Vue 3** + TypeScript / JavaScript
- **React 18** + TypeScript / JavaScript

## 可选插件

### ESLint

- 基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- 自动检测 TypeScript、React、Vue
- 内置 Prettier 格式化

### Tailwind CSS v4

- 使用 `@tailwindcss/vite` 插件
- 无需 `tailwind.config.js`
- [官方文档](https://tailwindcss.com/docs/installation/using-vite)

### UnoCSS

- 即时按需的原子 CSS 引擎
- 性能优于 Tailwind

> ⚠️ Tailwind CSS 和 UnoCSS 只能选择一个

## 项目结构

```
mini-create-vite/
├── index.js              # 主入口
├── package.json
├── plugins/              # 插件系统
│   ├── eslint.js
│   ├── tailwind.js
│   └── unocss.js
├── template-vue-ts/      # Vue + TS 模板
├── template-vue/         # Vue + JS 模板
├── template-react-ts/    # React + TS 模板
└── template-react/       # React + JS 模板
```

## 使用示例

### 创建 Vue + TypeScript 项目

```bash
node index.js my-vue-app
# 选择: Vue → TypeScript → ESLint + Tailwind

cd my-vue-app
npm install
npm run dev
```

### 创建 React + JavaScript 项目

```bash
node index.js my-react-app
# 选择: React → JavaScript → ESLint

cd my-react-app
npm install
npm run dev
```

## 技术栈

- **核心依赖**

  - [prompts](https://github.com/terkelg/prompts) - 交互式命令行
  - [picocolors](https://github.com/alexeyraspopov/picocolors) - 终端颜色
- **框架版本**

  - Vue: 3.5.13
  - React: 18.3.1
  - Vite: 6.0.5
  - TypeScript: 5.6.2

## 相关文档

- [PLUGIN_SYSTEM.md](./PLUGIN_SYSTEM.md) - 插件系统

## 后续打算

扩展plugins，支持husky、CICD等配置

## 许可证

MIT

## 致谢

灵感来源于 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

---

**如果对你有帮助，欢迎 Star ⭐️**
