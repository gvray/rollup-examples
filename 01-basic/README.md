# 01-basic - 基础打包示例

这个示例展示了Rollup的基本使用方法，包括：

- 基本的配置文件设置
- 模块导入导出
- 生成IIFE格式的bundle

## 文件结构

```
01-basic/
├── dist/               # 输出目录
├── src/                # 源代码
│   ├── main.js         # 入口文件
│   └── utils.js        # 工具函数
├── package.json        # 项目配置
├── rollup.config.js    # Rollup配置
└── README.md           # 说明文档
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

## 运行

构建完成后，可以在HTML文件中引入生成的bundle：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Rollup Basic Example</title>
</head>
<body>
  <script src="dist/bundle.js"></script>
  <script>
    // 使用导出的API
    const app = basicExample.init();
    console.log(app);
  </script>
</body>
</html>
```

或者直接使用Node.js运行：

```bash
node -e "console.log(require('./dist/bundle.js'));"
```