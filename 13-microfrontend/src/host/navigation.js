// 创建导航组件
export function createNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'host-nav';
  
  // 导航链接数据
  const links = [
    { text: '首页', path: '/' },
    { text: '应用1', path: '/app1' },
    { text: '应用2', path: '/app2' }
  ];
  
  // 创建导航链接
  links.forEach(link => {
    const a = document.createElement('a');
    a.textContent = link.text;
    a.href = link.path;
    a.className = 'nav-link';
    
    // 高亮当前路径
    if (window.location.pathname === link.path) {
      a.classList.add('active');
    }
    
    // 添加点击事件，防止页面刷新
    a.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.pushState(null, null, link.path);
      
      // 移除所有active类
      document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('active');
      });
      
      // 添加active类到当前链接
      a.classList.add('active');
      
      // 触发popstate事件，让single-spa检测到路由变化
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    
    nav.appendChild(a);
  });
  
  return nav;
}