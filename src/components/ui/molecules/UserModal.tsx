import Modal from 'src/components/ui/organisms/Modal';
import type { RequestModalProps, UserFormData } from 'src/utils/types/components.admin';
import Input from '../atoms/Input';
import { useState } from 'react';

const UserModal: React.FC<RequestModalProps> = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState<UserFormData>({
		requesterName: '',
		requesterRut: '',
		requesterEmail: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Datos del formulario:', formData);
		// Aqui va la logica
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form
				onSubmit={handleSubmit}
				className="size-full flex flex-col justify-between box-border gap-5"
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
								placeholder="Ej: Juan Pérez García"
								decoration="w-full flex flex-col"
								disabled={false}
								value={formData.requesterName}
								onChange={handleInputChange}
							/>

							<Input
								id="requesterRut"
								name="requesterRut"
								label="RUT del solicitante"
								type="text"
								placeholder="Ej: 12.345.678-9"
								decoration="w-full flex flex-col"
								disabled={false}
								value={formData.requesterRut}
								onChange={handleInputChange}
							/>
						</div>

						<Input
							id="requesterEmail"
							name="requesterEmail"
							label="Correo del solicitante"
							type="email"
							placeholder="Ej: juan.perez@empresa.cl"
							decoration="w-full flex flex-col"
							disabled={false}
							value={formData.requesterEmail}
							onChange={handleInputChange}
						/>
					</section>
					<section className="flex flex-col">
						<h3 className="header-6">Información de la solicitud</h3>
						<ul className="pl-5 space-y-2 text-font-800 text-[0.98rem] list-none">
							<li className="flex items-start gap-2">
								<span className="text-primary-500 font-bold">*</span>
								<span className="body-3">
									El correo del usuario será utilizado como su nombre de usuario
									para ingresar al sistema, por lo que será la credencial exigida
									en el inicio de sesión.
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary-500 font-bold">*</span>
								<span className="body-3">
									La generación de contraseñas es aleatoria y, una vez creado el
									funcionario, se le comunicará por correo cuál será su
									contraseña, por motivos de transparencia y seguridad.
								</span>
							</li>
						</ul>
					</section>
				</main>
				<footer className="flex flex-col-reverse justify-between items-center w-full gap-3 ">
					<div className="h-fit flex flex-row justify-between items-center gap-3 w-full">
						<button
							className="button-slim body-2  border-2 box-border text-primary-500 border-primary-500 body-1 w-1/3 hover:font-semibold hover:text-primary-500 hover:border-primary-500  transition-all duration-300 ease-in-out active:scale-95 active:bg-primary-500 active:text-font-100"
							type="button"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							className="button-slim body-2 w-2/3 button-primary-IDLE"
							type="submit"
						>
							Agregar funcionario
						</button>
					</div>
				</footer>
			</form>
		</Modal>
	);
};

export default UserModal;
