import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DatabaseIndicator } from './database.health';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [DatabaseIndicator],
})
export class HealthModule {}
