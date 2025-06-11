import { useState } from "react";
import type { LoginResponse } from '@feature/public/types/login.types';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router';
import { ROLE, LOGIN_STATUS, FETCH_EXCEPTIONS, PATH_ROUTES } from '@shared/const/'


export const useFetchLogin = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [message, setMessage] = useState<string>(LOGIN_STATUS.IDLE);

    const fetchLogin = async (username: string, password: string): Promise<LoginResponse> => {
        setLoading(true);
        setMessage(LOGIN_STATUS.LOADING);

        const timeoutPromise: Promise<never> = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(FETCH_EXCEPTIONS.TIMEOUT)), 5000)
        );

        const fetchPromise: Promise<LoginResponse> = fetch('http://localhost:8080/api/authentication/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(async response => {
                if (!response.ok) {
                    setMessage(LOGIN_STATUS.ERROR);
                    setStatus(false);
                    throw new Error(FETCH_EXCEPTIONS.LOGIN_ERROR);
                }
                const result: LoginResponse = await response.json();
                setMessage(result.message);
                setStatus(result.status);
                return result;
            })
            .finally(() => {
                setLoading(false);
            });

        return Promise.race([fetchPromise, timeoutPromise])
            .catch(() => {
                setMessage(LOGIN_STATUS.ERROR);
                setStatus(false);
                return {
                    status: false,
                    message: LOGIN_STATUS.ERROR,
                    data: { token: '', expires_in: 0, token_type: '' }
                };
            });
    };

    return {
        loading,
        status,
        message,
        fetchLogin
    };
};
export const useRoleNavigation = (): { navigateByRole: (token: string) => void } => {
    const navigate = useNavigate();

    const navigateByRole = (token: string): void => {
        if (token) {
            const decoded: JwtPayload & { id?: string; role?: string; sub?: string } =
                jwtDecode(token);
            const role: string = decoded.role ?? FETCH_EXCEPTIONS.LOGIN_ERROR;
            if (role === ROLE.ADMIN) {
                navigate(PATH_ROUTES.MANAGER_HOME);
            } else if (role === ROLE.USER) {
                navigate(PATH_ROUTES.USER_HOME);
            } else {
                navigate(PATH_ROUTES.HOME);
            }
        }
    };

    return {
        navigateByRole
    };
};
