import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { TodoService } from './todo.service';
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly appService: TodoService) {}

  @Get('get-user')
  @ApiOperation({ summary: 'Get greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  getTodos(): string[] {
    return this.appService.getTodos();
  }

  @Get(':index')
  @ApiOperation({ summary: 'Get a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  getTodoByIndex(@Param('index', ParseIntPipe) index: number): string {
    return this.appService.getTodoByIndex(index);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ description: 'Task to be added', type: String })
  createTodo(@Body('task') task: string): string[] {
    return this.appService.createTodo(task);
  }

  @Put(':index')
  @ApiOperation({ summary: 'Update a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  @ApiBody({ description: 'Updated task', type: String })
  updateTodo(
    @Param('index', ParseIntPipe) index: number,
    @Body('task') task: string,
  ): string[] {
    return this.appService.updateTodo(index, task);
  }

  @Delete(':index')
  @ApiOperation({ summary: 'Delete a todo by index' })
  @ApiParam({ name: 'index', type: 'number', description: 'Index of the todo' })
  deleteTodo(@Param('index', ParseIntPipe) index: number): string[] {
    return this.appService.deleteTodo(index);
  }
}
