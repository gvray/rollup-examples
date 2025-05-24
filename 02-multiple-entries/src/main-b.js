import { add, generateId } from './utils.js';

// 模块B的特定功能
function moduleBFunction() {
  const result = add(10, 20);
  const id = generateId(4);
  
  return {
    name: 'Module B',
    calculation: result,
    id: id
  };
}

// 导出模块B的API
export function initModuleB() {
  console.log('Module B initialized');
  return moduleBFunction();
}

// 在IIFE模式下自动初始化
const result = moduleBFunction();
console.log('Module B result:', result);