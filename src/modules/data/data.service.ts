import { Injectable } from '@nestjs/common';
import { DataItem, PaginatedResponse } from './interfaces/data.interface';
import { FilterDataDto, SortOrder } from './dto/filter-data.dto';

@Injectable()
export class DataService {
    private readonly mockData: DataItem[] = [
        {
            id: 1,
            name: 'Node.js Tutorial',
            category: 'technology',
            status: 'active',
            description: 'Learn modern Node.js development',
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-15T00:00:00Z',
        },
        {
            id: 2,
            name: 'React Components',
            category: 'technology',
            status: 'active',
            description: 'Building reusable React components',
            createdAt: '2025-01-02T00:00:00Z',
            updatedAt: '2025-01-16T00:00:00Z',
        },
        {
            id: 3,
            name: 'Database Design',
            category: 'database',
            status: 'pending',
            description: 'Advanced database design patterns',
            createdAt: '2025-01-03T00:00:00Z',
            updatedAt: '2025-01-17T00:00:00Z',
        },
        {
            id: 4,
            name: 'API Security',
            category: 'security',
            status: 'inactive',
            description: 'Securing REST APIs',
            createdAt: '2025-01-04T00:00:00Z',
            updatedAt: '2025-01-18T00:00:00Z',
        },
        {
            id: 5,
            name: 'TypeScript Advanced',
            category: 'technology',
            status: 'active',
            description: 'Advanced TypeScript patterns',
            createdAt: '2025-01-05T00:00:00Z',
            updatedAt: '2025-01-19T00:00:00Z',
        },
    ];

    findAll(filters: FilterDataDto): PaginatedResponse<DataItem> {
        let filteredData = [...this.mockData];

        // Apply filters
        if (filters.category) {
            filteredData = filteredData.filter(
                item => item.category.toLowerCase() === filters.category?.toLowerCase(),
            );
        }

        if (filters.status) {
            filteredData = filteredData.filter(
                item => item.status.toLowerCase() === filters.status?.toLowerCase(),
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredData = filteredData.filter(
                item =>
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm),
            );
        }

        // Apply sorting
        if (filters.sortOrder) {
            filteredData.sort((a, b) => {
                const comparison = a.name.localeCompare(b.name);
                return filters.sortOrder === SortOrder.DESC ? -comparison : comparison;
            });
        }

        // Apply pagination
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            pagination: {
                page,
                limit,
                total: filteredData.length,
                totalPages: Math.ceil(filteredData.length / limit),
            },
        };
    }
}