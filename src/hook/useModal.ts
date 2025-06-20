import { useState, useEffect, useCallback } from 'react';
import type { MouseEvent } from 'react';


export const useModal = <T = unknown>() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<T | null>(null);

    const handleCardClick = (information?: T) => {
        setSelectedCardId(information ?? null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCardId(null);
    };

    return {
        isModalOpen,
        selectedCardId,
        handleCardClick,
        handleCloseModal,
    };
};

export const useModalAlter = () => {
    const [isOpenAlter, setIsOpenAlter] = useState(false);
    const [selectedProcessId, setSelectedProcessId] = useState<number | undefined>();

    const handlerCardClickAlter = (processId?: number) => {
        setSelectedProcessId(processId);
        setIsOpenAlter(true);
    };

    const handleCloseModalAlter = () => {
        setIsOpenAlter(false);
        setSelectedProcessId(undefined);
    };

    return {
        isOpenAlter,
        selectedProcessId,
        handlerCardClickAlter,
        handleCloseModalAlter,
    };
};


interface UseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const useModalBase = ({ isOpen, onClose }: UseModalProps) => {
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

    }
}
