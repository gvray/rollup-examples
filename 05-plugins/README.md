# 05-plugins - Rollup插件使用示例

这个示例展示了如何在Rollup中使用各种常用插件，包括：

- 代码转换与压缩
- 资源处理
- 开发服务器与热重载
- 环境变量替换
- CSS处理

## 文件结构

```
05-plugins/
├── dist/                # 输出目录
│   ├── bundle.js        # 打包后的JS
│   ├── main.css         # 提取的CSS
│   └── assets/          # 处理后的资源文件
├── src/                 # 源代码
│   ├── assets/          # 资源文件
│   │   └── logo.svg     # SVG图标
│   ├── styles/          # 样式文件
│   │   └── main.css     # 主样式
│   ├── main.js          # 入口文件
│   └── utils.js         # 工具函数
├── index.html           # HTML页面
├── package.json         # 项目配置
├── rollup.config.js     # Rollup配置
└── README.md            # 说明文档
```

## 安装依赖

```bash
pnpm install
```

## 构建

```bash
pnpm run build
```

## 开发模式（带热重载）

```bash
pnpm run dev
```

## 本地预览

```bash
pnpm run serve
```

## 使用的插件

### 1. @rollup/plugin-node-resolve

解析第三方模块，使Rollup能够处理node_modules中的依赖。

```javascript
import resolve from '@rollup/plugin-node-resolve';

resolve({
  browser: true,        // 优先使用browser字段
  preferBuiltins: false  // 不优先使用Node.js内置模块
})
```

### 2. @rollup/plugin-commonjs

将CommonJS模块转换为ES模块，使Rollup能够处理CommonJS格式的依赖。

```javascript
import commonjs from '@rollup/plugin-commonjs';

commonjs()
```

### 3. @rollup/plugin-babel

使用Babel转换代码，支持最新的JavaScript特性并兼容旧浏览器。

```javascript
import babel from '@rollup/plugin-babel';

babel({
  babelHelpers: 'bundled',
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead',
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
})
```

### 4. @rollup/plugin-terser

压缩和混淆JavaScript代码，减小输出文件大小。

```javascript
import terser from '@rollup/plugin-terser';

// 生产环境压缩代码
production && terser()
```

### 5. @rollup/plugin-json

允许导入JSON文件作为ES模块。

```javascript
import json from '@rollup/plugin-json';

json()
```

### 6. @rollup/plugin-replace

在打包过程中替换源代码中的变量，常用于设置环境变量。

```javascript
import replace from '@rollup/plugin-replace';

replace({
  preventAssignment: true,
  values: {
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    '__VERSION__': JSON.stringify(require('./package.json').version)
  }
})
```

### 7. @rollup/plugin-url

处理图片、字体等资源文件，可以将小文件内联为base64。

```javascript
import url from '@rollup/plugin-url';

url({
  limit: 10 * 1024,                // 小于10kb的文件转为base64
  fileName: '[dirname][name][extname]', // 输出文件名格式
  publicPath: 'dist/assets/'        // 公共路径
})
```

### 8. rollup-plugin-postcss

处理CSS文件，支持CSS预处理器、自动前缀和压缩。

```javascript
import postcss from 'rollup-plugin-postcss';

postcss({
  extract: true,       // 提取CSS到单独文件
  minimize: production, // 生产环境压缩CSS
  sourceMap: !production // 开发环境生成sourceMap
})
```

### 9. rollup-plugin-serve

提供开发服务器，方便本地开发和预览。

```javascript
import serve from 'rollup-plugin-serve';

// 开发服务器 - 仅在开发模式下启用
!production && serve({
  open: true,        // 自动打开浏览器
  contentBase: ['.'], // 服务根目录
  host: 'localhost',
  port: 10001
})
```

### 10. rollup-plugin-livereload

监视文件变化并自动刷新浏览器，提升开发体验。

```javascript
import livereload from 'rollup-plugin-livereload';

// 热重载 - 仅在开发模式下启用
!production && livereload({
  watch: ['dist', 'index.html']
})
```

## 使用方法

1. 克隆仓库并进入示例目录
2. 安装依赖: `pnpm install`
3. 开发模式: `pnpm run dev`
4. 构建生产版本: `pnpm run build`
5. 本地预览: `pnpm run serve`

## 注意事项

- 开发模式下会自动启动服务器并打开浏览器
- 生产构建会压缩JS和CSS，并优化资源文件
- 环境变量会根据构建模式自动设置