import { mockdata } from "src/DatabaseMock";
import { Model } from 'mongoose';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './Todo.schema';
import getWeekdays from "src/util/getWeekDays";


@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}
  async getTodos(): Promise<Todo[]> {    
    return await this.TodoModel.find().exec();
  }

  async getTodosForUser(id: string): Promise<Todo[]> {
    const userTodos = await this.TodoModel.find({ userId: id }).exec();
    if (!userTodos)
        throw new HttpException("User not found", 400)    
    return userTodos
  }

  async getTodosForDay(id: string, date: string): Promise<Todo[]> { 
    const userTodos = await this.TodoModel.find({ userId: id }).exec();
    if (!userTodos)
        throw new HttpException("User not found", 400)
    const weekDays = getWeekdays(new Date(date));
    const todos = userTodos.filter(todo => {
      const todoDate = new Date(todo.date);
      return (todoDate >= weekDays[0] && todoDate < weekDays[6]);
    });
    return todos;
  }
  
  async getAllNotesForUser(id: string): Promise<Todo[]> {
    const userTodos = await this.TodoModel.find({ userId: id }).exec();
    const userNotes = userTodos.filter((todo) => todo.isNote !== 0);
    return userNotes;
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

  async findTodoById(id: string) : Promise<Todo>{
    try{
      
      const todo = await this.TodoModel.findById(id);
      if(todo) 
        return todo
      else 
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    catch{
      throw new NotFoundException(`Todo with ID ${id} not found`);    
    }
  }

  async updateTodo(id: string, todoData: Partial<Todo>): Promise<{}> {
    try {
      const updatedTodo = await this.TodoModel.findByIdAndUpdate(
        id,
        { $set: todoData },
        { new: true }
      );
  
      if (!updatedTodo)
        throw new NotFoundException(`Todo with ID ${id} not found`);
  
      return {
        todo: updatedTodo,
        updatedStatus: updatedTodo ? 'success' : 'failure'
      };
    } catch (error) {
      console.error('Error updating Todo:', error);
      throw error;
    }
  }

  async createTodo(todo: Todo): Promise<{}> { 
    try {
      const newTodo = await this.TodoModel.create(todo);
      return {
        todo: newTodo,
        created: true
      };
    }
    catch (error){
        throw error;
    }
  }


  async deleteTodo(id: string): Promise<{}> {
    const res = await this.TodoModel.deleteOne({ _id: id });
    return res;      
  }

  async resetDB(): Promise<any> {
    await this.dropCollection()
    const res = await this.TodoModel.insertMany(mockdata);
    return res
  }

}
