/**
 * Math Utils Library
 * 一个简单的数学工具库
 */

import * as basic from './basic.js';
import * as advanced from './advanced.js';
import * as statistics from './statistics.js';

// 导出所有模块
export { basic, advanced, statistics };

// 导出常用函数
export const { add, subtract, multiply, divide } = basic;
export const { power, sqrt, factorial } = advanced;
export const { mean, median, mode, standardDeviation } = statistics;

// 版本信息
export const VERSION = '1.0.0';

// 默认导出
export default {
  VERSION,
  ...basic,
  ...advanced,
  ...statistics
};