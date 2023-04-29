import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}
  create(id,createListDto: CreateListDto) {
    return this.prisma.list.create({
      data: {
        ...createListDto,
        userId:  id ,
      },
    });
  }

  findAll() {
    return this.prisma.list.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
