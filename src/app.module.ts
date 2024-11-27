import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TodosController } from './controllers/todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './modules/todos.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ssantiago90:zarq154926@cluster-air.x4avooo.mongodb.net/dailydo'),
    TodosModule
  ],
  controllers: [AppController, TodosController],
  providers: [AppService],
})

export class AppModule {}
