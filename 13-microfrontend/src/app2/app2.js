import { ChartComponent } from './components/ChartComponent';
import { DataTable } from './components/DataTable';
import './styles.css';

// 单一SPA生命周期函数
const lifecycles = {
  // 应用加载时
  async bootstrap(props) {
    console.log('App2 - 启动');
  },
  
  // 应用挂载时
  async mount(props) {
    console.log('App2 - 挂载');
    renderApp();
  },
  
  // 应用卸载时
  async unmount(props) {
    console.log('App2 - 卸载');
    const container = document.getElementById('single-spa-application');
    if (container) {
      container.innerHTML = '';
    }
  }
};

// 模拟数据
const salesData = [
  { month: '一月', sales: 1200, target: 1000 },
  { month: '二月', sales: 900, target: 1100 },
  { month: '三月', sales: 1500, target: 1200 },
  { month: '四月', sales: 1800, target: 1300 },
  { month: '五月', sales: 1200, target: 1400 },
  { month: '六月', sales: 2100, target: 1500 }
];

// 渲染应用
function renderApp() {
  const container = document.getElementById('single-spa-application');
  
  // 创建应用容器
  const appContainer = document.createElement('div');
  appContainer.className = 'app2-container';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '应用2 - 销售数据分析';
  title.className = 'app2-title';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '这是一个简单的数据可视化应用，展示了微前端架构中的另一个独立应用。';
  description.className = 'app2-description';
  
  // 创建控制面板
  const controlPanel = document.createElement('div');
  controlPanel.className = 'control-panel';
  
  const refreshBtn = document.createElement('button');
  refreshBtn.textContent = '刷新数据';
  refreshBtn.className = 'refresh-btn';
  refreshBtn.addEventListener('click', () => {
    // 模拟数据刷新
    const updatedData = salesData.map(item => ({
      ...item,
      sales: Math.floor(item.sales * (0.8 + Math.random() * 0.4))
    }));
    
    // 更新图表和表格
    chartComponent.updateData(updatedData);
    dataTable.updateData(updatedData);
  });
  
  controlPanel.appendChild(refreshBtn);
  
  // 创建图表和表格区域
  const dataSection = document.createElement('div');
  dataSection.className = 'data-section';
  
  // 创建图表组件
  const chartComponent = new ChartComponent(salesData);
  const chartElement = chartComponent.render();
  
  // 创建数据表格组件
  const dataTable = new DataTable(salesData);
  const tableElement = dataTable.render();
  
  // 添加到DOM
  dataSection.appendChild(chartElement);
  dataSection.appendChild(tableElement);
  
  appContainer.appendChild(title);
  appContainer.appendChild(description);
  appContainer.appendChild(controlPanel);
  appContainer.appendChild(dataSection);
  container.appendChild(appContainer);
}

export default lifecycles;