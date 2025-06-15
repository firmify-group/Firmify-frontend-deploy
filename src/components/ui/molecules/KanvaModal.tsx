import { useEffect } from 'react';
import type { FC, MouseEvent } from 'react';

interface RequestModalProps {
	isOpen: boolean;
	onClose: () => void;
	cardId?: string;
}

const RequestModalSimple: FC<RequestModalProps> = ({ isOpen, onClose, cardId }) => {
	// Manejar ESC y scroll del body
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

	if (!isOpen) return null;

	const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className="fixed inset-0 z-50 right-0 bg-black/50" onClick={handleBackdropClick}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="absolute right-2 top-2 w-[30rem] max-w-[90.5vw] h-[45rem] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				<header className="flex justify-between items-center p-4 border-b border-gray-200">
					<h2 className="text-xl font-semibold">Detalles de la solicitud</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-gray-800 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
						aria-label="Cerrar modal"
					>
						×
					</button>
				</header>
				<main className="p-4 overflow-y-auto flex-1">
					<p className="text-gray-700">
						Contenido del modal para la solicitud: {cardId ?? 'No seleccionada'}
					</p>
				</main>
			</div>
		</div>
	);
};

export default RequestModalSimple;
