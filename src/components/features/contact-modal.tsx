'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from './contact-form';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface ContactModalProps {
  triggerClassName?: string;
  triggerText?: string;
}

export function ContactModal({ 
  triggerClassName = '',
  triggerText 
}: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('contact.modal');

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'inline-flex items-center px-6 py-3 border-2 border-accent-primary text-accent-primary font-semibold',
          'hover:bg-accent-primary hover:text-black transition-all duration-300 rounded-xl',
          'magazine-sans text-body-sm',
          triggerClassName
        )}
      >
        {triggerText || t('button')}
      </Button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('title')}
        className="md:max-w-3xl text-start mx-auto"
      >
        <div className="p-0 text-start">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-gray-600/30">
            <p className="text-gray-200 text-body-md leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="md:p-6 mx-auto">
            <ContactForm 
              className="text-start" 
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}