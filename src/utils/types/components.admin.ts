export type CounterRequest = {
    totalResueltos?: number;
    totalPendientes?: number;
    totalObjeciones?: number;
    totalProcesos?: number;
};

export type CategoryRequest = {
    totalProcesos?: number;
    categorySumers?: {
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
    cards?: Array<{
        id?: string;
        name?: string;
        start_date?: string;
        end_date?: string;
        status?: string;
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
    availableCategories?: string[];
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