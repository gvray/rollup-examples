import './styles/main.css';
import { createImageSection } from './components/imageSection';
import { createSvgSection } from './components/svgSection';
import { createFontSection } from './components/fontSection';
import { createStaticSection } from './components/staticSection';

// 初始化应用
function initApp() {
  const appElement = document.getElementById('app');
  
  // 创建应用容器
  const appContainer = document.createElement('div');
  appContainer.className = 'container';
  
  // 创建标题
  const title = document.createElement('h1');
  title.textContent = 'Rollup资源文件处理示例';
  
  // 创建描述
  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = '这个示例展示了Rollup处理不同类型资源文件的能力，包括图片、SVG、字体和静态资源。';
  
  // 创建各个资源展示区域
  const imageSection = createImageSection();
  const svgSection = createSvgSection();
  const fontSection = createFontSection();
  const staticSection = createStaticSection();
  
  // 组装DOM
  appContainer.appendChild(title);
  appContainer.appendChild(description);
  appContainer.appendChild(imageSection);
  appContainer.appendChild(svgSection);
  appContainer.appendChild(fontSection);
  appContainer.appendChild(staticSection);
  
  appElement.appendChild(appContainer);
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);