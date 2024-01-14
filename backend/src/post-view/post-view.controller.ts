import { Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { PostViewService } from './post-view.service';

@Controller('post-view')
export class PostViewController {
  constructor(private readonly postViewService: PostViewService) { }

  @Post(':postId')
  create(@Request() req, @Param('postId') postId) {
    return this.postViewService.create(req.user.sub, postId);
  }

  @Get(':postId')
  findAll(@Query() query, @Param('postId') postId) {
    return this.postViewService.findAll(postId, query);
  }

  @Delete(':postId')
  remove(@Request() req, @Param('postId') postId: string) {
    return this.postViewService.remove(req.user.sub, postId);
  }
}
