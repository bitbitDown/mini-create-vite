# Mini Create Vite

中文 | [English](./README.en.md)

> 一个轻量级的 Vite 项目脚手架工具

快速创建 Vue/React 项目，支持 TypeScript，内置可选插件（ESLint、Tailwind CSS、UnoCSS）。

## 安装使用

### 方式一：npx 运行（推荐）

```bash
npx @bitbitdown/mini-create-vite
```

### 方式二：全局安装

```bash
npm install -g @bitbitdown/mini-create-vite
mini-vite
```

## 使用步骤

运行命令后，按提示操作：

1. **输入项目名** - 例如：`my-app`
2. **选择框架** - Vue / React
3. **选择语言** - TypeScript / JavaScript
4. **选择插件**（可选）- ESLint / Tailwind CSS / UnoCSS

创建完成后：

```bash
cd my-app
npm install
npm run dev
```

## 功能特性

### 支持的框架模板

- **Vue 3.5** + TypeScript / JavaScript
- **React 18.3** + TypeScript / JavaScript

### 可选插件

| 插件 | 说明 |
|------|------|
| **ESLint** | 基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，自动检测项目类型 |
| **Tailwind CSS v4** | 使用 `@tailwindcss/vite` 插件，无需配置文件 |
| **UnoCSS** | 即时按需的原子 CSS 引擎，性能更优 |

> ⚠️ Tailwind CSS 和 UnoCSS 不能同时使用

## 完整示例

### 创建 Vue + TypeScript 项目

```bash
npx @bitbitdown/mini-create-vite

# 按提示输入：
# ✓ Project name: my-vue-app
# ✓ Select a framework: vue-ts
# ✓ Select plugins: ESLint, Tailwind CSS

cd my-vue-app
npm install
npm run dev
```

### 创建 React + JavaScript 项目

```bash
npx @bitbitdown/mini-create-vite

# 按提示输入：
# ✓ Project name: my-react-app
# ✓ Select a framework: react
# ✓ Select plugins: ESLint

cd my-react-app
npm install
npm run dev
```

## 相关链接

- [插件系统文档](./PLUGIN_SYSTEM.md)
- [npm 包地址](https://www.npmjs.com/package/@bitbitdown/mini-create-vite)
- [GitHub 仓库](https://github.com/bitbitdown/mini-create-vite)

## 开发计划

- [ ] 支持 Husky（Git hooks）
- [ ] 支持 CI/CD 配置模板
- [ ] 更多框架支持

## 致谢

灵感来源于 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

## 许可证

MIT

---

**如果对你有帮助，欢迎 Star ⭐️**
