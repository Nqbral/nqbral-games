import { IsString, MinLength } from 'class-validator';

export class EditPasswordDto {
  @IsString()
  @MinLength(6)
  password: string;
}
