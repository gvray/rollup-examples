# Rollup 监听模式示例

这个示例展示了 Rollup 的监听模式功能，包括基本监听、LiveReload 和热模块替换（HMR）。

## 功能特点

- **基本监听模式**：使用 Rollup 的 `-w` 参数启动监听模式，文件变化时自动重新构建
- **LiveReload 模式**：使用 `rollup-plugin-livereload` 插件，文件变化时自动刷新浏览器
- **HMR 模式**：实现简单的热模块替换功能，保持应用状态
- **实时时钟组件**：展示当前时间和格式化时间
- **计数器组件**：展示状态保持功能
- **日志系统**：记录应用操作和状态变化

## 项目结构

```
11-watch/
├── dist/                  # 构建输出目录
│   └── index.html         # HTML 入口文件
├── src/                   # 源代码目录
│   ├── components/        # 组件目录
│   │   ├── clock.js       # 时钟组件
│   │   └── counter.js     # 计数器组件
│   ├── styles/            # 样式目录
│   │   └── main.css       # 主样式文件
│   ├── utils/             # 工具目录
│   │   └── logger.js      # 日志工具
│   └── main.js            # 应用入口文件
├── package.json           # 项目配置文件
├── rollup.config.js       # 基本 Rollup 配置
├── rollup.livereload.config.js  # LiveReload 配置
└── rollup.hmr.config.js   # HMR 配置
```

## Rollup 监听模式说明

### 基本监听模式

Rollup 提供了内置的监听模式，通过 `-w` 或 `--watch` 参数启动：

```bash
rollup -c -w
```

在 `rollup.config.js` 中，可以通过 `watch` 选项配置监听行为：

```js
export default {
  // 其他配置...
  watch: {
    clearScreen: false,     // 构建时不清屏
    include: 'src/**',       // 监听的文件
    exclude: 'node_modules/**'  // 排除的文件
  }
};
```

### LiveReload 模式

使用 `rollup-plugin-livereload` 插件实现浏览器自动刷新：

```js
import livereload from 'rollup-plugin-livereload';

export default {
  // 其他配置...
  plugins: [
    // 其他插件...
    !production && livereload({
      watch: 'dist',  // 监听的目录
      verbose: true,  // 输出详细信息
      delay: 300      // 延迟刷新
    })
  ].filter(Boolean)
};
```

### 热模块替换 (HMR)

本示例实现了简单的 HMR 支持，通过自定义插件和特殊的输出配置：

```js
export default {
  // 使用 ES 模块格式
  output: {
    dir: 'dist',
    format: 'es',
    // 使用哈希命名，确保更新时文件名变化
    entryFileNames: '[name].[hash].js'
  },
  plugins: [
    // 其他插件...
    // 自定义 HMR 插件
    !production && {
      name: 'hmr',
      renderChunk(code, chunk) {
        if (!production && chunk.isEntry) {
          return {
            code: `
// HMR支持
if (import.meta.hot) {
  import.meta.hot.accept();
}

${code}`,
            map: null
          };
        }
        return null;
      }
    }
  ].filter(Boolean)
};
```

## 使用方法

### 安装依赖

```bash
npm install
```

### 基本监听模式

```bash
npm run dev
```

访问 http://localhost:10011

### LiveReload 模式

```bash
npm run dev:livereload
```

访问 http://localhost:10012

### HMR 模式

```bash
npm run dev:hmr
```

访问 http://localhost:10013

## 测试监听功能

1. 启动其中一种监听模式
2. 修改 `src/main.js` 文件，例如更改 `VERSION` 常量的值
3. 观察控制台输出和浏览器行为
4. 修改 `src/styles/main.css` 文件，观察样式变化

## 注意事项

- 基本监听模式需要手动刷新浏览器才能看到变化
- LiveReload 模式会在文件变化后自动刷新整个页面，但会丢失应用状态
- HMR 模式尝试保留应用状态，只更新变化的模块
- 本示例中的 HMR 实现是简化版，不如 Webpack 或 Vite 的 HMR 功能完善

## Rollup 配置说明

本示例包含三个不同的 Rollup 配置文件：

- `rollup.config.js` - 基本监听配置
- `rollup.livereload.config.js` - LiveReload 配置
- `rollup.hmr.config.js` - HMR 配置

每个配置文件都针对特定的监听模式进行了优化，可以通过 npm 脚本选择不同的配置。