import { useState } from 'react';
import type { LoginResponse } from 'src/utils/types/response.public';
import { useNavigate } from 'react-router';
import { useBaseUrl } from 'src/config/api/useBaseUrl.API';
import { API_ENDPOINTS, EXCEPTION_TYPE, FETCH_STATUS } from 'src/utils/constant/API';
import { PATH_ROUTES, ROLE } from 'src/utils/constant/path';

export const useFetchLogin = () => {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(true);
	const [message, setMessage] = useState<string>('Iniciar sesión');
	const USE_BASE_URL = useBaseUrl();

	const fetchLogin = async (username: string, password: string): Promise<LoginResponse> => {
		setLoading(true);
		setMessage(FETCH_STATUS.IDLE);

		const timeoutPromise: Promise<never> = new Promise<never>((_, reject) =>
			setTimeout(() => reject(new Error(EXCEPTION_TYPE.TIMEOUT)), 5000),
		);

		const fetchPromise: Promise<LoginResponse> = fetch(
			`${USE_BASE_URL}${API_ENDPOINTS.LOGIN}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			},
		)
			.then(async (response) => {
				if (!response.ok) {
					setMessage(FETCH_STATUS.ERROR);
					setStatus(false);
					throw new Error(EXCEPTION_TYPE.NETWORK_ERROR);
				}
				const result: LoginResponse = await response.json();
				setMessage(result.message);
				setStatus(result.status);
				return result;
			})
			.finally(() => {
				setLoading(false);

				setTimeout(() => {
					setMessage('Iniciar sesión');
				}, 2500)
			});

		return Promise.race([fetchPromise, timeoutPromise]).catch(() => {
			setMessage(FETCH_STATUS.ERROR);
			setStatus(false);
			return {
				status: false,
				message: FETCH_STATUS.ERROR,
				data: { token: '', expiresIn: 0, tokenType: '' },
			};
		});
	};

	return {
		loading,
		status,
		message,
		fetchLogin,
	};
};
export const useRoleNavigation = (): { navigateByRole: (role: string) => void } => {
	const navigate = useNavigate();

	const navigateByRole = (role: string): void => {
		if (role === ROLE.ADMIN) {
			navigate(PATH_ROUTES.MANAGER_HOME);
		} else if (role === ROLE.USER) {
			navigate(PATH_ROUTES.USER_PROCESS);
		} else {
			navigate(PATH_ROUTES.HOME);
		}
	};

	return {
		navigateByRole,
	};
};
