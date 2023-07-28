import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InMemoryDbService } from './in-memory-db/in-memory-db.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService, InMemoryDbService],
})
export class AppModule {}
