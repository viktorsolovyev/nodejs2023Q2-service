import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDbService {
  private readonly users: User[] = [];

  createUser(user: User) {
    this.users.push(user);
  }

  findAllUsers(): User[] {
    return this.users;
  }
}
