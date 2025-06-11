import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router';
import type { LoginResponse, Slot } from '@feature/public/types/login.types';
import { useFetchLogin, useRoleNavigation } from '@feature/public/hooks';

const FormLogin: React.FC<Slot> = ({ children }) => {
	const { status, message, loading, fetchLogin } = useFetchLogin();
	const { navigateByRole } = useRoleNavigation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const formData: FormData = new FormData(e.currentTarget);
		const username: FormDataEntryValue | null = formData.get('username');
		const password: FormDataEntryValue | null = formData.get('password');

		const response: LoginResponse = await fetchLogin(username as string, password as string);

		if (response.status) navigateByRole(response.data.token);
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
