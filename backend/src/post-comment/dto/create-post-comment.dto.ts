import { IsOptional, IsString } from "class-validator"

export class CreatePostCommentDto {
  @IsString()
  text: string

  @IsString()
  postId: string

  @IsString()
  @IsOptional()
  replayCommentId: string

  @IsOptional()
  @IsString()
  changedByUser: string
}
