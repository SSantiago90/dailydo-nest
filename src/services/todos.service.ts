import { mockdata } from "src/DatabaseMock";
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
    const notes = await this.TodoModel.find( { 
      $or: [
        { isNote: 1 },
      { isNote: 2 },
      { isNote: 3}
      ]
    }).exec();
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

  async findTodoById(id: string) : Promise<Todo>{
    try{
      
      const todo = await this.TodoModel.findById(id);
      if(todo) 
        return todo
      else 
      throw new Error(`Todo with ID ${id} not found`);
    }
    catch{
      throw new Error(`Todo with ID ${id} not found`);    
    }
  }

  async updateTodo(todo: Todo): Promise<{}> {    
    try {
      const todoExists = this.TodoModel.findById(todo.id)
    }
    catch{

    }
    try {      
      const updatedTodo = await this.TodoModel.updateOne(
        { _id: todo.id },
        { ...todo }
      );
    
    
      console.log(updatedTodo)
      return {
        todo: todo,
        updatedStatus: updatedTodo.acknowledged
      }
    } 
    catch (error) {
     
      throw error;
    }
  }

  async createTodo(todo: Todo): Promise<{}> {
    delete(todo.id);
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
    return this.TodoModel.insertMany(mockdata);
  }

}
