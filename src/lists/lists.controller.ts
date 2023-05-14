import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListsGuard } from './lists.guard';

@ApiTags('lists')
@Controller('lists')
@ApiBearerAuth()
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Request() request, @Body() createListDto: CreateListDto) {
    return this.listsService.create(request.user.sub, createListDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() request) {
    return this.listsService.findAll(request.user.sub);
  }

  @Get(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  findOne(@Param('listId') id: string) {
    return this.listsService.findOne(id);
  }

  @Patch(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  update(@Param('listId') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  remove(@Param('listId') id: string) {
    return this.listsService.remove(id);
  }
}
