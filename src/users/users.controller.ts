import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request as RequestType} from 'express';
import { Role } from 'src/auth/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';


interface RequestWithUser extends RequestType { user: { email: string , role: string} }


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get("/")
  @Auth(Role.ADMIN)
  findAll() {    
    return this.usersService.findAll()
  }
  

  @Get(':id')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }


  @Post("/resetDB")
  @Auth(Role.ADMIN)
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
