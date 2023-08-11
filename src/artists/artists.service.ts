import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.db.createArtist(createArtistDto);
  }

  async findAll() {
    return await this.db.findAllArtists();
  }

  async findOne(id: string) {
    return await this.db.findArtistById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.db.updateArtist(id, updateArtistDto);
  }
  async remove(id: string) {
    return await this.db.removeArtistById(id);
  }
}
