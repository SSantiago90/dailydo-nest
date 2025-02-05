import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request as RequestType} from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import Roles from 'src/auth/decorators/roles.decorator';

interface RequestWithUser extends RequestType { user: { email: string , role: string} }


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get("/")
  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard) 
  findAll(@Request() req: RequestWithUser ) {
    console.log(req.user)
    return this.usersService.findAll()
  }
  

  @Get(':id')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Post("/resetDB")
  resetDB(){
    return this.usersService.resetDB();
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
