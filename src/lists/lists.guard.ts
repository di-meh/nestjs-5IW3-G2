import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ListsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const listId = context.switchToHttp().getRequest().params.id;
    const userId = context.switchToHttp().getRequest().user.sub;

    const userHasAccess = this.prisma.list.findFirst({
        where: {
            id: listId,
            userId: userId
        }
    });

    return userHasAccess.then((result) => {
        return !!result;
    });

  }
}
