import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { useTheme } from '../../theme';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /**
   * 输入框标签
   */
  label?: string;
  
  /**
   * 输入框变体
   */
  variant?: 'outlined' | 'filled' | 'standard';
  
  /**
   * 输入框尺寸
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 是否全宽
   */
  fullWidth?: boolean;
  
  /**
   * 错误状态
   */
  error?: boolean;
  
  /**
   * 帮助文本
   */
  helperText?: React.ReactNode;
  
  /**
   * 前缀内容
   */
  prefix?: React.ReactNode;
  
  /**
   * 后缀内容
   */
  suffix?: React.ReactNode;
  
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 输入框组件
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    variant = 'outlined',
    size = 'medium',
    fullWidth = false,
    error = false,
    helperText,
    prefix,
    suffix,
    className = '',
    disabled = false,
    required = false,
    id,
    ...rest
  },
  ref
) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // 构建类名
  const containerClass = [
    'ui-input-container',
    `ui-input-${variant}`,
    `ui-input-${size}`,
    fullWidth ? 'ui-input-fullwidth' : '',
    error ? 'ui-input-error' : '',
    disabled ? 'ui-input-disabled' : '',
    focused ? 'ui-input-focused' : '',
    className
  ].filter(Boolean).join(' ');
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    rest.onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    rest.onBlur?.(e);
  };
  
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className="ui-input-label">
          {label}
          {required && <span className="ui-input-required">*</span>}
        </label>
      )}
      
      <div className="ui-input-wrapper">
        {prefix && <div className="ui-input-prefix">{prefix}</div>}
        
        <input
          id={inputId}
          ref={ref}
          className="ui-input"
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        
        {suffix && <div className="ui-input-suffix">{suffix}</div>}
      </div>
      
      {helperText && (
        <div className="ui-input-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';