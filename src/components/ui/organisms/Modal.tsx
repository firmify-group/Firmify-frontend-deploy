import type { FC } from 'react';
import { useModal } from 'src/hook/useModal';
import type { Slot } from 'src/utils/types/components.public';

interface RequestModalSimpleProps extends Slot {
	isOpen: boolean;
	onClose: () => void;
}

const RequestModalSimple: FC<RequestModalSimpleProps> = ({ children, isOpen, onClose }) => {
	const { handleBackdropClick, handleContentClick } = useModal({ isOpen, onClose });

	if (!isOpen) return null;

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className="fixed inset-0 z-50 right-0 bg-black/50" onClick={handleBackdropClick}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="absolute right-2 top-2 w-[30rem] max-w-[90.5vw] h-[45rem] gap-6 bg-font-100 rounded-lg shadow-xl overflow-hidden flex flex-col justify-between box-border p-5"
				onClick={handleContentClick}
			>
				{children}
			</div>
		</div>
	);
};

export default RequestModalSimple;
