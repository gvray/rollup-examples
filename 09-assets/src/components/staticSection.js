// 创建静态资源展示区域
export function createStaticSection() {
  // 创建区域容器
  const section = document.createElement('div');
  section.className = 'section';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '静态资源处理';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '展示静态资源的处理方式。使用rollup-plugin-copy插件将静态资源复制到dist目录。';
  
  // 创建静态资源列表
  const resourcesList = document.createElement('div');
  resourcesList.className = 'static-resources';
  
  // 添加静态资源项
  const resources = [
    { name: 'favicon.ico', path: './favicon.ico', type: '图标' },
    { name: 'data.json', path: './assets/data/data.json', type: 'JSON数据' },
    { name: 'sample.pdf', path: './assets/docs/sample.pdf', type: 'PDF文档' },
    { name: 'robots.txt', path: './robots.txt', type: '爬虫配置' }
  ];
  
  // 创建资源项
  resources.forEach(resource => {
    const resourceItem = document.createElement('div');
    resourceItem.className = 'resource-item';
    
    // 创建资源图标
    const icon = document.createElement('span');
    icon.className = 'resource-icon';
    icon.innerHTML = getResourceIcon(resource.type);
    
    // 创建资源链接
    const link = document.createElement('a');
    link.className = 'resource-link';
    link.href = resource.path;
    link.textContent = resource.name;
    link.target = '_blank';
    
    // 创建资源类型
    const type = document.createElement('span');
    type.style.marginLeft = '10px';
    type.style.color = '#666';
    type.style.fontSize = '0.9rem';
    type.textContent = `(${resource.type})`;
    
    resourceItem.appendChild(icon);
    resourceItem.appendChild(link);
    resourceItem.appendChild(type);
    
    resourcesList.appendChild(resourceItem);
  });
  
  // 添加静态资源使用说明
  const usageInfo = document.createElement('div');
  usageInfo.style.marginTop = '20px';
  usageInfo.style.padding = '15px';
  usageInfo.style.backgroundColor = '#f8f8f8';
  usageInfo.style.borderRadius = '4px';
  usageInfo.style.fontSize = '0.9rem';
  
  const usageTitle = document.createElement('h3');
  usageTitle.textContent = '静态资源处理方式';
  usageTitle.style.marginBottom = '10px';
  
  const usageCode = document.createElement('pre');
  usageCode.style.backgroundColor = '#f1f1f1';
  usageCode.style.padding = '10px';
  usageCode.style.borderRadius = '4px';
  usageCode.style.overflow = 'auto';
  usageCode.style.fontSize = '0.8rem';
  usageCode.textContent = `// rollup.config.js
import copy from 'rollup-plugin-copy';

export default {
  // ...
  plugins: [
    // ...
    copy({
      targets: [
        { src: 'src/assets/static/**/*', dest: 'dist/assets' },
        { src: 'src/favicon.ico', dest: 'dist' },
        { src: 'src/robots.txt', dest: 'dist' }
      ]
    })
  ]
}`;
  
  usageInfo.appendChild(usageTitle);
  usageInfo.appendChild(usageCode);
  
  // 组装DOM
  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(resourcesList);
  section.appendChild(usageInfo);
  
  return section;
}

// 根据资源类型获取图标
function getResourceIcon(type) {
  switch (type) {
    case '图标':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>';
    case 'JSON数据':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
    case 'PDF文档':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
    case '爬虫配置':
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><path d="M12 2a8 8 0 0 0-8 8 12.89 12.89 0 0 0 1.53 6L4 22l6-3a8 8 0 1 0 2-17z"></path></svg>';
    default:
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';
  }
}