// 图表组件
export class ChartComponent {
  constructor(data) {
    this.data = data;
    this.container = document.createElement('div');
    this.container.className = 'chart-container';
  }
  
  // 更新数据
  updateData(newData) {
    this.data = newData;
    this.renderChart();
  }
  
  // 渲染图表
  renderChart() {
    // 清空容器
    this.container.innerHTML = '';
    
    // 创建图表标题
    const chartTitle = document.createElement('h3');
    chartTitle.textContent = '月度销售数据';
    chartTitle.className = 'chart-title';
    
    // 创建图表画布
    const chartCanvas = document.createElement('div');
    chartCanvas.className = 'chart-canvas';
    
    // 找出最大值，用于计算比例
    const maxValue = Math.max(
      ...this.data.map(item => Math.max(item.sales, item.target))
    );
    
    // 创建图表内容
    const chartContent = document.createElement('div');
    chartContent.className = 'chart-content';
    
    // 创建图表柱状图
    this.data.forEach(item => {
      // 创建月份列
      const column = document.createElement('div');
      column.className = 'chart-column';
      
      // 销售额柱子
      const salesBar = document.createElement('div');
      salesBar.className = 'chart-bar sales-bar';
      salesBar.style.height = `${(item.sales / maxValue) * 200}px`;
      salesBar.setAttribute('title', `销售额: ${item.sales}`);
      
      // 目标柱子
      const targetBar = document.createElement('div');
      targetBar.className = 'chart-bar target-bar';
      targetBar.style.height = `${(item.target / maxValue) * 200}px`;
      targetBar.setAttribute('title', `目标: ${item.target}`);
      
      // 月份标签
      const monthLabel = document.createElement('div');
      monthLabel.className = 'month-label';
      monthLabel.textContent = item.month;
      
      // 添加到列
      column.appendChild(salesBar);
      column.appendChild(targetBar);
      column.appendChild(monthLabel);
      
      // 添加到图表内容
      chartContent.appendChild(column);
    });
    
    // 创建图例
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    
    const salesLegend = document.createElement('div');
    salesLegend.className = 'legend-item';
    const salesColor = document.createElement('span');
    salesColor.className = 'legend-color sales-color';
    salesLegend.appendChild(salesColor);
    salesLegend.appendChild(document.createTextNode('实际销售额'));
    
    const targetLegend = document.createElement('div');
    targetLegend.className = 'legend-item';
    const targetColor = document.createElement('span');
    targetColor.className = 'legend-color target-color';
    targetLegend.appendChild(targetColor);
    targetLegend.appendChild(document.createTextNode('销售目标'));
    
    legend.appendChild(salesLegend);
    legend.appendChild(targetLegend);
    
    // 添加到画布
    chartCanvas.appendChild(chartContent);
    
    // 添加到容器
    this.container.appendChild(chartTitle);
    this.container.appendChild(chartCanvas);
    this.container.appendChild(legend);
  }
  
  // 渲染组件
  render() {
    this.renderChart();
    return this.container;
  }
}