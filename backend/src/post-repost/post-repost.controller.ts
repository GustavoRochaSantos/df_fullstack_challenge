import { Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { PostRepostService } from './post-repost.service';

@Controller('post-repost')
export class PostRepostController {
  constructor(private readonly postRepostService: PostRepostService) { }

  @Post(':postId')
  create(@Request() req, @Param('postId') postId) {
    return this.postRepostService.create(req.user.sub, postId);
  }

  @Get(':postId')
  findAll(@Query() query, @Param('postId') postId) {
    return this.postRepostService.findAll(postId, query);
  }

  @Delete(':postId')
  remove(@Request() req, @Param('postId') postId: string) {
    return this.postRepostService.remove(req.user.sub, postId);
  }
}
