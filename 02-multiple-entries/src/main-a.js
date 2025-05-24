import { formatDate, generateId } from './utils.js';

// 模块A的特定功能
function moduleAFunction() {
  const today = new Date();
  const formattedDate = formatDate(today);
  const id = generateId();
  
  return {
    name: 'Module A',
    date: formattedDate,
    id: id
  };
}

// 导出模块A的API
export function initModuleA() {
  console.log('Module A initialized');
  return moduleAFunction();
}

// 在IIFE模式下自动初始化
const result = moduleAFunction();
console.log('Module A result:', result);