import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DatabaseIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const prisma = new PrismaService();
    const results = await prisma.user.count();
    const status = this.getStatus(key, results !== undefined, {
      results: results,
    });
    if (results >= 0) {
      return status;
    }
    throw new HealthCheckError(`${key} failed`, status);
  }
}
