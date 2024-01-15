import { Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { PostLikeService } from './post-like.service';

@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) { }

  @Post(':postId')
  create(@Request() req, @Param('postId') postId) {
    return this.postLikeService.create(req.user.sub, postId);
  }


  @Get(':postId')
  findAll(@Query() query, @Param('postId') postId) {
    return this.postLikeService.findAll(postId, query);
  }

  @Delete(':postId')
  remove(@Request() req, @Param('postId') postId: string) {
    return this.postLikeService.remove(req.user.sub, postId);
  }
}
