import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.db.createAlbum(createAlbumDto);
  }

  async findAll() {
    return await this.db.findAllAlbums();
  }

  async findOne(id: string) {
    return await this.db.findAlbumById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.db.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: string) {
    return await this.db.removeAlbumById(id);
  }
}
