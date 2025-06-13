
export type LoginResponse = {
    status: boolean;
    message: string;
    data: {
        token: string;
        expires_in: number;
        token_type: string;
    };
};