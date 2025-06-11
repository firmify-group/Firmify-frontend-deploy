import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router';
import type { Slot } from '@feature/public/types/login.types';
import { LoginService } from '@feature/public/services';

const FormLogin: React.FC<Slot> = ({ children }) => {
	const { status, message, loading, login } = LoginService();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const username = formData.get('username');
		const password = formData.get('password');

		const response = await login(username as string, password as string);

		console.log('Login response:', response);
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
					className={
						status ? 'button button-primary-IDLE' : 'button button-primary-ERROR'
					}
					aria-describedby="login-description"
					disabled={loading}
				>
					{message}
				</button>
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
