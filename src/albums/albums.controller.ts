import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UUIDv4 } from 'src/dto/get-by-id.dto';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() param: UUIDv4) {
    const existAlbum = await this.albumsService.findOne(param.id);
    if (existAlbum) {
      return existAlbum;
    }
    throw new NotFoundException('Album not found');
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param() param: UUIDv4, @Body() updateAlbumDto: UpdateAlbumDto) {
    const { updatedAlbum, error } = await this.albumsService.update(
      param.id,
      updateAlbumDto,
    );
    if (updatedAlbum) return updatedAlbum;
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() param: UUIDv4) {
    if (!(await this.albumsService.remove(param.id))) {
      throw new NotFoundException('Album not found');
    }
  }
}
