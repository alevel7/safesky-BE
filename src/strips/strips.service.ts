import { Injectable, Query } from '@nestjs/common';
import { CreateStripDto } from './dto/create-strip.dto';
import { UpdateStripDto } from './dto/update-strip.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Strip } from './entities/strip.entity';
import { Model } from 'mongoose';
import { Activity } from './entities/activities.entity';
import { ILoggedInUser } from 'src/auth/dto/login-auth.dto';
import { actionType, activityType } from './dto/activity.dto';

@Injectable()
export class StripsService {
  constructor(
    @InjectModel(Strip.name) private readonly stripModel: Model<Strip>,
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
  ) { }
  
  async create(user: ILoggedInUser | null, createStripDto: CreateStripDto) {
    console.log('initial user', user);
    
    const data = await this.stripModel.create({...createStripDto})
    await this.addActivity('STRIP', 'CREATE_STRIP', data, user);
    return data;
  }

  findAll(archived: boolean = false): Promise<Strip[]> {
    return this.stripModel.find({ isArchived: archived }).exec()
  }
  async update(id: string, updateStripDto: UpdateStripDto, user: ILoggedInUser | null):Promise<Strip | null> {

    const data = await this.stripModel.findByIdAndUpdate(id, {
      ...updateStripDto
    }, {
      new:true
    }).exec();
    if (updateStripDto.isArchived) {
      await this.addActivity('STRIP', 'ARCHIVE_STRIP', data, user);
    }
    await this.addActivity('STRIP', 'UPDATE_STRIP', data, user);
    return data;
  }

  async addActivity(type: activityType = 'STRIP', action: actionType, meta: any, user: ILoggedInUser | null) {
    if (user){
      console.log(user);
      
      await this.activityModel.create({
        meta,
        user: user.sub,
        actionType: action,
        type,
        updatedAt: new Date().toISOString(),
      })
    }
    
  }

  async getAuditLogs(
    user: ILoggedInUser | null, 
    page: number = 1, 
    limit: number = 10,
    type: activityType | null,
    action: actionType | null,
    startDate: string | null,
    endDate: string | null,
  ){
    const query: any = {};

    if (type) {
      query.type = type;
    }

    if (action) {
      query.actionType = action;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (user) {
      query.user = user.sub;
    }
    const result = await this.activityModel
      .find(query)
      .skip((page - 1) * limit)
      .populate('user', '-password')
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return { result, query, page, limit };
  }

  async getUserActivities(user: ILoggedInUser | null): Promise<Activity[]> {
    if (user) {
      return this.activityModel.find({ user: user.sub }).exec();
    }
    return this.activityModel.find().exec();
  }

}
