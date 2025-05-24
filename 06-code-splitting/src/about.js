// 导入共享工具函数
import { formatDate } from './utils/common';
import { log } from './utils/logger';

// 导入第三方库
import { capitalize } from 'lodash-es';

// 关于页面初始化函数
function initAboutPage() {
  log('关于页面初始化');
  
  // 获取DOM元素
  const aboutContent = document.getElementById('about-content');
  
  // 确保内容区域存在
  if (!aboutContent) {
    console.error('找不到about-content元素');
    return;
  }
  
  // 创建关于页面内容
  const content = document.createElement('div');
  content.className = 'about-container';
  
  // 添加页面内容
  content.innerHTML = `
    <h2>${capitalize('关于')}代码分割示例</h2>
    
    <div class="about-section">
      <p>这个示例展示了Rollup的代码分割功能，包括：</p>
      <ul>
        <li>多入口打包</li>
        <li>动态导入 (Dynamic Imports)</li>
        <li>共享模块提取</li>
        <li>第三方库分离</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h3>代码分割的优势</h3>
      <ul>
        <li>减小初始加载体积</li>
        <li>按需加载功能</li>
        <li>更好的缓存利用</li>
        <li>并行加载提升性能</li>
      </ul>
    </div>
    
    <div class="about-section">
      <h3>实现方式</h3>
      <p>本示例使用了以下技术实现代码分割：</p>
      <ol>
        <li>使用<code>manualChunks</code>配置提取共享模块和第三方库</li>
        <li>使用<code>import()</code>语法实现动态导入</li>
        <li>配置多入口点<code>main.js</code>和<code>about.js</code></li>
      </ol>
    </div>
    
    <div class="about-section">
      <h3>文件结构</h3>
      <pre><code>dist/
├── main.js           # 主入口
├── about.js          # 关于页入口
├── chunks/           # 分割的代码块
│   ├── vendor-[hash].js    # 第三方库
│   ├── shared-[hash].js    # 共享模块
│   ├── module-a-[hash].js  # 动态导入的模块A
│   └── stats-[hash].js     # 动态导入的统计模块</code></pre>
    </div>
    
    <div class="timestamp">
      页面生成时间: ${formatDate(new Date())}
    </div>
    
    <div class="navigation">
      <a href="index.html" class="button">返回主页</a>
    </div>
  `;
  
  // 添加到页面
  aboutContent.appendChild(content);
  
  // 动态加载额外信息
  setTimeout(async () => {
    try {
      // 动态导入模块B
      const moduleB = await import('./modules/module-b');
      
      // 创建额外信息区域
      const extraInfo = document.createElement('div');
      extraInfo.className = 'about-section extra-info';
      extraInfo.innerHTML = `
        <h3>额外信息 (动态加载)</h3>
        <p>${moduleB.getExtraInfo()}</p>
        <div class="version-info">
          <strong>版本:</strong> ${moduleB.getVersion()}
        </div>
      `;
      
      // 添加到页面
      content.insertBefore(extraInfo, content.querySelector('.navigation'));
      
      log('模块B加载成功');
    } catch (error) {
      console.error('加载模块B失败', error);
    }
  }, 1000);
  
  log('关于页面初始化完成');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initAboutPage);

// 导出公共API
export { initAboutPage };