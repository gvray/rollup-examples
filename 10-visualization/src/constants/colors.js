/**
 * 图表颜色常量
 * 提供一组预定义的颜色，用于图表和可视化
 */

// 主要图表颜色（带透明度）
export const CHART_COLORS = [
  'rgba(54, 162, 235, 0.7)',   // 蓝色
  'rgba(255, 99, 132, 0.7)',    // 红色
  'rgba(75, 192, 192, 0.7)',    // 绿色
  'rgba(255, 159, 64, 0.7)',    // 橙色
  'rgba(153, 102, 255, 0.7)',   // 紫色
  'rgba(255, 205, 86, 0.7)',    // 黄色
  'rgba(201, 203, 207, 0.7)',   // 灰色
  'rgba(255, 99, 71, 0.7)',     // 番茄色
  'rgba(50, 205, 50, 0.7)',     // 酸橙绿
  'rgba(138, 43, 226, 0.7)'     // 紫罗兰
];

// 实心颜色（无透明度）
export const SOLID_COLORS = [
  '#36a2eb',   // 蓝色
  '#ff6384',   // 红色
  '#4bc0c0',   // 绿色
  '#ff9f40',   // 橙色
  '#9966ff',   // 紫色
  '#ffcd56',   // 黄色
  '#c9cbcf',   // 灰色
  '#ff6347',   // 番茄色
  '#32cd32',   // 酸橙绿
  '#8a2be2'    // 紫罗兰
];

// 获取颜色函数
/**
 * 根据索引获取图表颜色
 * @param {number} index - 颜色索引
 * @param {boolean} [solid=false] - 是否返回实心颜色
 * @returns {string} - 颜色值
 */
export function getChartColor(index, solid = false) {
  const colors = solid ? SOLID_COLORS : CHART_COLORS;
  return colors[index % colors.length];
}

// 模块类型颜色映射
export const MODULE_TYPE_COLORS = {
  'node_modules': '#ff6384',  // 红色 - 第三方依赖
  'src': '#36a2eb',          // 蓝色 - 源代码
  'components': '#4bc0c0',    // 绿色 - 组件
  'utils': '#ffcd56',         // 黄色 - 工具函数
  'assets': '#9966ff',        // 紫色 - 资源文件
  'styles': '#ff9f40',        // 橙色 - 样式文件
  'other': '#c9cbcf'          // 灰色 - 其他
};

/**
 * 根据模块ID获取对应的颜色
 * @param {string} moduleId - 模块ID
 * @returns {string} - 颜色值
 */
export function getModuleColor(moduleId) {
  if (moduleId.includes('node_modules')) {
    return MODULE_TYPE_COLORS['node_modules'];
  } else if (moduleId.includes('/src/components/')) {
    return MODULE_TYPE_COLORS['components'];
  } else if (moduleId.includes('/src/utils/')) {
    return MODULE_TYPE_COLORS['utils'];
  } else if (moduleId.includes('/src/assets/') || moduleId.includes('/src/images/')) {
    return MODULE_TYPE_COLORS['assets'];
  } else if (moduleId.includes('/src/styles/') || moduleId.includes('.css') || moduleId.includes('.scss')) {
    return MODULE_TYPE_COLORS['styles'];
  } else if (moduleId.includes('/src/')) {
    return MODULE_TYPE_COLORS['src'];
  } else {
    return MODULE_TYPE_COLORS['other'];
  }
}