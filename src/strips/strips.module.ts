import { Module } from '@nestjs/common';
import { StripsService } from './strips.service';
import { StripsController } from './strips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Strip, StripSchema } from './entities/strip.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Activity, ActivitySchema } from './entities/activities.entity';

@Module({
  controllers: [StripsController],
  providers: [StripsService],
  imports:[
    MongooseModule.forFeature([
      { name: Strip.name, schema: StripSchema },
      { name: Activity.name, schema: ActivitySchema }
    ]),
    AuthModule
  ],
  exports: [StripsService]
})
export class StripsModule {}
