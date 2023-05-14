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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListsGuard } from 'src/lists/lists.guard';

@ApiTags('tasks')
@Controller('lists/:listId/tasks')
@UseGuards(AuthGuard, ListsGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiParam({ name: 'listId' })
  create(
    @Param('listId', ParseUUIDPipe) listId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(listId, createTaskDto);
  }

  @Get()
  @ApiParam({ name: 'listId' })
  findAll(@Param('listId', ParseUUIDPipe) listId: string) {
    return this.tasksService.findAll(listId);
  }

  @Get(':id')
  findOne(
    @Param('listId', ParseUUIDPipe) listId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.tasksService.findOne(listId, id);
  }

  @Patch(':id')
  update(
    @Param('listId', ParseUUIDPipe) listId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(listId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @Param('listId', ParseUUIDPipe) listId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.tasksService.remove(listId, id);
  }
}
