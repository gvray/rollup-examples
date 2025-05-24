import { logger } from '../utils/logger';

/**
 * 计数器组件类
 */
export class Counter {
  constructor() {
    this.count = 0;
    this.counterElement = document.getElementById('counter');
    this.incrementBtn = document.getElementById('increment-btn');
    this.decrementBtn = document.getElementById('decrement-btn');
    this.resetBtn = document.getElementById('reset-btn');
  }

  /**
   * 初始化计数器
   */
  init() {
    // 更新显示
    this.updateDisplay();
    
    // 绑定事件
    this.bindEvents();
    
    logger.log('计数器组件已初始化');
  }

  /**
   * 绑定事件处理函数
   */
  bindEvents() {
    // 增加按钮
    if (this.incrementBtn) {
      this.incrementBtn.addEventListener('click', () => {
        this.increment();
      });
    }
    
    // 减少按钮
    if (this.decrementBtn) {
      this.decrementBtn.addEventListener('click', () => {
        this.decrement();
      });
    }
    
    // 重置按钮
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.reset();
      });
    }
  }

  /**
   * 增加计数
   */
  increment() {
    this.count++;
    this.updateDisplay();
    logger.log(`计数增加: ${this.count}`);
  }

  /**
   * 减少计数
   */
  decrement() {
    this.count--;
    this.updateDisplay();
    logger.log(`计数减少: ${this.count}`);
  }

  /**
   * 重置计数
   */
  reset() {
    this.count = 0;
    this.updateDisplay();
    logger.log('计数已重置');
  }

  /**
   * 更新显示
   */
  updateDisplay() {
    if (this.counterElement) {
      this.counterElement.textContent = this.count;
    }
  }
}