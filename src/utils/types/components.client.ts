export type ProcessPagination = {
    id: number;
    category: string;
    state: string;
    created_at: string;
    finished_at: string | null;
}

export interface ProcessTableProps {
    processes: ProcessPagination[];
    onProcessAction?: (processId: number) => void;
    onObjectProcess?: (processId: number) => void;
    onViewProcess?: (processId: number) => void;
    onRefetch: () => void;
    showFilterInfo?: boolean;
    totalProcesses?: number;
}