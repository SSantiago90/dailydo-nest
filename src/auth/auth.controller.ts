import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: RegisterDto){
    return this.authService.login(loginDto)
  } 
  
  @Post("register")
  register( @Body() registerDto: RegisterDto){   
    console.log(registerDto)
    return this.authService.register(registerDto)
  }
}
