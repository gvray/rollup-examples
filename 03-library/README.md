# 03-library - 库打包示例

这个示例展示了如何使用Rollup打包JavaScript库，支持多种模块格式(UMD/ESM/CJS)，包括：

- 配置多种输出格式
- 使用插件处理依赖
- 生成压缩和非压缩版本
- 提供友好的API设计

## 文件结构

```
03-library/
├── dist/                # 输出目录
│   ├── index.cjs.js     # CommonJS格式
│   ├── index.esm.js     # ES模块格式
│   ├── index.umd.js     # UMD格式(压缩版)
│   └── index.umd.debug.js # UMD格式(调试版)
├── src/                 # 源代码
│   ├── index.js         # 入口文件
│   ├── basic.js         # 基础数学函数
│   ├── advanced.js      # 高级数学函数
│   └── statistics.js    # 统计学函数
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

Rollup配置文件中包含三种不同的输出格式：

1. **UMD格式(压缩版)**：适用于浏览器环境，通过`<script>`标签引入
2. **UMD格式(调试版)**：未压缩版本，便于调试
3. **ESM和CJS格式**：适用于现代JavaScript项目和Node.js环境

### 使用的插件

- `@rollup/plugin-node-resolve`：解析第三方模块
- `@rollup/plugin-commonjs`：将CommonJS模块转换为ES模块
- `@rollup/plugin-terser`：压缩代码

## 使用方法

### 浏览器环境 (UMD)

```html
<script src="dist/index.umd.js"></script>
<script>
  // 全局变量 mathUtils
  const result = mathUtils.add(1, 2);
  console.log(result); // 3
</script>
```

### ES模块环境

```javascript
// 导入整个库
import mathUtils from './dist/index.esm.js';
console.log(mathUtils.add(1, 2)); // 3

// 或者只导入需要的函数
import { add, subtract } from './dist/index.esm.js';
console.log(add(1, 2)); // 3
```

### Node.js环境 (CommonJS)

```javascript
const mathUtils = require('./dist/index.cjs.js');
console.log(mathUtils.add(1, 2)); // 3
```

## 库API

这个库提供了三类数学函数：

### 基础函数

- `add(a, b)` - 两数相加
- `subtract(a, b)` - 两数相减
- `multiply(a, b)` - 两数相乘
- `divide(a, b)` - 两数相除
- `mod(a, b)` - 取余运算
- `abs(x)` - 绝对值

### 高级函数

- `power(base, exponent)` - 幂运算
- `sqrt(x)` - 平方根
- `factorial(n)` - 阶乘
- `log(x, base)` - 对数
- `sin(angle)` - 正弦
- `cos(angle)` - 余弦
- `tan(angle)` - 正切

### 统计函数

- `mean(numbers)` - 平均值
- `median(numbers)` - 中位数
- `mode(numbers)` - 众数
- `variance(numbers)` - 方差
- `standardDeviation(numbers)` - 标准差
- `range(numbers)` - 范围