import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  StreamableFile,
  Response,
  Header
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/setMetadata';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/settings/configs/multer';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions('user_photo')))
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

    return this.userService.updatePhoto(id, file.path)
  }

  @Get()
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get('profile-photo/:id')
  @Header('Content-Type', 'image/jpeg')
  async getUserProfilePhoto(
    @Param('id') id: string,
    @Response({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {

    const record = await this.userService.findPhoto(id)
    console.log(record)
    console.log(process.cwd(),)
    console.log(join(process.cwd(), record.photo))
    const imageLocation = join(process.cwd(), record.photo);
    const file = createReadStream(imageLocation);
    return new StreamableFile(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.userService.remove(id);
  }
}
