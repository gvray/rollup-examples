/**
 * 高级数学运算函数
 */

/**
 * 计算幂
 * @param {number} base - 底数
 * @param {number} exponent - 指数
 * @returns {number} 幂运算结果
 */
export function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * 计算平方根
 * @param {number} x - 输入数字
 * @returns {number} 平方根
 * @throws {Error} 当输入为负数时抛出错误
 */
export function sqrt(x) {
  if (x < 0) {
    throw new Error('不能计算负数的平方根');
  }
  return Math.sqrt(x);
}

/**
 * 计算阶乘
 * @param {number} n - 非负整数
 * @returns {number} 阶乘结果
 * @throws {Error} 当输入为负数时抛出错误
 */
export function factorial(n) {
  if (n < 0) {
    throw new Error('不能计算负数的阶乘');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * 计算对数
 * @param {number} x - 输入数字
 * @param {number} [base=Math.E] - 对数的底数，默认为自然对数
 * @returns {number} 对数值
 * @throws {Error} 当输入不合法时抛出错误
 */
export function log(x, base = Math.E) {
  if (x <= 0 || base <= 0 || base === 1) {
    throw new Error('对数计算参数不合法');
  }
  return Math.log(x) / Math.log(base);
}

/**
 * 计算正弦值
 * @param {number} angle - 角度（弧度制）
 * @returns {number} 正弦值
 */
export function sin(angle) {
  return Math.sin(angle);
}

/**
 * 计算余弦值
 * @param {number} angle - 角度（弧度制）
 * @returns {number} 余弦值
 */
export function cos(angle) {
  return Math.cos(angle);
}

/**
 * 计算正切值
 * @param {number} angle - 角度（弧度制）
 * @returns {number} 正切值
 */
export function tan(angle) {
  return Math.tan(angle);
}