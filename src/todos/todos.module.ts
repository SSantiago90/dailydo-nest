
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './Todo.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/users.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [TodosController],
  providers: [TodosService, UsersService],
  exports: [TodosService],
})

export class TodosModule {}
