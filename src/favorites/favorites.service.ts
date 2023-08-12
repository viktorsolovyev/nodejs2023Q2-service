import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private db: PrismaService) {}

  async findAll() {
    return await this.db.findAllFavorites();
  }

  async addArtist(id: string) {
    return await this.db.addArtistToFavorites(id);
  }

  async removeArtist(id: string) {
    return await this.db.removeArtistFromFavorites(id);
  }

  async addAlbum(id: string) {
    return await this.db.addAlbumToFavorites(id);
  }

  async removeAlbum(id: string) {
    return await this.db.removeAlbumFromFavorites(id);
  }

  async addTrack(id: string) {
    return await this.db.addTrackToFavorites(id);
  }

  async removeTrack(id: string) {
    return await this.db.removeTrackFromFavorites(id);
  }
}
