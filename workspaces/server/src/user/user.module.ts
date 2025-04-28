import { User, UserSchema } from '@app/auth/schemas/user.schema';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // si d'autres modules doivent utiliser UserService
})
export class UserModule {}
