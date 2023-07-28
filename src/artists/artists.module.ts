import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDbService],
})
export class ArtistsModule {}
