import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.db.createTrack(createTrackDto);
  }

  async findAll() {
    return await this.db.findAllTracks();
  }

  async findOne(id: string) {
    return await this.db.findTrackById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.db.updateTrack(id, updateTrackDto);
  }

  async remove(id: string) {
    return await this.db.removeTrackById(id);
  }
}
