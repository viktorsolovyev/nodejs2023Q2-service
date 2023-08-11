import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Album } from 'src/albums/entities/album.entity';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import {
  Favorites,
  FavoritesResponse,
} from 'src/favorites/entities/favorites.entity';

@Injectable()
export class InMemoryDbService {
  private users: User[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private favorites: Favorites = new Favorites();

  // User
  findAllUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });

    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  removeUserById(id: string): boolean {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((value) => value !== user);
      return true;
    }
    return false;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      if (user.password !== updatePasswordDto.oldPassword) {
        return {
          updatedUser: undefined,
          error: new ForbiddenException('Old password is wrong'),
        };
      }
      user.version += 1;
      user.password = updatePasswordDto.newPassword;
      user.updatedAt = new Date(Date.now());
      return {
        updatedUser: user,
      };
    }
    return {
      updatedUser: undefined,
      error: new NotFoundException('User not found'),
    };
  }

  // Artist
  findAllArtists(): Artist[] {
    return this.artists;
  }

  findArtistById(id: string): Artist | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist();

    newArtist.id = uuidv4();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;

    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return {
        updatedArtist: artist,
      };
    }
    return {
      updatedArtist: undefined,
      error: new NotFoundException('Artist not found'),
    };
  }

  removeArtistById(id: string): boolean {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      this.artists = this.artists.filter((value) => value !== artist);

      this.tracks.forEach((track) => {
        if (track.artistId === id) track.artistId = null;
      });

      this.albums.forEach((album) => {
        if (album.artistId === id) album.artistId = null;
      });

      this.removeArtistFromFavorites(id);

      return true;
    }
    return false;
  }

  // Album
  findAllAlbums(): Album[] {
    return this.albums;
  }

  findAlbumById(id: string): Album | undefined {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();

    newAlbum.id = uuidv4();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
      return {
        updatedAlbum: album,
      };
    }
    return {
      updatedAlbum: undefined,
      error: new NotFoundException('Album not found'),
    };
  }

  removeAlbumById(id: string): boolean {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      this.albums = this.albums.filter((value) => value !== album);

      this.tracks.forEach((track) => {
        if (track.albumId === id) track.albumId = null;
      });

      this.removeAlbumFromFavorites(id);

      return true;
    }
    return false;
  }

  // Track
  findAllTracks(): Track[] {
    return this.tracks;
  }

  findTrackById(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = new Track();

    newTrack.id = uuidv4();
    newTrack.name = createTrackDto.name;
    newTrack.duration = createTrackDto.duration;
    newTrack.artistId = createTrackDto.artistId;
    newTrack.albumId = createTrackDto.albumId;

    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.duration = updateTrackDto.duration;
      track.artistId = updateTrackDto.artistId;
      track.albumId = updateTrackDto.albumId;
      return {
        updatedTrack: track,
      };
    }
    return {
      updatedTrack: undefined,
      error: new NotFoundException('Track not found'),
    };
  }

  removeTrackById(id: string): boolean {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      this.tracks = this.tracks.filter((value) => value !== track);
      this.removeTrackFromFavorites(id);
      return true;
    }
    return false;
  }

  // Favorites
  findAllFavorites(): FavoritesResponse {
    const response = new FavoritesResponse();

    this.artists.forEach((artist) => {
      if (
        this.favorites.artists.findIndex((value) => value === artist.id) > -1
      ) {
        response.artists.push(artist);
      }
    });

    this.albums.forEach((album) => {
      if (this.favorites.albums.findIndex((value) => value === album.id) > -1) {
        response.albums.push(album);
      }
    });

    this.tracks.forEach((track) => {
      if (this.favorites.tracks.findIndex((value) => value === track.id) > -1) {
        response.tracks.push(track);
      }
    });

    return response;
  }

  addArtistToFavorites(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Artist not found'),
      };

    if (this.favorites.artists.findIndex((value) => value === id) === -1) {
      this.favorites.artists.push(id);
    }
    return {
      hasBeenAdded: true,
    };
  }

  removeArtistFromFavorites(id: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (artistIndex === -1) return false;

    this.favorites.artists.splice(artistIndex, 1);
    return true;
  }

  addAlbumToFavorites(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Album not found'),
      };

    if (this.favorites.albums.findIndex((value) => value === id) === -1) {
      this.favorites.albums.push(id);
    }
    return {
      hasBeenAdded: true,
    };
  }

  removeAlbumFromFavorites(id: string) {
    const albumIndex = this.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (albumIndex === -1) return false;

    this.favorites.albums.splice(albumIndex, 1);
    return true;
  }

  addTrackToFavorites(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Track not found'),
      };

    if (this.favorites.tracks.findIndex((value) => value === id) === -1) {
      this.favorites.tracks.push(id);
    }
    return {
      hasBeenAdded: true,
    };
  }

  removeTrackFromFavorites(id: string) {
    const trackIndex = this.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (trackIndex === -1) return false;

    this.favorites.tracks.splice(trackIndex, 1);
    return true;
  }
}
