import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDbService],
})
export class AlbumsModule {}
