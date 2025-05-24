import { format } from 'date-fns';
import { logger } from '../utils/logger';

/**
 * 时钟组件类
 */
export class Clock {
  constructor() {
    this.currentTimeElement = document.getElementById('current-time');
    this.formattedTimeElement = document.getElementById('formatted-time');
    this.intervalId = null;
  }

  /**
   * 启动时钟
   */
  start() {
    // 立即更新一次
    this.update();
    
    // 设置定时器，每秒更新一次
    this.intervalId = setInterval(() => this.update(), 1000);
    
    logger.log('时钟组件已启动');
  }

  /**
   * 停止时钟
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.log('时钟组件已停止');
    }
  }

  /**
   * 更新时钟显示
   */
  update() {
    const now = new Date();
    
    // 更新当前时间
    if (this.currentTimeElement) {
      this.currentTimeElement.textContent = now.toLocaleTimeString();
    }
    
    // 更新格式化时间
    if (this.formattedTimeElement) {
      // 使用date-fns格式化时间
      const formattedTime = format(now, 'yyyy-MM-dd HH:mm:ss');
      this.formattedTimeElement.textContent = formattedTime;
    }
  }
}