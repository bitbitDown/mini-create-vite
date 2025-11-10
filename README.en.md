# Mini Create Vite

[中文](./README.md) | English

> A lightweight Vite project scaffolding tool

Quickly create Vue/React projects with TypeScript support and optional plugins (ESLint, Tailwind CSS, UnoCSS).

## Installation & Usage

### Option 1: npx (Recommended)

```bash
npx @bitbitdown/mini-create-vite
```

### Option 2: Global Installation

```bash
npm install -g @bitbitdown/mini-create-vite
mini-vite
```

## How to Use

After running the command, follow the prompts:

1. **Enter project name** - e.g., `my-app`
2. **Select framework** - Vue / React
3. **Select language** - TypeScript / JavaScript
4. **Select plugins** (optional) - ESLint / Tailwind CSS / UnoCSS

After creation:

```bash
cd my-app
npm install
npm run dev
```

## Features

### Supported Framework Templates

- **Vue 3.5** + TypeScript / JavaScript
- **React 18.3** + TypeScript / JavaScript

### Optional Plugins

| Plugin | Description |
|--------|-------------|
| **ESLint** | Based on [@antfu/eslint-config](https://github.com/antfu/eslint-config), auto-detects project type |
| **Tailwind CSS v4** | Uses `@tailwindcss/vite` plugin, no config file needed |
| **UnoCSS** | Instant on-demand atomic CSS engine, better performance |

> ⚠️ Cannot use Tailwind CSS and UnoCSS together

## Complete Examples

### Create Vue + TypeScript Project

```bash
npx @bitbitdown/mini-create-vite

# Follow the prompts:
# ✓ Project name: my-vue-app
# ✓ Select a framework: vue-ts
# ✓ Select plugins: ESLint, Tailwind CSS

cd my-vue-app
npm install
npm run dev
```

### Create React + JavaScript Project

```bash
npx @bitbitdown/mini-create-vite

# Follow the prompts:
# ✓ Project name: my-react-app
# ✓ Select a framework: react
# ✓ Select plugins: ESLint

cd my-react-app
npm install
npm run dev
```

## Related Links

- [Plugin System Documentation](./PLUGIN_SYSTEM.md)
- [npm Package](https://www.npmjs.com/package/@bitbitdown/mini-create-vite)
- [GitHub Repository](https://github.com/bitbitdown/mini-create-vite)

## Roadmap

- [ ] Husky support (Git hooks)
- [ ] CI/CD configuration templates
- [ ] More framework support

## Acknowledgments

Inspired by [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

## License

MIT

---

**If this helps you, welcome to Star ⭐️**

Inspired by [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

---

**If this helps you, please give it a Star ⭐️**
