import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router';

type MonitoringSummaryProps = {
	children: React.ReactNode;
};

const FormLogin: React.FC<MonitoringSummaryProps> = ({ children }) => {
	return (
		<form
			className="flex flex-col gap-10 w-full h-fit **:body-1"
			onSubmit={(e) => e.preventDefault()}
			aria-labelledby="login-heading"
		>
			<section className="w-full h-fit flex flex-col gap-4 ">{children}</section>
			<button
				type="submit"
				className="button button-primary-IDLE"
				aria-describedby="login-description"
			>
				Iniciar sesión
			</button>

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
