# 06-code-splitting - Rollup代码分割示例

这个示例展示了Rollup的代码分割功能，包括：

- 多入口打包
- 动态导入 (Dynamic Imports)
- 共享模块提取
- 第三方库分离

## 文件结构

```
06-code-splitting/
├── dist/                # 输出目录
│   ├── main.js          # 主入口
│   ├── about.js         # 关于页入口
│   └── chunks/          # 分割的代码块
│       ├── vendor-[hash].js    # 第三方库
│       ├── shared-[hash].js    # 共享模块
│       ├── module-a-[hash].js  # 动态导入的模块A
│       ├── module-b-[hash].js  # 动态导入的模块B
│       └── stats-[hash].js     # 动态导入的统计模块
├── src/                 # 源代码
│   ├── main.js          # 主入口文件
│   ├── about.js         # 关于页入口文件
│   ├── utils/           # 工具函数
│   │   ├── common.js    # 共享工具函数
│   │   └── logger.js    # 日志工具
│   └── modules/         # 功能模块
│       ├── module-a.js  # 模块A
│       ├── module-b.js  # 模块B
│       └── stats.js     # 统计模块
├── index.html           # 主页HTML
├── about.html           # 关于页HTML
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

## 代码分割配置

Rollup支持多种代码分割方式，本示例展示了以下几种：

### 1. 多入口配置

```javascript
input: {
  main: 'src/main.js',
  about: 'src/about.js'
}
```

### 2. 手动分块 (Manual Chunks)

```javascript
output: {
  // ...
  manualChunks: {
    // 将共享模块提取到单独的chunk
    'vendor': ['lodash-es'],
    'shared': ['src/utils/common.js', 'src/utils/logger.js']
  }
}
```

### 3. 动态导入 (Dynamic Imports)

```javascript
// 动态导入模块A
const moduleA = await import('./modules/module-a');

// 动态导入统计模块
const { default: StatsModule } = await import('./modules/stats');
```

## 代码分割的优势

1. **减小初始加载体积**：只加载必要的代码，提高首屏加载速度
2. **按需加载功能**：用户使用到某功能时才加载相关代码
3. **更好的缓存利用**：共享模块和第三方库单独缓存，提高重复访问性能
4. **并行加载**：多个小文件可以并行加载，优化加载过程

## 使用方法

1. 克隆仓库并进入示例目录
2. 安装依赖: `pnpm install`
3. 开发模式: `pnpm run dev`
4. 构建生产版本: `pnpm run build`
5. 本地预览: `pnpm run serve`

## 观察代码分割效果

1. 打开浏览器访问 http://localhost:10001
2. 打开开发者工具的网络面板
3. 观察不同JavaScript文件的加载情况：
   - 初始加载时：main.js, vendor-[hash].js, shared-[hash].js
   - 点击"加载模块A"按钮时：module-a-[hash].js
   - 点击"加载统计模块"按钮时：stats-[hash].js
   - 访问"关于"页面时：about.js
   - 在"关于"页面停留一段时间后：module-b-[hash].js

## 注意事项

- 代码分割需要使用支持ES模块的现代浏览器
- 动态导入使用Promise API，确保目标环境支持或提供polyfill
- 过度分割可能导致HTTP请求增多，需要权衡