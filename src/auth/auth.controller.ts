import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: loginDto){
    return this.authService.login(loginDto)
  } 
  
  @Post("register")
  register( @Body() registerDto: RegisterDto){   
    return this.authService.register(registerDto)
  }
}
