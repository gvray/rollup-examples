# 04-typescript - TypeScript支持示例

这个示例展示了如何在Rollup中集成TypeScript，包括：

- 配置TypeScript编译选项
- 使用接口和类型定义
- 生成类型声明文件
- 构建支持多种模块格式的库

## 文件结构

```
04-typescript/
├── dist/                # 输出目录
│   ├── index.js         # CommonJS格式
│   ├── index.esm.js     # ES模块格式
│   ├── index.umd.js     # UMD格式
│   └── index.d.ts       # 类型声明文件
├── src/                 # 源代码
│   ├── index.ts         # 入口文件
│   ├── types.ts         # 类型定义
│   ├── store.ts         # 数据存储
│   └── utils.ts         # 工具函数
├── index.html           # 示例HTML
├── package.json         # 项目配置
├── rollup.config.js     # Rollup配置
├── tsconfig.json        # TypeScript配置
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

## 类型检查

```bash
pnpm run type-check
```

## 配置说明

### TypeScript配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationDir": "./dist",
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Rollup配置 (rollup.config.js)

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
  // 浏览器友好的UMD构建
  {
    input: 'src/index.ts',
    output: {
      name: 'todoApp',
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  
  // CommonJS和ES模块构建
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' })
    ]
  }
];
```

## 使用方法

### 浏览器环境 (UMD)

```html
<script src="dist/index.umd.js"></script>
<script>
  // 创建待办事项应用实例
  const app = new todoApp.default();
  
  // 添加待办事项
  app.add('学习TypeScript');
  
  // 获取所有待办事项
  const todos = app.getFilteredTodos();
  console.log(todos);
</script>
```

### ES模块环境

```javascript
import TodoAppImpl from './dist/index.esm.js';

// 创建应用实例
const todoApp = new TodoAppImpl();

// 添加待办事项
const todo = todoApp.add('学习TypeScript');
console.log(todo);

// 获取所有待办事项
const todos = todoApp.getFilteredTodos();
console.log(todos);
```

### Node.js环境 (CommonJS)

```javascript
const { default: TodoAppImpl } = require('./dist/index.js');

// 创建应用实例
const todoApp = new TodoAppImpl();

// 添加待办事项
const todo = todoApp.add('学习TypeScript');
console.log(todo);
```

## 类型定义

使用生成的类型声明文件，可以在TypeScript项目中获得完整的类型支持：

```typescript
import TodoAppImpl, { Todo, TodoFilter } from './dist';

// 创建应用实例
const todoApp = new TodoAppImpl();

// 添加待办事项
const todo: Todo = todoApp.add('学习TypeScript');

// 设置过滤器
todoApp.setFilter('active' as TodoFilter);
```