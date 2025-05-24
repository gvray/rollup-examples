// 卡片组件
export function createCard(title, content, className) {
  // 创建卡片容器
  const card = document.createElement('div');
  card.className = className || '';
  
  // 创建卡片标题
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  
  // 创建卡片内容
  const cardContent = document.createElement('p');
  cardContent.textContent = content;
  
  // 组装卡片
  card.appendChild(cardTitle);
  card.appendChild(cardContent);
  
  return card;
}