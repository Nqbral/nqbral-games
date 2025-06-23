import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageErrorModule } from './message_error/message.error.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'env accessibles partout
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `${process.env.DB_CONNECT}${process.env.DB_NAME}`,
      }),
    }),
    AuthModule,
    MessageErrorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
