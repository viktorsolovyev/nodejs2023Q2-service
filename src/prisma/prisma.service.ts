import {
  ForbiddenException,
  Global,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // User
  async findAllUsers() {
    return await this.user.findMany();
  }

  async findUserById(id: string) {
    return await this.user.findUnique({
      where: { id: id },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.user.findUnique({
      where: { id: id },
    });

    if (user) {
      if (user.password !== updatePasswordDto.oldPassword) {
        return {
          updatedUser: undefined,
          error: new ForbiddenException('Old password is wrong'),
        };
      }
      const updatedUser = await this.user.update({
        where: { id },
        data: {
          version: (user.version += 1),
          password: updatePasswordDto.newPassword,
          updatedAt: new Date(Date.now()),
        },
      });

      user.version += 1;
      user.password = updatePasswordDto.newPassword;
      user.updatedAt = new Date(Date.now());
      return {
        updatedUser: updatedUser,
      };
    }
    return {
      updatedUser: undefined,
      error: new NotFoundException('User not found'),
    };
  }

  async removeUserById(id: string): Promise<boolean> {
    const user = await this.user.findUnique({
      where: { id },
    });
    if (user) {
      await this.user.delete({ where: { id } });
      return true;
    }
    return false;
  }
}
