import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: InMemoryDbService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.db.createTrack(createTrackDto);
  }

  findAll() {
    return this.db.findAllTracks();
  }

  findOne(id: string) {
    return this.db.findTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.db.removeTrackById(id);
  }
}
