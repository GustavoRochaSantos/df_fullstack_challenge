import { IsInt, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsInt()
  comments: number;

  @IsOptional()
  @IsInt()
  likes: number;

  @IsOptional()
  @IsInt()
  reposts: number;

  @IsOptional()
  @IsInt()
  views: number;

  @IsOptional()
  @IsString()
  changedByUser: string
}
