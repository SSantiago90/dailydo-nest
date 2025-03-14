import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async login(registerDto: RegisterDto) {
    const user = await this.usersService.findOne(registerDto.email);

    const loginError = new UnauthorizedException("El correo o la contraseña son incorrectos.");

    if(!user) {
      throw loginError;
    }
    
    const isPasswordMatch = await bcrypt.compare(registerDto.password, user.password);
    if(!isPasswordMatch) {
      throw loginError;      
    }

    const payload = { email: user.email, role: user.role, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { email: user.email, token } 
  } 

  async register({email, password}: RegisterDto) {
    const isUser = await this.usersService.findOne(email);

    if(isUser)        
      throw new BadRequestException("Ya existe un usuario con esa dirección de correo");
    
    const hash = await bcrypt.hash(password,12) 
    return await this.usersService.create({email, password: hash});
     
  }
}
