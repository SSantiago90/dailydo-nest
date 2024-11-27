
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from '../controllers/todos.controller';
import { TodosService } from '../services/todos.service';
import { Todo, TodoSchema } from '../schemas/Todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})

export class TodosModule {}
