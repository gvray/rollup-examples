# 13-microfrontend - Rollup微前端示例

## 功能特点

这个示例展示了如何使用Rollup构建微前端应用，包含以下功能：

- 基于Single-SPA和SystemJS的微前端架构
- 主应用（Host）和两个独立微应用（App1、App2）
- 基于路由的微应用加载和卸载
- 共享依赖管理
- 独立开发和构建流程
- 统一的样式变量和主题

## 项目结构

```
.
├── package.json           # 项目依赖和脚本
├── rollup.host.config.js  # 主应用Rollup配置
├── rollup.app1.config.js  # 微应用1 Rollup配置
├── rollup.app2.config.js  # 微应用2 Rollup配置
├── src/
│   ├── host/             # 主应用源码
│   │   ├── main.js       # 主应用入口
│   │   ├── navigation.js # 导航组件
│   │   └── styles.css    # 主应用样式
│   ├── app1/             # 微应用1 - 待办事项应用
│   │   ├── app1.js       # 微应用1入口
│   │   ├── styles.css    # 微应用1样式
│   │   └── components/   # 微应用1组件
│   └── app2/             # 微应用2 - 数据可视化应用
│       ├── app2.js       # 微应用2入口
│       ├── styles.css    # 微应用2样式
│       └── components/   # 微应用2组件
└── dist/                 # 构建输出目录
```

## 微前端架构说明

### 1. 主应用（Host）

主应用负责：
- 提供整体布局和导航
- 注册和管理微应用
- 处理路由和应用切换
- 提供共享依赖

### 2. 微应用（App1、App2）

每个微应用：
- 遵循Single-SPA生命周期（bootstrap、mount、unmount）
- 独立开发和构建
- 在运行时由主应用动态加载
- 可以使用不同的技术栈（本示例都使用原生JS）

### 3. 技术选择

- **Single-SPA**: 微前端框架，管理应用的注册和生命周期
- **SystemJS**: 模块加载器，支持在浏览器中动态加载ES模块
- **Rollup**: 构建工具，为每个应用生成独立的bundle

## 使用方法

### 安装依赖

```bash
pnpm install
```

### 开发模式

同时启动所有应用的开发服务器：

```bash
pnpm run dev
```

或者单独启动各个应用：

```bash
# 主应用
pnpm run dev:host

# 微应用1
pnpm run dev:app1

# 微应用2
pnpm run dev:app2
```

### 构建生产版本

```bash
pnpm run build
```

### 启动静态服务器

```bash
pnpm run serve
```

然后在浏览器中访问 http://localhost:5000

## 微前端实现细节

### 1. 应用注册

主应用使用Single-SPA注册微应用：

```javascript
registerApplication({
  name: 'app1',
  app: () => System.import('app1'),
  activeWhen: pathPrefix('/app1'),
});
```

### 2. 生命周期钩子

每个微应用实现三个生命周期钩子：

```javascript
const lifecycles = {
  async bootstrap(props) { /* 初始化 */ },
  async mount(props) { /* 挂载DOM */ },
  async unmount(props) { /* 清理DOM */ }
};
```

### 3. 共享依赖

通过SystemJS的importmap配置共享依赖：

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.4/lib/system/single-spa.min.js"
    }
  }
</script>
```

### 4. 样式隔离

每个微应用使用特定的CSS类名前缀，避免样式冲突：

```css
.app1-container { /* 应用1特定样式 */ }
.app2-container { /* 应用2特定样式 */ }
```

## 注意事项

- 微前端架构适合大型应用和多团队协作场景
- 本示例使用原生JavaScript，实际项目中可以集成React、Vue等框架
- 生产环境中应考虑更完善的依赖共享和版本控制策略
- 微应用之间的通信可以通过自定义事件、全局状态或消息总线实现

## 扩展思路

1. **集成现代框架**: 将微应用改为React、Vue或Angular实现
2. **状态管理**: 添加跨应用的状态共享机制
3. **权限控制**: 基于用户角色控制微应用的访问权限
4. **性能优化**: 实现预加载、懒加载等策略
5. **部署策略**: 实现独立部署和版本控制