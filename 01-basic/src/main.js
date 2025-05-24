import { sayHello } from './utils.js';

const message = sayHello('Rollup');
console.log(message);

// 导出一个简单的API
export function init() {
  console.log('Basic example initialized');
  return { message };
}