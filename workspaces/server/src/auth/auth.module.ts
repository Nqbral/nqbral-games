import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { JwtStrategy } from '@app/auth/jwt.strategy';
import { User, UserSchema } from '@app/auth/schemas/user.schema';
import { MailModule } from '@app/mail/mail.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    MailModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Si tu utilises ConfigModule pour charger .env
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Récupérer la clé depuis l'env
        signOptions: { expiresIn: '1h' }, // Le temps d'expiration du JWT
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
