# Rollup 打包可视化示例

这个示例展示了如何使用各种工具可视化和分析 Rollup 打包结果，帮助开发者理解打包内容、优化包大小和提高性能。

## 功能特点

- **打包可视化**：使用 `rollup-plugin-visualizer` 生成交互式可视化报告
  - 树形图、旭日图、网络图等多种可视化方式
  - 分析模块大小和依赖关系
  - 支持 gzip/brotli 压缩后的大小分析

- **源码映射分析**：使用 `source-map-explorer` 分析打包文件的组成
  - 基于源映射的精确分析
  - 识别冗余代码和重复依赖

- **自定义依赖报告**：通过自定义 Rollup 插件生成依赖关系报告
  - JSON 格式的详细依赖信息
  - 模块大小排序和分析

- **可视化界面**：提供交互式界面展示分析结果
  - 使用 Chart.js 绘制模块大小图表
  - 展示模块列表和大小比例

## 项目结构

```
10-visualization/
├── dist/               # 构建输出目录
│   ├── index.html      # HTML 入口文件
│   └── bundle.js       # 打包后的 JS 文件
├── src/
│   ├── main.js         # 主入口文件
│   ├── components/     # 组件目录
│   │   └── moduleItem.js  # 模块项组件
│   ├── constants/      # 常量目录
│   │   └── colors.js   # 颜色常量
│   └── utils/          # 工具函数目录
│       ├── dataGenerator.js  # 数据生成工具
│       └── formatters.js     # 格式化工具
├── stats.html          # 可视化报告（构建后生成）
├── stats.json          # 统计数据（构建后生成）
├── dependency-report.json  # 依赖报告（构建后生成）
├── rollup.config.js    # Rollup 配置文件
└── package.json        # 项目配置文件
```

## 可视化工具说明

### rollup-plugin-visualizer

这是一个 Rollup 插件，可以生成打包结果的可视化报告，帮助分析模块大小和依赖关系。

配置示例：

```js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  // ...
  plugins: [
    // ...
    visualizer({
      filename: 'stats.html',
      title: 'Rollup Visualization',
      open: true,
      template: 'treemap', // 可选: sunburst, treemap, network
      gzipSize: true,
      brotliSize: true,
      sourcemap: true
    })
  ]
};
```

### source-map-explorer

这是一个独立工具，可以使用源映射分析打包文件的组成。它可以帮助识别冗余代码和重复依赖。

使用示例：

```bash
source-map-explorer dist/bundle.js
```

### 自定义依赖报告

本示例中包含一个自定义 Rollup 插件，用于生成依赖关系报告。它会收集所有模块的信息，并生成一个 JSON 格式的报告。

```js
{
  name: 'dependency-report',
  generateBundle(outputOptions, bundle) {
    // 收集模块信息并生成报告
    // ...
  }
}
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 构建并生成可视化报告

```bash
npm run visualize
```

这将构建项目并生成可视化报告，然后自动在浏览器中打开报告。

### 使用 source-map-explorer 分析

```bash
npm run analyze
```

这将使用 source-map-explorer 分析打包文件，并在浏览器中显示结果。

### 仅构建项目

```bash
npm run build
```

### 启动静态服务器

```bash
npm run serve
```

这将启动一个静态服务器，提供 `dist` 目录的内容。

## 优化建议

通过分析可视化报告，可以发现以下常见问题并进行优化：

1. **大型依赖**：识别并替换或优化大型第三方库
2. **重复模块**：消除重复导入的模块
3. **未使用代码**：移除未使用的代码和依赖
4. **代码分割**：将代码分割成更小的块，实现按需加载
5. **树摇优化**：确保树摇（Tree Shaking）正常工作

## Rollup 配置说明

`rollup.config.js` 文件配置了以下插件：

- `@rollup/plugin-node-resolve`：解析 node_modules 中的模块
- `@rollup/plugin-commonjs`：将 CommonJS 模块转换为 ES 模块
- `rollup-plugin-terser`：压缩 JS 代码
- `rollup-plugin-visualizer`：生成可视化报告

此外，还包含一个自定义插件 `dependency-report`，用于生成依赖关系报告。

## 许可证

MIT