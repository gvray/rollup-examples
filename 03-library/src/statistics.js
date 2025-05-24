/**
 * 统计学函数
 */

/**
 * 计算平均值
 * @param {number[]} numbers - 数字数组
 * @returns {number} 平均值
 * @throws {Error} 当数组为空时抛出错误
 */
export function mean(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('数组不能为空');
  }
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

/**
 * 计算中位数
 * @param {number[]} numbers - 数字数组
 * @returns {number} 中位数
 * @throws {Error} 当数组为空时抛出错误
 */
export function median(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('数组不能为空');
  }
  
  // 复制数组并排序
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    // 偶数个元素，取中间两个的平均值
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    // 奇数个元素，取中间的元素
    return sorted[middle];
  }
}

/**
 * 计算众数（出现次数最多的值）
 * @param {number[]} numbers - 数字数组
 * @returns {number[]} 众数（可能有多个）
 * @throws {Error} 当数组为空时抛出错误
 */
export function mode(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('数组不能为空');
  }
  
  // 计算每个数字出现的次数
  const counts = {};
  numbers.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
  });
  
  // 找出最大出现次数
  let maxCount = 0;
  for (const num in counts) {
    if (counts[num] > maxCount) {
      maxCount = counts[num];
    }
  }
  
  // 找出所有出现次数等于最大次数的值
  const modes = [];
  for (const num in counts) {
    if (counts[num] === maxCount) {
      modes.push(Number(num));
    }
  }
  
  return modes;
}

/**
 * 计算方差
 * @param {number[]} numbers - 数字数组
 * @returns {number} 方差
 * @throws {Error} 当数组为空或只有一个元素时抛出错误
 */
export function variance(numbers) {
  if (!numbers || numbers.length <= 1) {
    throw new Error('计算方差需要至少两个数');
  }
  
  const avg = mean(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  return mean(squareDiffs);
}

/**
 * 计算标准差
 * @param {number[]} numbers - 数字数组
 * @returns {number} 标准差
 * @throws {Error} 当数组为空或只有一个元素时抛出错误
 */
export function standardDeviation(numbers) {
  return Math.sqrt(variance(numbers));
}

/**
 * 计算范围（最大值减最小值）
 * @param {number[]} numbers - 数字数组
 * @returns {number} 范围
 * @throws {Error} 当数组为空时抛出错误
 */
export function range(numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('数组不能为空');
  }
  
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return max - min;
}