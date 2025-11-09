# 模板说明文档

本项目提供 4 个精选模板，覆盖 Vue 和 React 的 TypeScript/JavaScript 变体。

---

## 📦 可用模板

| 模板名称     | 框架         | 语言       | 描述                                |
| ------------ | ------------ | ---------- | ----------------------------------- |
| `vue-ts`   | Vue 3.5.13   | TypeScript | Composition API +`<script setup>` |
| `vue`      | Vue 3.5.13   | JavaScript | Composition API +`<script setup>` |
| `react-ts` | React 18.3.1 | TypeScript | Function Components + Hooks         |
| `react`    | React 18.3.1 | JavaScript | Function Components + Hooks         |

---

## 🔧 模板详情

### 1. Vue + TypeScript (`template-vue-ts`)

**包含文件：**

```
template-vue-ts/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── _gitignore
└── src/
    ├── main.ts
    ├── App.vue
    └── style.css
```

**依赖版本：**

```json
{
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "typescript": "~5.6.2",
    "vite": "^6.0.5",
    "vue-tsc": "^2.1.10"
  }
}
```

**特点：**

- ✅ 完整的 TypeScript 类型支持
- ✅ Vue 3 Composition API
- ✅ `<script setup>` 语法糖
- ✅ vue-tsc 类型检查

---

### 2. Vue + JavaScript (`template-vue`)

**包含文件：**

```
template-vue/
├── package.json
├── vite.config.js
├── index.html
├── _gitignore
└── src/
    ├── main.js
    ├── App.vue
    └── style.css
```

**依赖版本：**

```json
{
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "vite": "^6.0.5"
  }
}
```

**特点：**

- ✅ 纯 JavaScript，无需编译
- ✅ 更快的开发速度
- ✅ 适合快速原型
- ✅ 学习曲线更平缓

---

### 3. React + TypeScript (`template-react-ts`)

**包含文件：**

```
template-react-ts/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── _gitignore
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    └── index.css
```

**依赖版本：**

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.2",
    "vite": "^6.0.5"
  }
}
```

**特点：**

- ✅ 完整的 TypeScript 类型支持
- ✅ React 18 + Hooks
- ✅ Function Components
- ✅ 严格的类型检查

---

### 4. React + JavaScript (`template-react`)

**包含文件：**

```
template-react/
├── package.json
├── vite.config.js
├── index.html
├── _gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── index.css
```

**依赖版本：**

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  }
}
```

**特点：**

- ✅ 纯 JavaScript，无需编译
- ✅ JSX 语法支持
- ✅ 更快的开发速度
- ✅ 适合快速原型

---

## 🎯 如何选择？

### TypeScript vs JavaScript

**选择 TypeScript，如果：**

- ✅ 团队项目，需要类型安全
- ✅ 大型应用，需要更好的代码提示
- ✅ 重构频繁，类型系统能提前发现错误
- ✅ 团队成员熟悉 TypeScript

**选择 JavaScript，如果：**

- ✅ 快速原型，不想被类型约束
- ✅ 小型项目，类型系统收益不大
- ✅ 学习阶段，先掌握框架本身
- ✅ 团队更熟悉 JavaScript

### Vue vs React

**选择 Vue，如果：**

- ✅ 喜欢模板语法（类似 HTML）
- ✅ 需要更完整的官方生态（Router、Pinia）
- ✅ 学习曲线要求平缓
- ✅ 团队有 Vue 经验

**选择 React，如果：**

- ✅ 喜欢 JSX（JavaScript 中写 UI）
- ✅ 需要更大的社区和第三方库
- ✅ 团队有 React 经验
- ✅ 需要 React Native 移动端开发

---

## 🔌 插件兼容性

所有模板都兼容以下插件：

| 插件            | vue-ts | vue | react-ts | react |
| --------------- | ------ | --- | -------- | ----- |
| ESLint (Antfu)  | ✅     | ✅  | ✅       | ✅    |
| Tailwind CSS v4 | ✅     | ✅  | ✅       | ✅    |
| UnoCSS          | ✅     | ✅  | ✅       | ✅    |

**说明：**

- **ESLint (Antfu)** 会自动检测框架和语言，无需额外配置
- **Tailwind CSS** 和 **UnoCSS** 只能二选一

---

## 📝 使用示例

### 创建 Vue + TypeScript + ESLint + Tailwind 项目

```bash
node index.js my-vue-app
# 选择: Vue → TypeScript → ESLint + Tailwind CSS

cd my-vue-app
npm install
npm run dev
```

### 创建 React + JavaScript + UnoCSS 项目

```bash
node index.js my-react-app
# 选择: React → JavaScript → UnoCSS

cd my-react-app
npm install
npm run dev
```

---

## 🛠️ 模板维护

### 添加新模板

1. 创建模板目录：`template-xxx/`
2. 添加必要文件（package.json、vite.config 等）
3. 在 `index.js` 的 `FRAMEWORKS` 中注册

### 更新依赖版本

直接修改对应模板的 `package.json` 文件即可。

**最后更新：2025年11月8日**
