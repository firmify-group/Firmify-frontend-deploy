import { useNavigate } from 'react-router';
import { PATH_ROUTES, ROLE } from 'src/utils/constant/path';

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
