import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from "@nestjs/common";
import { TodosService } from "src/services/todos.service";
import { getWeeklyTodosForDay } from "src/DatabaseMock";

@Controller('todos')
export class TodosController{
  constructor(private readonly todosService: TodosService) {}
  @Get()
  getTodos(){  
    return this.todosService.getTodos();
  }

  @Get("week/:date")
  getWeeklyTodosForDay(@Param("date") date: string){   
    return this.todosService.getTodosForDay(date);
  }

  @Get("notes")
  getAllNotes(){
    return this.todosService.getAllNotes();
  }
}
