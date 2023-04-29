import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from 'src/auth/auth.guard';
import {ListsGuard} from "./lists.guard";

@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}


  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Request() request, @Body() createListDto: CreateListDto) {
    return this.listsService.create(request.user.sub,createListDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll(@Request() request) {
    return this.listsService.findAll(request.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.listsService.remove(id);
  }
}
