// 数据表格组件
export class DataTable {
  constructor(data) {
    this.data = data;
    this.container = document.createElement('div');
    this.container.className = 'table-container';
  }
  
  // 更新数据
  updateData(newData) {
    this.data = newData;
    this.renderTable();
  }
  
  // 渲染表格
  renderTable() {
    // 清空容器
    this.container.innerHTML = '';
    
    // 创建表格标题
    const tableTitle = document.createElement('h3');
    tableTitle.textContent = '销售数据明细';
    tableTitle.className = 'table-title';
    
    // 创建表格
    const table = document.createElement('table');
    table.className = 'data-table';
    
    // 创建表头
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['月份', '实际销售额', '销售目标', '完成率'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 创建表格内容
    const tbody = document.createElement('tbody');
    
    this.data.forEach(item => {
      const row = document.createElement('tr');
      
      // 月份
      const monthCell = document.createElement('td');
      monthCell.textContent = item.month;
      row.appendChild(monthCell);
      
      // 实际销售额
      const salesCell = document.createElement('td');
      salesCell.textContent = item.sales.toLocaleString();
      row.appendChild(salesCell);
      
      // 销售目标
      const targetCell = document.createElement('td');
      targetCell.textContent = item.target.toLocaleString();
      row.appendChild(targetCell);
      
      // 完成率
      const rateCell = document.createElement('td');
      const rate = (item.sales / item.target * 100).toFixed(1);
      rateCell.textContent = `${rate}%`;
      
      // 根据完成率设置样式
      if (rate >= 100) {
        rateCell.className = 'rate-success';
      } else if (rate >= 80) {
        rateCell.className = 'rate-warning';
      } else {
        rateCell.className = 'rate-danger';
      }
      
      row.appendChild(rateCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // 添加到容器
    this.container.appendChild(tableTitle);
    this.container.appendChild(table);
  }
  
  // 渲染组件
  render() {
    this.renderTable();
    return this.container;
  }
}