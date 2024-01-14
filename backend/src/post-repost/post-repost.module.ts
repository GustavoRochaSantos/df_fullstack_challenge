import { Module } from '@nestjs/common';
import { PostRepostService } from './post-repost.service';
import { PostRepostController } from './post-repost.controller';

@Module({
  controllers: [PostRepostController],
  providers: [PostRepostService],
})
export class PostRepostModule {}
