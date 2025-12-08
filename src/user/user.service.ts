import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>) { }
  

  async findOneByLicense(licenseNo: string): Promise<User | null> {
    return this.userModel.findOne({ licenceNumber: licenseNo }).select('+password').exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async verifyUserExist(licenseNo: string): Promise<{ exists: boolean }> {
    const user = await this.userModel.findOne({ licenceNumber: licenseNo }).exec();
    return { exists: !!user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

}
