import './styles/global.css';
import styles from './styles/app.module.css';
import scssStyles from './styles/theme.scss';
import { createCard } from './components/card';
import { createButton } from './components/button';

// 初始化应用
function initApp() {
  const appElement = document.getElementById('app');
  
  // 创建应用容器
  const appContainer = document.createElement('div');
  appContainer.className = styles.container;
  
  // 创建标题
  const title = document.createElement('h1');
  title.className = styles.title;
  title.textContent = 'Rollup CSS处理示例';
  
  // 创建描述
  const description = document.createElement('p');
  description.className = styles.description;
  description.textContent = '这个示例展示了Rollup处理不同类型CSS的能力，包括普通CSS、CSS模块和SCSS。';
  
  // 创建CSS类型展示区域
  const cssTypesSection = document.createElement('div');
  cssTypesSection.className = styles.section;
  
  // 普通CSS示例
  const regularCssCard = createCard(
    '普通CSS',
    '直接导入的CSS会应用到全局作用域，没有作用域隔离。',
    'regular-css-example'
  );
  
  // CSS模块示例
  const cssModulesCard = createCard(
    'CSS模块',
    'CSS模块会自动生成唯一的类名，提供作用域隔离，防止样式冲突。',
    styles.moduleExample
  );
  
  // SCSS示例
  const scssCard = createCard(
    'SCSS支持',
    'Rollup可以处理SCSS文件，支持嵌套、变量、混合等高级特性。',
    scssStyles.scssExample
  );
  
  // 添加按钮区域
  const buttonSection = document.createElement('div');
  buttonSection.className = styles.buttonSection;
  
  // 创建不同样式的按钮
  const primaryButton = createButton('主要按钮', 'primary');
  const secondaryButton = createButton('次要按钮', 'secondary');
  const outlinedButton = createButton('描边按钮', 'outlined');
  
  // 组装DOM
  buttonSection.appendChild(primaryButton);
  buttonSection.appendChild(secondaryButton);
  buttonSection.appendChild(outlinedButton);
  
  cssTypesSection.appendChild(regularCssCard);
  cssTypesSection.appendChild(cssModulesCard);
  cssTypesSection.appendChild(scssCard);
  
  appContainer.appendChild(title);
  appContainer.appendChild(description);
  appContainer.appendChild(cssTypesSection);
  appContainer.appendChild(buttonSection);
  
  appElement.appendChild(appContainer);
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);