import { IsEmail, IsOptional, IsString } from 'class-validator';
import { DefaultFieldsDto } from 'src/settings/database/defaultFields.dto';

export class CreateUserDto extends DefaultFieldsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  fullName: string;

  @IsString()
  password: string;
}
