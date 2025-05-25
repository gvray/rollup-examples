import { TodoList } from './components/TodoList';
import './styles.css';

// 单一SPA生命周期函数
const lifecycles = {
  // 应用加载时
  async bootstrap(props) {
    console.log('App1 - 启动');
  },
  
  // 应用挂载时
  async mount(props) {
    console.log('App1 - 挂载');
    renderApp();
  },
  
  // 应用卸载时
  async unmount(props) {
    console.log('App1 - 卸载');
    const container = document.getElementById('single-spa-application');
    if (container) {
      container.innerHTML = '';
    }
  }
};

// 渲染应用
function renderApp() {
  const container = document.getElementById('single-spa-application');
  
  // 创建应用容器
  const appContainer = document.createElement('div');
  appContainer.className = 'app1-container';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '应用1 - 待办事项列表';
  title.className = 'app1-title';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '这是一个简单的待办事项应用，展示了微前端架构中的独立应用。';
  description.className = 'app1-description';
  
  // 创建待办事项列表组件
  const todoList = new TodoList();
  const todoListElement = todoList.render();
  
  // 添加到DOM
  appContainer.appendChild(title);
  appContainer.appendChild(description);
  appContainer.appendChild(todoListElement);
  container.appendChild(appContainer);
}

export default lifecycles;