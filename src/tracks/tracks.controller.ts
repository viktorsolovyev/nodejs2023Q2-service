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
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() param: UUIDv4) {
    const track = await this.tracksService.findOne(param.id);
    if (track) {
      return track;
    }
    throw new NotFoundException('Track not found');
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param() param: UUIDv4, @Body() updateTrackDto: UpdateTrackDto) {
    const { updatedTrack, error } = await this.tracksService.update(
      param.id,
      updateTrackDto,
    );
    if (updatedTrack) return updatedTrack;
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() param: UUIDv4) {
    if (!(await this.tracksService.remove(param.id))) {
      throw new NotFoundException('Track not found');
    }
  }
}
