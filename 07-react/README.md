# React 组件库打包示例

这个示例展示了如何使用 Rollup 打包 React 组件库，包括 TypeScript 支持、CSS 处理、多种输出格式和类型定义文件生成。

## 功能特点

- 使用 TypeScript 开发 React 组件
- 支持 CSS 样式处理
- 生成多种格式的输出（ES 模块、CommonJS、UMD）
- 自动生成类型定义文件（.d.ts）
- 排除 peer dependencies 避免重复打包
- 包含主题系统和多个常用组件

## 项目结构

```
07-react/
├── demo/                  # 演示页面
│   └── index.html         # 组件库使用示例
├── src/                   # 源代码
│   ├── components/        # 组件目录
│   │   ├── Button/        # 按钮组件
│   │   ├── Card/          # 卡片组件
│   │   ├── Input/         # 输入框组件
│   │   ├── Modal/         # 模态框组件
│   │   └── Tooltip/       # 提示框组件
│   ├── theme/             # 主题系统
│   ├── index.ts           # 主入口文件
│   └── version.ts         # 版本信息
├── package.json           # 项目配置
├── rollup.config.js       # Rollup 配置
└── tsconfig.json          # TypeScript 配置
```

## 组件列表

- **Button**: 按钮组件，支持多种变体、颜色和尺寸
- **Card**: 卡片组件，支持标题、内容和操作区
- **Input**: 输入框组件，支持多种变体和状态
- **Modal**: 模态框组件，支持自定义标题、内容和底部操作
- **Tooltip**: 提示框组件，支持多种位置和自定义内容

## 如何使用

### 安装依赖

```bash
npm install
```

### 开发构建

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 查看示例

构建完成后，在浏览器中打开 `demo/index.html` 文件查看组件示例。

## 使用组件库

### 安装组件库

```bash
npm install your-component-library
```

### 导入组件

```jsx
import { Button, Card, ThemeProvider } from 'your-component-library';

function App() {
  return (
    <ThemeProvider>
      <Card title="示例卡片">
        <p>这是一个使用组件库的示例</p>
        <Button variant="contained" color="primary">点击我</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Rollup 配置说明

本示例使用了以下 Rollup 插件：

- **@rollup/plugin-node-resolve**: 解析 node_modules 中的模块
- **@rollup/plugin-commonjs**: 将 CommonJS 模块转换为 ES6
- **@rollup/plugin-typescript**: 处理 TypeScript 文件
- **@rollup/plugin-babel**: 使用 Babel 转换代码
- **rollup-plugin-peer-deps-external**: 排除 peer dependencies
- **rollup-plugin-postcss**: 处理 CSS 文件
- **rollup-plugin-dts**: 生成类型定义文件

配置生成三种格式的输出：

- **ES 模块** (ESM): 用于支持 tree-shaking 的打包工具
- **CommonJS** (CJS): 用于 Node.js 环境
- **UMD**: 通用模块定义，可在多种环境使用

## 许可证

MIT