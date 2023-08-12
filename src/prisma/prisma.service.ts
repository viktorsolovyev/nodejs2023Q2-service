import {
  ForbiddenException,
  Global,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { FavoritesResponse } from 'src/favorites/entities/favorites.entity';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // User
  async findAllUsers() {
    return await this.user.findMany();
  }

  async findUserById(id: string) {
    return await this.user.findUnique({
      where: { id: id },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.user.findUnique({
      where: { id: id },
    });

    if (user) {
      if (user.password !== updatePasswordDto.oldPassword) {
        return {
          updatedUser: undefined,
          error: new ForbiddenException('Old password is wrong'),
        };
      }
      const updatedUser = await this.user.update({
        where: { id },
        data: {
          version: (user.version += 1),
          password: updatePasswordDto.newPassword,
          updatedAt: new Date(Date.now()),
        },
      });

      user.version += 1;
      user.password = updatePasswordDto.newPassword;
      user.updatedAt = new Date(Date.now());
      return {
        updatedUser: updatedUser,
      };
    }
    return {
      updatedUser: undefined,
      error: new NotFoundException('User not found'),
    };
  }

  async removeUserById(id: string): Promise<boolean> {
    const user = await this.user.findUnique({
      where: { id },
    });
    if (user) {
      await this.user.delete({ where: { id } });
      return true;
    }
    return false;
  }

  // Artist
  async findAllArtists() {
    return await this.artist.findMany();
  }

  async findArtistById(id: string) {
    return await this.artist.findUnique({
      where: { id: id },
    });
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return await this.artist.create({
      data: createArtistDto,
    });
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artist.findUnique({
      where: { id: id },
    });

    if (artist) {
      const updatedArtist = await this.artist.update({
        where: { id },
        data: updateArtistDto,
      });

      return {
        updatedArtist: updatedArtist,
      };
    }
    return {
      updatedArtist: undefined,
      error: new NotFoundException('Artist not found'),
    };
  }

  async removeArtistById(id: string): Promise<boolean> {
    const artist = await this.artist.findUnique({
      where: { id },
    });
    if (artist) {
      await this.artist.delete({ where: { id } });
      return true;
    }
    return false;
  }

  // Album
  async findAllAlbums() {
    return await this.album.findMany();
  }

  async findAlbumById(id: string) {
    return await this.album.findUnique({
      where: { id: id },
    });
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.album.create({
      data: createAlbumDto,
    });
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.album.findUnique({
      where: { id: id },
    });

    if (album) {
      const updatedAlbum = await this.album.update({
        where: { id },
        data: updateAlbumDto,
      });

      return {
        updatedAlbum: updatedAlbum,
      };
    }
    return {
      updatedAlbum: undefined,
      error: new NotFoundException('Album not found'),
    };
  }

  async removeAlbumById(id: string): Promise<boolean> {
    const album = await this.album.findUnique({
      where: { id },
    });
    if (album) {
      await this.album.delete({ where: { id } });
      return true;
    }
    return false;
  }

  // Track
  async findAllTracks() {
    return await this.track.findMany();
  }

  async findTrackById(id: string) {
    return await this.track.findUnique({
      where: { id: id },
    });
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    return await this.track.create({
      data: createTrackDto,
    });
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.track.findUnique({
      where: { id: id },
    });
    if (track) {
      const updatedTrack = await this.track.update({
        where: { id },
        data: updateTrackDto,
      });

      return {
        updatedTrack: updatedTrack,
      };
    }
    return {
      updatedTrack: undefined,
      error: new NotFoundException('Track not found'),
    };
  }

  async removeTrackById(id: string): Promise<boolean> {
    const track = await this.track.findUnique({
      where: { id },
    });
    if (track) {
      await this.track.delete({ where: { id } });
      return true;
    }
    return false;
  }

  // Favorites
  async findAllFavorites(): Promise<FavoritesResponse> {
    const response = new FavoritesResponse();

    response.artists = await this.artist_To_Favorites
      .findMany({
        include: {
          artist: true,
        },
      })
      .then((favs) => favs.map((fav) => fav.artist));

    response.albums = await this.album_To_Favorites
      .findMany({
        include: {
          album: true,
        },
      })
      .then((favs) => favs.map((fav) => fav.album));

    response.tracks = await this.track_To_Favorites
      .findMany({
        include: {
          track: true,
        },
      })
      .then((favs) => favs.map((fav) => fav.track));

    return response;
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artist.findUnique({
      where: { id: id },
    });
    if (!artist)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Artist not found'),
      };

    await this.artist_To_Favorites.create({
      data: { artistId: id },
    });
    return {
      hasBeenAdded: true,
    };
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.artist.findUnique({
      where: { id: id },
    });
    if (!artist) return false;

    await this.artist_To_Favorites.delete({
      where: { artistId: id },
    });
    return true;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.album.findUnique({
      where: { id: id },
    });
    if (!album)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Album not found'),
      };

    await this.album_To_Favorites.create({
      data: { albumId: id },
    });
    return {
      hasBeenAdded: true,
    };
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.album.findUnique({
      where: { id: id },
    });
    if (!album) return false;

    await this.album_To_Favorites.delete({
      where: { albumId: id },
    });
    return true;
  }

  async addTrackToFavorites(id: string) {
    const track = await this.track.findUnique({
      where: { id: id },
    });
    if (!track)
      return {
        hasBeenAdded: false,
        error: new UnprocessableEntityException('Track not found'),
      };

    await this.track_To_Favorites.create({
      data: { trackId: id },
    });
    return {
      hasBeenAdded: true,
    };
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.track.findUnique({
      where: { id: id },
    });
    if (!track) return false;

    await this.track_To_Favorites.delete({
      where: { trackId: id },
    });
    return true;
  }
}
