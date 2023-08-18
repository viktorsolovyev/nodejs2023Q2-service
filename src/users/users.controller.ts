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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UUIDv4 } from 'src/dto/get-by-id.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new User(user));
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() param: UUIDv4) {
    const existUser = await this.usersService.findOne(param.id);
    if (existUser) {
      return existUser;
    }
    throw new NotFoundException('User not found');
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param() param: UUIDv4,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { updatedUser, error } = await this.usersService.update(
      param.id,
      updatePasswordDto,
    );
    if (updatedUser) return new User(updatedUser);
    throw error;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() param: UUIDv4) {
    const deleted = await this.usersService.remove(param.id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
