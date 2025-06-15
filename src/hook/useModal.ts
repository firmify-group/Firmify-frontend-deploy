import { useEffect, useCallback } from 'react';
import type { MouseEvent } from 'react';

interface UseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const useModal = ({ isOpen, onClose }: UseModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleContentClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    return {
        handleBackdropClick,
        handleContentClick,
    };
};