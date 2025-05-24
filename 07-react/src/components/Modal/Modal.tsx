import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme';
import './Modal.css';

export interface ModalProps {
  /**
   * 是否打开模态框
   */
  open: boolean;
  
  /**
   * 关闭模态框的回调函数
   */
  onClose?: () => void;
  
  /**
   * 模态框标题
   */
  title?: React.ReactNode;
  
  /**
   * 模态框内容
   */
  children: React.ReactNode;
  
  /**
   * 模态框底部操作区
   */
  footer?: React.ReactNode;
  
  /**
   * 是否显示关闭按钮
   */
  showCloseButton?: boolean;
  
  /**
   * 点击遮罩层是否关闭模态框
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * 模态框宽度
   */
  width?: string | number;
  
  /**
   * 模态框最大宽度
   */
  maxWidth?: string | number;
  
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
 * 模态框组件
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  width = '500px',
  maxWidth = '90%',
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open && onClose) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);
  
  // 处理点击外部关闭
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };
  
  // 处理关闭按钮点击
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };
  
  // 阻止冒泡
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  
  // 构建类名
  const modalClass = [
    'ui-modal',
    open ? 'ui-modal-open' : '',
    className
  ].filter(Boolean).join(' ');
  
  // 合并样式
  const modalStyle: React.CSSProperties = {
    ...style,
    width,
    maxWidth,
  };
  
  // 创建模态框内容
  const modalContent = (
    <div className="ui-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className={modalClass} 
        style={modalStyle} 
        ref={modalRef}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
      >
        {(title || showCloseButton) && (
          <div className="ui-modal-header">
            {title && <div className="ui-modal-title">{title}</div>}
            {showCloseButton && (
              <button 
                className="ui-modal-close-button" 
                onClick={handleCloseClick}
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        <div className="ui-modal-content">
          {children}
        </div>
        
        {footer && (
          <div className="ui-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
  
  // 如果模态框未打开，返回null
  if (!open) {
    return null;
  }
  
  // 使用Portal将模态框渲染到body
  return createPortal(modalContent, document.body);
};