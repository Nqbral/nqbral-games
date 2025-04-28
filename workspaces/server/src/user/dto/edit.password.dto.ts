import { Matches } from 'class-validator';

export class EditPasswordDto {
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
    message: 'Mot de passe invalide.',
  })
  password: string;
}
