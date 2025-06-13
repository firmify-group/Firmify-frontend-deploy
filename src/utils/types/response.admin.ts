export type SummaryRequest = {
    status: boolean;
    data: {
        request: {
            totalResueltos: number;
            totalPendientes: number;
            totalObjeciones: number;
            totalProcesos: number;
        };
        categorySumers: {
            name: string;
            total: number;
        }[];
    };
    message: string;
    timestamp: string;
};
