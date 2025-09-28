'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  showCloseButton?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  className = '',
  showCloseButton = true 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    
    // Lock body scroll
    body.style.overflow = 'hidden';
    
    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus trap - focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Apply inert to background content only
  useEffect(() => {
    if (!isOpen) return;

    // Find the main content element (typically the layout content)
    const mainContent = document.querySelector('main') || 
                       document.querySelector('[role="main"]') ||
                       document.querySelector('#__next > div:first-child') ||
                       document.querySelector('body > div:first-child');
    
    if (mainContent && mainContent !== modalRef.current?.closest('[data-modal-root]')) {
      (mainContent as HTMLElement).inert = true;
      
      return () => {
        (mainContent as HTMLElement).inert = false;
      };
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      data-modal-root
      className="fixed inset-0 z-50 flex items-center justify-center"
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-surface-primary rounded-xl shadow-2xl max-h-[90vh] overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-stroke-secondary">
            {title && (
              <h2 className="text-header-sm font-bold text-content-primary">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-secondary rounded-lg transition-colors text-content-secondary hover:text-content-primary"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        
        {/* Modal body */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}