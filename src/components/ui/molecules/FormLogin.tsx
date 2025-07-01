import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from 'src/store/auth';
import type { Slot } from 'src/utils/types/components.public';
import type { LoginResponse } from 'src/utils/types/response.public';
import { useRoleNavigation } from 'src/hook/useNavegation';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { usePublicAPI } from 'src/config/api/PublicRequest';
import { API_ENDPOINTS, FETCH_STATUS } from 'src/utils/constant/API';

const FormLogin: React.FC<Slot> = ({ children }) => {
	const { message, status, post } = usePublicAPI();
	const { navigateByRole } = useRoleNavigation();
	const dispatch = useDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		const response = await post<LoginResponse>(API_ENDPOINTS.LOGIN, {
			email,
			password,
		});

		if (response.data.token) {
			const token = response.data.token;
			const decoded: JwtPayload & { id?: string; role?: string } = jwtDecode(token);

			dispatch(setAuth({
				token,
				id: decoded.id ?? '',
				role: decoded.role ?? '',
			}));

			navigateByRole(decoded.role ?? '');
		}
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
						status === FETCH_STATUS.IDLE || status === FETCH_STATUS.LOADING
							? 'button button-primary-IDLE'
							: 'button button-primary-ERROR'
					}
					aria-describedby="login-description"
					disabled={status === FETCH_STATUS.LOADING}
				>
					{message || 'Iniciar Sesión'}
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
