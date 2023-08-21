import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
