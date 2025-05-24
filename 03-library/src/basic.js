/**
 * 基础数学运算函数
 */

/**
 * 两数相加
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
export function add(a, b) {
  return a + b;
}

/**
 * 两数相减
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 差值
 */
export function subtract(a, b) {
  return a - b;
}

/**
 * 两数相乘
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 乘积
 */
export function multiply(a, b) {
  return a * b;
}

/**
 * 两数相除
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 商
 * @throws {Error} 当除数为0时抛出错误
 */
export function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为0');
  }
  return a / b;
}

/**
 * 取余运算
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @returns {number} 余数
 * @throws {Error} 当除数为0时抛出错误
 */
export function mod(a, b) {
  if (b === 0) {
    throw new Error('除数不能为0');
  }
  return a % b;
}

/**
 * 绝对值
 * @param {number} x - 输入数字
 * @returns {number} 绝对值
 */
export function abs(x) {
  return Math.abs(x);
}