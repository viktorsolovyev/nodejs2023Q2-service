import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UUIDv4 } from 'src/dto/get-by-id.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() param: UUIDv4) {
    const existUser = this.usersService.findOne(param.id);
    if (existUser) {
      return existUser;
    }
    throw new NotFoundException('User not found');
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param() param: UUIDv4, @Body() updatePasswordDto: UpdatePasswordDto) {
    const { updatedUser, error } = this.usersService.update(
      param.id,
      updatePasswordDto,
    );
    if (updatedUser) return updatedUser;
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() param: UUIDv4) {
    if (!this.usersService.remove(param.id)) {
      throw new NotFoundException('User not found');
    }
  }
}
