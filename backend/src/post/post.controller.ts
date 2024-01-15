import { Body, Controller, Delete, Get, Header, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Query, Request, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream, existsSync } from 'fs';
import { mkdir } from "fs/promises";
import { join } from 'path';
import { multerOptions } from 'src/settings/configs/multer';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { Public } from 'src/auth/setMetadata';

const imagePath = 'post_photo'
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.sub, createPostDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: string) {
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
  ): Promise<StreamableFile | Buffer> {

    const record = await this.postService.findPhoto(id)
    let image = ''

    if (record.photo.includes(imagePath)) {
      image = join(process.cwd(), record.photo)

    } else {

      const res = await fetch(record.photo);
      if (!existsSync("downloads")) {
        await mkdir("downloads")
      }
      const fileName = `${crypto.randomUUID()}.jpg`
      const destination = join(process.cwd(), "./downloads", fileName);

      const fileStream = createWriteStream(destination, { flags: 'wx' });
      // @ts-ignore
      await finished(Readable.fromWeb(res.body).pipe(fileStream))

      image = join(process.cwd(), "downloads", fileName)
    }

    const file = createReadStream(image);
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
