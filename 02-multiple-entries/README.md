# 02-multiple-entries - 多入口打包示例

这个示例展示了Rollup的多入口打包配置，包括：

- 配置多个入口文件
- 生成多个独立的输出文件
- 合并模式下共享公共模块

## 文件结构

```
02-multiple-entries/
├── dist/                # 输出目录
│   ├── bundle-a.js      # 模块A的输出
│   ├── bundle-b.js      # 模块B的输出
│   └── combined/        # 合并模式输出
├── src/                 # 源代码
│   ├── main-a.js        # 入口文件A
│   ├── main-b.js        # 入口文件B
│   └── utils.js         # 共享工具函数
├── index.html           # 示例HTML
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

## 开发模式（监听文件变化）

```bash
pnpm run dev
```

## 配置说明

Rollup配置文件中包含三种不同的配置：

1. **独立打包模式A**：将`main-a.js`打包为`bundle-a.js`，格式为IIFE
2. **独立打包模式B**：将`main-b.js`打包为`bundle-b.js`，格式为IIFE
3. **合并打包模式**：将两个入口文件打包到`dist/combined`目录，格式为ESM，共享模块会被提取为单独的chunk

## 运行

构建完成后，可以直接在浏览器中打开`index.html`查看示例。

### 独立打包模式

在HTML中分别引入两个独立的bundle：

```html
<script src="dist/bundle-a.js"></script>
<script src="dist/bundle-b.js"></script>

<script>
  // 使用模块A
  const resultA = moduleA.initModuleA();
  console.log(resultA);
  
  // 使用模块B
  const resultB = moduleB.initModuleB();
  console.log(resultB);
</script>
```

### 合并打包模式

在支持ESM的环境中使用：

```javascript
// 使用ESM导入
import { initModuleA } from './dist/combined/main-a.js';
import { initModuleB } from './dist/combined/main-b.js';

const resultA = initModuleA();
const resultB = initModuleB();

console.log(resultA, resultB);
```