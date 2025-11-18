import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from '../data.controller';
import { DataService } from '../data.service';
import { FilterDataDto, SortOrder } from '../dto/filter-data.dto';

describe('DataController', () => {
    let controller: DataController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DataController],
            providers: [DataService],
        }).compile();

        controller = module.get<DataController>(DataController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return paginated data without filters', () => {
            const filters: FilterDataDto = {};
            const result = controller.findAll(filters);

            expect(result).toHaveProperty('data');
            expect(result).toHaveProperty('pagination');
            expect(result.data).toBeInstanceOf(Array);
            expect(result.pagination.page).toBe(1);
            expect(result.pagination.limit).toBe(10);
            expect(result.pagination.total).toBeGreaterThan(0);
        });

        it('should filter data by category', () => {
            const filters: FilterDataDto = { category: 'technology' };
            const result = controller.findAll(filters);

            expect(result.data.every(item => item.category === 'technology')).toBe(true);
        });

        it('should filter data by status', () => {
            const filters: FilterDataDto = { status: 'active' };
            const result = controller.findAll(filters);

            expect(result.data.every(item => item.status === 'active')).toBe(true);
        });

        it('should search data by name and description', () => {
            const filters: FilterDataDto = { search: 'node' };
            const result = controller.findAll(filters);

            expect(result.data.every(item =>
                item.name.toLowerCase().includes('node') ||
                item.description.toLowerCase().includes('node')
            )).toBe(true);
        });

        it('should sort data in ascending order', () => {
            const filters: FilterDataDto = { sortOrder: SortOrder.ASC };
            const result = controller.findAll(filters);

            for (let i = 1; i < result.data.length; i++) {
                expect(result.data[i - 1]?.name.localeCompare(result.data[i]?.name ?? '')).toBeLessThanOrEqual(0);
            }
        });

        it('should sort data in descending order', () => {
            const filters: FilterDataDto = { sortOrder: SortOrder.DESC };
            const result = controller.findAll(filters);

            for (let i = 1; i < result.data.length; i++) {
                expect(result.data[i - 1]?.name.localeCompare(result.data[i]?.name ?? '')).toBeGreaterThanOrEqual(0);
            }
        });

        it('should paginate data correctly', () => {
            const filters: FilterDataDto = { page: 1, limit: 2 };
            const result = controller.findAll(filters);

            expect(result.data.length).toBeLessThanOrEqual(2);
            expect(result.pagination.page).toBe(1);
            expect(result.pagination.limit).toBe(2);
        });

        it('should combine multiple filters', () => {
            const filters: FilterDataDto = {
                category: 'technology',
                status: 'active',
                sortOrder: SortOrder.ASC,
                page: 1,
                limit: 5,
            };
            const result = controller.findAll(filters);

            expect(result.data.every(item =>
                item.category === 'technology' && item.status === 'active'
            )).toBe(true);
            expect(result.pagination.limit).toBe(5);
        });
    });
});