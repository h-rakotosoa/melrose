import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: 'left' | 'right';
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'left',
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40',
          {
            'opacity-100 pointer-events-auto': isOpen,
            'opacity-0 pointer-events-none': !isOpen,
          }
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          'fixed top-0 h-full bg-white shadow-xl transition-transform duration-300 z-50 w-64',
          position === 'left' ? 'left-0' : 'right-0',
          {
            'translate-x-0': (isOpen && position === 'left') || (isOpen && position === 'right'),
            '-translate-x-full': !isOpen && position === 'left',
            'translate-x-full': !isOpen && position === 'right',
          }
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            <button
              onClick={onClose}
              className="ml-auto p-2 hover:bg-gray-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
