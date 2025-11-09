# GitHub 配置使用指南

## 📁 目录结构

```
.github/
├── workflows/              # GitHub Actions 工作流
│   ├── ci.yml             # 持续集成测试
│   ├── publish.yml        # 自动发布到 npm
│   └── release.yml        # 发布新版本
├── ISSUE_TEMPLATE/        # Issue 模板
│   ├── bug_report.yml     # Bug 报告
│   ├── feature_request.yml # 功能请求
│   └── config.yml         # Issue 配置
├── CONTRIBUTING.md        # 贡献指南
├── PULL_REQUEST_TEMPLATE.md # PR 模板
├── dependabot.yml         # 依赖自动更新
└── FUNDING.yml            # 赞助配置（可选）
```

---

## 🚀 快速开始

### 1. 初始化 Git 仓库

```bash
cd mini-create-vite
git init
git add .
git commit -m "feat: initial commit"
```

### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名：`mini-create-vite`
3. 设置为 Public
4. 不要勾选任何初始化选项

### 3. 推送代码

```bash
git remote add origin https://github.com/bitbitdown/mini-create-vite.git
git branch -M main
git push -u origin main
```

---

## ⚙️ 配置 GitHub Secrets

发布到 npm 需要配置 Token：

### 步骤 1：生成 npm Token

1. 登录 npm: https://www.npmjs.com/
2. 点击头像 → Access Tokens → Generate New Token
3. 选择 **Automation** 类型（用于 CI/CD）
4. 复制生成的 Token（只显示一次！）

### 步骤 2：添加到 GitHub Secrets

1. 打开仓库页面
2. Settings → Secrets and variables → Actions
3. 点击 **New repository secret**
4. Name: `NPM_TOKEN`
5. Secret: 粘贴你的 npm token
6. 点击 **Add secret**

---

## 🔄 工作流说明

### 1. CI 测试 (ci.yml)

**触发条件：**
- Push 到 `main` 或 `dev` 分支
- 提交 Pull Request
- 手动触发

**测试矩阵：**
- Node.js: 18, 20, 22
- OS: Ubuntu, macOS, Windows

**运行命令：**
```bash
npm install
npm run test
```

### 2. 自动发布 (publish.yml)

**触发条件：**
- 推送 tag，例如 `v1.0.0`

**执行步骤：**
1. 安装依赖
2. 发布到 npm（带 provenance 签名）
3. 创建 GitHub Release

**如何使用：**

```bash
# 方法 1：手动创建 tag（推荐使用 release.yml）
git tag v1.0.0
git push origin v1.0.0

# 方法 2：使用 npm version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
git push --follow-tags
```

### 3. 发布流程 (release.yml)

**触发方式：** 手动触发

**步骤：**

1. 进入 GitHub 仓库
2. Actions → Release
3. 点击 **Run workflow**
4. 输入版本号（例如 `1.0.0`）
5. 点击 **Run workflow**

这个工作流会：
- 更新 `package.json` 的版本号
- 提交更改
- 创建并推送 tag
- 自动触发 `publish.yml` 发布到 npm

---

## 📋 Issue 模板

### Bug 报告

用户提交 Bug 时会看到结构化表单：
- Bug 描述
- 重现步骤
- 期望行为
- 实际行为
- 系统信息
- 补充信息

### 功能请求

用户提出新功能建议时：
- 功能描述
- 解决的问题
- 期望的解决方案
- 可选方案
- 补充信息

---

## 🔀 Pull Request 流程

1. **Fork 仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feat/new-feature
   ```
3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feat/new-feature
   ```
4. **创建 PR**
   - 填写 PR 模板
   - 关联 Issue
   - 等待 CI 通过
   - 请求审查

---

## 🤖 Dependabot

自动检测依赖更新并创建 PR：

- **npm 依赖**：每周检查一次
- **GitHub Actions**：每周检查一次

你只需要：
1. 审查 PR
2. 测试是否正常
3. 合并或关闭

---

## 📊 Badge 徽章

可以在 `README.md` 中添加状态徽章：

```markdown
![CI](https://github.com/bitbitdown/mini-create-vite/actions/workflows/ci.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/@bitbitdown/mini-create-vite.svg)
![npm downloads](https://img.shields.io/npm/dm/@bitbitdown/mini-create-vite.svg)
![license](https://img.shields.io/npm/l/@bitbitdown/mini-create-vite.svg)
```

---

## 🔧 自定义配置

### 修改测试的 Node.js 版本

编辑 `.github/workflows/ci.yml`:

```yaml
matrix:
  node_version: [18, 20, 22]  # 改成你需要的版本
```

### 修改发布条件

编辑 `.github/workflows/publish.yml`:

```yaml
on:
  push:
    tags:
      - "v*"        # 保留这个
      - "beta-*"    # 添加 beta 版本
```

### 禁用 Dependabot

如果不需要自动更新依赖，删除 `.github/dependabot.yml` 文件。

---

## 📝 发布检查清单

在发布新版本前，确保：

- [ ] 所有测试通过
- [ ] 更新了 CHANGELOG.md
- [ ] 更新了文档（如果有 API 变更）
- [ ] 版本号符合语义化版本规范
- [ ] 已经在本地测试过

**发布命令：**

```bash
# 1. 确保代码是最新的
git pull origin main

# 2. 运行测试
npm run test

# 3. 使用 release workflow 发布
# 在 GitHub Actions 页面手动触发，输入版本号

# 或者本地发布：
npm version patch  # 或 minor, major
git push --follow-tags
```

---

## 🆘 常见问题

### Q: CI 测试失败怎么办？

1. 查看 Actions 页面的详细日志
2. 本地运行 `npm run test` 复现问题
3. 修复后重新提交

### Q: 发布失败，提示 npm token 无效？

1. 检查 GitHub Secrets 中的 `NPM_TOKEN` 是否正确
2. 确认 token 类型是 **Automation**
3. 重新生成 token 并更新 Secret

### Q: 如何撤销已发布的版本？

```bash
# npm 上标记为废弃（推荐）
npm deprecate @bitbitdown/mini-create-vite@1.0.0 "This version has bugs"

# 删除版本（24小时内可删除）
npm unpublish @bitbitdown/mini-create-vite@1.0.0
```

### Q: 如何发布 beta 版本？

```bash
# 修改版本号为 beta
npm version prerelease --preid=beta
# 例如：1.0.0 → 1.0.1-beta.0

# 推送 tag
git push --follow-tags

# npm 会自动发布为 beta tag
```

---

## 🎯 最佳实践

1. **频繁提交**：小步快跑，每个 commit 只做一件事
2. **写好 commit message**：遵循语义化提交规范
3. **及时更新文档**：代码变了，文档也要跟上
4. **重视测试**：确保 CI 通过再合并
5. **语义化版本**：
   - `patch`: Bug 修复 (1.0.0 → 1.0.1)
   - `minor`: 新功能，向后兼容 (1.0.0 → 1.1.0)
   - `major`: 破坏性变更 (1.0.0 → 2.0.0)

---

## 📚 参考资料

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [npm provenance 说明](https://docs.npmjs.com/generating-provenance-statements)
- [语义化版本](https://semver.org/lang/zh-CN/)
- [语义化提交](https://www.conventionalcommits.org/zh-hans/)

---

祝你的项目顺利发布！🎉
