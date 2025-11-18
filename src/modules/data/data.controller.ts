import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DataService } from './data.service';
import { FilterDataDto, SortOrder } from './dto/filter-data.dto';
import { DataItem, PaginatedResponse } from './interfaces/data.interface';

@ApiTags('Data')
@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    @Get()
    @ApiOperation({ summary: 'Get filtered data with pagination' })
    @ApiQuery({
        name: 'category',
        required: false,
        description: 'Filter by category',
        example: 'technology',
    })
    @ApiQuery({
        name: 'status',
        required: false,
        description: 'Filter by status',
        example: 'active',
    })
    @ApiQuery({
        name: 'search',
        required: false,
        description: 'Search term',
        example: 'nodejs',
    })
    @ApiQuery({
        name: 'sortOrder',
        required: false,
        enum: SortOrder,
        description: 'Sort order',
        example: SortOrder.ASC,
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: 'Filtered data with pagination',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            name: { type: 'string', example: 'Node.js Tutorial' },
                            category: { type: 'string', example: 'technology' },
                            status: { type: 'string', example: 'active' },
                            description: { type: 'string', example: 'Learn modern Node.js development' },
                            createdAt: { type: 'string', example: '2025-01-01T00:00:00Z' },
                            updatedAt: { type: 'string', example: '2025-01-15T00:00:00Z' },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 10 },
                        total: { type: 'number', example: 25 },
                        totalPages: { type: 'number', example: 3 },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid query parameters',
    })
    findAll(@Query() filters: FilterDataDto): PaginatedResponse<DataItem> {
        return this.dataService.findAll(filters);
    }
}