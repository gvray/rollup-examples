/**
 * 日志工具类
 */
class Logger {
  constructor() {
    this.logContainer = null;
    this.maxEntries = 50;
  }

  /**
   * 初始化日志容器
   */
  init() {
    this.logContainer = document.getElementById('log-container');
  }

  /**
   * 记录日志
   * @param {string} message - 日志消息
   * @param {string} [level='info'] - 日志级别
   */
  log(message, level = 'info') {
    // 确保日志容器已初始化
    if (!this.logContainer) {
      this.init();
    }
    
    if (!this.logContainer) {
      console.log(`[${level}] ${message}`);
      return;
    }
    
    // 创建日志条目
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${level}`;
    
    // 添加时间戳
    const timestamp = new Date().toLocaleTimeString();
    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = `[${timestamp}] `;
    
    // 添加消息
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    // 组装日志条目
    logEntry.appendChild(timestampSpan);
    logEntry.appendChild(messageSpan);
    
    // 添加到日志容器
    this.logContainer.appendChild(logEntry);
    
    // 滚动到最新日志
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
    
    // 限制日志条目数量
    this.limitLogEntries();
  }

  /**
   * 记录信息日志
   * @param {string} message - 日志消息
   */
  info(message) {
    this.log(message, 'info');
  }

  /**
   * 记录警告日志
   * @param {string} message - 日志消息
   */
  warn(message) {
    this.log(message, 'warn');
    console.warn(message);
  }

  /**
   * 记录错误日志
   * @param {string} message - 日志消息
   */
  error(message) {
    this.log(message, 'error');
    console.error(message);
  }

  /**
   * 限制日志条目数量
   */
  limitLogEntries() {
    if (!this.logContainer) return;
    
    // 获取所有日志条目
    const entries = this.logContainer.querySelectorAll('.log-entry');
    
    // 如果超过最大数量，删除最旧的条目
    if (entries.length > this.maxEntries) {
      const entriesToRemove = entries.length - this.maxEntries;
      for (let i = 0; i < entriesToRemove; i++) {
        if (entries[i] && entries[i].parentNode) {
          entries[i].parentNode.removeChild(entries[i]);
        }
      }
    }
  }

  /**
   * 清空日志
   */
  clear() {
    if (this.logContainer) {
      this.logContainer.innerHTML = '';
    }
  }
}

// 创建单例实例
export const logger = new Logger();

// 当DOM加载完成后初始化日志器
document.addEventListener('DOMContentLoaded', () => {
  logger.init();
});