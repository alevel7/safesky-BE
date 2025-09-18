import { Injectable } from '@nestjs/common';
import { CreateStripDto } from './dto/create-strip.dto';
import { UpdateStripDto } from './dto/update-strip.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Strip } from './entities/strip.entity';
import { Model } from 'mongoose';

@Injectable()
export class StripsService {
  constructor(@InjectModel(Strip.name) private readonly stripModel: Model<Strip>) { }
  
  create(createStripDto: CreateStripDto) {
    return this.stripModel.create({...createStripDto})
  }

  findAll(archived: boolean = false): Promise<Strip[]> {
    return this.stripModel.find({ isArchived: archived }).exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} strip`;
  }

  update(id: string, updateStripDto: UpdateStripDto):Promise<Strip | null> {
    return this.stripModel.findByIdAndUpdate(id, {
      ...updateStripDto
    }, {
      new:true
    }).exec()
  }

  archive(id: number) {
    return `This action removes a #${id} strip`;
  }
}
