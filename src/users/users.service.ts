import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDbService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.createUser(createUserDto);
  }

  findAll() {
    return this.db.findAllUsers();
  }

  findOne(id: string) {
    return this.db.findUserById(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.db.updatePassword(id, updatePasswordDto);
  }

  remove(id: string) {
    return this.db.removeUserById(id);
  }
}
