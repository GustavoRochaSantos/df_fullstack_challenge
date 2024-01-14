import { IsString } from "class-validator";

export class CreatePostRepostDto {
  @IsString()
  postId: string;
}
