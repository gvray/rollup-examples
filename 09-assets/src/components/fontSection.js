// 创建字体展示区域
export function createFontSection() {
  // 创建区域容器
  const section = document.createElement('div');
  section.className = 'section';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '字体处理';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '展示自定义字体的加载和使用。字体文件会被复制到assets目录并重命名，CSS中通过@font-face引用。';
  
  // 创建字体展示区
  const fontShowcase = document.createElement('div');
  fontShowcase.className = 'font-showcase';
  
  // 添加字体样例
  const fontVariants = [
    { name: 'OpenSans Regular', style: 'normal', weight: 'normal', sample: '这是OpenSans Regular字体的示例文本。The quick brown fox jumps over the lazy dog.' },
    { name: 'OpenSans Bold', style: 'normal', weight: 'bold', sample: '这是OpenSans Bold字体的示例文本。The quick brown fox jumps over the lazy dog.' }
  ];
  
  // 创建字体样例项
  fontVariants.forEach(font => {
    const fontItem = document.createElement('div');
    fontItem.className = 'font-item';
    
    const fontName = document.createElement('div');
    fontName.className = 'font-name';
    fontName.textContent = font.name;
    
    const fontSample = document.createElement('div');
    fontSample.className = 'font-sample';
    fontSample.textContent = font.sample;
    fontSample.style.fontWeight = font.weight;
    fontSample.style.fontStyle = font.style;
    
    fontItem.appendChild(fontName);
    fontItem.appendChild(fontSample);
    
    fontShowcase.appendChild(fontItem);
  });
  
  // 添加字体使用说明
  const usageInfo = document.createElement('div');
  usageInfo.style.marginTop = '20px';
  usageInfo.style.padding = '15px';
  usageInfo.style.backgroundColor = '#f8f8f8';
  usageInfo.style.borderRadius = '4px';
  usageInfo.style.fontSize = '0.9rem';
  
  const usageTitle = document.createElement('h3');
  usageTitle.textContent = '字体使用方式';
  usageTitle.style.marginBottom = '10px';
  
  const usageCode = document.createElement('pre');
  usageCode.style.backgroundColor = '#f1f1f1';
  usageCode.style.padding = '10px';
  usageCode.style.borderRadius = '4px';
  usageCode.style.overflow = 'auto';
  usageCode.style.fontSize = '0.8rem';
  usageCode.textContent = `/* CSS中的字体声明 */
@font-face {
  font-family: 'OpenSans';
  src: url('../assets/fonts/OpenSans-Regular.woff2') format('woff2'),
       url('../assets/fonts/OpenSans-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 使用字体 */
body {
  font-family: 'OpenSans', sans-serif;
}`;
  
  usageInfo.appendChild(usageTitle);
  usageInfo.appendChild(usageCode);
  
  // 组装DOM
  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(fontShowcase);
  section.appendChild(usageInfo);
  
  return section;
}