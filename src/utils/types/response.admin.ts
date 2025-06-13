export type SummaryRequest = {
    status: boolean;
    data: {
        request: {
            total_resueltos: number;
            total_pendientes: number;
            total_objeciones: number;
            total_procesos: number;
        };
        category_sumers: {
            name: string;
            total: number;
        }[];
    };
    message: string;
    timestamp: string;
};
