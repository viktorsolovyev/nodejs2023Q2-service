import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDbService) {}

  findAll() {
    return this.db.findAllFavorites();
  }

  addArtist(id: string) {
    return this.db.addArtistToFavorites(id);
  }

  removeArtist(id: string) {
    return this.db.removeArtistFromFavorites(id);
  }

  addAlbum(id: string) {
    return this.db.addAlbumToFavorites(id);
  }

  removeAlbum(id: string) {
    return this.db.removeAlbumFromFavorites(id);
  }

  addTrack(id: string) {
    return this.db.addTrackToFavorites(id);
  }

  removeTrack(id: string) {
    return this.db.removeTrackFromFavorites(id);
  }
}
