import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme';
import './Tooltip.css';

export type TooltipPlacement = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps {
  /**
   * 提示文本内容
   */
  title: React.ReactNode;
  
  /**
   * 子元素，必须是可以接受ref的React元素
   */
  children: React.ReactElement;
  
  /**
   * 提示框位置
   */
  placement?: TooltipPlacement;
  
  /**
   * 提示框显示延迟（毫秒）
   */
  enterDelay?: number;
  
  /**
   * 提示框隐藏延迟（毫秒）
   */
  leaveDelay?: number;
  
  /**
   * 是否禁用提示框
   */
  disabled?: boolean;
  
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
 * 提示框组件
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  enterDelay = 100,
  leaveDelay = 0,
  disabled = false,
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const childRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout>();
  const leaveTimeoutRef = useRef<NodeJS.Timeout>();
  
  // 计算提示框位置
  const calculatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return {};
    
    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    const positions: Record<TooltipPlacement, React.CSSProperties> = {
      'top': {
        left: childRect.left + (childRect.width / 2) - (tooltipRect.width / 2),
        top: childRect.top - tooltipRect.height - 8,
      },
      'top-start': {
        left: childRect.left,
        top: childRect.top - tooltipRect.height - 8,
      },
      'top-end': {
        left: childRect.right - tooltipRect.width,
        top: childRect.top - tooltipRect.height - 8,
      },
      'bottom': {
        left: childRect.left + (childRect.width / 2) - (tooltipRect.width / 2),
        top: childRect.bottom + 8,
      },
      'bottom-start': {
        left: childRect.left,
        top: childRect.bottom + 8,
      },
      'bottom-end': {
        left: childRect.right - tooltipRect.width,
        top: childRect.bottom + 8,
      },
      'left': {
        left: childRect.left - tooltipRect.width - 8,
        top: childRect.top + (childRect.height / 2) - (tooltipRect.height / 2),
      },
      'left-start': {
        left: childRect.left - tooltipRect.width - 8,
        top: childRect.top,
      },
      'left-end': {
        left: childRect.left - tooltipRect.width - 8,
        top: childRect.bottom - tooltipRect.height,
      },
      'right': {
        left: childRect.right + 8,
        top: childRect.top + (childRect.height / 2) - (tooltipRect.height / 2),
      },
      'right-start': {
        left: childRect.right + 8,
        top: childRect.top,
      },
      'right-end': {
        left: childRect.right + 8,
        top: childRect.bottom - tooltipRect.height,
      },
    };
    
    return positions[placement];
  };
  
  // 处理鼠标进入
  const handleMouseEnter = () => {
    if (disabled) return;
    
    clearTimeout(leaveTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, enterDelay);
  };
  
  // 处理鼠标离开
  const handleMouseLeave = () => {
    clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, leaveDelay);
  };
  
  // 清除定时器
  useEffect(() => {
    return () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(leaveTimeoutRef.current);
    };
  }, []);
  
  // 克隆子元素并添加事件处理
  const child = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      handleMouseEnter();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      handleMouseLeave();
      children.props.onBlur?.(e);
    },
  });
  
  // 构建提示框类名
  const tooltipClass = [
    'ui-tooltip',
    `ui-tooltip-${placement}`,
    open ? 'ui-tooltip-open' : '',
    className
  ].filter(Boolean).join(' ');
  
  // 合并提示框样式
  const tooltipStyle: React.CSSProperties = {
    ...style,
    ...calculatePosition(),
  };
  
  return (
    <>
      {child}
      {open && title && createPortal(
        <div 
          className={tooltipClass} 
          style={tooltipStyle} 
          ref={tooltipRef}
          role="tooltip"
        >
          {title}
        </div>,
        document.body
      )}
    </>
  );
};