import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  
  create(listId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        list: {
          connect: {
            id: listId
          }
        }
      }
    });
  }

  findAll(listId: string) {
    return this.prisma.task.findMany({where: { listId: listId }});
  }

  async findOne(listId: string, id: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        listId: listId,
      }
    });

    return task;
  }
  
  async update(listId :string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findFirst(id);

    const updatedTask = await this.prisma.task.update(id, {
      ...updateTaskDto,
      updatedAt: new Date(),
    });

    return this.prisma.task.findFirst(id);
  }
  
  

  async remove(listId: string, taskId: string) {
    await this.prisma.task.deleteMany({
      where: {
        id: taskId,
        listId: listId
      }
    });
  }
  
}
