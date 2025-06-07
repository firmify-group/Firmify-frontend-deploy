export type CounterRequest = {
    total_resueltos: number;
    total_pendientes: number;
    total_objeciones: number;
    total_procesos: number;
}

export type CategoryRequest = {
    total_procesos: number;
    category_sumers: {
        name: string;
        total: number;
    }[];
}

export type MonitoringSummaryProps = {
    categoryData: CategoryRequest;
    counterData: CounterRequest;
}
