import { IsString } from 'class-validator';

export class ContactMessageDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  message: string;
}
