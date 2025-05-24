// 导入共享工具函数
import { formatDate, generateId } from './utils/common';
import { log, warn } from './utils/logger';

// 导入第三方库
import { debounce } from 'lodash-es';

// 主页面初始化函数
async function initMainPage() {
  log('主页面初始化');
  
  // 获取DOM元素
  const app = document.getElementById('app');
  const mainContent = document.getElementById('main-content');
  const loadModuleBtn = document.getElementById('load-module-btn');
  const aboutLink = document.getElementById('about-link');
  
  // 显示当前时间
  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time-display';
  timeDisplay.textContent = `当前时间: ${formatDate(new Date())}`;
  mainContent.appendChild(timeDisplay);
  
  // 创建唯一ID示例
  const idDisplay = document.createElement('div');
  idDisplay.className = 'id-display';
  idDisplay.innerHTML = `<p>生成的唯一ID: <code>${generateId()}</code></p>`;
  mainContent.appendChild(idDisplay);
  
  // 动态导入模块按钮
  loadModuleBtn.addEventListener('click', debounce(async () => {
    try {
      // 动态导入模块A
      const moduleA = await import('./modules/module-a');
      
      // 显示模块内容
      const moduleContent = document.createElement('div');
      moduleContent.className = 'module-content';
      moduleContent.innerHTML = `
        <h3>模块A已加载</h3>
        <p>${moduleA.getDescription()}</p>
        <p>计算结果: ${moduleA.calculate(5, 3)}</p>
      `;
      
      // 检查是否已存在模块内容
      const existingContent = document.querySelector('.module-content');
      if (existingContent) {
        mainContent.replaceChild(moduleContent, existingContent);
      } else {
        mainContent.appendChild(moduleContent);
      }
      
      log('模块A加载成功');
    } catch (error) {
      warn('加载模块A失败', error);
    }
  }, 300));
  
  // 加载统计模块
  const loadStatsModule = async () => {
    try {
      // 动态导入统计模块
      const { default: StatsModule } = await import('./modules/stats');
      
      // 创建统计模块实例
      const statsModule = new StatsModule();
      
      // 显示统计信息
      const statsDisplay = document.createElement('div');
      statsDisplay.className = 'stats-display';
      
      // 生成随机数据
      const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
      
      statsDisplay.innerHTML = `
        <h3>统计模块</h3>
        <p>数据: ${data.join(', ')}</p>
        <p>平均值: ${statsModule.mean(data)}</p>
        <p>最大值: ${statsModule.max(data)}</p>
        <p>最小值: ${statsModule.min(data)}</p>
      `;
      
      // 检查是否已存在统计显示
      const existingStats = document.querySelector('.stats-display');
      if (existingStats) {
        mainContent.replaceChild(statsDisplay, existingStats);
      } else {
        mainContent.appendChild(statsDisplay);
      }
      
      log('统计模块加载成功');
    } catch (error) {
      warn('加载统计模块失败', error);
    }
  };
  
  // 创建加载统计模块按钮
  const loadStatsBtn = document.createElement('button');
  loadStatsBtn.textContent = '加载统计模块';
  loadStatsBtn.className = 'button';
  loadStatsBtn.addEventListener('click', debounce(loadStatsModule, 300));
  
  // 添加按钮到页面
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  buttonContainer.appendChild(loadStatsBtn);
  mainContent.appendChild(buttonContainer);
  
  // 显示代码分割信息
  const infoSection = document.createElement('div');
  infoSection.className = 'info-section';
  infoSection.innerHTML = `
    <h3>代码分割说明</h3>
    <ul>
      <li>主入口 (main.js): 基本页面功能</li>
      <li>共享模块 (shared chunk): 公共工具函数</li>
      <li>第三方库 (vendor chunk): lodash-es</li>
      <li>动态导入: 按需加载模块A和统计模块</li>
      <li>多入口: 主页和关于页分别打包</li>
    </ul>
  `;
  mainContent.appendChild(infoSection);
  
  log('主页面初始化完成');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initMainPage);

// 导出公共API
export { initMainPage };