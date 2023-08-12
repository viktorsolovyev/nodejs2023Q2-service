import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUIDv4 } from 'src/dto/get-by-id.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param() param: UUIDv4) {
    const { hasBeenAdded, error } = await this.favoritesService.addArtist(
      param.id,
    );
    if (!hasBeenAdded) throw error;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() param: UUIDv4) {
    if (!(await this.favoritesService.removeArtist(param.id))) {
      throw new NotFoundException('Artist is not favorite');
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param() param: UUIDv4) {
    const { hasBeenAdded, error } = await this.favoritesService.addAlbum(
      param.id,
    );
    if (!hasBeenAdded) throw error;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() param: UUIDv4) {
    if (!(await this.favoritesService.removeAlbum(param.id))) {
      throw new NotFoundException('Album is not favorite');
    }
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param() param: UUIDv4) {
    const { hasBeenAdded, error } = await this.favoritesService.addTrack(
      param.id,
    );
    if (!hasBeenAdded) throw error;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param() param: UUIDv4) {
    if (!(await this.favoritesService.removeTrack(param.id))) {
      throw new NotFoundException('Track is not favorite');
    }
  }
}
