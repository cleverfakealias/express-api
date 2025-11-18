import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class FilterDataDto {
    @ApiPropertyOptional({
        description: 'Filter by category',
        example: 'technology',
    })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({
        description: 'Filter by status',
        example: 'active',
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({
        description: 'Search term',
        example: 'nodejs',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: SortOrder,
        example: SortOrder.ASC,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder;

    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1,
        minimum: 1,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    limit?: number = 10;
}