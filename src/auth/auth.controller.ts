import { Controller, Post, Body, Request, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/auth/roles.enum";


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

  @Auth(Role.USER)    
  @Post("validate") 
  validateToken(@Request() req: Request){    
    return true;
  }
}
