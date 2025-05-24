import React, { createContext, ReactNode } from 'react';
import { defaultTheme } from './defaultTheme';
import type { Theme } from './types';

// 创建主题上下文
export const ThemeContext = createContext<Theme>(defaultTheme);

// 主题提供者属性类型
interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

/**
 * 主题提供者组件
 * 用于在应用中提供主题配置
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme = defaultTheme, 
  children 
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};