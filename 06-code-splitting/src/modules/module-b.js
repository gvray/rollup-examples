/**
 * 模块B
 * 这个模块将通过动态导入按需加载
 */

// 导入共享工具函数
import { formatDate } from '../utils/common';
import { log } from '../utils/logger';

// 模块初始化
log('模块B初始化');

// 模块版本信息
const VERSION = '1.0.0';

// 模块加载时间
const LOAD_TIME = new Date();

/**
 * 获取额外信息
 * @returns {string} 额外信息
 */
export function getExtraInfo() {
  return '这个模块包含关于代码分割的额外信息，它是在关于页面加载后1秒动态导入的。' +
         '代码分割是一种优化技术，可以将代码拆分成多个小块，按需加载，从而提高应用性能。';
}

/**
 * 获取模块版本
 * @returns {string} 版本号
 */
export function getVersion() {
  return VERSION;
}

/**
 * 获取模块加载时间
 * @returns {string} 格式化的加载时间
 */
export function getLoadTime() {
  return formatDate(LOAD_TIME);
}

/**
 * 获取代码分割的优势列表
 * @returns {string[]} 优势列表
 */
export function getBenefits() {
  return [
    '减小初始加载体积，提高首屏加载速度',
    '按需加载功能，减少不必要的资源消耗',
    '更好的缓存利用，提高重复访问性能',
    '并行加载多个小文件，优化加载过程'
  ];
}

// 导出默认对象
export default {
  version: VERSION,
  loadTime: LOAD_TIME,
  getExtraInfo,
  getVersion,
  getLoadTime,
  getBenefits
};