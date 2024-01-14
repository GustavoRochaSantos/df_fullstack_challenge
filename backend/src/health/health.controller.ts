import { Public } from 'src/auth/setMetadata';
import { Controller, Get, HttpException } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { DatabaseIndicator } from './database.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private database: DatabaseIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    try {
      return this.health.check([
        () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        () =>
          this.disk.checkStorage('storage', {
            path: '/',
            thresholdPercent: 0.5,
          }),
        () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
        () => this.database.isHealthy('database'),
      ]);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
