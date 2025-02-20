import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import {Role} from 'src/auth/roles.enum';

@Injectable()
export class UsersService {
  constructor( @InjectModel(User.name) private UserModel: Model<User>) {}
  
  async create(registerDto: RegisterDto) { 

    return await this.UserModel.create({...registerDto, role: registerDto.email === "santi@mail.com" ? Role.ADMIN : Role.DEFAULT});
    
  }

  findAll() {
    return this.UserModel.find();    
  }

  findOne(email: string) {
    return this.UserModel.findOne({email: email});
  }

  resetDB(){
    return this.UserModel.deleteMany({});
  }
 /*  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
