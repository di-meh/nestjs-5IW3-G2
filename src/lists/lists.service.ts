import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}
  create(id:string ,createListDto: CreateListDto) {
    return this.prisma.list.create({
      data: {
        ...createListDto,
        user: {
          connect: {
            id
          }
        }
      }
    });
  }

  findAll(id:string) {
    return this.prisma.list.findMany({where: { userId: id }});
  }

  findOne(id: string) {
    return this.prisma.list.findUnique({
      where: {
        id
      }
    });
  }

  update(id: string, updateListDto: UpdateListDto) {
    return this.prisma.list.update({
      where: {
        id
      },
      data: updateListDto
    });


  }

  remove(id: string) {
    return this.prisma.list.delete({
      where: {
        id
      }
    });
  }
}
