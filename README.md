# rollup-examples

收集研究rollup各种场景案例

## 项目结构

```
.
├── 01-simple/            # 简单打包示例 ✅
├── 02-multi-output/      # 多输出格式示例 ✅
├── 03-code-splitting/    # 代码分割示例 ✅
├── 04-typescript/        # TypeScript支持示例 ✅
├── 05-babel/             # Babel转换示例 ✅
├── 06-library/           # 库打包示例 ✅
├── 07-react/             # React组件库示例 ✅
├── 08-css/               # CSS处理示例 ✅
├── 09-assets/            # 资源文件处理示例 ✅
├── 10-visualization/     # 打包可视化示例 ✅
├── 11-watch/             # 监听模式示例 ✅
├── 12-plugin/            # 自定义插件示例 🔄
└── 13-microfrontend/     # 微前端示例 ✅
```

## 案例详情

### [01-basic](./01-basic)
基础的JavaScript打包示例，展示Rollup的核心功能。
- 简单的模块导入导出
- 基本的 Rollup 配置
- 打包为 IIFE 格式

### [02-multiple-entries](./02-multiple-entries)
演示如何配置多入口打包，生成多个输出文件。
- 多入口配置
- 独立输出文件
- 合并模式输出

### [03-library](./03-library)
展示如何打包JavaScript库，支持多种模块格式(UMD/ESM/CJS)。
- 数学工具库示例
- UMD 格式（浏览器和 Node.js）
- ESM 格式（ES 模块）
- CommonJS 格式（Node.js）
- 压缩和未压缩版本

### [04-typescript](./04-typescript)
集成TypeScript，展示类型检查和编译。
- TypeScript 配置
- 类型定义
- 生成类型声明文件
- 多格式输出
- 待办事项应用示例

### [05-plugins](./05-plugins)
展示如何在 Rollup 中使用各种常用插件。
- 代码转换与压缩
- 资源处理
- 开发服务器与热重载
- 环境变量替换
- CSS 处理

### [06-code-splitting](./06-code-splitting)
演示代码分割和动态导入功能。
- 多入口打包
- 动态导入 (Dynamic Imports)
- 共享模块提取
- 第三方库分离

### [07-react](./07-react)
演示如何打包React组件库，包括JSX转换和样式处理。
- TypeScript 与 React 集成
- CSS 样式处理
- 多种输出格式（ES、CJS、UMD）
- 类型定义文件生成
- 主题系统实现
- 多个常用组件（Button、Card、Input、Modal、Tooltip）

### [08-css](./08-css)
处理CSS文件，包括CSS模块、预处理器等。
- 普通 CSS 处理
- CSS 模块化（自动生成唯一类名）
- SCSS 预处理器支持
- PostCSS 插件链（Autoprefixer、cssnano）
- CSS 提取到单独文件

### 09-assets: 资源文件处理示例 ✅

- 图片处理（小图片转base64，大图片复制并重命名）
- SVG处理（作为URL导入或转换为组件）
- 字体处理（支持woff、woff2等格式）
- 静态资源复制（保持目录结构）
- 使用@rollup/plugin-url处理二进制文件
- 使用@svgr/rollup处理SVG文件
- 使用rollup-plugin-copy复制静态资源

### 10-visualization: 打包可视化示例 ✅

- 使用rollup-plugin-visualizer生成交互式可视化报告
- 支持树形图、旭日图、网络图等多种可视化方式
- 使用source-map-explorer分析打包文件组成
- 自定义依赖报告生成
- 模块大小和依赖关系分析
- 提供优化建议和最佳实践

### 11-watch: 监听模式示例 ✅

- 基本监听模式（使用rollup -c -w）
- LiveReload模式（使用rollup-plugin-livereload）
- 热模块替换（HMR）简单实现
- 监听配置优化
- 实时时钟和计数器组件示例
- 多种监听模式对比

### 12-plugin: 自定义插件示例 🔄

*计划中*

- 创建和使用自定义Rollup插件
- 插件生命周期钩子
- 转换和生成插件
- 多插件协同工作

### 13-microfrontend: 微前端示例 ✅

- 基于Single-SPA和SystemJS的微前端架构
- 主应用（Host）和独立微应用的构建配置
- 基于路由的微应用加载和卸载
- 共享依赖管理
- 微应用生命周期（bootstrap、mount、unmount）
- 独立开发和构建流程
- 样式隔离和主题共享

## 如何使用

每个示例目录都包含自己的 README.md 文件，详细说明了该示例的功能、文件结构、安装步骤和使用方法。

一般步骤如下：

```bash
# 进入示例目录
cd 01-basic

# 安装依赖
pnpm install

# 构建
pnpm run build

# 开发模式（如果支持）
pnpm run dev
```

## 环境要求

- Node.js 14.0.0 或更高版本
- pnpm 7.0.0 或更高版本（也可以使用 npm 或 yarn）
