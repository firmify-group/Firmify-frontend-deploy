import { useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import type { RequestModalProps } from 'src/utils/types/components.admin';
import Input from 'src/components/ui/atoms/Input';

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
				className="absolute right-2 top-2 w-[30rem] max-w-[90.5vw] h-[45rem] gap-6 bg-font-100 rounded-lg shadow-xl overflow-hidden flex flex-col justify-between box-border p-5"
				onClick={(e) => e.stopPropagation()}
			>
				<header className="flex justify-center items-center header-4">
					<h2 className="text-[1.3rem] font-manrope font-bold text-font-1000">
						Detalles de la solicitud
					</h2>
				</header>
				<main className="size-full flex flex-col justify-start items-start gap-6 *:w-full *:fit *:gap-2">
					<section className="flex flex-col">
						<h3 className="text-[1.1rem] font-semibold font-manrope text-font-1000">
							Información del solicitante
						</h3>

						<div className="w-full h-fit flex flex-row gap-3 justify-between items-start">
							<Input
								id="requesterName"
								name="requesterName"
								label="Nombre del solicitante"
								type="text"
								placeholder="No se cuenta con el nombre"
								value={cardId?.name || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>

							<Input
								id="requesterRut"
								name="requesterRut"
								label="RUT del solicitante"
								type="text"
								placeholder="No se cuenta con el RUT"
								value={cardId?.rut || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>
						</div>

						<Input
							id="requesterEmail"
							name="requesterEmail"
							label="Correo del solicitante"
							type="text"
							placeholder="No se cuenta con el correo"
							value={cardId?.email || ''}
							decoration="w-full flex flex-col"
							disabled={true}
						/>
					</section>
					<section className="flex flex-col">
						<h3 className="header-6">Información de la solicitud</h3>
						<div className="w-full h-fit flex flex-row gap-3 justify-between items-start">
							<Input
								id="requesterName"
								name="requesterName"
								label="Tipo de solicitud"
								type="text"
								placeholder="No se cuenta con el tipo de solicitud"
								value={cardId?.category || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>

							<Input
								id="requesterRut"
								name="requesterRut"
								label="Estado de la solicitud"
								type="text"
								placeholder="No se cuenta con el estado"
								value={cardId?.status || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>
						</div>
						<div className="w-full h-fit flex flex-row gap-4 justify-between items-start">
							<Input
								id="requesterName"
								name="requesterName"
								label="Fecha de inicio"
								type="text"
								placeholder="No se cuenta con la fecha de inicio"
								value={cardId?.start_date || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>

							<Input
								id="requesterRut"
								name="requesterRut"
								label="Fecha de finalización"
								type="text"
								placeholder="No se cuenta con la fecha de finalización"
								value={cardId?.end_date || ''}
								decoration="w-full flex flex-col"
								disabled={true}
							/>
						</div>
					</section>
				</main>
				<footer className="flex flex-col-reverse justify-between items-center w-full gap-3 ">
					<button
						type="button"
						onClick={onClose}
						className="button-slim body-2   button-primary-IDLE w-full"
					>
						Cancelar evaluación
					</button>
					<div className="h-fit flex flex-row justify-between items-center gap-3 w-full *:w-full">
						<button
							className="button-slim body-2  border-2 text-feedback-error-200 border-feedback-error-200 body-1 w-full hover:font-semibold hover:text-feedback-error-200 hover:border-feedback-error-200  transition-all duration-300 ease-in-out active:scale-95 active:bg-feedback-error-200 active:text-font-100"
							type="button"
						>
							Rechazar
						</button>
						<button
							className="button-slim body-2  border-2 text-feedback-success-200 border-feedback-success-200 body-1 w-full hover:font-semibold hover:text-feedback-success-200 hover:border-feedback-success-200  transition-all duration-300 ease-in-out active:scale-95 active:bg-feedback-success-200 active:text-font-100"
							type="button"
						>
							Aprobar
						</button>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default RequestModalSimple;
