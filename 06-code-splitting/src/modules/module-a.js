/**
 * 模块A
 * 这个模块将通过动态导入按需加载
 */

// 导入共享工具函数
import { generateId } from '../utils/common';
import { log } from '../utils/logger';

// 模块初始化
log('模块A初始化');

// 模块唯一ID
const moduleId = generateId();

/**
 * 获取模块描述
 * @returns {string} 模块描述
 */
export function getDescription() {
  return `这是动态导入的模块A (ID: ${moduleId})，它在用户点击按钮时才会加载。`;
}

/**
 * 执行简单计算
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {Object} 计算结果
 */
export function calculate(a, b) {
  return {
    sum: a + b,
    difference: a - b,
    product: a * b,
    quotient: a / b
  };
}

/**
 * 获取模块信息
 * @returns {Object} 模块信息
 */
export function getInfo() {
  return {
    id: moduleId,
    name: 'Module A',
    loadTime: new Date().toISOString()
  };
}

// 导出默认对象
export default {
  name: 'Module A',
  id: moduleId,
  getDescription,
  calculate,
  getInfo
};