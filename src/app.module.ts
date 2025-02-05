import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ssantiago90:zarq154926@cluster-air.x4avooo.mongodb.net/dailydo'),
    UsersModule,
    TodosModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, TodosController],
  providers: [AppService],
})

export class AppModule {}
