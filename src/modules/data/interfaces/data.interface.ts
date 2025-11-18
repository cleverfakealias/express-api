export interface DataItem {
    id: number;
    name: string;
    category: string;
    status: 'active' | 'inactive' | 'pending';
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}