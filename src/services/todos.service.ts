import getDataAsync, { getWeeklyTodosForDay, getNotesAsnyc, mockdata } from "src/DatabaseMock";
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../schemas/Todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}
  async getTodos(): Promise<Todo[]> {
    const todos = await getDataAsync();
    return todos as Todo[];
  }

  async getTodosForDay(date: string): Promise<Todo[]> {    
    const dateObj = new Date(date);
    const todos = await getWeeklyTodosForDay(dateObj);
    return [...todos];
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
