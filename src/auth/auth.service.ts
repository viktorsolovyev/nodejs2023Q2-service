import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByLogin(authDto.login);
    if (!(await bcrypt.compare(authDto.password, user?.password))) {
      throw new ForbiddenException('Unauthorized');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
