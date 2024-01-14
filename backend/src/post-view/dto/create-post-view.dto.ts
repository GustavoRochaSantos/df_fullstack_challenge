import { IsString } from "class-validator";

export class CreatePostViewDto {
  @IsString()
  postId: string;
}
