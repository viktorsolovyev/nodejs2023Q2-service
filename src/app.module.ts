import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InMemoryDbService } from './in-memory-db/in-memory-db.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, InMemoryDbService],
})
export class AppModule {}
