# Rollup 资源文件处理示例

这个示例展示了如何使用 Rollup 处理各种类型的资源文件，包括图片、SVG、字体和其他静态资源。

## 功能特点

- **图片处理**：使用 `@rollup/plugin-url` 处理图片文件
  - 小图片转换为 base64 内联到 JS 中
  - 大图片复制到输出目录并重命名

- **SVG 处理**：使用 `@svgr/rollup` 处理 SVG 文件
  - 将 SVG 作为 URL 导入
  - 将 SVG 转换为 React 组件

- **字体处理**：使用 `@rollup/plugin-url` 处理字体文件
  - 支持 woff、woff2 等字体格式
  - 在 CSS 中通过 @font-face 引用

- **静态资源**：使用 `rollup-plugin-copy` 复制静态资源
  - 复制 JSON、PDF 等文件到输出目录
  - 保持目录结构

## 项目结构

```
09-assets/
├── dist/               # 构建输出目录
│   ├── index.html      # HTML 入口文件
│   ├── bundle.js       # 打包后的 JS 文件
│   ├── bundle.css      # 提取的 CSS 文件
│   └── assets/         # 资源文件目录
├── src/
│   ├── main.js         # 主入口文件
│   ├── styles/         # 样式文件
│   │   └── main.css    # 主样式文件
│   ├── components/     # 组件目录
│   │   ├── imageSection.js    # 图片展示组件
│   │   ├── svgSection.js      # SVG 展示组件
│   │   ├── fontSection.js     # 字体展示组件
│   │   └── staticSection.js   # 静态资源展示组件
│   └── assets/         # 资源文件目录
│       ├── images/     # 图片资源
│       ├── svg/        # SVG 资源
│       ├── fonts/      # 字体资源
│       └── static/     # 静态资源
├── rollup.config.js    # Rollup 配置文件
└── package.json        # 项目配置文件
```

## 资源处理方式

### 图片处理

使用 `@rollup/plugin-url` 插件处理图片文件：

```js
url({
  limit: 10 * 1024, // 10kb
  include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  fileName: 'assets/images/[name]-[hash][extname]'
})
```

- 小于 10KB 的图片会被转换为 base64 内联到 JS 中
- 大于 10KB 的图片会被复制到 `dist/assets/images` 目录并重命名

### SVG 处理

使用 `@svgr/rollup` 插件处理 SVG 文件：

```js
svgr({
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false
          }
        }
      }
    ]
  }
})
```

- 可以将 SVG 作为 URL 导入：`import starSvg from '../assets/svg/star.svg'`
- 可以将 SVG 转换为 React 组件：`import { ReactComponent as IconStar } from '../assets/svg/star.svg'`

### 字体处理

使用 `@rollup/plugin-url` 插件处理字体文件：

```js
url({
  limit: 0, // 不内联字体文件
  include: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  fileName: 'assets/fonts/[name]-[hash][extname]'
})
```

- 字体文件会被复制到 `dist/assets/fonts` 目录并重命名
- 在 CSS 中通过 @font-face 引用：

```css
@font-face {
  font-family: 'OpenSans';
  src: url('../assets/fonts/OpenSans-Regular.woff2') format('woff2'),
       url('../assets/fonts/OpenSans-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 静态资源

使用 `rollup-plugin-copy` 插件复制静态资源：

```js
copy({
  targets: [
    { src: 'src/assets/static/**/*', dest: 'dist/assets' },
    { src: 'src/assets/static/favicon.ico', dest: 'dist' },
    { src: 'src/assets/static/robots.txt', dest: 'dist' }
  ]
})
```

- 静态资源会被复制到 `dist/assets` 目录
- 特定文件（如 favicon.ico、robots.txt）会被复制到 `dist` 根目录

## 使用方法

### 安装依赖

```bash
npm install
```

### 开发构建

```bash
npm run dev
```

这将启动开发服务器，并在 http://localhost:10009 提供预览。

### 生产构建

```bash
npm run build
```

这将生成优化后的生产构建到 `dist` 目录。

### 启动静态服务器

```bash
npm run serve
```

这将启动一个静态服务器，提供 `dist` 目录的内容。

## Rollup 配置说明

`rollup.config.js` 文件配置了以下插件：

- `@rollup/plugin-node-resolve`：解析 node_modules 中的模块
- `@rollup/plugin-url`：处理图片和字体文件
- `@svgr/rollup`：将 SVG 转换为 React 组件
- `rollup-plugin-postcss`：处理 CSS 文件
- `rollup-plugin-copy`：复制静态资源
- `rollup-plugin-terser`：压缩 JS 代码（生产环境）
- `rollup-plugin-serve`：启动开发服务器（开发环境）

## 许可证

MIT