import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, RefreshDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    authDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByLogin(authDto.login);

    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    if (!(await bcrypt.compare(authDto.password, user?.password))) {
      throw new ForbiddenException('Unauthorized');
    }
    const payload = { sub: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async refresh(
    refreshDto: RefreshDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const requestPayload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      if (requestPayload.exp < Math.round(Date.now() / 1000)) {
        throw new ForbiddenException('Refresh token is invalid or expired');
      }

      const user = await this.usersService.findOne(requestPayload.sub);

      if (!user) {
        throw new ForbiddenException('Refresh token is invalid or expired');
      }

      const payload = { sub: requestPayload.sub, login: requestPayload.login };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
