import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UUIDv4 } from 'src/dto/get-by-id.dto';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() param: UUIDv4) {
    const existArtist = await this.artistsService.findOne(param.id);
    if (existArtist) {
      return existArtist;
    }
    throw new NotFoundException('Artist not found');
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param() param: UUIDv4,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { updatedArtist, error } = await this.artistsService.update(
      param.id,
      updateArtistDto,
    );
    if (updatedArtist) return updatedArtist;
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() param: UUIDv4) {
    if (!this.artistsService.remove(param.id)) {
      throw new NotFoundException('Artist not found');
    }
  }
}
