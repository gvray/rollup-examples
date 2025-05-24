// 导入SCSS样式
import styles from '../styles/theme.scss';

// 按钮组件
export function createButton(text, variant = 'primary') {
  // 创建按钮元素
  const button = document.createElement('button');
  
  // 设置按钮文本
  button.textContent = text;
  
  // 设置按钮类名
  button.className = `${styles.button} ${styles[variant]}`;
  
  // 添加点击事件
  button.addEventListener('click', () => {
    alert(`你点击了 "${text}" 按钮`);
  });
  
  return button;
}