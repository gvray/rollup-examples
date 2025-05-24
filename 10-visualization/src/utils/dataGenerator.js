/**
 * 生成随机数据
 * @param {number} count - 要生成的数据点数量
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {Array<number>} - 随机数据数组
 */
export function generateRandomData(count, min, max) {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * 生成随机日期数据
 * @param {number} count - 要生成的数据点数量
 * @param {Date} startDate - 开始日期
 * @param {Date} endDate - 结束日期
 * @returns {Array<Date>} - 随机日期数组
 */
export function generateRandomDates(count, startDate, endDate) {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const timeRange = endTime - startTime;
  
  return Array.from({ length: count }, () => {
    const randomTime = Math.floor(Math.random() * timeRange) + startTime;
    return new Date(randomTime);
  }).sort((a, b) => a - b); // 按日期排序
}

/**
 * 生成模拟的模块大小数据
 * @param {number} count - 要生成的模块数量
 * @returns {Array<Object>} - 模块数据数组
 */
export function generateModuleSizeData(count) {
  const prefixes = ['lodash/', 'chart.js/', 'date-fns/', 'react/', 'utils/', 'components/'];
  const suffixes = ['index.js', 'main.js', 'utils.js', 'helpers.js', 'core.js', 'bundle.js'];
  
  return Array.from({ length: count }, (_, i) => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const size = Math.floor(Math.random() * 500000) + 1000; // 1KB 到 500KB
    
    return {
      id: `node_modules/${prefix}${suffix}`,
      size,
      imports: []
    };
  }).sort((a, b) => b.size - a.size); // 按大小降序排序
}