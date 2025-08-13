import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StripsModule } from './strips/strips.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/safesky'),
    StripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
