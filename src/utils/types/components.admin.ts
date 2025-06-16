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

export type cardInformation = {
    id?: number;
    rut?: string;
    email?: string;
    name?: string;
    category?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
};

export type RequestModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cardId?: cardInformation;
}

export type UserFormData = {
    requesterName: string;
    requesterRut: string;
    requesterEmail: string;
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


export type usersProps = {
    id?: number | string;
    name?: string;
    rut?: string
    email?: string;
    category?: string;
    state?: string;
    action?: number;
}

export type UserTableProps = {
    users: usersProps[];
    onDeleteUser?: (userId: number) => void;
    showFilterInfo?: boolean;
    totalUsers?: number;
}