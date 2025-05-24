import { format } from 'date-fns';
import { logger } from './utils/logger';
import { Counter } from './components/counter';
import { Clock } from './components/clock';
import './styles/main.css';

// 初始化应用
function initApp() {
  logger.log('应用初始化');
  
  // 检测当前运行模式
  detectRunMode();
  
  // 初始化时钟组件
  const clock = new Clock();
  clock.start();
  
  // 初始化计数器组件
  const counter = new Counter();
  counter.init();
  
  // 添加手动更新按钮事件
  document.getElementById('update-btn').addEventListener('click', () => {
    clock.update();
    logger.log('手动更新时间');
  });
}

// 检测当前运行模式
function detectRunMode() {
  const modeDisplay = document.getElementById('mode-display');
  const currentPort = window.location.port;
  
  switch (currentPort) {
    case '10011':
      modeDisplay.textContent = '基本监听';
      logger.log('运行模式: 基本监听');
      break;
    case '10012':
      modeDisplay.textContent = 'LiveReload';
      logger.log('运行模式: LiveReload');
      break;
    case '10013':
      modeDisplay.textContent = 'HMR (热模块替换)';
      logger.log('运行模式: HMR');
      break;
    default:
      modeDisplay.textContent = '未知模式';
      logger.log('运行模式: 未知');
  }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);

// 导出一个版本号，用于演示HMR
export const VERSION = '1.0.0';

// 如果支持HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    logger.log(`模块热更新，新版本: ${newModule.VERSION}`);
  });
}