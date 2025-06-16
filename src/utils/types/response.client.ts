export type AllProcessByUser = {
    status: boolean;
    data: {
        request: {
            id: number;
            category: string;
            state: string;
            created_at: string;
            finished_at: string | null;
        }[];
    };
    message: string;
    timestamp: string;
}