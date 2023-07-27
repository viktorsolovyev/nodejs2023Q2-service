import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';

@Injectable()
export class InMemoryDbService {
  private users: User[] = [];

  createUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.id = uuidv4();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = newUser.createdAt;

    this.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  removeUserById(id: string): boolean {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((value) => value !== user);
      return true;
    }
    return false;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      if (user.password !== updatePasswordDto.oldPassword) {
        return {
          updatedUser: undefined,
          error: new ForbiddenException('Old password is wrong'),
        };
      }
      user.version += 1;
      user.password = updatePasswordDto.newPassword;
      user.updatedAt = Date.now();
      return {
        updatedUser: {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    }
    return {
      updatedUser: undefined,
      error: new NotFoundException('User not found'),
    };
  }
}
