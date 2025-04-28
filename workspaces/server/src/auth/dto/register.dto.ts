import { IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: "Nom d'utilisateur invalide." })
  username: string;

  @IsEmail({}, { message: 'Adresse email invalide.' })
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
    message: 'Mot de passe invalide.',
  })
  password: string;
}
