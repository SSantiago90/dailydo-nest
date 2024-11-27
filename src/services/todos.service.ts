import { getWeeklyTodosForDay, getNotesAsnyc, mockdata } from "src/DatabaseMock";
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../schemas/Todo.schema';
import getWeekdays from "src/util/getWeekDays";


@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}
  async getTodos(): Promise<Todo[]> {    
    return await this.TodoModel.find().exec();
  }

  async getTodosForDay(date: string): Promise<Todo[]> { 
    const weekDays = getWeekdays(new Date(date));    

  
    const todos = await this.TodoModel.find({ date: { $gte: weekDays[0], $lt: weekDays[6] } }).exec();
   
    console.log("Results for",weekDays[0].toDateString(), weekDays[6].toDateString()) 
    // 
    return todos;
  }
  
  async getAllNotes(): Promise<Todo[]> {
    const notes = await getNotesAsnyc();
    return notes as Todo[];
  }

  async checkDB(): Promise<Todo[]> {
    console.log("DB access from TodoService");
    this.createTestTODO();
    return this.TodoModel.find().exec();
  }

  async createTestTODO(): Promise<Todo> {
    this.dropCollection();
    const todo = new this.TodoModel({ task: "Test Task", date: new Date(), done: false, isNote: 0 });
    return todo.save();
  }

  async dropCollection(): Promise<any> {
    return this.TodoModel.deleteMany({}).exec();
  }

  async resetDB(): Promise<any> {
    await this.dropCollection()
    return this.TodoModel.insertMany(mockdata);
  }

}
