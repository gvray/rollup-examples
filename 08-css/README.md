# Rollup CSS处理示例

这个示例展示了如何使用Rollup处理不同类型的CSS，包括普通CSS、CSS模块和SCSS。

## 功能特点

- 使用 `rollup-plugin-postcss` 处理CSS文件
- 支持CSS模块化，自动生成唯一类名
- 支持SCSS预处理器
- 使用PostCSS插件链（Autoprefixer和cssnano）
- 提取CSS到单独的文件
- 开发环境支持sourcemap和热重载
- 生产环境自动压缩CSS和JS

## 项目结构

```
08-css/
├── dist/                  # 构建输出目录
│   ├── bundle.css         # 提取的CSS文件
│   ├── bundle.js          # 打包后的JS文件
│   └── index.html         # HTML入口文件
├── src/                   # 源代码
│   ├── components/        # 组件
│   │   ├── button.js      # 按钮组件
│   │   └── card.js        # 卡片组件
│   ├── styles/            # 样式文件
│   │   ├── app.module.css # CSS模块文件
│   │   ├── global.css     # 全局CSS
│   │   └── theme.scss     # SCSS文件
│   └── main.js            # 主入口文件
├── package.json           # 项目配置
└── rollup.config.js       # Rollup配置
```

## CSS处理方式

### 1. 普通CSS

普通CSS文件直接导入，样式会应用到全局作用域：

```js
import './styles/global.css';
```

### 2. CSS模块

CSS模块会自动生成唯一的类名，提供作用域隔离：

```js
import styles from './styles/app.module.css';

// 使用生成的唯一类名
element.className = styles.container;
```

### 3. SCSS

SCSS文件支持嵌套、变量、混合等高级特性：

```js
import scssStyles from './styles/theme.scss';

// 使用SCSS中定义的类
element.className = scssStyles.button;
```

## PostCSS插件

- **Autoprefixer**: 自动添加浏览器前缀
- **cssnano**: 压缩和优化CSS

## 如何使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

这将启动开发服务器，并在文件变更时自动重新构建。

### 生产构建

```bash
npm run build
```

### 启动静态服务器

```bash
npm run serve
```

## Rollup配置说明

主要配置点：

1. **CSS提取**：将CSS提取到单独的文件
   ```js
   postcss({
     extract: 'bundle.css'
   })
   ```

2. **CSS模块化**：启用CSS模块并配置类名生成规则
   ```js
   modules: {
     generateScopedName: production
       ? '[hash:base64:8]'
       : '[name]__[local]___[hash:base64:5]'
   }
   ```

3. **预处理器**：启用SCSS处理
   ```js
   use: ['sass']
   ```

4. **PostCSS插件**：配置Autoprefixer和cssnano
   ```js
   plugins: [
     autoprefixer(),
     production && cssnano()
   ]
   ```

## 许可证

MIT