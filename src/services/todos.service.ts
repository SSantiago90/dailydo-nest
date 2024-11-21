import { Injectable } from '@nestjs/common';
import getDataAsync, { getTodosForDay, getNotesAsnyc } from "src/DatabaseMock";
import { TodosType } from 'src/types/Todos.type';
import { NotesType } from 'src/types/Notes.type';
@Injectable()
export class TodosService {
  async getTodos(): Promise<TodosType[]> {
    const todos = await getDataAsync();
    return todos as TodosType[];
  }

  async getTodosForDay(date: string): Promise<TodosType[]> {    
    const dateObj = new Date(date);
    const todos = await getTodosForDay(dateObj);
    return [...todos];
  }
  
  async getAllNotes(): Promise<NotesType[]> {
    const notes = await getNotesAsnyc();
    return notes as NotesType[];
  }

}
