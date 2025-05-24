import React from 'react';
import { useTheme } from '../../theme';
import './Card.css';

export interface CardProps {
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  
  /**
   * 卡片副标题
   */
  subtitle?: React.ReactNode;
  
  /**
   * 卡片内容
   */
  children: React.ReactNode;
  
  /**
   * 卡片底部操作区
   */
  actions?: React.ReactNode;
  
  /**
   * 卡片宽度
   */
  width?: string | number;
  
  /**
   * 卡片高度
   */
  height?: string | number;
  
  /**
   * 是否有阴影
   */
  elevation?: 0 | 1 | 2 | 3;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 卡片组件
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  width,
  height,
  elevation = 1,
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  
  // 构建类名
  const cardClass = [
    'ui-card',
    `ui-card-elevation-${elevation}`,
    className
  ].filter(Boolean).join(' ');
  
  // 合并样式
  const cardStyle: React.CSSProperties = {
    ...style,
    width: width || 'auto',
    height: height || 'auto',
  };
  
  return (
    <div className={cardClass} style={cardStyle}>
      {(title || subtitle) && (
        <div className="ui-card-header">
          {title && <div className="ui-card-title">{title}</div>}
          {subtitle && <div className="ui-card-subtitle">{subtitle}</div>}
        </div>
      )}
      
      <div className="ui-card-content">
        {children}
      </div>
      
      {actions && (
        <div className="ui-card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};