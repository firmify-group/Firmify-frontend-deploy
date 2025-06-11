import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router';
import type { Slot } from '@feature/public/types/login.types';
import { useState } from 'react';

const FormLogin: React.FC<Slot> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('Sexo erroneo');

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		// TODO: Implementa la lógica de autenticación aquí
		console.log(formData, 'password:', password, 'Email:', email);
	};

	return (
		<form
			className="flex flex-col gap-10 w-full h-fit **:body-1"
			onSubmit={handleSubmit}
			aria-labelledby="login-heading"
		>
			<section className="w-full h-fit flex flex-col gap-4 ">{children}</section>

			<div className="flex flex-col gap-2 w-full h-16">
				<button
					type="submit"
					className="button button-primary-IDLE"
					aria-describedby="login-description"
					disabled={loading}
				>
					{loading ? 'Cargando...' : 'Iniciar sesión'}
				</button>
				<small>{error}</small>
			</div>

			<footer className="flex gap-2 h-24 items-end">
				<NavLink to={'/'} className="flex items-center gap-2">
					<ArrowLeftIcon className="size-6 text-font-900" />
					<span className="body-1 text-font-900">Volver a la pagina de inicio.</span>
				</NavLink>
			</footer>
		</form>
	);
};

export default FormLogin;
