import { BadRequestException, Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) { }
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const userExists = await this.usersService.verifyUserExist(createUserDto.licenceNumber);
    if (userExists.exists) {
      throw new BadRequestException('User with this licence number already exists');
    }
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const newUser = {
        licenceNumber: createUserDto.licenceNumber,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: hashedPassword
      };
      const createdUser = await this.userModel.create(newUser);
      const userObject = createdUser.toObject();
      const { password, ...result } = userObject;
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async comparePassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
    return isMatch;
  }

  async validateUser(licenceNumber: string, password: string): Promise<User> {
      const user = await this.usersService.findOneByLicense(licenceNumber);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isMatch: boolean = await this.comparePassword(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password does not match');
      }
      return user;
    }
    
  async login(licenceNumber: string, password: string): Promise<{ access_token: string, user: User }> {
    const user = await this.validateUser(licenceNumber, password);
    const payload = { sub: user._id, licenceNumber: user.licenceNumber };
    const userObject = user.toObject();
    const { password: _, ...result } = userObject;
    return { 
      access_token: this.jwtService.sign(payload),
      user: result
    };
  }
}
