'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

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
    const documentElement = document.documentElement;
    
    // Lock body scroll with additional mobile fixes
    const scrollY = window.scrollY;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    
    // Also lock document scroll for mobile
    documentElement.style.overflow = 'hidden';
    
    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Prevent touch scroll on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Focus trap - focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      // Restore scroll position and unlock
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
      
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', handleTouchMove);
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
      className="fixed inset-0 z-50 flex items-center justify-center md:p-4"
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content - full screen on mobile, centered on desktop */}
      <div 
        className={clsx(
          'relative bg-gradient-to-br from-gray-900/98 to-black/95 shadow-2xl w-full h-full md:w-auto md:h-auto md:max-h-[90vh] md:max-w-[90vw] md:rounded-2xl overflow-auto',
          'border-2 border-gray-600/30 backdrop-blur-xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-b border-gray-600/40">
            {title && (
              <h2 className="text-header-sm font-bold text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 text-gray-300 hover:text-white hover:scale-105"
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