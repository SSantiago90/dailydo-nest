import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(registerDto: RegisterDto) {
    const isUser = await this.usersService.findOne(registerDto.email);

    const loginError = new UnauthorizedException("Email or password didn't match with any user registerd.");

    if(!isUser) {
      throw loginError;
    }
    
    const isPasswordMatch = await bcrypt.compare(registerDto.password, isUser.password);
    if(!isPasswordMatch) {
      throw loginError;      
    }
    return 'login';
  } 

  async register(registerDto: RegisterDto) {
    const isUser = await this.usersService.findOne(registerDto.email);

    if(isUser)        
      throw new BadRequestException("A user with that email already exists");
    
    const hash = await bcrypt.hash(registerDto.password,12) 
    return await this.usersService.create({...registerDto, password: hash});
     
  }
}
