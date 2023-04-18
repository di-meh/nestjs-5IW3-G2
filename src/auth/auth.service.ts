import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
