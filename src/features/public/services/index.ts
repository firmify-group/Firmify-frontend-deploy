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

    // ...existing code...
    const login = async (username: string, password: string): Promise<LoginResponse> => {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Tiempo de espera agotado')), 5000)
        );

        // Promesa de fetch
        const fetchPromise = fetch('http://localhost:8080/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (!response.ok) throw new Error('Error en el login');
                return response.json();
            })
            .then((result: LoginResponse) => ({
                status: result.status,
                message: result.message,
                data: result.data
            }));

        return Promise.race([fetchPromise, timeoutPromise])
            .catch(() => ({
                status: false,
                message: 'Error al iniciar sesión',
                data: { token: '', expires_in: 0, token_type: '' }
            }));
    };

    return {
        login
    };
};