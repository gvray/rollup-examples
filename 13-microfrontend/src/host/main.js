import { registerApplication, start } from 'single-spa';
import './styles.css';

// 导入导航组件
import { createNavigation } from './navigation';

// 定义应用加载条件
function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(prefix);
  };
}

// 注册微应用
registerApplication({
  name: 'app1',
  app: () => System.import('app1'),
  activeWhen: pathPrefix('/app1'),
});

registerApplication({
  name: 'app2',
  app: () => System.import('app2'),
  activeWhen: pathPrefix('/app2'),
});

// 初始化函数
function init() {
  const root = document.getElementById('root');
  
  // 创建主应用容器
  const container = document.createElement('div');
  container.className = 'host-container';
  
  // 创建标题
  const header = document.createElement('header');
  header.className = 'host-header';
  
  const title = document.createElement('h1');
  title.textContent = 'Rollup微前端示例';
  header.appendChild(title);
  
  // 创建导航
  const nav = createNavigation();
  header.appendChild(nav);
  
  // 创建内容区域
  const content = document.createElement('main');
  content.className = 'host-content';
  content.id = 'single-spa-application';
  
  // 添加到DOM
  container.appendChild(header);
  container.appendChild(content);
  root.appendChild(container);
  
  // 启动single-spa
  start();
  
  console.log('主应用已启动');
}

// 当DOM加载完成后初始化应用
if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}