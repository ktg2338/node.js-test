// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UserService,
  ) {}

  signAccessToken(user: User) {
    const payload = { sub: user.id, username: user.name, roles: user.roles };

    return this.jwt.sign(payload);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.users.findOneByName(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }
}
