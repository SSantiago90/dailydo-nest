import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';

@Module({
  imports: [],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
