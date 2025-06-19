import Modal from 'src/components/ui/organisms/Modal';
import type { ProcessFormData } from 'src/utils/types/components.client';
import type { RequestModalProps } from 'src/utils/types/components.admin';
import Download from 'src/assets/icons/download.png';
import Input from '../atoms/Input';
import { useState } from 'react';

const ProcessModal: React.FC<RequestModalProps> = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState<ProcessFormData>({
		categoryProcess: '',
		endDateProcess: '',
		startDateProcess: '',
		file: null,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = e.target;

		if (type === 'file') {
			setFormData((prev) => ({
				...prev,
				[name]: files ? files[0] : null,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const resetForm = () => {
		setFormData({
			categoryProcess: '',
			startDateProcess: '',
			endDateProcess: '',
			file: null,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validación básica
		if (!formData.categoryProcess || !formData.startDateProcess || !formData.endDateProcess) {
			alert('Por favor complete todos los campos obligatorios');
			return;
		}

		// Validar que la fecha de inicio no sea posterior a la fecha de fin
		if (new Date(formData.startDateProcess) > new Date(formData.endDateProcess)) {
			alert('La fecha de inicio no puede ser posterior a la fecha de finalización');
			return;
		}

		console.log('Datos del formulario:', formData);
		// Aquí va la lógica para crear el proceso
		onClose();
		resetForm();
	};

	const handleCancel = () => {
		onClose();
		resetForm();
	};

	// Formatear fecha para input type="date"
	const formatDateForInput = (date: string | Date) => {
		if (!date) return '';
		if (typeof date === 'string') return date;
		return date.toISOString().split('T')[0];
	};

	// Función para remover archivo
	const removeFile = () => {
		setFormData((prev) => ({
			...prev,
			file: null,
		}));
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel}>
			<form onSubmit={handleSubmit} className="h-full flex flex-col gap-5">
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
							label="Tipo de solicitud *"
							type="text"
							placeholder="Seleccionar tipo de solicitud"
							value={formData.categoryProcess}
							decoration="w-full flex flex-col"
							onChange={handleInputChange}
							required
						/>

						<div className="w-full h-fit flex flex-row gap-4 justify-between items-start">
							<Input
								id="startDateProcess"
								name="startDateProcess"
								label="Fecha de inicio *"
								type="date"
								placeholder="Seleccionar fecha de inicio"
								value={formatDateForInput(formData.startDateProcess)}
								decoration="w-full flex flex-col"
								onChange={handleInputChange}
								required
							/>

							<Input
								id="endDateProcess"
								name="endDateProcess"
								label="Fecha de finalización *"
								type="date"
								placeholder="Seleccionar fecha de finalización"
								value={formatDateForInput(formData.endDateProcess)}
								decoration="w-full flex flex-col"
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="w-full flex flex-col gap-2 mt-5">
							{!formData.file ? (
								<label className="flex flex-row justify-center items-center gap-2 w-full py-1.5 px-4 bg-primary-500 text-font-100 rounded-md shadow-md cursor-pointer hover:bg-primary-600 transition-colors duration-200">
									<img
										src={Download}
										className="size-5"
										alt="Icono de descarga"
									/>
									<span>Seleccionar archivo</span>
									<input
										type="file"
										name="file"
										onChange={handleInputChange}
										className="hidden"
										accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
									/>
								</label>
							) : (
								<div className="flex flex-col gap-2">
									<div className="flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-md">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
												{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
												<svg
													className="w-4 h-4 text-white"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<span className="text-sm font-medium text-green-800">
													Archivo seleccionado
												</span>
												<span className="text-xs text-green-600">
													{formData.file.name}
												</span>
											</div>
										</div>
										<button
											type="button"
											onClick={removeFile}
											className="text-red-500 hover:text-red-700 transition-colors"
											title="Remover archivo"
										>
											{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>

									<label className="flex flex-row justify-center items-center gap-2 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 border-2 border-dashed border-gray-300">
										<span className="text-sm">Cambiar archivo</span>
										<input
											type="file"
											name="file"
											onChange={handleInputChange}
											className="hidden"
											accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
										/>
									</label>
								</div>
							)}
						</div>
					</section>
				</main>

				<footer className="flex flex-row justify-between items-center w-full gap-3">
					<button
						type="button"
						onClick={handleCancel}
						className="button-slim body-2  box-border text-primary-500  border-2  border-primary-500 body-1 w-1/3 hover:font-semibold hover:text-primary-500 hover:border-primary-500  transition-all duration-300 ease-in-out active:scale-95 active:bg-primary-500 active:text-font-100"
					>
						Cancelar
					</button>

					<button
						type="submit"
						className="button-slim body-2 w-2/3 bg-primary-500 text-font-100  border-2  border-primary-500 hover:bg-primary-600 transition-colors"
					>
						Crear Solicitud
					</button>
				</footer>
			</form>
		</Modal>
	);
};

export default ProcessModal;
