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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUIDv4 } from 'src/dto/get-by-id.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() param: UUIDv4) {
    const track = this.tracksService.findOne(param.id);
    if (track) {
      return track;
    }
    throw new NotFoundException('Track not found');
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param() param: UUIDv4, @Body() updateTrackDto: UpdateTrackDto) {
    const { updatedTrack, error } = this.tracksService.update(
      param.id,
      updateTrackDto,
    );
    if (updatedTrack) return updatedTrack;
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() param: UUIDv4) {
    if (!this.tracksService.remove(param.id)) {
      throw new NotFoundException('Track not found');
    }
  }
}
