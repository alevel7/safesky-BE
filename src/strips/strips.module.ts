import { Module } from '@nestjs/common';
import { StripsService } from './strips.service';
import { StripsController } from './strips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Strip, StripSchema } from './entities/strip.entity';

@Module({
  controllers: [StripsController],
  providers: [StripsService],
  imports:[
    MongooseModule.forFeature([
      { name: Strip.name, schema: StripSchema }
    ]),
  ]
})
export class StripsModule {}
