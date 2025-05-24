/**
 * 统计模块
 * 这个模块将通过动态导入按需加载
 */

// 导入共享工具函数
import { formatNumber } from '../utils/common';
import { log } from '../utils/logger';

// 模块初始化
log('统计模块初始化');

/**
 * 统计模块类
 * 提供数据统计功能
 */
class StatsModule {
  /**
   * 构造函数
   */
  constructor() {
    this.name = 'Statistics Module';
    this.version = '1.0.0';
    log(`${this.name} v${this.version} 已创建`);
  }
  
  /**
   * 计算平均值
   * @param {number[]} data - 数字数组
   * @returns {number} 平均值
   */
  mean(data) {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return parseFloat((sum / data.length).toFixed(2));
  }
  
  /**
   * 计算中位数
   * @param {number[]} data - 数字数组
   * @returns {number} 中位数
   */
  median(data) {
    if (!data || data.length === 0) return 0;
    
    // 复制数组并排序
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
  
  /**
   * 计算最大值
   * @param {number[]} data - 数字数组
   * @returns {number} 最大值
   */
  max(data) {
    if (!data || data.length === 0) return 0;
    return Math.max(...data);
  }
  
  /**
   * 计算最小值
   * @param {number[]} data - 数字数组
   * @returns {number} 最小值
   */
  min(data) {
    if (!data || data.length === 0) return 0;
    return Math.min(...data);
  }
  
  /**
   * 计算方差
   * @param {number[]} data - 数字数组
   * @returns {number} 方差
   */
  variance(data) {
    if (!data || data.length === 0) return 0;
    
    const avg = this.mean(data);
    const squareDiffs = data.map(value => {
      const diff = value - avg;
      return diff * diff;
    });
    
    return parseFloat((this.mean(squareDiffs)).toFixed(2));
  }
  
  /**
   * 计算标准差
   * @param {number[]} data - 数字数组
   * @returns {number} 标准差
   */
  standardDeviation(data) {
    return parseFloat(Math.sqrt(this.variance(data)).toFixed(2));
  }
  
  /**
   * 格式化统计结果
   * @param {Object} stats - 统计结果对象
   * @returns {string} 格式化的统计结果
   */
  formatStats(stats) {
    let result = '';
    
    for (const [key, value] of Object.entries(stats)) {
      result += `${key}: ${formatNumber(value)}\n`;
    }
    
    return result;
  }
  
  /**
   * 获取完整统计信息
   * @param {number[]} data - 数字数组
   * @returns {Object} 统计信息对象
   */
  getFullStats(data) {
    return {
      count: data.length,
      mean: this.mean(data),
      median: this.median(data),
      max: this.max(data),
      min: this.min(data),
      variance: this.variance(data),
      stdDev: this.standardDeviation(data)
    };
  }
}

// 导出默认类
export default StatsModule;