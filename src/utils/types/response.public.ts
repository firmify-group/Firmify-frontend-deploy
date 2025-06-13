
export type LoginResponse = {
    status: boolean;
    message: string;
    data: {
        token: string;
        expiresIn: number;
        tokenType: string;
    };
};