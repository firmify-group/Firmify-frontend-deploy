import { useState } from "react";
import type { LoginResponse } from '@feature/public/types/login.types';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router';


export const useFetchLogin = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [message, setMessage] = useState<string>('Iniciar sesión');

    const fetchLogin = async (username: string, password: string): Promise<LoginResponse> => {
        setLoading(true);
        setMessage('Cargando...');

        const timeoutPromise: Promise<never> = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Tiempo de espera agotado')), 5000)
        );

        const fetchPromise: Promise<LoginResponse> = fetch('http://localhost:8080/api/authentication/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(async response => {
                if (!response.ok) {
                    setMessage('Error en el login');
                    setStatus(false);
                    throw new Error('Error en el login');
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
                setMessage('Error al iniciar sesión');
                setStatus(false);
                return {
                    status: false,
                    message: 'Error al iniciar sesión',
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
            const role: string = decoded.role ?? 'ERROR';
            if (role === 'SUPERVISOR') {
                navigate('/manager/home');
            } else if (role === 'EMPLEADO') {
                navigate('/client/process');
            } else {
                navigate('/');
            }
        }
    };

    return {
        navigateByRole
    };
};
