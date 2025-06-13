import { type JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router';
import type { NavigateFunction, Location } from 'react-router';
import type { RootState } from 'src/store';
import { PATH_ROUTES, ROLE } from 'src/utils/constant/path';
import type { AuthMiddlewareProps } from 'src/utils/types/components.public';

export const AuthMiddleware = ({
	requiredRoles = [],
	redirectPath = PATH_ROUTES.LOGIN,
}: AuthMiddlewareProps): JSX.Element | null => {
	const { token, role }: { token: string | null; role: string | null } = useSelector(
		(state: RootState) => state.auth,
	);
	const navigate: NavigateFunction = useNavigate();
	const location: Location = useLocation();

	useEffect((): void => {
		if (!token) {
			navigate(PATH_ROUTES.LOGIN, {
				replace: true,
				state: { from: location },
			});
			return;
		}

		if (requiredRoles.length > 0 && role && !requiredRoles.includes(role)) {
			if (role === ROLE.ADMIN) {
				navigate(PATH_ROUTES.MANAGER_HOME, { replace: true });
			} else if (role === ROLE.USER) {
				navigate(PATH_ROUTES.USER_PROCESS, { replace: true });
			} else {
				navigate(redirectPath, { replace: true });
			}
		}
	}, [token, role, requiredRoles, navigate, redirectPath, location]);

	if ((requiredRoles.length > 0 && role && !requiredRoles.includes(role)) || !token) return null;

	return <Outlet />;
};
