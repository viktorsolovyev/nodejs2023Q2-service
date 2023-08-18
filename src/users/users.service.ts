import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.createUser(createUserDto);
  }

  async findAll() {
    return await this.db.findAllUsers();
  }

  async findOne(id: string) {
    return await this.db.findUserById(id);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return await this.db.updatePassword(id, updatePasswordDto);
  }

  async remove(id: string) {
    return await this.db.removeUserById(id);
  }

  async findOneByLogin(login: string) {
    return await this.db.findUserByLogin(login);
  }
}
