import { useState } from "react";

type LoginResponse = {
    status: boolean;
    message: string;
    data: {
        token: string;
        expires_in: number;
        token_type: string;
    };
};

export const LoginService = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const [message, setMessage] = useState<string>('Iniciar sesión');

    const login = async (username: string, password: string): Promise<LoginResponse> => {
        setLoading(true);
        setMessage('Cargando...');

        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Tiempo de espera agotado')), 5000)
        );

        const fetchPromise = fetch('http://localhost:8080/api/authentication/login', {
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
        login
    };
};