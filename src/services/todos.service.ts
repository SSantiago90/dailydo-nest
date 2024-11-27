import getDataAsync, { getWeeklyTodosForDay, getNotesAsnyc } from "src/DatabaseMock";
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

}
