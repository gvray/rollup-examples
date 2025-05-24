// 导入第三方库
import { format } from 'date-fns';
import _ from 'lodash';
import Chart from 'chart.js/auto';

// 导入自定义模块
import { generateRandomData } from './utils/dataGenerator';
import { formatBytes } from './utils/formatters';
import { createModuleItem } from './components/moduleItem';
import { CHART_COLORS } from './constants/colors';

// 初始化应用
function initApp() {
  // 格式化当前日期
  const formattedDate = format(new Date(), 'yyyy年MM月dd日 HH:mm:ss');
  document.getElementById('formatted-date').textContent = formattedDate;
  
  // 使用lodash处理数组
  const numbers = [5, 3, 8, 2, 1, 4];
  document.getElementById('original-array').textContent = numbers.join(', ');
  
  const processed = _.chain(numbers)
    .filter(n => n > 2)
    .map(n => n * 2)
    .sortBy()
    .value();
  document.getElementById('processed-array').textContent = processed.join(', ');
  
  // 设置模块大小图表按钮事件
  document.getElementById('loadChartBtn').addEventListener('click', loadModuleSizeChart);
}

// 加载模块大小图表
async function loadModuleSizeChart() {
  try {
    // 尝试加载依赖报告
    const response = await fetch('../dependency-report.json');
    if (!response.ok) {
      throw new Error('无法加载依赖报告。请先运行 npm run build:stats 生成报告。');
    }
    
    const data = await response.json();
    renderModuleChart(data);
    renderModuleList(data);
  } catch (error) {
    console.error('加载模块数据失败:', error);
    
    // 如果无法加载真实数据，使用模拟数据
    const mockData = {
      modules: [
        { id: 'node_modules/lodash/lodash.js', size: 528400, imports: [] },
        { id: 'node_modules/chart.js/auto/auto.js', size: 243200, imports: [] },
        { id: 'node_modules/date-fns/esm/index.js', size: 152600, imports: [] },
        { id: 'src/utils/dataGenerator.js', size: 2500, imports: [] },
        { id: 'src/utils/formatters.js', size: 1800, imports: [] },
        { id: 'src/components/moduleItem.js', size: 1200, imports: [] },
        { id: 'src/constants/colors.js', size: 800, imports: [] },
        { id: 'src/main.js', size: 3200, imports: [] }
      ],
      totalSize: 933700
    };
    
    renderModuleChart(mockData);
    renderModuleList(mockData);
  }
}

// 渲染模块大小图表
function renderModuleChart(data) {
  const modules = data.modules.slice(0, 10); // 只显示前10个最大的模块
  
  // 准备图表数据
  const labels = modules.map(m => {
    // 简化模块名称
    const name = m.id.split('/').pop() || m.id;
    return name.length > 20 ? name.substring(0, 17) + '...' : name;
  });
  
  const sizes = modules.map(m => m.size);
  
  // 获取或创建canvas上下文
  const ctx = document.getElementById('moduleSizeChart').getContext('2d');
  
  // 销毁现有图表（如果存在）
  if (window.moduleChart) {
    window.moduleChart.destroy();
  }
  
  // 创建新图表
  window.moduleChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '模块大小 (bytes)',
        data: sizes,
        backgroundColor: CHART_COLORS,
        borderColor: CHART_COLORS.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '模块大小分析 (前10个最大模块)'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `大小: ${formatBytes(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatBytes(value);
            }
          }
        }
      }
    }
  });
}

// 渲染模块列表
function renderModuleList(data) {
  const moduleListElement = document.getElementById('moduleList');
  moduleListElement.innerHTML = '';
  
  // 计算最大模块大小（用于比例计算）
  const maxSize = Math.max(...data.modules.map(m => m.size));
  
  // 添加总大小信息
  const totalItem = document.createElement('div');
  totalItem.className = 'module-item';
  totalItem.innerHTML = `<strong>总大小: ${formatBytes(data.totalSize)}</strong>`;
  moduleListElement.appendChild(totalItem);
  
  // 添加各模块信息
  data.modules.forEach(module => {
    const moduleItem = createModuleItem(module, maxSize);
    moduleListElement.appendChild(moduleItem);
  });
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);