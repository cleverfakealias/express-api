import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import {
    TerminusModule,
    HealthCheckService,
    MemoryHealthIndicator,
    DiskHealthIndicator
} from '@nestjs/terminus';

describe('HealthController', () => {
    let controller: HealthController;
    let healthCheckService: HealthCheckService;
    let memoryHealthIndicator: MemoryHealthIndicator;
    let diskHealthIndicator: DiskHealthIndicator;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TerminusModule],
            controllers: [HealthController],
        }).compile();

        controller = module.get<HealthController>(HealthController);
        healthCheckService = module.get<HealthCheckService>(HealthCheckService);
        memoryHealthIndicator = module.get<MemoryHealthIndicator>(MemoryHealthIndicator);
        diskHealthIndicator = module.get<DiskHealthIndicator>(DiskHealthIndicator);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('readiness', () => {
        it('should return health check result', async () => {
            const mockHealthResult = {
                status: 'ok' as const,
                info: {
                    memory_heap: { status: 'up' as const },
                    storage: { status: 'up' as const },
                },
                error: {},
                details: {
                    memory_heap: { status: 'up' as const },
                    storage: { status: 'up' as const },
                },
            };

            jest.spyOn(healthCheckService, 'check').mockResolvedValue(mockHealthResult);
            jest.spyOn(memoryHealthIndicator, 'checkHeap').mockResolvedValue({ memory_heap: { status: 'up' } });
            jest.spyOn(diskHealthIndicator, 'checkStorage').mockResolvedValue({ storage: { status: 'up' } });

            const result = await controller.readiness();

            expect(result).toEqual(mockHealthResult);
            expect(healthCheckService.check).toHaveBeenCalled();
        });

        it('should handle health check errors', async () => {
            const mockErrorResult = {
                status: 'error' as const,
                info: {},
                error: {
                    memory_heap: { status: 'down' as const, message: 'Memory usage too high' },
                },
                details: {
                    memory_heap: { status: 'down' as const, message: 'Memory usage too high' },
                    storage: { status: 'up' as const },
                },
            };

            jest.spyOn(healthCheckService, 'check').mockResolvedValue(mockErrorResult);

            const result = await controller.readiness();

            expect(result.status).toBe('error');
            expect(result.error).toBeDefined();
        });
    });
});