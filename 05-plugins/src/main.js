// 导入样式
import './styles/main.css';

// 导入JSON数据
import packageInfo from '../package.json';

// 导入图片资源
import logoUrl from './assets/logo.svg';

// 导入工具函数
import { formatDate, generateId } from './utils';

// 导入第三方库（将由commonjs插件处理）
import { v4 as uuidv4 } from 'uuid';

// 环境变量（将由replace插件替换）
const ENV = process.env.NODE_ENV;
const VERSION = __VERSION__;

/**
 * 初始化应用
 */
function init() {
  console.log(`应用初始化 - 环境: ${ENV}, 版本: ${VERSION}`);
  console.log(`包信息: ${packageInfo.name} ${packageInfo.version}`);
  
  // 创建DOM元素
  const app = document.getElementById('app');
  
  // 添加标题
  const title = document.createElement('h1');
  title.textContent = 'Rollup 插件示例';
  app.appendChild(title);
  
  // 添加logo
  const logo = document.createElement('img');
  logo.src = logoUrl;
  logo.alt = 'Logo';
  logo.className = 'logo';
  app.appendChild(logo);
  
  // 添加描述
  const description = document.createElement('p');
  description.textContent = `这个示例展示了如何使用各种Rollup插件来构建现代化的Web应用。`;
  app.appendChild(description);
  
  // 添加功能演示区域
  const demoSection = document.createElement('div');
  demoSection.className = 'demo-section';
  app.appendChild(demoSection);
  
  // 添加当前时间
  const timeElement = document.createElement('div');
  timeElement.className = 'time-display';
  timeElement.textContent = `当前时间: ${formatDate(new Date())}`;
  demoSection.appendChild(timeElement);
  
  // 添加ID生成演示
  const idElement = document.createElement('div');
  idElement.className = 'id-display';
  
  const internalId = generateId();
  const externalId = uuidv4();
  
  idElement.innerHTML = `
    <p>内部生成ID: <span class="id">${internalId}</span></p>
    <p>UUID库生成ID: <span class="id">${externalId}</span></p>
  `;
  demoSection.appendChild(idElement);
  
  // 添加按钮
  const button = document.createElement('button');
  button.textContent = '点击生成新ID';
  button.className = 'action-button';
  button.addEventListener('click', () => {
    const newInternalId = generateId();
    const newExternalId = uuidv4();
    
    document.querySelector('.id-display .id:first-child').textContent = newInternalId;
    document.querySelector('.id-display .id:last-child').textContent = newExternalId;
    
    // 更新时间
    timeElement.textContent = `当前时间: ${formatDate(new Date())}`;
  });
  demoSection.appendChild(button);
  
  // 添加环境信息
  const envInfo = document.createElement('div');
  envInfo.className = 'env-info';
  envInfo.innerHTML = `
    <p>环境: <strong>${ENV}</strong></p>
    <p>版本: <strong>${VERSION}</strong></p>
  `;
  app.appendChild(envInfo);
  
  // 添加插件列表
  const pluginsList = document.createElement('div');
  pluginsList.className = 'plugins-list';
  pluginsList.innerHTML = `
    <h2>使用的插件:</h2>
    <ul>
      <li>@rollup/plugin-node-resolve - 解析第三方模块</li>
      <li>@rollup/plugin-commonjs - 转换CommonJS模块</li>
      <li>@rollup/plugin-babel - 使用Babel转换代码</li>
      <li>@rollup/plugin-terser - 压缩代码</li>
      <li>@rollup/plugin-json - 导入JSON文件</li>
      <li>@rollup/plugin-replace - 替换环境变量</li>
      <li>@rollup/plugin-url - 处理资源文件</li>
      <li>rollup-plugin-postcss - 处理CSS文件</li>
      <li>rollup-plugin-serve - 开发服务器</li>
      <li>rollup-plugin-livereload - 热重载</li>
    </ul>
  `;
  app.appendChild(pluginsList);
}

// 导出公共API
export { init };

// 自动初始化
document.addEventListener('DOMContentLoaded', init);