import { Controller, Get } from '@nestjs/common';
import {
    HealthCheckService,
    HealthCheck,
    MemoryHealthIndicator,
    DiskHealthIndicator,
} from '@nestjs/terminus';
import { sep } from 'path';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly memory: MemoryHealthIndicator,
        private readonly disk: DiskHealthIndicator,
    ) { }

    // Lightweight liveness probe: fast, safe, suitable for Kubernetes liveness
    @Get('up')
    @ApiOperation({ summary: 'Liveness probe (fast)' })
    @ApiResponse({ status: 200, description: 'Service is alive' })
    liveness() {
        return {
            status: 'up',
            uptime: process.uptime(),
            version: process.env.npm_package_version ?? null,
        };
    }

    // Readiness probe: heavier checks (memory/disk). Mapped to /health/ready.
    @Get('health/ready')
    @ApiOperation({ summary: 'Readiness probe (detailed checks)' })
    @ApiResponse({ status: 200, description: 'Service is ready' })
    @ApiResponse({ status: 503, description: 'Service is not ready' })
    @HealthCheck()
    async readiness() {
        // Use a platform-appropriate root path for disk checks. On Windows, check-disk-space
        // requires a drive letter path like "C:\\"; using "/" will throw an InvalidPathError.
        const rootPath =
            process.platform === 'win32'
                ? `${process.cwd().split(sep)[0]}${sep}`
                : '/';

        return this.health.check([
            // Check if used memory is not higher than 300MB
            () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            // Check storage on the appropriate root path
            () =>
                this.disk.checkStorage('storage', {
                    path: rootPath,
                    thresholdPercent: 0.9,
                }),
        ]);
    }
}