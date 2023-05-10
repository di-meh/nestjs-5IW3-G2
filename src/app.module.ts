import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ListsModule,
    TasksModule,
    AuthModule
  ],
  controllers: [],
  providers: [AuthService, PrismaService],
})
export class AppModule {}
