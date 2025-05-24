import { formatBytes, formatModuleId } from '../utils/formatters';
import { getModuleColor } from '../constants/colors';

/**
 * 创建模块项DOM元素
 * @param {Object} module - 模块数据
 * @param {string} module.id - 模块ID
 * @param {number} module.size - 模块大小（字节）
 * @param {Array<string>} module.imports - 导入的模块ID列表
 * @param {boolean} module.isExternal - 是否为外部模块
 * @param {number} maxSize - 最大模块大小（用于计算比例）
 * @returns {HTMLElement} - 模块项DOM元素
 */
export function createModuleItem(module, maxSize) {
  // 创建模块项容器
  const moduleItem = document.createElement('div');
  moduleItem.className = 'module-item';
  
  // 创建模块ID和大小信息
  const moduleInfo = document.createElement('div');
  moduleInfo.style.display = 'flex';
  moduleInfo.style.justifyContent = 'space-between';
  moduleInfo.style.alignItems = 'center';
  moduleInfo.style.marginBottom = '5px';
  
  // 模块ID
  const moduleId = document.createElement('div');
  moduleId.style.fontWeight = 'bold';
  moduleId.style.overflow = 'hidden';
  moduleId.style.textOverflow = 'ellipsis';
  moduleId.style.whiteSpace = 'nowrap';
  moduleId.style.marginRight = '10px';
  moduleId.textContent = formatModuleId(module.id);
  
  // 如果是外部模块，添加标记
  if (module.isExternal) {
    moduleId.textContent += ' (外部)';
    moduleId.style.color = '#999';
  }
  
  // 模块大小
  const moduleSize = document.createElement('div');
  moduleSize.style.whiteSpace = 'nowrap';
  moduleSize.textContent = formatBytes(module.size);
  
  moduleInfo.appendChild(moduleId);
  moduleInfo.appendChild(moduleSize);
  
  // 创建大小条
  const sizeBar = document.createElement('div');
  sizeBar.className = 'size-bar';
  sizeBar.style.width = `${(module.size / maxSize) * 100}%`;
  sizeBar.style.backgroundColor = getModuleColor(module.id);
  
  // 添加完整路径提示
  moduleItem.title = `完整路径: ${module.id}\n大小: ${formatBytes(module.size)}`;
  
  // 组装DOM
  moduleItem.appendChild(moduleInfo);
  moduleItem.appendChild(sizeBar);
  
  return moduleItem;
}

/**
 * 创建模块类型图例
 * @returns {HTMLElement} - 图例DOM元素
 */
export function createModuleLegend() {
  const legend = document.createElement('div');
  legend.style.display = 'flex';
  legend.style.flexWrap = 'wrap';
  legend.style.gap = '10px';
  legend.style.marginTop = '15px';
  
  const types = {
    'node_modules': '第三方依赖',
    'src': '源代码',
    'components': '组件',
    'utils': '工具函数',
    'assets': '资源文件',
    'styles': '样式文件',
    'other': '其他'
  };
  
  Object.entries(types).forEach(([key, label]) => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    
    const colorBox = document.createElement('div');
    colorBox.style.width = '12px';
    colorBox.style.height = '12px';
    colorBox.style.backgroundColor = getModuleColor(`/${key}/dummy`);
    colorBox.style.marginRight = '5px';
    
    const text = document.createElement('span');
    text.textContent = label;
    text.style.fontSize = '0.8rem';
    
    item.appendChild(colorBox);
    item.appendChild(text);
    
    legend.appendChild(item);
  });
  
  return legend;
}