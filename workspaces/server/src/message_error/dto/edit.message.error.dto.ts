import { IsString, MaxLength } from 'class-validator';

export class EditMessageErrorDto {
  @IsString()
  username: string;

  @IsString()
  @MaxLength(256)
  message: string;
}
