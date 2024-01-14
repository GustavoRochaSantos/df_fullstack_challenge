import { PartialType } from '@nestjs/swagger';
import { CreatePostRepostDto } from './create-post-repost.dto';

export class UpdatePostRepostDto extends PartialType(CreatePostRepostDto) {}
