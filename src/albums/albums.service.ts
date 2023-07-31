import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: InMemoryDbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.findAllAlbums();
  }

  findOne(id: string) {
    return this.db.findAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.db.removeAlbumById(id);
  }
}
