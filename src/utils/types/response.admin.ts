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


export type AllProcessesResponse = {
    status: boolean;
    data: {
        processes: {
            id: number;
            rut: string;
            email: string;
            name: string;
            category: string;
            status: string;
            start_date: string;
            end_date: string;
        }[];
    };
    message: string;
    timestamp: string;
}