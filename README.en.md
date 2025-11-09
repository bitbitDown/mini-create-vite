# Mini Create Vite

[中文](./README.md) | English

> A lightweight Vite project scaffolding tool

Quickly create Vue/React projects with TypeScript support and optional plugins (ESLint, Tailwind CSS, UnoCSS).

## Quick Start

```bash
# Run the scaffolding tool
node index.js

# Or specify project name
node index.js my-app
```

Follow the prompts to select:

1. Framework (Vue / React)
2. Language (TypeScript / JavaScript)
3. Plugins (ESLint / Tailwind CSS / UnoCSS)

## Supported Templates

- **Vue 3** + TypeScript / JavaScript
- **React 18** + TypeScript / JavaScript

## Optional Plugins

### ESLint

- Based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- Auto-detects TypeScript, React, Vue
- Built-in Prettier formatting

### Tailwind CSS v4

- Uses `@tailwindcss/vite` plugin
- No `tailwind.config.js` needed
- [Official Docs](https://tailwindcss.com/docs/installation/using-vite)

### UnoCSS

- Instant on-demand atomic CSS engine
- Better performance than Tailwind

> ⚠️ Choose either Tailwind CSS or UnoCSS, not both

## Project Structure

```
mini-create-vite/
├── index.js              # Main entry
├── package.json
├── plugins/              # Plugin system
│   ├── eslint.js
│   ├── tailwind.js
│   └── unocss.js
├── template-vue-ts/      # Vue + TS template
├── template-vue/         # Vue + JS template
├── template-react-ts/    # React + TS template
└── template-react/       # React + JS template
```

## Usage Examples

### Create Vue + TypeScript Project

```bash
node index.js my-vue-app
# Select: Vue → TypeScript → ESLint + Tailwind

cd my-vue-app
npm install
npm run dev
```

### Create React + JavaScript Project

```bash
node index.js my-react-app
# Select: React → JavaScript → ESLint

cd my-react-app
npm install
npm run dev
```

## Tech Stack

- **Core Dependencies**
  - [prompts](https://github.com/terkelg/prompts) - Interactive command line
  - [picocolors](https://github.com/alexeyraspopov/picocolors) - Terminal colors

- **Framework Versions**
  - Vue: 3.5.13
  - React: 18.3.1
  - Vite: 6.0.5
  - TypeScript: 5.6.2

## Documentation

- [PLUGIN_SYSTEM.md](./PLUGIN_SYSTEM.md) - Plugin System

## Roadmap

Extend plugins to support Husky, CI/CD configurations, and more.

## License

MIT

## Acknowledgments

Inspired by [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

---

**If this helps you, please give it a Star ⭐️**
