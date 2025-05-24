import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../theme';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体
   */
  variant?: 'contained' | 'outlined' | 'text';
  
  /**
   * 按钮颜色
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * 按钮尺寸
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 是否禁用
   */
  disabled?: boolean;
  
  /**
   * 是否显示加载状态
   */
  loading?: boolean;
  
  /**
   * 按钮内容
   */
  children: React.ReactNode;
}

/**
 * 按钮组件
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...rest
}) => {
  const theme = useTheme();
  
  // 构建类名
  const buttonClass = [
    'ui-button',
    `ui-button-${variant}`,
    `ui-button-${color}`,
    `ui-button-${size}`,
    disabled ? 'ui-button-disabled' : '',
    loading ? 'ui-button-loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="ui-button-spinner" />}
      <span className={loading ? 'ui-button-text-with-loader' : ''}>
        {children}
      </span>
    </button>
  );
};