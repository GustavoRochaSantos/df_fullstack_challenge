import { Module } from '@nestjs/common';
import { PostViewService } from './post-view.service';
import { PostViewController } from './post-view.controller';

@Module({
  controllers: [PostViewController],
  providers: [PostViewService],
})
export class PostViewModule {}
