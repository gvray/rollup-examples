/**
 * 日志工具模块
 * 这个模块将被提取到shared chunk中
 */

// 日志级别
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// 当前日志级别
let currentLogLevel = LOG_LEVELS.INFO;

/**
 * 设置日志级别
 * @param {string} level - 日志级别 ('debug', 'info', 'warn', 'error')
 */
export function setLogLevel(level) {
  const normalizedLevel = level.toUpperCase();
  if (LOG_LEVELS[normalizedLevel] !== undefined) {
    currentLogLevel = LOG_LEVELS[normalizedLevel];
  } else {
    console.error(`无效的日志级别: ${level}`);
  }
}

/**
 * 获取带时间戳的日志前缀
 * @param {string} level - 日志级别
 * @returns {string} 格式化的日志前缀
 */
function getLogPrefix(level) {
  const now = new Date();
  const timeString = now.toISOString().split('T')[1].split('.')[0];
  return `[${timeString}] [${level}]`;
}

/**
 * 调试日志
 * @param {...any} args - 日志参数
 */
export function debug(...args) {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.debug(getLogPrefix('DEBUG'), ...args);
  }
}

/**
 * 信息日志
 * @param {...any} args - 日志参数
 */
export function log(...args) {
  if (currentLogLevel <= LOG_LEVELS.INFO) {
    console.log(getLogPrefix('INFO'), ...args);
  }
}

/**
 * 警告日志
 * @param {...any} args - 日志参数
 */
export function warn(...args) {
  if (currentLogLevel <= LOG_LEVELS.WARN) {
    console.warn(getLogPrefix('WARN'), ...args);
  }
}

/**
 * 错误日志
 * @param {...any} args - 日志参数
 */
export function error(...args) {
  if (currentLogLevel <= LOG_LEVELS.ERROR) {
    console.error(getLogPrefix('ERROR'), ...args);
  }
}

/**
 * 分组日志
 * @param {string} label - 分组标签
 * @param {Function} callback - 回调函数
 */
export function group(label, callback) {
  if (currentLogLevel <= LOG_LEVELS.INFO) {
    console.group(getLogPrefix('GROUP') + ' ' + label);
    callback();
    console.groupEnd();
  }
}

/**
 * 计时日志
 * @param {string} label - 计时标签
 * @param {Function} callback - 要计时的函数
 * @returns {any} 回调函数的返回值
 */
export function time(label, callback) {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.time(label);
    const result = callback();
    console.timeEnd(label);
    return result;
  } else {
    return callback();
  }
}