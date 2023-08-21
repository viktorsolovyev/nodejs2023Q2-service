import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByLogin(authDto.login);
    if (!bcrypt.compare(authDto.password, user?.password)) {
      throw new ForbiddenException('Unauthorized');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
