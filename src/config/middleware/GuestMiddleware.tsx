'use client';

import { type JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import type { NavigateFunction } from 'react-router';
import type { RootState } from 'src/store';
import { PATH_ROUTES, ROLE } from 'src/utils/constant/path';

export const GuestMiddleware = (): JSX.Element | null => {
	const { token, role }: { token: string | null; role: string | null } = useSelector(
		(state: RootState) => state.auth,
	);
	const navigate: NavigateFunction = useNavigate();

	useEffect((): void => {
		if (token && role) {
			if (role === ROLE.ADMIN) {
				navigate(PATH_ROUTES.MANAGER_HOME, { replace: true });
			} else if (role === ROLE.USER) {
				navigate(PATH_ROUTES.USER_PROCESS, { replace: true });
			}
		}
	}, [token, role, navigate]);

	if (token && role) {
		return null;
	}

	return <Outlet />;
};
