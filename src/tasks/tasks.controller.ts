import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiBearerAuth, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from 'src/auth/auth.guard';
import { ListsGuard } from 'src/lists/lists.guard';

@ApiTags('tasks')
@Controller('lists/:listId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  @ApiParam({name: 'listId'})
  create(@Param('listId', ParseUUIDPipe) listId: string , @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(listId, createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({name: 'listId'})
  findAll(@Param('listId', ParseUUIDPipe) listId: string ) {
    return this.tasksService.findAll(listId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('listId', ParseUUIDPipe) listId: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(listId ,id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('listId', ParseUUIDPipe) listId: string, @Param('id',ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(listId, id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  remove(@Param('listId', ParseUUIDPipe) listId: string, @Param('id',ParseUUIDPipe) id: string) {
    return this.tasksService.remove( listId, id);
  }
}
