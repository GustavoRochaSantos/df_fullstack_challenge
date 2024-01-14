import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) { }

  @Post()
  create(@Request() req, @Body() createPostCommentDto: CreatePostCommentDto) {
    return this.postCommentService.create(req.user.sub, createPostCommentDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.postCommentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postCommentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostCommentDto: UpdatePostCommentDto) {
    return this.postCommentService.update(id, updatePostCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCommentService.remove(id);
  }
}
