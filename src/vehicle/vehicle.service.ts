import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './entities/vehicle.entity';
import { Model } from 'mongoose';

@Injectable()
export class VehicleService {

    constructor(@InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>) { }
  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleModel.create({...createVehicleDto})
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
     return this.vehicleModel.findByIdAndUpdate(id, {
      ...updateVehicleDto
    }, {
      new:true
    }).exec()
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
