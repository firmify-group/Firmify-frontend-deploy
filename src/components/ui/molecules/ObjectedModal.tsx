import Modal from 'src/components/ui/organisms/Modal';
import { useState } from 'react';

interface ObjectedModalProps {
	isOpen: boolean;
	onClose: () => void;
	processId?: number;
	onObjectProcess?: (processId: number, description: string) => void;
}

const ObjectedModal: React.FC<ObjectedModalProps> = ({
	isOpen,
	onClose,
	processId,
	onObjectProcess,
}) => {
	const [formData, setFormData] = useState<{ descriptionProcess: string }>({
		descriptionProcess: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData({ descriptionProcess: '' });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.descriptionProcess.trim()) {
			alert('Por favor ingrese la descripción de la objeción');
			return;
		}

		if (processId && onObjectProcess) {
			onObjectProcess(processId, formData.descriptionProcess);
		}

		onClose();
		resetForm();
	};

	const handleCancel = () => {
		onClose();
		resetForm();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleCancel}>
			<form onSubmit={handleSubmit} className="h-full flex flex-col gap-5">
				<header className="flex justify-center items-center header-4">
					<h2 className="text-[1.3rem] font-manrope font-bold text-font-1000">
						Objetar respuesta
					</h2>
				</header>

				<main className="size-full flex flex-col justify-start items-start gap-6">
					<section className="flex flex-col w-full gap-4">
						<h3 className="header-6">Información de la objeción</h3>

						<div className="w-full flex flex-col gap-2">
							<label
								htmlFor="descriptionProcess"
								className="font-medium text-font-1000"
							>
								Descripción de la objeción *
							</label>
							<textarea
								id="descriptionProcess"
								name="descriptionProcess"
								placeholder="Describa el motivo de su objeción..."
								value={formData.descriptionProcess}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
								rows={6}
								required
							/>
						</div>
					</section>
				</main>

				<footer className="flex flex-row justify-between items-center w-full gap-3">
					<button
						type="button"
						onClick={handleCancel}
						className="button-slim body-2 box-border text-primary-500 border-2 border-primary-500 body-1 w-1/3 hover:font-semibold hover:text-primary-500 hover:border-primary-500 transition-all duration-300 ease-in-out active:scale-95 active:bg-primary-500 active:text-font-100"
					>
						Cancelar
					</button>

					<button
						type="submit"
						className="button-slim body-2 w-2/3 bg-primary-500 text-font-100 border-2 border-primary-500 hover:bg-primary-600 transition-colors"
					>
						Enviar Objeción
					</button>
				</footer>
			</form>
		</Modal>
	);
};

export default ObjectedModal;
