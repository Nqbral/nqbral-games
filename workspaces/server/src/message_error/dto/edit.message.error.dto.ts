import { IsString } from 'class-validator';

export class EditMessageErrorDto {
  @IsString()
  username: string;

  @IsString()
  message: string;
}
