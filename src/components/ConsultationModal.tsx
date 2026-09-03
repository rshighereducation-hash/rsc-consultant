import React, { useEffect, useRef } from 'react';
import { ContactForm } from './ContactForm';
import { X } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = '',
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (overlayRef.current) {
        overlayRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="consultation-modal-overlay"
      ref={overlayRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-4 sm:my-8 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <ContactForm
          defaultDestination={defaultDestination}
          onSuccess={() => {
            // keep form visible with success state
          }}
        />
      </div>
    </div>
  );
};
