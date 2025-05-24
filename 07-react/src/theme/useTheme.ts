import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { Theme } from './types';

/**
 * 使用主题的钩子函数
 * 在组件中获取当前主题配置
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return theme;
};