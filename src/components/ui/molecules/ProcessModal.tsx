import Modal from 'src/components/ui/organisms/Modal';
import Input from '../atoms/Input';
import { useState } from 'react';

export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export type ProcessFormData = {
	categoryProcess: string;
	startDate: string;
	finalDate: string;
};

const ProcessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState<ProcessFormData>({
		categoryProcess: '',
		startDate: '',
		finalDate: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Datos del formulario:', formData);
		// Aquí va la lógica para crear el proceso
		onClose();
		// Limpiar formulario después de cerrar
		setFormData({
			categoryProcess: '',
			startDate: '',
			finalDate: '',
		});
	};

	const handleCancel = () => {
		onClose();
		// Limpiar formulario al cancelar
		setFormData({
			categoryProcess: '',
			startDate: '',
			finalDate: '',
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel}>
			<header className="flex justify-center items-center header-4">
				<h2 className="text-[1.3rem] font-manrope font-bold text-font-1000">
					Nueva Solicitud
				</h2>
			</header>
			<main className="size-full flex flex-col justify-start items-start gap-6 *:w-full *:fit *:gap-2">
				<section className="flex flex-col">
					<h3 className="header-6">Información de la nueva solicitud</h3>

					<Input
						id="categoryProcess"
						name="categoryProcess"
						label="Tipo de solicitud"
						type="text"
						placeholder="Seleccionar tipo de solicitud"
						value={formData.categoryProcess}
						decoration="w-full flex flex-col"
						onChange={handleInputChange}
					/>

					<div className="w-full h-fit flex flex-row gap-4 justify-between items-start">
						<Input
							id="startDate"
							name="startDate"
							label="Fecha de inicio"
							type="date"
							placeholder="Seleccionar fecha de inicio"
							value={formData.startDate}
							decoration="w-full flex flex-col"
							onChange={handleInputChange}
						/>

						<Input
							id="finalDate"
							name="finalDate"
							label="Fecha de finalización"
							type="date"
							placeholder="Seleccionar fecha de finalización"
							value={formData.finalDate}
							decoration="w-full flex flex-col"
							onChange={handleInputChange}
						/>
					</div>
				</section>
			</main>
			<footer className="flex flex-col-reverse justify-between items-center w-full gap-3">
				<button
					type="button"
					onClick={handleCancel}
					className="button-slim body-2 button-primary-IDLE w-full"
				>
					Cancelar
				</button>

				<button
					type="button"
					onClick={handleSubmit}
					className="button-slim body-2 bg-primary-500 text-font-100 w-full hover:bg-primary-600 transition-colors"
				>
					Crear Solicitud
				</button>
			</footer>
		</Modal>
	);
};

export default ProcessModal;
