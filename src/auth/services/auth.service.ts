import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service.ts.service';
import { User } from '../../users/entities/user.entity';
import { TokenPayload } from '../models/token.models';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload:TokenPayload = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
