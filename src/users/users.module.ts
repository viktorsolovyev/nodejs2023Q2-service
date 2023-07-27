import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryDbService],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
}
