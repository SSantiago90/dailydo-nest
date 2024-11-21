import { Injectable } from '@nestjs/common';
import getDataAsync, { getWeeklyTodosForDay, getNotesAsnyc } from "src/DatabaseMock";
import { TodosType } from 'src/types/Todos.type';
@Injectable()
export class TodosService {
  async getTodos(): Promise<TodosType[]> {
    const todos = await getDataAsync();
    return todos as TodosType[];
  }

  async getTodosForDay(date: string): Promise<TodosType[]> {    
    const dateObj = new Date(date);
    const todos = await getWeeklyTodosForDay(dateObj);
    return [...todos];
  }
  
  async getAllNotes(): Promise<TodosType[]> {
    const notes = await getNotesAsnyc();
    return notes as TodosType[];
  }

}
