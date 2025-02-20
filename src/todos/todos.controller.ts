import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query, Req} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { getWeeklyTodosForDay } from "src/DatabaseMock";
import { Todo } from "src/todos/Todo.schema";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/auth/roles.enum";
import { Request as RequestType} from 'express';

import extractUserEmailFromRequest from "src/util/extractUserFromJWT";
import { request } from "node:http";

interface RequestWithUser extends RequestType { user: { email: string , role: string} }


@Controller('todos')
export class TodosController{
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Auth(Role.USER)  
  @Get()
  getTodosForUser(@Req() req: RequestWithUser) {    
    return this.todosService.getTodosForUser(req.user.email);
    
  }

  @Auth(Role.ADMIN)  
  @Get("/all")
  getAllTodos(){  
    return this.todosService.getTodos();
  }


  @Get("notes")
  getAllNotes(){
    return this.todosService.getAllNotes();
  }

  @Get("week/:date")
  getWeeklyTodosForDay(@Param("date") date: string){   
    return this.todosService.getTodosForDay(date);
  }

  @Post("/")
  async createNewTodo(@Body() todoData: Todo){
    try {
      const newTodo = await this.todosService.createTodo(todoData);
      
      return { 
        statusCode: 200,
        message: "Todo created successfully",
        data: newTodo 
      };
    }
    catch( error){
      return { 
        statusCode: 400,
        message: 'An error occurred while creating the todo',
        error: error.message
      };
    }
  }

  @Put("/:id")
  async updateTodo(@Param("id") id: string, @Body() todoData: Todo) {
    try {
      // Update the todo item with the provided data
      const newTodo = await this.todosService.updateTodo(todoData);
  
      // Return the updated todo item
      return { 
        statusCode: 200,
        message: "Todo updated successfully",
        data: newTodo
      };
    } catch (error) {
      return { 
        statusCode: 400,
        message: 'An error occurred while updating the todo',
        error: error.message
      };
    }
  }

  @Delete("/:id")
  async deleteTodo(@Param("id") id: string){    
    try {
      const delTodo = await this.todosService.deleteTodo(id);      
      return {
        statusCode: 200,
        message: 'Todo deleted successfully',
        data: delTodo
      }

    }
    catch (err) {
      return { 
        statusCode: 400,
        message: 'An error occurred while updating the todo',
        error: err.message
      };
    }

  }

  @Post("/resetDB")
  @Auth(Role.ADMIN)
  resetDB(){
    return this.todosService.resetDB();
  }
  
}
