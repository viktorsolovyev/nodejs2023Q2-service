import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { InMemoryDbService } from './in-memory-db/in-memory-db.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    InMemoryDbModule,
  ],
  providers: [AppService],
})
export class AppModule {}
