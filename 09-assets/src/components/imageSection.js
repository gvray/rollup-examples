// 导入图片资源
import landscapeImage from '../assets/images/landscape.jpg';
import portraitImage from '../assets/images/portrait.jpg';
import smallImage from '../assets/images/icon-small.png';
import largeImage from '../assets/images/banner-large.jpg';

// 创建图片展示区域
export function createImageSection() {
  // 创建区域容器
  const section = document.createElement('div');
  section.className = 'section';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '图片处理';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '展示不同类型和大小的图片处理。小于10KB的图片会被转换为base64内联到JS中，大于10KB的图片会被复制到assets目录并重命名。';
  
  // 创建图片网格
  const imageGrid = document.createElement('div');
  imageGrid.className = 'image-grid';
  
  // 添加图片项
  const images = [
    { src: smallImage, caption: '小图标 (内联base64)', description: '小于10KB的图片' },
    { src: landscapeImage, caption: '风景图片', description: '大于10KB的JPG图片' },
    { src: portraitImage, caption: '人像图片', description: '大于10KB的JPG图片' },
    { src: largeImage, caption: '大型横幅', description: '大尺寸图片' }
  ];
  
  // 创建图片项
  images.forEach(image => {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.caption;
    
    const caption = document.createElement('div');
    caption.className = 'image-caption';
    caption.textContent = image.caption;
    
    const desc = document.createElement('div');
    desc.className = 'image-description';
    desc.textContent = image.description;
    desc.style.fontSize = '0.8rem';
    desc.style.color = '#666';
    desc.style.padding = '0 10px 10px';
    desc.style.backgroundColor = '#f8f8f8';
    
    imageItem.appendChild(img);
    imageItem.appendChild(caption);
    imageItem.appendChild(desc);
    
    imageGrid.appendChild(imageItem);
  });
  
  // 组装DOM
  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(imageGrid);
  
  return section;
}