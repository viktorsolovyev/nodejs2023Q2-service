import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: InMemoryDbService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.db.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.findAllArtists();
  }

  findOne(id: string) {
    return this.db.findArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.updateArtist(id, updateArtistDto);
  }
  remove(id: string) {
    return this.db.removeArtistById(id);
  }
}
