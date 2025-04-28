import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { User, UserSchema } from '@app/auth/schemas/user.schema';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret:
        'c3e330a1a89b8c38368ddde6e4b9d552819fcd1fa9dd17a3d27f6c51e684cb42',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
