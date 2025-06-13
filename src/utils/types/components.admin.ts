export type CounterRequest = {
    total_resueltos: number;
    total_pendientes: number;
    total_objeciones: number;
    total_procesos: number;
};

export type CategoryRequest = {
    total_procesos: number;
    category_sumers: {
        name: string;
        total: number;
    }[];
};

export type MonitoringSummary = {
    categoryData: CategoryRequest;
    counterData: CounterRequest;
};

export type KanvaColumnProps = {
    id?: string;
    name?: string;
    low?: string;
    higt?: string;
    cards: Array<{
        id: string;
        name: string;
        dateStart: string;
        dateEnd: string;
        status: string;
        category?: string;
    }>;
};

export type KanvaCardProps = {
    id: string;
    name: string;
    dateStart: string;
    dateEnd: string;
    status: string;
};

export type FilterBarProps = {
    filters: {
        name: string;
        category: string;
        startDate: string;
        endDate: string;
    };
    onChange: (filters: Partial<FilterBarProps['filters']>) => void;
};

export type ProductProps = {
    id: string;
    name?: string;
    rut?: string
    email?: string;
    category: string;
    state: string;
    action: number;
}

export type UserTableProps = {
    products: ProductProps[];
    selectCardHandler: (product: ProductProps) => void;
}