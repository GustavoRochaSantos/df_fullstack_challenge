import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, Header, HttpStatus, ParseFilePipeBuilder, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { multerOptions } from 'src/settings/configs/multer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.sub, createPostDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }


  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions('post_photo')))
  uploadFile(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file: Express.Multer.File
  ) {

    return this.postService.updatePhoto(id, file.path)
  }


  @Get('photo/:id')
  @Header('Content-Type', 'image/jpeg')
  async getUserProfilePhoto(
    @Param('id') id: string,
  ): Promise<StreamableFile> {

    const record = await this.postService.findPhoto(id)

    const imageLocation = join(process.cwd(), record.photo);
    const file = createReadStream(imageLocation);
    return new StreamableFile(file);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    console.log('dentro', updatePostDto)
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
