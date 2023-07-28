import {
  ForbiddenException,
  Injectable,
  NotFoundException,
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

@Injectable()
export class InMemoryDbService {
  private users: User[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];

  // User
  findAllUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.id = uuidv4();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = newUser.createdAt;

    this.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
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
      user.updatedAt = Date.now();
      return {
        updatedUser: {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
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
    console.log(this.tracks);
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      this.artists = this.artists.filter((value) => value !== artist);
      this.tracks.forEach((track) => {
        if (track.artistId === id) track.artistId = null;
      });
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
    newAlbum.artistId = null;
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
      return true;
    }
    return false;
  }
}
