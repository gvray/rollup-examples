// 导入SVG资源
// 使用@svgr/rollup插件，可以同时获取React组件和原始SVG
import { ReactComponent as IconHeart, default as heartSvg } from '../assets/svg/heart.svg';
import { ReactComponent as IconStar, default as starSvg } from '../assets/svg/star.svg';
import { ReactComponent as IconUser, default as userSvg } from '../assets/svg/user.svg';
import { ReactComponent as IconSettings, default as settingsSvg } from '../assets/svg/settings.svg';
import { ReactComponent as IconHome, default as homeSvg } from '../assets/svg/home.svg';
import { ReactComponent as IconMenu, default as menuSvg } from '../assets/svg/menu.svg';

// 创建SVG图标展示区域
export function createSvgSection() {
  // 创建区域容器
  const section = document.createElement('div');
  section.className = 'section';
  
  // 创建标题
  const title = document.createElement('h2');
  title.textContent = 'SVG处理';
  
  // 创建描述
  const description = document.createElement('p');
  description.textContent = '展示SVG图标的处理方式。SVG可以作为URL导入，也可以通过@svgr/rollup插件转换为组件使用。';
  
  // 创建SVG网格
  const svgGrid = document.createElement('div');
  svgGrid.className = 'svg-grid';
  
  // 添加SVG项
  const svgIcons = [
    { svg: heartSvg, component: IconHeart, name: '心形图标' },
    { svg: starSvg, component: IconStar, name: '星形图标' },
    { svg: userSvg, component: IconUser, name: '用户图标' },
    { svg: settingsSvg, component: IconSettings, name: '设置图标' },
    { svg: homeSvg, component: IconHome, name: '首页图标' },
    { svg: menuSvg, component: IconMenu, name: '菜单图标' }
  ];
  
  // 创建SVG项
  svgIcons.forEach(icon => {
    const svgItem = document.createElement('div');
    svgItem.className = 'svg-item';
    
    // 使用SVG URL
    const img = document.createElement('img');
    img.src = icon.svg;
    img.alt = icon.name;
    img.width = 50;
    img.height = 50;
    
    const caption = document.createElement('div');
    caption.className = 'svg-caption';
    caption.textContent = icon.name;
    
    svgItem.appendChild(img);
    svgItem.appendChild(caption);
    
    svgGrid.appendChild(svgItem);
  });
  
  // 添加SVG使用说明
  const usageInfo = document.createElement('div');
  usageInfo.style.marginTop = '20px';
  usageInfo.style.padding = '15px';
  usageInfo.style.backgroundColor = '#f8f8f8';
  usageInfo.style.borderRadius = '4px';
  usageInfo.style.fontSize = '0.9rem';
  
  const usageTitle = document.createElement('h3');
  usageTitle.textContent = 'SVG使用方式';
  usageTitle.style.marginBottom = '10px';
  
  const usageList = document.createElement('ul');
  usageList.style.paddingLeft = '20px';
  
  const usageItems = [
    '作为URL导入: import heartSvg from \'../assets/svg/heart.svg\';',
    '作为React组件导入: import { ReactComponent as IconHeart } from \'../assets/svg/heart.svg\';',
    '内联SVG: 小型SVG会被转换为Data URI',
    '外部SVG: 大型SVG会被复制到assets目录'
  ];
  
  usageItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.style.marginBottom = '5px';
    usageList.appendChild(li);
  });
  
  usageInfo.appendChild(usageTitle);
  usageInfo.appendChild(usageList);
  
  // 组装DOM
  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(svgGrid);
  section.appendChild(usageInfo);
  
  return section;
}