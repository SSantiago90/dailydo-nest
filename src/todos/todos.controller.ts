import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query, Req} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/auth/roles.enum";
import { Request as RequestType} from 'express';
import { UsersService } from "src/users/users.service";
import { CreateTodoDto } from "./dto/create-todo.dto";

interface RequestWithUser extends RequestType { user: { email: string , role: string} }

@Controller('todos')
@Auth(Role.USER)  
export class TodosController{
  constructor(
    private readonly todosService: TodosService,
    private readonly usersService: UsersService    
  ) {}

  /**
   * Gets the id of a user by its email.
   * @param email the email of the user
   * @returns the id of the user as a string
   */
  private async getUserId(email: string): Promise<string> {
    const { _id } = await this.usersService.findIdByEmail(email);    
    return _id.toString()
  }

  @Get()
  async getTodosForUser(@Req() req: RequestWithUser) {    
    const id = await this.getUserId(req.user.email);
    return this.todosService.getTodosForUser(id);
  }

  @Get("notes")
  async getAllNotes(@Req() req: RequestWithUser){
    const id = await this.getUserId(req.user.email);
    return this.todosService.getAllNotesForUser(id);
  }

  @Get("week/:date")
  async getWeeklyTodosForDay(@Req() req: RequestWithUser, @Param("date") date: string){       
    const id = await this.getUserId(req.user.email);
    return this.todosService.getTodosForDay(id, date);
  }

  @Post()
  async createNewTodo(@Body() todoData: CreateTodoDto, @Req() req: RequestWithUser){    
    const id = await this.getUserId(req.user.email);    
    
    const newTodoData = {
      ...todoData,     
      done: todoData.done || false,
      userId: id, 
  } 
    
     try {
      const newTodo = await this.todosService.createTodo(newTodoData);
      
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
  async updateTodo(@Body() todoData: CreateTodoDto, @Param("id") id: string) {
    
    try {
      // Update the todo item with the provided data
      const newTodo = await this.todosService.updateTodo(id, todoData);
  
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

  /* ADMIN ROUTES */
  @Auth(Role.ADMIN)  
  @Get("/all")
  getAllTodos(){  
    return this.todosService.getTodos();
  }

  @Post("/resetDB")
  @Auth(Role.ADMIN)
  resetTodoDB(){
    return this.todosService.resetDB();
  }  
}
