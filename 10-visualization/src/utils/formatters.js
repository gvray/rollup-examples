/**
 * 格式化字节大小为人类可读的格式
 * @param {number} bytes - 字节数
 * @param {number} [decimals=2] - 小数位数
 * @returns {string} - 格式化后的字符串
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 格式化百分比
 * @param {number} value - 要格式化的值 (0-1)
 * @param {number} [decimals=1] - 小数位数
 * @returns {string} - 格式化后的百分比字符串
 */
export function formatPercent(value, decimals = 1) {
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * 格式化模块ID为更易读的形式
 * @param {string} id - 模块ID
 * @returns {string} - 格式化后的模块ID
 */
export function formatModuleId(id) {
  // 移除绝对路径前缀
  let formattedId = id;
  
  // 处理node_modules中的模块
  if (id.includes('node_modules')) {
    const parts = id.split('node_modules/');
    if (parts.length > 1) {
      // 提取包名
      const packagePath = parts[parts.length - 1];
      const packageParts = packagePath.split('/');
      
      // 处理@scope/package形式的包名
      if (packageParts[0].startsWith('@')) {
        return packageParts[0] + '/' + packageParts[1];
      }
      
      return packageParts[0];
    }
  }
  
  // 处理源代码模块
  if (id.includes('src/')) {
    return id.split('src/')[1];
  }
  
  // 如果是相对路径，保持原样
  if (id.startsWith('./') || id.startsWith('../')) {
    return id;
  }
  
  // 提取文件名
  const parts = id.split('/');
  return parts[parts.length - 1];
}